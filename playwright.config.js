const config = {
  testDir: './tests', // ✅ This is the correct path
  timeout: 90 * 1000,

  expect: {
    timeout: 10000
  },

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    browserName: 'chromium',
    headless: !!process.env.CI,
    screenshot: {
      fullPage: true
    },
    trace: 'retain-on-failure',
  },
};

module.exports = config;
