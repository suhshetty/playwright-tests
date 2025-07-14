// tests/AssetManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Asset Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1; 

// Login and initialize Page Objects with base URL
const { homePage, assetManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Module Navigation
await assetManagement.gotoAssetManagement();

// Equipment Overview 
await assetManagement.gotoEquipmentOverview();
await assetManagement.gotoEquipment();
await assetManagement.gotoLocateEquipment();
await assetManagement.gotoPhones();
await assetManagement.gotoTechnicalInformation();

// Vehicles Overview 
await assetManagement.gotoVehiclesOverview();
await assetManagement.gotoVehicles();

// Artifacts Overview
await assetManagement.gotoArtifactsOverview();
await assetManagement.gotoArtifacts();
await assetManagement.gotoArtists();
await assetManagement.gotoLocateArtifacts();

// Data Setup sub-types
await assetManagement.gotoDataSetup();
await assetManagement.gotoEquipmentGroups();
await assetManagement.gotoEquipmentTypes();
await assetManagement.gotoProductTypes();
await assetManagement.gotoServicePartnerGlobal();

// Configuration sub-types
await assetManagement.gotoAccessConfigurations();
await assetManagement.gotoConfiguration();
});











