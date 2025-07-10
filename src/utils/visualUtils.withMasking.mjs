// File: visualUtils.withMasking.mjs
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

// Directory for screenshots
export const screenshotsDir = 'screenshots';
let ignoreRegion = null; // Region to ignore in diff

// Clean screenshot folders
export function cleanScreenshotsFolder() {
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
    console.log('Cleared previous screenshots and diffs.');
  }
}

// Load environment variables and verify URLs
export function initializeVisualTestEnv() {
  cleanScreenshotsFolder();
  dotenv.config({ path: path.resolve(process.cwd(), 'tests/src/.env') });
  console.log('Environment variables loaded');
  console.log('URL1:', process.env.URL1);
  console.log('URL2:', process.env.URL2);
}

// Wrap a step with safe error handling
export async function safeStep(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    console.warn(`Step "${stepName}" failed:`, error.message);
  }
}

// Wait for loader to disappear and take screenshot
export async function waitForProcessingAndTakeScreenshot(page, env, label) {
  const dir = path.join(screenshotsDir, env);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`Waiting for loader before capturing ${env} - ${label}`);

  try {
    const loaderLocator = page.locator('.processing-icon').first();
    const loaderVisible = await loaderLocator.isVisible();
    if (loaderVisible) {
      await page.waitForSelector('.processing-icon', {
        state: 'hidden',
        timeout: 15000
      });
    }
  } catch (error) {
    console.warn(`Loader not hidden after timeout on "${label}". Proceeding with screenshot.`);
  }

  if (page.isClosed()) {
    console.error(`Page closed before capturing screenshot: ${label}`);
    return;
  }

  try {
    const header = page.locator('#m_header');
    await header.waitFor({ state: 'visible', timeout: 10000 });
    const box = await header.boundingBox();
    if (box) {
      ignoreRegion = {
        x: 0,
        y: 0,
        width: Math.ceil(box.width),
        height: Math.ceil(box.height + 10)
      };
      console.log('Ignoring region during comparison:', ignoreRegion);
    }

    await page.waitForTimeout(2000);
    const filePath = path.join(dir, `${label}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Screenshot saved: ${filePath}`);
  } catch (error) {
    console.error(`Error capturing screenshot for ${env}/${label}:`, error.message);
  }
}

// Compare screenshots with masking
export function compareScreenshots(label) {
  const img1Path = path.join(screenshotsDir, 'url1', `${label}.png`);
  const img2Path = path.join(screenshotsDir, 'url2', `${label}.png`);

  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));
  const { width, height } = img1;
  const diff = new PNG({ width, height });
  const debugOverlay = new PNG({ width, height });

  if (ignoreRegion) {
    const regionHeight = ignoreRegion.height;
    for (let y = 0; y < regionHeight; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        img1.data[idx + 3] = 0;
        img2.data[idx + 3] = 0;

        // Red overlay for excluded area
        debugOverlay.data[idx] = 255;
        debugOverlay.data[idx + 1] = 0;
        debugOverlay.data[idx + 2] = 0;
        debugOverlay.data[idx + 3] = 100;
      }
    }

    for (let y = regionHeight; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        debugOverlay.data[idx] = img1.data[idx];
        debugOverlay.data[idx + 1] = img1.data[idx + 1];
        debugOverlay.data[idx + 2] = img1.data[idx + 2];
        debugOverlay.data[idx + 3] = img1.data[idx + 3];
      }
    }
  }

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.2,
    alpha: 0.5,
    includeAA: false
  });

  const debugDir = path.join(screenshotsDir, 'comparison-debug');
  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });
  const debugPath = path.join(debugDir, `${label}-debug-overlay.png`);
  fs.writeFileSync(debugPath, PNG.sync.write(debugOverlay));

  if (numDiffPixels > 0) {
    const diffDir = path.join(screenshotsDir, 'diffs');
    if (!fs.existsSync(diffDir)) fs.mkdirSync(diffDir, { recursive: true });
    const diffPath = path.join(diffDir, `${label}.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.log(`🟥 Diff for "${label}": ${numDiffPixels} pixel(s) difference`);
  } else {
    console.log(`🟩 No visual difference in "${label}"`);
  }

  return numDiffPixels;
}

// Compare all screenshots and generate summary
export function compareAllScreenshots(labels, expect) {
  let hasDiff = false;
  const summary = [];
  const summaryPath = path.join(screenshotsDir, 'diffs', 'diff-summary.txt');

  if (!fs.existsSync(path.dirname(summaryPath))) {
    fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  }

  for (const label of labels) {
    try {
      const diffPixels = compareScreenshots(label);
      if (diffPixels > 0) {
        hasDiff = true;
        summary.push(`🟥 ${label}: ${diffPixels} pixel(s) difference`);
      } else {
        summary.push(`🟩 ${label}: No visual difference`);
      }
    } catch (error) {
      hasDiff = true;
      summary.push(`${label}: Error - ${error.message}`);
      console.error(`Error comparing "${label}":`, error.message);
    }
  }

  const finalLog = `Visual Comparison Summary (${new Date().toLocaleString()}):\n\n${summary.join('\n')}`;
  fs.writeFileSync(summaryPath, finalLog);
  console.log(`\n${finalLog}`);
  console.log(`Diff summary written to: ${summaryPath}`);

  expect(hasDiff).toBe(false);
}
