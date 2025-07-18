// Debug script for Space Management clicking
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitializeWithCore } = require('./src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './src/.env') });

test('Debug Space Management Click', async ({ page, context }) => {
  const baseUrl = process.env.URL1;
  console.log('URL1:', baseUrl);

  try {
    // Login and initialize
    const { homePage, spaceManagement } = await loginAndInitializeWithCore({ page, context, baseUrl });

    // Go to home page
    console.log('Going to home page...');
    await homePage.gotoHomePage();
    await page.waitForTimeout(2000);

    // Go to module menu
    console.log('Going to module menu...');
    await homePage.gotoModuleMenu();
    await page.waitForTimeout(3000);

    // Check Space Management elements
    const spaceManagementLocator = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Space management']";
    const count = await page.locator(spaceManagementLocator).count();
    console.log('Space Management elements found:', count);

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const element = page.locator(spaceManagementLocator).nth(i);
        const isVisible = await element.isVisible();
        const isEnabled = await element.isEnabled();
        const text = await element.textContent();
        console.log(`Element ${i}: visible=${isVisible}, enabled=${isEnabled}, text="${text}"`);
      }

      // Try clicking
      console.log('Attempting to click Space Management...');
      await spaceManagement.clickSpaceManagement();
      console.log('Click successful!');
      
      // Wait and see if we navigated somewhere
      await page.waitForTimeout(5000);
      console.log('Current URL after click:', page.url());
      
      // Take a screenshot
      await page.screenshot({ path: 'debug-after-click.png', fullPage: true });
      console.log('Screenshot saved: debug-after-click.png');
    } else {
      console.log('No Space Management elements found!');
      await page.screenshot({ path: 'debug-no-elements.png', fullPage: true });
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
    await page.screenshot({ path: 'debug-test-failed.png', fullPage: true });
    throw error;
  }
});
