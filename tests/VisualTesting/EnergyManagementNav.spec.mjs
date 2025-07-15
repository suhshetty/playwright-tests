// File: CleaningManagementNavigation.spec.js
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
  'gotoEnergyZones', 'gotoCreateZones',
  'gotoWeatherStations', 'gotoGlobalWeatherStations', 'gotoWeatherStationNormalPeriod',
  'gotoEnergyProvidersSubType',
  'gotoEnergyZones', 'gotoEnergyDistributions', 'gotoEnergyProcesses', 'gotoGauges', 'gotoGaugesReadings', 'gotoEnerkeyProfiles',
  'gotoAnnualEnergyUsages', 'gotoEnergySavingsPotential',
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

await safeStep('gotoGlobalWeatherStations', async () => {
  await energyManagement.gotoGlobalWeatherStations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStations');
});

await safeStep('gotoWeatherStationNormalPeriod', async () => {
  await energyManagement.gotoWeatherStationNormalPeriod();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriod');
});

// Energy Providers
await safeStep('gotoEnergyProviders', async () => {
  await energyManagement.gotoEnergyProviders();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProviders');
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

await safeStep('gotoEnergyZones', async () => {
  await energyManagement.gotoEnergyZones();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZones');
});

await safeStep('gotoEnergyDistributions', async () => {
  await energyManagement.gotoEnergyDistributions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyDistributions');
});

await safeStep('gotoEnergyProcesses', async () => {
  await energyManagement.gotoEnergyProcesses();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProcesses');
});

await safeStep('gotoGauges', async () => {
  await energyManagement.gotoGauges();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGauges');
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

await safeStep('gotoEnergySavingsPotential', async () => {
  await energyManagement.gotoEnergySavingsPotential();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergySavingsPotential');
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
test('Visual Regression Test - Energy  Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
