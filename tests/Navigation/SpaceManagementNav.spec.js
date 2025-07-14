// tests/SpaceManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Space Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, spaceManagement } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await spaceManagement.clickSpaceManagement();

  // === Building Space Overview ===
await spaceManagement.gotoBuildingSpaceOverview();
await spaceManagement.gotoBuildingSpaces();
await spaceManagement.gotoBuildingSpaceInformation();
await spaceManagement.gotoDrawing();

// === Locate Organisation ===
await spaceManagement.gotoLocateOrganisation();
await spaceManagement.gotoLocateOrganisationSubType();
await spaceManagement.gotoObjectOwner();
await spaceManagement.gotoSpaceManagementScenario();

// === Locate Equipment ===
await spaceManagement.gotoLocateEquipment();
await spaceManagement.gotoLocateEquipmentSubType();

// === Key Management ===
await spaceManagement.gotoKeyManagement();
await spaceManagement.gotoKeyToLock();

// === Configuration ===
await spaceManagement.gotoConfiguration();
await spaceManagement.gotoAccessConfiguration();

// === TestPT ===
await spaceManagement.gotoTestÞT();
await spaceManagement.gotoWorkOrderHours();
});