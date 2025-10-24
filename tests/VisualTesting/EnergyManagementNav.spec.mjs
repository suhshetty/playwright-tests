// File: EnergyManagementNavigation.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

const labels = [
  'gotoEnergyZones', 'clickRegisterEnergyZones', 'gotoCreateZones',
  'gotoWeatherStations', 'clickRegisterWeatherStations', 'gotoGlobalWeatherStations', 'gotoWeatherStationNormalPeriod', 'clickRegisterWeatherStationNormalPeriods',
  'gotoEnergyProvidersSubType', 'clickRegisterEnergyProviders',
  'gotoEnergyDistributions', 'clickRegisterEnergyDistributions', 'gotoEnergyProcesses', 'clickRegisterEnergyProcesses', 'gotoGauges', 'clickRegisterGauges', 'gotoGaugesReadings', 'gotoEnerkeyProfiles',
  'gotoAnnualEnergyUsages', 'clickRegisterAnnualEnergyUsages', 'gotoEnergySavingsPotential', 'clickRegisterEnergySavingPotentials',
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, energyManagement } = await loginAndInitialize({ page, context, baseUrl });



  // Home Page
await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Main Energy Management module
await safeStep('gotoEnergyManagement', async () => {
  await energyManagement.gotoEnergyManagement();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyManagement');
});

// Energy Zones Overview
await safeStep('gotoEnergyZonesOverview', async () => {
  await energyManagement.gotoEnergyZonesOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZonesOverview');
});

await safeStep('gotoEnergyZones', async () => {
  await energyManagement.gotoEnergyZones();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZones');
});

await safeStep('clickRegisterEnergyZones', async () => {
  await energyManagement.clickRegisterEnergyZones();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyZones');
});

await safeStep('gotoCreateZones', async () => {
  await energyManagement.gotoCreateZones();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCreateZones');
});

// Weather Stations Overview
await safeStep('gotoWeatherStationsOverview', async () => {
  await energyManagement.gotoWeatherStationsOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationsOverview');
});

await safeStep('gotoWeatherStations', async () => {
  await energyManagement.gotoWeatherStations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStations');
});

await safeStep('clickRegisterWeatherStations', async () => {
  await energyManagement.clickRegisterWeatherStations();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWeatherStations');
});

await safeStep('gotoGlobalWeatherStations', async () => {
  await energyManagement.gotoGlobalWeatherStations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStations');
});

await safeStep('gotoWeatherStationNormalPeriod', async () => {
  await energyManagement.gotoWeatherStationNormalPeriod();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriod');
});

await safeStep('clickRegisterWeatherStationNormalPeriods', async () => {
  await energyManagement.clickRegisterWeatherStationNormalPeriods();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWeatherStationNormalPeriods');
});

// Energy Providers
await safeStep('gotoEnergyProviders', async () => {
  await energyManagement.gotoEnergyProviders();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProviders');
});

await safeStep('clickRegisterEnergyProviders', async () => {
  await energyManagement.clickRegisterEnergyProviders();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyProviders');
});

await safeStep('gotoEnergyProvidersSubType', async () => {
  await energyManagement.gotoEnergyProvidersSubType();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProvidersSubType');
});

// Gauges Overview
await safeStep('gotoGaugesOverview', async () => {
  await energyManagement.gotoGaugesOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoGaugesOverview');
});

await safeStep('gotoEnergyDistributions', async () => {
  await energyManagement.gotoEnergyDistributions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyDistributions');
});

await safeStep('clickRegisterEnergyDistributions', async () => {
  await energyManagement.clickRegisterEnergyDistributions();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyDistributions');
});

await safeStep('gotoEnergyProcesses', async () => {
  await energyManagement.gotoEnergyProcesses();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProcesses');
});

await safeStep('clickRegisterEnergyProcesses', async () => {
  await energyManagement.clickRegisterEnergyProcesses();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyProcesses');
});

await safeStep('gotoGauges', async () => {
  await energyManagement.gotoGauges();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGauges');
});

await safeStep('clickRegisterGauges', async () => {
  await energyManagement.clickRegisterGauges();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterGauges');
});

await safeStep('gotoGaugesReadings', async () => {
  await energyManagement.gotoGaugesReadings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGaugesReadings');
});

await safeStep('gotoEnerkeyProfiles', async () => {
  await energyManagement.gotoEnerkeyProfiles();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnerkeyProfiles');
});

// Energy Projects
await safeStep('gotoEnergyProjects', async () => {
  await energyManagement.gotoEnergyProjects();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProjects');
});

await safeStep('gotoAnnualEnergyUsages', async () => {
  await energyManagement.gotoAnnualEnergyUsages();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualEnergyUsages');
});

await safeStep('clickRegisterAnnualEnergyUsages', async () => {
  await energyManagement.clickRegisterAnnualEnergyUsages();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAnnualEnergyUsages');
});

await safeStep('gotoEnergySavingsPotential', async () => {
  await energyManagement.gotoEnergySavingsPotential();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergySavingsPotential');
});

await safeStep('clickRegisterEnergySavingPotentials', async () => {
  await energyManagement.clickRegisterEnergySavingPotentials();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergySavingPotentials');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await energyManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfiguration', async () => {
  await energyManagement.gotoAccessConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
});
}

// Main visual regression test
test('Visual Regression Test - Energy Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});