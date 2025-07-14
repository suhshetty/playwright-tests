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

// Labels for visual comparison
const labels = [
  'gotoHomePage', 'gotoModuleMenu', 'gotoCleaningManagement','gotoBuildings', 'gotoBuildingSpaces',
  'gotoCleaningZonesSubType','gotoBuildingSpacesPlanning', 'gotoCleaningModelsPlanning',
  'gotoPPMRegistration', 'gotoApprovedPPM', 'gotoWorkOrders','gotoCleaningQualityInspections', 'gotoInsta800Inspections', 'gotoCheckItem',
  'gotoYearlyReports', 'gotoCalculations', 'gotoCleaningZonesPlanningZones', 'gotoCleaningTeamsPlanningZones',
  'gotoInsta800QualityMatrix', 'gotoCleaningModelsAdmin', 'gotoCleaningFrequencyColors',
  'gotoCleaningTeamsAdmin', 'gotoSpaceUsages', 'gotoSurfaceTypes', 'gotoCleaningTeamProfiles',
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, cleaningManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoCleaningManagement', async () => {
    await cleaningManagement.gotoCleaningManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningManagement');
  });

  await safeStep('gotoLocationsOverview', async () => {
    await cleaningManagement.gotoLocationsOverview();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationsOverview');
  });

  await safeStep('gotoBuildings', async () => {
    await cleaningManagement.gotoBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildings');
  });

  await safeStep('gotoBuildingSpaces', async () => {
    await cleaningManagement.gotoBuildingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
  });

  await safeStep('gotoCleaningZones', async () => {
    await cleaningManagement.gotoCleaningZones();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZones');
  });

  await safeStep('gotoCleaningZonesSubType', async () => {
    await cleaningManagement.gotoCleaningZonesSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesSubType');
  });

  await safeStep('gotoCleaningPlanning', async () => {
    await cleaningManagement.gotoCleaningPlanning();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningPlanning');
  });

  await safeStep('gotoBuildingSpacesPlanning', async () => {
    await cleaningManagement.gotoBuildingSpacesPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesPlanning');
  });

  await safeStep('gotoCleaningModelsPlanning', async () => {
    await cleaningManagement.gotoCleaningModelsPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsPlanning');
  });

  await safeStep('gotoPPMRegistration', async () => {
    await cleaningManagement.gotoPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistration');
  });

  await safeStep('gotoApprovedPPM', async () => {
    await cleaningManagement.gotoApprovedPPM();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoApprovedPPM');
  });

  await safeStep('gotoWorkOrders', async () => {
    await cleaningManagement.gotoWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
  });

  await safeStep('gotoCleaningQualityInspections', async () => {
    await cleaningManagement.gotoCleaningQualityInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningQualityInspections');
  });

  await safeStep('gotoInsta800Inspections', async () => {
    await cleaningManagement.gotoInsta800Inspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsta800Inspections');
  });

  await safeStep('gotoCheckItem', async () => {
    await cleaningManagement.gotoCheckItem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItem');
  });

  await safeStep('gotoYearlyReports', async () => {
    await cleaningManagement.gotoYearlyReports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoYearlyReports');
  });

  await safeStep('gotoCalculations', async () => {
    await cleaningManagement.gotoCalculations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCalculations');
  });

  await safeStep('gotoCleaningPlanningZones', async () => {
    await cleaningManagement.gotoCleaningPlanningZones();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningPlanningZones');
  });

  await safeStep('gotoCleaningZonesPlanningZones', async () => {
    await cleaningManagement.gotoCleaningZonesPlanningZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesPlanningZones');
  });

  await safeStep('gotoCleaningTeamsPlanningZones', async () => {
    await cleaningManagement.gotoCleaningTeamsPlanningZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsPlanningZones');
  });

  await safeStep('gotoAdmin', async () => {
    await cleaningManagement.gotoAdmin();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoAdmin');
  });

  await safeStep('gotoInsta800QualityMatrix', async () => {
    await cleaningManagement.gotoInsta800QualityMatrix();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsta800QualityMatrix');
  });

  await safeStep('gotoCleaningModelsAdmin', async () => {
    await cleaningManagement.gotoCleaningModelsAdmin();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsAdmin');
  });

  await safeStep('gotoCleaningFrequencyColors', async () => {
    await cleaningManagement.gotoCleaningFrequencyColors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningFrequencyColors');
  });

  await safeStep('gotoCleaningTeamsAdmin', async () => {
    await cleaningManagement.gotoCleaningTeamsAdmin();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsAdmin');
  });

  await safeStep('gotoSpaceUsages', async () => {
    await cleaningManagement.gotoSpaceUsages();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSpaceUsages');
  });

  await safeStep('gotoSurfaceTypes', async () => {
    await cleaningManagement.gotoSurfaceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSurfaceTypes');
  });

  await safeStep('gotoCleaningTeamProfiles', async () => {
    await cleaningManagement.gotoCleaningTeamProfiles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamProfiles');
  });

  await safeStep('gotoConfiguration', async () => {
    await cleaningManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await cleaningManagement.gotoAccessConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
  });
};

// Main visual regression test
test('Visual Regression Test - Cleaning Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
