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
await assetManagement.clickRegisterEquipment();
await assetManagement.gotoLocateEquipment();
await assetManagement.gotoPhones();
await assetManagement.clickRegisterPhones();
await assetManagement.gotoTechnicalInformation();
await assetManagement.clickRegisterTechnicalInformation();

// Vehicles Overview 
await assetManagement.gotoVehiclesOverview();
await assetManagement.gotoVehicles();
await assetManagement.clickRegisterVehicles();

// Artifacts Overview
await assetManagement.gotoArtifactsOverview();
await assetManagement.gotoArtifacts();
await assetManagement.clickRegisterArtifacts();
await assetManagement.gotoArtists();
await assetManagement.clickRegisterArtists();
await assetManagement.gotoLocateArtifacts();

// Data Setup sub-types
await assetManagement.gotoDataSetup();
await assetManagement.gotoEquipmentGroups();
await assetManagement.clickRegisterEquipmentGroups();
await assetManagement.gotoEquipmentTypes();
await assetManagement.clickRegisterEquipmentTypes();
await assetManagement.gotoProductTypes();
await assetManagement.clickRegisterProductTypes();
await assetManagement.gotoServicePartnerGlobal();
await assetManagement.clickRegisterServicePartnerGlobals();

// Configuration sub-types
await assetManagement.gotoAccessConfigurations();
await assetManagement.gotoConfiguration();
});











