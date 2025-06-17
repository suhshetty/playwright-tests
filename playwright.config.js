// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { trace } = require('console');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = 
{
  testDir: './tests',
  timeout: 60 * 1000,

  expect: {
    timeout: 5000
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',

    headless: false,

    screenshot: {
      fullPage: true
    },

    trace: 'retain-on-failure',

  },
};

module.exports = config;
