const { test, expect } = require('@playwright/test');
const { loginAndInitialize } = require('./src/testSetup');

test('Sanity test: EMM-T271.spec.js', async ({ page, context }) => {
 // Login and initialize Page Objects
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context });

  await homePage.gotoHomePage();

  await homePage.gotoModuleMenu();

  await buildingArchive.clickBuildingArchive();

  await buildingArchive.gotoLocationsOverview();

  await buildingArchive.gotoBuildings();

  await buildingArchive.registerNewBuilding("Test Site EMM-T270A", "Test Building EMM-T270A");



});