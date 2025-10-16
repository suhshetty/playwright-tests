// File: visualUtils.noMasking.mjs
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export const screenshotsDir = 'screenshots';

// Cleanup before each test run
export function cleanScreenshotsFolder() {
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
    console.log('Cleared previous screenshots and diffs.');
  }
}

// Load env and prepare screenshot folder
export function initializeVisualTestEnv() {
  cleanScreenshotsFolder();
  dotenv.config({ path: path.resolve(process.cwd(), 'tests/src/.env') });
  console.log('Environment variables loaded');
  console.log('URL1:', process.env.URL1);
  console.log('URL2:', process.env.URL2);

  // Ensure base dirs exist
  const url1Dir = path.join(screenshotsDir, 'url1');
  const url2Dir = path.join(screenshotsDir, 'url2');
  if (!fs.existsSync(url1Dir)) fs.mkdirSync(url1Dir, { recursive: true });
  if (!fs.existsSync(url2Dir)) fs.mkdirSync(url2Dir, { recursive: true });
}

// Safe wrapper for test steps
export async function safeStep(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    console.error(`Step "${stepName}" failed:`, error.message);
    throw error; // fail fast so missing screenshots don't cascade
  }
}

// Capture screenshots after processing
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
    // Wait for stable header (used as a good indicator of page readiness)
    const header = page.locator('#m_header');
    await header.waitFor({ state: 'visible', timeout: 10000 });

    await page.waitForTimeout(2000);

    const filePath = path.join(dir, `${label}.png`);
    await page.screenshot({ path: filePath, fullPage: true });

    if (!fs.existsSync(filePath)) {
      throw new Error(`Screenshot not created: ${filePath}`);
    }

    const size = fs.statSync(filePath).size;
    if (size < 10000) {
      console.warn(`Screenshot for ${env}/${label} may be blank (size: ${size} bytes)`);
    }

    console.log(`Screenshot saved: ${filePath}`);
  } catch (error) {
    console.error(`Error capturing screenshot for ${env}/${label}:`, error.message);
    throw error;
  }
}

/* ---------- Image utilities (no masking) ---------- */

// Pad a PNG image to target width/height by placing the source at top-left
function padImageTo(img, targetWidth, targetHeight, fillRGBA = [255, 255, 255, 0]) {
  const out = new PNG({ width: targetWidth, height: targetHeight });

  // fill with RGBA
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const idx = (targetWidth * y + x) << 2;
      out.data[idx] = fillRGBA[0];
      out.data[idx + 1] = fillRGBA[1];
      out.data[idx + 2] = fillRGBA[2];
      out.data[idx + 3] = fillRGBA[3];
    }
  }

  // copy source
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const srcIdx = (img.width * y + x) << 2;
      const dstIdx = (targetWidth * y + x) << 2;
      out.data[dstIdx] = img.data[srcIdx];
      out.data[dstIdx + 1] = img.data[srcIdx + 1];
      out.data[dstIdx + 2] = img.data[srcIdx + 2];
      out.data[dstIdx + 3] = img.data[srcIdx + 3];
    }
  }
  return out;
}

// Pixel-by-pixel comparison (handles different sizes by padding)
export function compareScreenshots(label) {
  const img1Path = path.join(screenshotsDir, 'url1', `${label}.png`);
  const img2Path = path.join(screenshotsDir, 'url2', `${label}.png`);

  if (!fs.existsSync(img1Path)) {
    throw new Error(`Missing baseline screenshot: ${img1Path}`);
  }
  if (!fs.existsSync(img2Path)) {
    throw new Error(`Missing comparison screenshot: ${img2Path}`);
  }

  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));

  console.log(`Screenshot sizes: url1=${img1.width}x${img1.height}, url2=${img2.width}x${img2.height}`);

  const targetWidth = Math.max(img1.width, img2.width);
  const targetHeight = Math.max(img1.height, img2.height);

  let a = img1;
  let b = img2;

  if (img1.width !== targetWidth || img1.height !== targetHeight) {
    a = padImageTo(img1, targetWidth, targetHeight, [255, 255, 255, 0]);
  }
  if (img2.width !== targetWidth || img2.height !== targetHeight) {
    b = padImageTo(img2, targetWidth, targetHeight, [255, 255, 255, 0]);
  }

  const diff = new PNG({ width: targetWidth, height: targetHeight });

  const numDiffPixels = pixelmatch(a.data, b.data, diff.data, targetWidth, targetHeight, {
    threshold: 0.1,
    alpha: 0.5,
    includeAA: false
  });

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

// Compare all screenshots and log summary
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

  console.log('\n' + finalLog);
  console.log(`Diff summary written to: ${summaryPath}`);

  expect(hasDiff).toBe(false);
}
