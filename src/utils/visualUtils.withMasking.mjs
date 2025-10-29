// File: visualUtils.withMasking.mjs
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

// Directory for screenshots
export const screenshotsDir = 'screenshots';
let ignoreRegion = null; // Region to ignore in diff (set during screenshot capture)

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

  // Ensure base dirs exist
  const url1Dir = path.join(screenshotsDir, 'url1');
  const url2Dir = path.join(screenshotsDir, 'url2');
  if (!fs.existsSync(url1Dir)) fs.mkdirSync(url1Dir, { recursive: true });
  if (!fs.existsSync(url2Dir)) fs.mkdirSync(url2Dir, { recursive: true });
}

// Wrap a step with safe error handling
export async function safeStep(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    console.warn(`Step "${stepName}" failed:`, error.message);
  }
}

// Wait for loader to disappear and take screenshot (sets ignoreRegion from header)
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
        timeout: 18000
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
    // Wait for stable header (used to compute ignoreRegion)
    const header = page.locator('#m_header');
    await header.waitFor({ state: 'visible', timeout: 10000 });

    // compute bounding box for header and set ignoreRegion (if box available)
    const box = await header.boundingBox();
    if (box) {
      ignoreRegion = {
        x: Math.max(0, Math.floor(box.x)),
        y: Math.max(0, Math.floor(box.y)),
        width: Math.ceil(box.width),
        height: Math.ceil(box.height + 10) // small padding
      };
      console.log('Ignoring region during comparison:', ignoreRegion);
    } else {
      ignoreRegion = null;
    }

    // short wait to ensure final painting/rendering
    await page.waitForTimeout(2000);

    const filePath = path.join(dir, `${label}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Screenshot saved: ${filePath}`);
  } catch (error) {
    console.error(`Error capturing screenshot for ${env}/${label}:`, error.message);
  }
}

/* ---------- Image utilities ---------- */

// Pad a PNG image to target width/height by placing the source at top-left
function padImageTo(img, targetWidth, targetHeight, fillRGBA = [255, 255, 255, 0]) {
  const out = new PNG({ width: targetWidth, height: targetHeight });

  // fill with given RGBA
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const idx = (targetWidth * y + x) << 2;
      out.data[idx] = fillRGBA[0];
      out.data[idx + 1] = fillRGBA[1];
      out.data[idx + 2] = fillRGBA[2];
      out.data[idx + 3] = fillRGBA[3];
    }
  }

  // copy source image into top-left
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

// Compare screenshots with masking (handles different sizes by padding)
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

  // Determine target size (max of both)
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

  // Apply ignoreRegion mask (make alpha 0 for both a & b in that region)
  if (ignoreRegion && typeof ignoreRegion === 'object') {
    const { x = 0, y = 0, width = 0, height = 0 } = ignoreRegion;
    const maxX = Math.min(targetWidth, x + width);
    const maxY = Math.min(targetHeight, y + height);
    console.log('Applying ignoreRegion mask:', ignoreRegion);

    for (let yy = Math.max(0, y); yy < maxY; yy++) {
      for (let xx = Math.max(0, x); xx < maxX; xx++) {
        const idx = (targetWidth * yy + xx) << 2;
        a.data[idx + 3] = 0;
        b.data[idx + 3] = 0;
      }
    }
  }

  const diff = new PNG({ width: targetWidth, height: targetHeight });
  const debugOverlay = new PNG({ width: targetWidth, height: targetHeight });

  // Build debug overlay from image 'a' and highlight ignored region in translucent red
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const i = (targetWidth * y + x) << 2;
      debugOverlay.data[i] = a.data[i];
      debugOverlay.data[i + 1] = a.data[i + 1];
      debugOverlay.data[i + 2] = a.data[i + 2];
      debugOverlay.data[i + 3] = a.data[i + 3];
    }
  }

  if (ignoreRegion) {
    const ih = Math.min(ignoreRegion.height, targetHeight - ignoreRegion.y);
    const iw = Math.min(ignoreRegion.width, targetWidth - ignoreRegion.x);
    for (let yy = 0; yy < ih; yy++) {
      for (let xx = 0; xx < iw; xx++) {
        const px = ignoreRegion.x + xx;
        const py = ignoreRegion.y + yy;
        if (px < 0 || px >= targetWidth || py < 0 || py >= targetHeight) continue;
        const idx = (targetWidth * py + px) << 2;
        debugOverlay.data[idx] = 255;     // red
        debugOverlay.data[idx + 1] = 0;
        debugOverlay.data[idx + 2] = 0;
        debugOverlay.data[idx + 3] = 100; // semi-transparent
      }
    }
  }

  const numDiffPixels = pixelmatch(a.data, b.data, diff.data, targetWidth, targetHeight, {
    threshold: 0.1,
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
