// File: BuildingArchiveNav1.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.noMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Screens to validate
const labels = [
  'gotoHomePage', 'gotoModuleMenu', 'clickBuildingArchive',
  'gotoSiteRegistration', 'gotoSites', 'clickRegisterSites',
  'gotoPortfolioManagement', 'gotoPortfolios', 'clickRegisterPortfolios',
  'gotoLocationsOverview', 'gotoRegisterLocations', 'gotoBuildings', 'clickRegisterBuildings',
  'gotoBuildingStairwells', 'clickRegisterBuildingStairwells',
  'gotoBuildingFloors', 'clickRegisterBuildingFloors',
  'gotoBuildingSpaces', 'clickRegisterBuildingSpaces',
  'gotoOpenAreas', 'clickRegisterOpenAreas',
  'gotoOpenAreaParts', 'clickRegisterOpenAreaParts',
  'gotoHousings', 'clickRegisterHousings',
  'gotoAddresses', 'clickRegisterAddresses',
  'gotoGISPolygons'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickBuildingArchive', async () => {
    await buildingArchive.clickBuildingArchive();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickBuildingArchive');
  });

  await safeStep('gotoSiteRegistration', async () => {
    await buildingArchive.gotoSiteRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteRegistration');
  });

  await safeStep('gotoSites', async () => {
    await buildingArchive.gotoSites();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSites');
    await buildingArchive.clickRegisterSites();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterSites');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoPortfolioManagement', async () => {
    await buildingArchive.gotoPortfolioManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolioManagement');
  });

  await safeStep('gotoPortfolios', async () => {
    await buildingArchive.gotoPortfolios();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolios');
    await buildingArchive.clickRegisterPortfolios();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterPortfolios');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoLocationsOverview', async () => {
    await buildingArchive.gotoLocationsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationsOverview');
  });

  await safeStep('gotoRegisterLocations', async () => {
    await buildingArchive.gotoRegisterLocations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterLocations');
  });

  await safeStep('gotoBuildings', async () => {
    await buildingArchive.gotoBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildings');
    await buildingArchive.clickRegisterBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterBuildings');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoBuildingStairwells', async () => {
    await buildingArchive.gotoBuildingStairwells();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingStairwells');
    await buildingArchive.clickRegisterBuildingStairwells();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterBuildingStairwells');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoBuildingFloors', async () => {
    await buildingArchive.gotoBuildingFloors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingFloors');
    await buildingArchive.clickRegisterBuildingFloors();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterBuildingFloors');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoBuildingSpaces', async () => {
    await buildingArchive.gotoBuildingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
    await buildingArchive.clickRegisterBuildingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterBuildingSpaces');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoOpenAreas', async () => {
    await buildingArchive.gotoOpenAreas();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpenAreas');
    await buildingArchive.clickRegisterOpenAreas();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterOpenAreas');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoOpenAreaParts', async () => {
    await buildingArchive.gotoOpenAreaParts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpenAreaParts');
    await buildingArchive.clickRegisterOpenAreaParts();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterOpenAreaParts');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoHousings', async () => {
    await buildingArchive.gotoHousings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousings');
    await buildingArchive.clickRegisterHousings();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterHousings');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoAddresses', async () => {
    await buildingArchive.gotoAddresses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAddresses');
    await buildingArchive.clickRegisterAddresses();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAddresses');
    await buildingArchive.clickClose();
  });

  await safeStep('gotoGISPolygons', async () => {
    await buildingArchive.gotoGISPolygons();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGISPolygons');
  });
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Building Archive: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});