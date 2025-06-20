const { test } = require('@playwright/test');
const { loginAndInitialize } = require('./src/testSetup');


test('Sanity test : EMM-T270.spec.js', async ({ page, context }) => {
  // Login and initialize Page Objects
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context });

  // Navigate to Home and perform operations
  await homePage.gotoHomePage();

  await homePage.gotoModuleMenu();

  await buildingArchive.clickBuildingArchive();
  
  await buildingArchive.gotoSiteRegistration();
  
  await buildingArchive.gotoSites();

  await buildingArchive.registerNewSite("Test Site EMM-T270A");
});


