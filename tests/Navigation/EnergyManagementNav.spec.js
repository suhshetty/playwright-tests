// tests/EnergyManagementNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Energy Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1; 

// Login and initialize Page Objects with base URL
const { homePage, energyManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   

await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main Energy Management module
await energyManagement.gotoEnergyManagement();

// Energy Zones Overview
await energyManagement.gotoEnergyZonesOverview();
await energyManagement.gotoEnergyZones();
await energyManagement.clickRegisterEnergyZones();
await energyManagement.gotoCreateZones();

// Weather Stations Overview
await energyManagement.gotoWeatherStationsOverview();
await energyManagement.gotoWeatherStations();
await energyManagement.clickRegisterWeatherStations();
await energyManagement.gotoGlobalWeatherStations();
await energyManagement.gotoWeatherStationNormalPeriod();
await energyManagement.clickRegisterWeatherStationNormalPeriods();

// Energy Providers
await energyManagement.gotoEnergyProviders();
await energyManagement.clickRegisterEnergyProviders();
await energyManagement.gotoEnergyProvidersSubType();

// Gauges Overview 
await energyManagement.gotoGaugesOverview(); 
await energyManagement.gotoEnergyZones();
await energyManagement.gotoEnergyDistributions();
await energyManagement.clickRegisterEnergyDistributions();
await energyManagement.gotoEnergyProcesses();
await energyManagement.clickRegisterEnergyProcesses();
await energyManagement.gotoGauges();
await energyManagement.clickRegisterGauges();
await energyManagement.gotoGaugesReadings();
await energyManagement.gotoEnerkeyProfiles();

// Energy Projects 
await energyManagement.gotoEnergyProjects();
await energyManagement.gotoAnnualEnergyUsages();
await energyManagement.clickRegisterAnnualEnergyUsages();
await energyManagement.gotoEnergySavingsPotential();
await energyManagement.clickRegisterEnergySavingPotentials();

// Configuration 
await energyManagement.gotoConfiguration();
await energyManagement.gotoAccessConfiguration();
});