// tests/EnergyManagementNav.spec.js
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
const { homePage, energyManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main Energy Management module
await energyManagement.gotoEnergyManagement();

// Energy Zones Overview
await energyManagement.gotoEnergyZonesOverview();
await energyManagement.gotoEnergyZones();
await energyManagement.gotoCreateZones();

// Weather Stations Overview
await energyManagement.gotoWeatherStationsOverview();
await energyManagement.gotoWeatherStations();
await energyManagement.gotoGlobalWeatherStations();
await energyManagement.gotoWeatherStationNormalPeriod();

// Energy Providers
await energyManagement.gotoEnergyProviders();
await energyManagement.gotoEnergyProvidersSubType();

// Gauges Overview 
await energyManagement.gotoGaugesOverview(); 
await energyManagement.gotoEnergyZones();
await energyManagement.gotoEnergyDistributions();
await energyManagement.gotoEnergyProcesses();
await energyManagement.gotoGauges();
await energyManagement.gotoGaugesReadings();
await energyManagement.gotoEnerkeyProfiles();

// Energy Projects 
await energyManagement.gotoEnergyProjects();
await energyManagement.gotoAnnualEnergyUsages();
await energyManagement.gotoEnergySavingsPotential();

// Configuration 
await energyManagement.gotoConfiguration();
await energyManagement.gotoAccessConfiguration();
});
