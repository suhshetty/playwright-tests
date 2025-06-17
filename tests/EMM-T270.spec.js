// tests/EMM-T270.spec.js
const { test } = require('@playwright/test');
const LoginPage = require('../src/Pages/LoginPage');
const HomePage = require('../src/Pages/HomePage');
const BuildingArchive = require('../src/Pages/BuildingArchive');



test.only('Playwright POM example with EMM-T270.spec.js', async ({ page, context }) => {

  // Clear cookies and cache before login
  await context.clearCookies();
  await context.clearPermissions();

  // Initialize POMs
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const buildingArchive = new BuildingArchive(page);

  // Perform login
  await loginPage.gotoLoginPage();
  await loginPage.login("suhsh", "Testing@!123");

  // Navigate to Home and perform operations
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();

  await buildingArchive.clickBuildingArchive();

  await buildingArchive.gotoSiteRegistration();

  await buildingArchive.registerNewSite("Test Site J16a-1");

});
