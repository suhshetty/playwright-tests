// tests/CleaningManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });
test('Test Navigation Access Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;
  // Login and initialize Page Objects with base URL
  const { homePage, cleaningManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Home Page  
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main Cleaning Management module
await cleaningManagement.gotoCleaningManagement();

// Locations Overview
await cleaningManagement.gotoLocationsOverview();

await cleaningManagement.gotoBuildings();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoBuildingSpaces();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

// Cleaning Zones
await cleaningManagement.gotoCleaningZones();

await cleaningManagement.gotoCleaningZonesSubType();
await cleaningManagement.clickElement(cleaningManagement.Export);
await cleaningManagement.clickElement(cleaningManagement.Close);

// Cleaning Planning
await cleaningManagement.gotoCleaningPlanning();

await cleaningManagement.gotoBuildingSpacesPlanning();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoCleaningModelsPlanning();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoPPMRegistration();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoApprovedPPM();
await cleaningManagement.clickElement(cleaningManagement.Export);
await cleaningManagement.clickElement(cleaningManagement.Close);


await cleaningManagement.gotoWorkOrders();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);


await cleaningManagement.gotoCleaningQualityInspections();
await cleaningManagement.gotoInsta800Inspections();

await cleaningManagement.gotoCheckItem();
await cleaningManagement.clickElement(cleaningManagement.Export);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoYearlyReports();
await cleaningManagement.gotoCalculations();

// Cleaning Planning Zones
await cleaningManagement.gotoCleaningPlanningZones();

await cleaningManagement.gotoCleaningZonesPlanningZones();
await cleaningManagement.clickElement(cleaningManagement.Export);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoCleaningTeamsPlanningZones();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

// Admin
await cleaningManagement.gotoAdmin();

await cleaningManagement.gotoInsta800QualityMatrix();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoCleaningModelsAdmin();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoCleaningFrequencyColors();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoCleaningTeamsAdmin();
await cleaningManagement.clickElement(cleaningManagement.Export);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoSpaceUsages();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoSurfaceTypes();
await cleaningManagement.clickElement(cleaningManagement.Add);
await cleaningManagement.clickElement(cleaningManagement.Close);

await cleaningManagement.gotoCleaningTeamProfiles();
await cleaningManagement.clickElement(cleaningManagement.Export);
await cleaningManagement.clickElement(cleaningManagement.Close);

// Configuration
await cleaningManagement.gotoConfiguration();
await cleaningManagement.gotoAccessConfiguration();
});