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
      fullPage: false,  // Use viewport only to avoid crashes with extremely tall pages
      timeout: 60000,  // Maximum timeout for screenshots
    },
    trace: 'retain-on-failure',
    
    // Performance optimizations for slow pages
    launchOptions: {
      args: [
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-font-subpixel-positioning',
        '--font-render-hinting=none',
        '--disable-gpu-sandbox'
      ]
    },
    
    // Page settings for better performance
    contextOptions: {
      reducedMotion: 'reduce',  // Disable animations
    }
  },
};

module.exports = config;