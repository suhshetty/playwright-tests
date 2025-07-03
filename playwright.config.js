//Test configuration for Playwright tests
const config = {
  testDir: './tests',
  timeout: 20 * 60 * 1000,

  expect: {
    timeout: 10000,
  },

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    browserName: 'chromium',
    headless: !!process.env.CI,
    screenshot: {
      fullPage: true,
    },
    trace: 'retain-on-failure',
  },
};

module.exports = config;