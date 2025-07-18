// Debug script for Space Management clicking
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitializeWithCore } = require('./tests/src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './tests/src/.env') });

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
      
      // Try to navigate to Building Spaces
      console.log('Attempting to go to Building Spaces...');
      await spaceManagement.gotoBuildingSpaceOverview();
      await page.waitForTimeout(2000);
      
      await spaceManagement.gotoBuildingSpaces();
      console.log('Navigated to Building Spaces');
      
      // Test screenshot functionality
      console.log('Testing screenshot functionality...');
      try {
        // Wait for page to stabilize
        await page.waitForTimeout(3000);
        
        // Optimize fonts for faster loading
        try {
          await page.addStyleTag({
            content: `
              * { 
                font-display: swap !important; 
              }
              @font-face {
                font-display: swap !important;
              }
            `
          });
          
          // Disable font loading delays
          await page.evaluate(() => {
            if (document.fonts && document.fonts.ready) {
              document.fonts.ready.then = () => Promise.resolve();
            }
            document.documentElement.style.setProperty('font-display', 'swap', 'important');
          });
          
          console.log('Font optimizations applied');
        } catch (fontError) {
          console.warn('Font optimization failed:', fontError.message);
        }
        
        // Try network idle wait with maximum timeout
        try {
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          console.log('Network is idle');
        } catch (networkError) {
          console.warn('Network not idle after 10s:', networkError.message);
        }
        
        // Try simple screenshot first with maximum timeout (viewport only)
        await page.screenshot({ 
          path: 'debug-simple-screenshot.png', 
          timeout: 60000,  // Maximum timeout
          animations: 'disabled',
          caret: 'hide',
          fullPage: false  // Viewport only to avoid massive page crashes
        });
        console.log('Simple screenshot saved: debug-simple-screenshot.png');
        
        // Don't try fullPage due to extremely tall page (353,913 pixels!)
        console.log('Skipping fullPage screenshot due to extremely tall page height');
        
      } catch (screenshotError) {
        console.error('Screenshot failed:', screenshotError.message);
        
        // Try absolute minimal screenshot
        try {
          await page.screenshot({ path: 'debug-minimal.png', timeout: 3000 });
          console.log('Minimal screenshot saved: debug-minimal.png');
        } catch (minimalError) {
          console.error('Even minimal screenshot failed:', minimalError.message);
        }
      }
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
