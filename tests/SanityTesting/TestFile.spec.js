// tests/SanityTesting/TestFile.spec.js

const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve('tests/src/.env') });

test('Test File', async ({ page, context }) => {
  try {
    const baseUrl = process.env.URL1;

    // Login and initialize Page Objects
    const { homePage, spaceManagement } = await loginAndInitialize({ page, context, baseUrl });

    // Navigate to Home and perform operations
    await homePage.gotoHomePage();
    console.log('✅ Home page loaded');

    await homePage.gotoModuleMenu();
    console.log('✅ Module menu opened');

    await spaceManagement.clickSpaceManagement();
    console.log('✅ Clicked on Space Management');

    await spaceManagement.gotoBuildingSpaceOverview();
    console.log('✅ Navigated to Building Space Overview');

    await spaceManagement.gotoBuildingSpaces();
    console.log('✅ Navigated to Building Spaces');

    // Use locator from selector string
    const regionDropdownLocator = page.locator(spaceManagement.RegionDropdown);

    // Wait for dropdown and interact
    await regionDropdownLocator.waitFor({ state: 'visible', timeout: 5000 });
    await regionDropdownLocator.click();

    // Fill site name
    await page.locator(spaceManagement.TypeSitename_Field).fill('Area 51');

    // Wait for dropdown suggestions
    await page.locator(spaceManagement.waitingForSiteOptions).first().waitFor({ state: 'visible', timeout: 5000 });

    // Select option
    await spaceManagement.selectDropdownOptionByText(regionDropdownLocator, 'Area 51');

    console.log('✅ Area 51 selected');
    console.log('✅ Test completed successfully');

  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    await page.screenshot({ path: 'screenshots/EMM-T270-failure.png', fullPage: true });
    throw error;
  }
});
