const { test, expect } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('./src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve('tests/src/.env') });

test('Sanity test: EMM-T271.spec.js', async ({ page, context }) => {
  const baseUrl = process.env.URL1; // 👈 Load URL from .env

  // Login and initialize Page Objects
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await buildingArchive.clickBuildingArchive();
  await buildingArchive.gotoLocationsOverview();
  await buildingArchive.gotoBuildings();
  await buildingArchive.registerNewBuilding("Test Site EMM-T270A", "Test Building EMM-T270A");
});
