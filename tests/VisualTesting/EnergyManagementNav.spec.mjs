// tests/Navigation/EnergyManagementNav.spec.js
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
  // Energy Zones Overview
  'gotoEnergyZones', 'clickRegisterEnergyZones','CloseRegisterEnergyZones', 'gotoCreateZones',

  // Weather Stations Overview
  'gotoWeatherStations', 'clickRegisterWeatherStations','clickCloseRegisterWeatherStations',
  'gotoGlobalWeatherStations','gotoGlobalWeatherStationsAddClicked','gotoGlobalWeatherStationsCloseClicked','gotoGlobalWeatherStationsExportClicked','gotoGlobalWeatherStationsExportCloseClicked',

  'gotoWeatherStationNormalPeriod','gotoWeatherStationNormalPeriodAddClicked','gotoWeatherStationNormalPeriodCloseClicked','gotoWeatherStationNormalPeriodExportClicked','gotoWeatherStationNormalPeriodExportCloseClicked',

  // Energy Providers
  'gotoEnergyProvidersSubType','clickRegisterEnergyProviders','clickCloseRegisterEnergyProviders','clickExportRegisterEnergyProviders','clickCloseExportRegisterEnergyProviders',

  // Gauges Overview
  'gotoGaugesOverview','gotoEnergyZonesGO','gotoEnergyZonesGOAddClicked','gotoEnergyZonesGOCloseClicked',
  'gotoEnergyDistributions','clickRegisterEnergyDistributions','clickCloseRegisterEnergyDistributions',
  'gotoEnergyProcesses','clickRegisterEnergyProcesses','clickCloseRegisterEnergyProcesses',
  'gotoGauges','clickRegisterGauges','clickCloseRegisterGauges','clickExportRegisterGauges','clickCloseExportRegisterGauges',
  'gotoGaugesReadings','gotoRegisterGaugesReadings','gotoCloseRegisterGaugesReadings','gotoExportGaugesReadings','gotoCloseExportGaugesReadings',
  'gotoGaugeResults','gotoExportGaugeResults','gotoCloseExportGaugeResults','gotoEnerkeyProfiles','gotoExportEnerkeyProfiles','gotoCloseExportEnerkeyProfiles',

  // Energy Projects
  'gotoAnnualEnergyUsages','clickRegisterAnnualEnergyUsages','clickCloseRegisterAnnualEnergyUsages','clickExportRegisterAnnualEnergyUsages','clickCloseExportRegisterAnnualEnergyUsages',
  'gotoEnergySavingsPotential','clickRegisterEnergySavingPotentials','clickCloseRegisterEnergySavingPotentials','clickExportRegisterEnergySavingPotentials','clickCloseExportEnergySavingPotentials',

  // Configuration
  'gotoConfiguration','gotoAccessConfiguration'
];

