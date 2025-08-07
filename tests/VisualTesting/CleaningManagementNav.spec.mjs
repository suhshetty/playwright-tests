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
  'gotoBuildings', 'gotoBuildingsAddClicked', 'gotoBuildingsCloseClicked', 'gotoBuildingSpaces', 'gotoBuildingSpacesAddClicked',
  'gotoBuildingSpacesCloseClicked', 'gotoCleaningZones', 'gotoCleaningZonesSubType', 
  'gotoCleaningZonesSubTypeExportClicked', 'gotoCleaningZonesSubTypeCloseClicked', 
  'gotoBuildingSpacesPlanning', 'gotoBuildingSpacesPlanningAddClicked', 'gotoBuildingSpacesPlanningCloseClicked',
  'gotoCleaningModelsPlanning', 'gotoCleaningModelsPlanningAddClicked', 'gotoCleaningModelsPlanningCloseClicked',
  'gotoPPMRegistration', 'gotoPPMRegistrationAddClicked', 'gotoPPMRegistrationCloseClicked',
  'gotoApprovedPPM', 'gotoApprovedPPMExportClicked', 'gotoApprovedPPMCloseClicked', 'gotoWorkOrders', 
  'gotoWorkOrdersAddClicked', 'gotoWorkOrdersCloseClicked', 'gotoCleaningQualityInspections', 
  'gotoInsta800Inspections', 'gotoCheckItem', 'gotoCheckItemExportClicked', 'gotoCheckItemCloseClicked',
  'gotoYearlyReports', 'gotoCalculations', 'gotoCleaningZonesPlanningZones',
  'gotoCleaningZonesPlanningZonesExportClicked', 'gotoCleaningZonesPlanningZonesCloseClicked',
  'gotoCleaningTeamsPlanningZones', 'gotoCleaningTeamsPlanningZonesAddClicked', 
  'gotoCleaningTeamsPlanningZonesCloseClicked', 'gotoInsta800QualityMatrix',
  'gotoInsta800QualityMatrixAddClicked', 'gotoInsta800QualityMatrixCloseClicked', 'gotoCleaningModelsAdmin',
  'gotoCleaningModelsAdminAddClicked', 'gotoCleaningModelsAdminCloseClicked', 'gotoCleaningFrequencyColors',
  'gotoCleaningFrequencyColorsAddClicked', 'gotoCleaningFrequencyColorsCloseClicked', 'gotoCleaningTeamsAdmin',
  'gotoCleaningTeamsAdminExportClicked', 'gotoCleaningTeamsAdminCloseClicked', 'gotoSpaceUsages',
  'gotoSpaceUsagesAddClicked', 'gotoSpaceUsagesCloseClicked', 'gotoSurfaceTypes', 'gotoSurfaceTypesAddClicked',
  'gotoSurfaceTypesCloseClicked', 'gotoCleaningTeamProfiles', 'gotoCleaningTeamProfilesExportClicked',
  'gotoCleaningTeamProfilesCloseClicked', 'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, cleaningManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoCleaningManagement', async () => {
    await cleaningManagement.gotoCleaningManagement();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningManagement');
  });

  await safeStep('gotoLocationsOverview', async () => {
    await cleaningManagement.gotoLocationsOverview();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationsOverview');
  });

  await safeStep('gotoBuildings', async () => {
    await cleaningManagement.gotoBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildings');
  });

  await safeStep('gotoBuildingsAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingsAddClicked');
  });

  await safeStep('gotoBuildingsCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingsCloseClicked');
  });

  await safeStep('gotoBuildingSpaces', async () => {
    await cleaningManagement.gotoBuildingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
  });

  await safeStep('gotoBuildingSpacesAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesAddClicked');
  });

  await safeStep('gotoBuildingSpacesCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesCloseClicked');
  });

  await safeStep('gotoCleaningZones', async () => {
    await cleaningManagement.gotoCleaningZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZones');
  });

  await safeStep('gotoCleaningZonesSubType', async () => {
    await cleaningManagement.gotoCleaningZonesSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesSubType');
  });

  await safeStep('gotoCleaningZonesSubTypeExportClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesSubTypeExportClicked');
  });

  await safeStep('gotoCleaningZonesSubTypeCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesSubTypeCloseClicked');
  });

  await safeStep('gotoCleaningPlanning', async () => {
    await cleaningManagement.gotoCleaningPlanning();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningPlanning');
  });

  await safeStep('gotoBuildingSpacesPlanning', async () => {
    await cleaningManagement.gotoBuildingSpacesPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesPlanning');
  });

  await safeStep('gotoBuildingSpacesPlanningAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesPlanningAddClicked');
  });

  await safeStep('gotoBuildingSpacesPlanningCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesPlanningCloseClicked');
  });

  await safeStep('gotoCleaningModelsPlanning', async () => {
    await cleaningManagement.gotoCleaningModelsPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsPlanning');
  });

  await safeStep('gotoCleaningModelsPlanningAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsPlanningAddClicked');
  });

  await safeStep('gotoCleaningModelsPlanningCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsPlanningCloseClicked');
  });

  await safeStep('gotoPPMRegistration', async () => {
    await cleaningManagement.gotoPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistration');
  });

  await safeStep('gotoPPMRegistrationAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistrationAddClicked');
  });

  await safeStep('gotoPPMRegistrationCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistrationCloseClicked');
  });

  await safeStep('gotoApprovedPPM', async () => {
    await cleaningManagement.gotoApprovedPPM();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoApprovedPPM');
  });

  await safeStep('gotoApprovedPPMExportClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoApprovedPPMExportClicked');
  });

  await safeStep('gotoApprovedPPMCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoApprovedPPMCloseClicked');
  });

  await safeStep('gotoWorkOrders', async () => {
    await cleaningManagement.gotoWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
  });

  await safeStep('gotoWorkOrdersAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersAddClicked');
  });

  await safeStep('gotoWorkOrdersCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersCloseClicked');
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

  await safeStep('gotoCheckItemExportClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItemExportClicked');
  });

  await safeStep('gotoCheckItemCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItemCloseClicked');
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

  await safeStep('gotoCleaningZonesPlanningZonesExportClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesPlanningZonesExportClicked');
  });

  await safeStep('gotoCleaningZonesPlanningZonesCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningZonesPlanningZonesCloseClicked');
  });

  await safeStep('gotoCleaningTeamsPlanningZones', async () => {
    await cleaningManagement.gotoCleaningTeamsPlanningZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsPlanningZones');
  });

  await safeStep('gotoCleaningTeamsPlanningZonesAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsPlanningZonesAddClicked');
  });

  await safeStep('gotoCleaningTeamsPlanningZonesCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsPlanningZonesCloseClicked');
  });

  await safeStep('gotoAdmin', async () => {
    await cleaningManagement.gotoAdmin();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoAdmin');
  });

  await safeStep('gotoInsta800QualityMatrix', async () => {
    await cleaningManagement.gotoInsta800QualityMatrix();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsta800QualityMatrix');
  });

  await safeStep('gotoInsta800QualityMatrixAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsta800QualityMatrixAddClicked');
  });

  await safeStep('gotoInsta800QualityMatrixCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsta800QualityMatrixCloseClicked');
  });

  await safeStep('gotoCleaningModelsAdmin', async () => {
    await cleaningManagement.gotoCleaningModelsAdmin();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsAdmin');
  });

  await safeStep('gotoCleaningModelsAdminAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsAdminAddClicked');
  });

  await safeStep('gotoCleaningModelsAdminCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningModelsAdminCloseClicked');
  });

  await safeStep('gotoCleaningFrequencyColors', async () => {
    await cleaningManagement.gotoCleaningFrequencyColors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningFrequencyColors');
  });

  await safeStep('gotoCleaningFrequencyColorsAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningFrequencyColorsAddClicked');
  });

  await safeStep('gotoCleaningFrequencyColorsCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningFrequencyColorsCloseClicked');
  });

  await safeStep('gotoCleaningTeamsAdmin', async () => {
    await cleaningManagement.gotoCleaningTeamsAdmin();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsAdmin');
  });

  await safeStep('gotoCleaningTeamsAdminExportClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsAdminExportClicked');
  });

  await safeStep('gotoCleaningTeamsAdminCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamsAdminCloseClicked');
  });

  await safeStep('gotoSpaceUsages', async () => {
    await cleaningManagement.gotoSpaceUsages();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSpaceUsages');
  });

  await safeStep('gotoSpaceUsagesAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSpaceUsagesAddClicked');
  });

  await safeStep('gotoSpaceUsagesCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSpaceUsagesCloseClicked');
  });

  await safeStep('gotoSurfaceTypes', async () => {
    await cleaningManagement.gotoSurfaceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSurfaceTypes');
  });

  await safeStep('gotoSurfaceTypesAddClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSurfaceTypesAddClicked');
  });

  await safeStep('gotoSurfaceTypesCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSurfaceTypesCloseClicked');
  });

  await safeStep('gotoCleaningTeamProfiles', async () => {
    await cleaningManagement.gotoCleaningTeamProfiles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamProfiles');
  });

  await safeStep('gotoCleaningTeamProfilesExportClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamProfilesExportClicked');
  });

  await safeStep('gotoCleaningTeamProfilesCloseClicked', async () => {
    await cleaningManagement.clickElement(cleaningManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTeamProfilesCloseClicked');
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