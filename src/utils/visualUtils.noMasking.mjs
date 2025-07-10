// File: visualUtils.noMasking.mjs
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export const screenshotsDir = 'screenshots';

// 🧹 Cleanup before each test run
export function cleanScreenshotsFolder() {
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
    console.log('🧹 Cleared previous screenshots and diffs.');
  }
}

// 🌐 Load env and prepare screenshot folder
export function initializeVisualTestEnv() {
  cleanScreenshotsFolder();
  dotenv.config({ path: path.resolve(process.cwd(), 'tests/src/.env') });
  console.log('✅ Environment variables loaded');
  console.log('URL1:', process.env.URL1);
  console.log('URL2:', process.env.URL2);
}

// 🛡️ Safe wrapper for test steps
export async function safeStep(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    console.warn(`⚠️ Step "${stepName}" failed:`, error.message);
  }
}

// 📸 Capture screenshots after processing
export async function waitForProcessingAndTakeScreenshot(page, env, label) {
  const dir = path.join(screenshotsDir, env);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`⏳ Waiting for loader before capturing ${env} - ${label}`);

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
    console.warn(`⚠️ Loader not hidden after timeout on "${label}". Proceeding with screenshot.`);
  }

  if (page.isClosed()) {
    console.error(`❌ Page closed before capturing screenshot: ${label}`);
    return;
  }

  try {
    await page.waitForTimeout(2000);
    const filePath = path.join(dir, `${label}.png`);
    await page.screenshot({ path: filePath, fullPage: true });

    const size = fs.statSync(filePath).size;
    if (size < 10000) {
      console.warn(`⚠️ Screenshot for ${env}/${label} may be blank (size: ${size} bytes)`);
    }

    console.log(`✅ Screenshot saved: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error capturing screenshot for ${env}/${label}:`, error.message);
  }
}

// 🔍 Pixel-by-pixel comparison
export function compareScreenshots(label) {
  const img1Path = path.join(screenshotsDir, 'url1', `${label}.png`);
  const img2Path = path.join(screenshotsDir, 'url2', `${label}.png`);

  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.2,
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

// 📊 Compare all screenshots and log summary
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
      console.error(`❌ Error comparing "${label}":`, error.message);
    }
  }

  const finalLog = `Visual Comparison Summary (${new Date().toLocaleString()}):\n\n${summary.join('\n')}`;
  fs.writeFileSync(summaryPath, finalLog);

  console.log('\n' + finalLog);
  console.log(`📝 Diff summary written to: ${summaryPath}`);

  expect(hasDiff).toBe(false);
}
