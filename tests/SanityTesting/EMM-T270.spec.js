const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve('tests/src/.env') });

test('Sanity test : EMM-T270.spec.js', async ({ page, context }) => {
  try {
    const baseUrl = process.env.URL1;

    // Login and initialize Page Objects
    const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

    // Navigate to Home and perform operations
    await homePage.gotoHomePage();
    await homePage.gotoModuleMenu();
    await buildingArchive.clickBuildingArchive();
    await buildingArchive.gotoSiteRegistration();
    await buildingArchive.gotoSites();

    // Register new site
    await buildingArchive.registerNewSite("Test Site EMM-T270A");

  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    await page.screenshot({ path: 'screenshots/EMM-T270-failure.png', fullPage: true });
    throw error; 
  }
});