const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, energyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Home
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  });

  //Add a 2 seconds hard wait to ensure all elements are loaded before starting the test steps
  await page.waitForTimeout(2000);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  });

  await page.waitForTimeout(2000);

  // Open Energy Management
  await safeStep('gotoEnergyManagement', async () => {
    await energyManagement.gotoEnergyManagement();
  });

  // Energy Zones Overview
  await safeStep('gotoEnergyZonesOverview', async () => {
    await energyManagement.gotoEnergyZonesOverview();
  });

  await safeStep('gotoEnergyZones', async () => {
    await energyManagement.gotoEnergyZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZones');
  });

  // Add (use clickElement like U1/U2) and then close via clickClose()
  await safeStep('clickRegisterEnergyZones', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyZones');
  });

  await safeStep('CloseRegisterEnergyZones', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'CloseRegisterEnergyZones');
  });

  await safeStep('gotoCreateZones', async () => {
    await energyManagement.gotoCreateZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCreateZones');
  });

  // Weather Stations
  await safeStep('gotoWeatherStationsOverview', async () => {
    await energyManagement.gotoWeatherStationsOverview();
  });

  await safeStep('gotoWeatherStations', async () => {
    await energyManagement.gotoWeatherStations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStations');
  });

  await safeStep('clickRegisterWeatherStations', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWeatherStations');
  });

  await safeStep('clickCloseRegisterWeatherStations', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterWeatherStations');
  });

  // Global Weather Stations add/export/close using clickElement / clickClose
  await safeStep('gotoGlobalWeatherStations', async () => {
    await energyManagement.gotoGlobalWeatherStations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStations');
  });

  await safeStep('gotoGlobalWeatherStationsAddClicked', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStationsAddClicked');
  });

  await safeStep('gotoGlobalWeatherStationsCloseClicked', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStationsCloseClicked');
  });

  await safeStep('gotoGlobalWeatherStationsExportClicked', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStationsExportClicked');
  });

  await safeStep('gotoGlobalWeatherStationsExportCloseClicked', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalWeatherStationsExportCloseClicked');
  });

  // Weather Station Normal Period
  await safeStep('gotoWeatherStationNormalPeriod', async () => {
    await energyManagement.gotoWeatherStationNormalPeriod();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriod');
  });

  await safeStep('gotoWeatherStationNormalPeriodAddClicked', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriodAddClicked');
  });

  await safeStep('gotoWeatherStationNormalPeriodCloseClicked', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriodCloseClicked');
  });

  await safeStep('gotoWeatherStationNormalPeriodExportClicked', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriodExportClicked');
  });

  await safeStep('gotoWeatherStationNormalPeriodExportCloseClicked', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWeatherStationNormalPeriodExportCloseClicked');
  });

  // Energy Providers
  await safeStep('gotoEnergyProviders', async () => {
    await energyManagement.gotoEnergyProviders();
  });

  await safeStep('clickRegisterEnergyProviders', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyProviders');
  });

  await safeStep('clickCloseRegisterEnergyProviders', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterEnergyProviders');
  });

  await safeStep('clickExportRegisterEnergyProviders', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickExportRegisterEnergyProviders');
  });

  await safeStep('clickCloseExportRegisterEnergyProviders', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseExportRegisterEnergyProviders');
  });

  // Gauges Overview
  await safeStep('gotoGaugesOverview', async () => {
    await energyManagement.gotoGaugesOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGaugesOverview');
  });

  await safeStep('gotoEnergyZonesGO', async () => {
    await energyManagement.gotoEnergyZonesGO();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZonesGO');
  });

   await safeStep('gotoEnergyZonesGOAddClicked', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZonesGOAddClicked');
  });

    await safeStep('gotoEnergyZonesGOCloseClicked', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyZonesGOCloseClicked');
  });

  await safeStep('gotoEnergyDistributions', async () => {
    await energyManagement.gotoEnergyDistributions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyDistributions');
  });

  await safeStep('clickRegisterEnergyDistributions', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyDistributions');
  });

  await safeStep('clickCloseRegisterEnergyDistributions', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterEnergyDistributions');
  });

  await safeStep('gotoEnergyProcesses', async () => {
    await energyManagement.gotoEnergyProcesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergyProcesses');
  });

  await safeStep('clickRegisterEnergyProcesses', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergyProcesses');
  });

  await safeStep('clickCloseRegisterEnergyProcesses', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterEnergyProcesses');
  });

  await safeStep('gotoGauges', async () => {
    await energyManagement.gotoGauges();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGauges');
  });

  await safeStep('clickRegisterGauges', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterGauges');
  });

  await safeStep('clickCloseRegisterGauges', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterGauges');
  });

  await safeStep('clickExportRegisterGauges', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickExportRegisterGauges');
  });

  await safeStep('clickCloseExportRegisterGauges', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseExportRegisterGauges');
  });

  // Gauges Readings flows
  await safeStep('gotoGaugesReadings', async () => {
    await energyManagement.gotoGaugesReadings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGaugesReadings');
  });

  await safeStep('gotoRegisterGaugesReadings', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterGaugesReadings');
  });

  await safeStep('gotoCloseRegisterGaugesReadings', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCloseRegisterGaugesReadings');
  });

  await safeStep('gotoExportGaugesReadings', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExportGaugesReadings');
  });

  await safeStep('gotoCloseExportGaugesReadings', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCloseExportGaugesReadings');
  });

  // Gauge Results
  await safeStep('gotoGaugeResults', async () => {
    await energyManagement.gotoGaugeResults();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGaugeResults');
  });

  await safeStep('gotoExportGaugeResults', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExportGaugeResults');
  });

  await safeStep('gotoCloseExportGaugeResults', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCloseExportGaugeResults');
  });

    // Enerkey Profiles
  await safeStep('gotoEnerkeyProfiles', async () => {
    await energyManagement.gotoEnerkeyProfiles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnerkeyProfiles');
  });

    await safeStep('gotoExportEnerkeyProfiles', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExportEnerkeyProfiles');
  });

  await safeStep('gotoCloseExportEnerkeyProfiles', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCloseExportEnerkeyProfiles');
  });

  // Energy Projects
  await safeStep('gotoEnergyProjects', async () => {
    await energyManagement.gotoEnergyProjects();
  });

  await safeStep('gotoAnnualEnergyUsages', async () => {
    await energyManagement.gotoAnnualEnergyUsages();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualEnergyUsages');
  });

  await safeStep('clickRegisterAnnualEnergyUsages', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAnnualEnergyUsages');
  });

  await safeStep('clickCloseRegisterAnnualEnergyUsages', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterAnnualEnergyUsages');
  });

  await safeStep('clickExportRegisterAnnualEnergyUsages', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickExportRegisterAnnualEnergyUsages');
  });

  await safeStep('clickCloseExportRegisterAnnualEnergyUsages', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseExportRegisterAnnualEnergyUsages');
  });

  await safeStep('gotoEnergySavingsPotential', async () => {
    await energyManagement.gotoEnergySavingsPotential();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnergySavingsPotential');
  });

  await safeStep('clickRegisterEnergySavingPotentials', async () => {
    await energyManagement.clickElement(energyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEnergySavingPotentials');
  });

  await safeStep('clickCloseRegisterEnergySavingPotentials', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterEnergySavingPotentials');
  });

  await safeStep('clickExportRegisterEnergySavingPotentials', async () => {
    await energyManagement.clickElement(energyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickExportRegisterEnergySavingPotentials');
  });

  await safeStep('clickCloseExportEnergySavingPotentials', async () => {
    await energyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseExportEnergySavingPotentials');
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
};

test('Visual Regression Test - Energy Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
