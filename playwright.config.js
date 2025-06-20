// @ts-check
// Triggering git change
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 90 * 1000,

  expect: {
    timeout: 10000
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',

    // Run headless in CI (like GitHub Actions), headed locally
    headless: !!process.env.CI,

    screenshot: {
      fullPage: true
    },

    trace: 'retain-on-failure',
  },
};

module.exports = config;

// Testing 