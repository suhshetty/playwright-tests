// src/utils/visualUtils.mjs
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export const screenshotsDir = 'screenshots';

export async function waitForProcessingAndTakeScreenshot(page, env, label) {
  const dir = path.join(screenshotsDir, env);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`Waiting for loader before capturing ${env} - ${label}`);

  try {
    const loaderVisible = await page.locator('.processing-icon').first().isVisible();
    if (loaderVisible) {
      await page.waitForSelector('.processing-icon', {
        state: 'hidden',
        timeout: 15000
      });
    }
  } catch (error) {
    console.warn(`Warning: Loader not hidden after timeout on "${label}". Proceeding with screenshot.`);
  }

  await page.waitForTimeout(2000);

  const filePath = path.join(dir, `${label}.png`);
  await page.screenshot({ path: filePath, fullPage: true });

  const size = fs.statSync(filePath).size;
  if (size < 10000) {
    console.warn(`Warning: Screenshot for ${env}/${label} may be blank (size: ${size} bytes)`);
  }

  console.log(`Screenshot saved: ${filePath}`);
}

export function compareScreenshots(label, expect) {
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
    console.log(`Diff for "${label}": ${numDiffPixels} pixel(s) difference`);
  } else {
    console.log(`No visual difference in "${label}"`);
  }

  expect(numDiffPixels).toBe(0);
}
