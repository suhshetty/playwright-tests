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
await cleaningManagement.gotoBuildingSpaces();

// Cleaning Zones
await cleaningManagement.gotoCleaningZones();
await cleaningManagement.gotoCleaningZonesSubType();

// Cleaning Planning
await cleaningManagement.gotoCleaningPlanning();
await cleaningManagement.gotoBuildingSpacesPlanning();
await cleaningManagement.gotoCleaningModelsPlanning();
await cleaningManagement.gotoPPMRegistration();
await cleaningManagement.gotoApprovedPPM();
await cleaningManagement.gotoWorkOrders();
await cleaningManagement.gotoCleaningQualityInspections();
await cleaningManagement.gotoInsta800Inspections();
await cleaningManagement.gotoCheckItem();
await cleaningManagement.gotoYearlyReports();
await cleaningManagement.gotoCalculations();

// Cleaning Planning Zones
await cleaningManagement.gotoCleaningPlanningZones();
await cleaningManagement.gotoCleaningZonesPlanningZones();
await cleaningManagement.gotoCleaningTeamsPlanningZones();

// Admin
await cleaningManagement.gotoAdmin();
await cleaningManagement.gotoInsta800QualityMatrix();
await cleaningManagement.gotoCleaningModelsAdmin();
await cleaningManagement.gotoCleaningFrequencyColors();
await cleaningManagement.gotoCleaningTeamsAdmin();
await cleaningManagement.gotoSpaceUsages();
await cleaningManagement.gotoSurfaceTypes();
await cleaningManagement.gotoCleaningTeamProfiles();

// Configuration
await cleaningManagement.gotoConfiguration();
await cleaningManagement.gotoAccessConfiguration();
});