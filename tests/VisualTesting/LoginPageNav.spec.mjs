// File: LoginPageNav.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

// Initialize environment and clear old screenshots
initializeVisualTestEnv();

// Define screenshot labels
const labels = ['gotoLoginPage'];

// Test runner
const runTestOnUrl = async (env, baseUrl, page, context) => {
  // Clear context and cookies
  await context.clearCookies();
  await context.clearPermissions();

  // Navigate to login page and take screenshot
await safeStep('gotoLoginPage', async () => {
  await page.goto(baseUrl);
  // Instead of waiting for a loader like '#m_header', wait for login form visibility
  await page.waitForSelector('input[type="password"]'); // or any unique login element
  await page.screenshot({ path: `screenshots/${env}/gotoLoginPage.png`, fullPage: true });
});

};

// Main test
test('Visual Regression Test - Login Page: Compare URL1 and URL2', async ({ page, context }) => {
  // Visit URL1 and take screenshot
  await runTestOnUrl('url1', process.env.URL1, page, context);

  // Reset for URL2
  await page.close();
  const newPage = await context.newPage();

  // Visit URL2 and take screenshot
  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  // Compare screenshots
  compareAllScreenshots(labels, expect);
});
