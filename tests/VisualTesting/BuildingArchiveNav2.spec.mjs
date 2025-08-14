// File: BuildingArchiveNav2.spec.js
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

// Screens to validate
const labels = [
  'gotoHomePage', 'gotoModuleMenu', 'clickBuildingArchive',
  'gotoPropertyValuation', 'gotoRealProperties', 'clickRegisterRealProperties',
  'gotoPropertyValuationsBuildings', 'clickRegisterPropertyValuationBuildings',
  'gotoPropertyValuationParts', 'gotoBuildingSystems', 'gotoRegisterBuildingComponents',
  'gotoRegisterBuildingComponentsCCS', 'gotoFunctionalSystemsCCS', 'clickRegisterFunctionalSystemsCCS',
  'gotoTechnicalSystemsCCS', 'clickRegisterTechnicalSystemsCCS', 'gotoComponentsCCS', 'clickRegisterComponentsCCS',
  'gotoFunctionalSystems', 'gotoTechnicalSystems', 'gotoComponents',
  'gotoDocumentationObjects', 'clickRegisterDocumentationObjects', 'gotoProductData', 'clickRegisterProductData',
  'gotoLocationProductData', 'gotoLocationsOfObjects', 'gotoLocateSystems', 'gotoObjectLocations'
];

// Run the test for each environment
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

  await safeStep('gotoPropertyValuation', async () => {
    await buildingArchive.gotoPropertyValuation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPropertyValuation');
  });

  await safeStep('gotoRealProperties', async () => {
    await buildingArchive.gotoRealProperties();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRealProperties');
    await buildingArchive.clickRegisterRealProperties();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterRealProperties');
  });

  await safeStep('gotoPropertyValuationsBuildings', async () => {
    await buildingArchive.gotoPropertyValuationsBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPropertyValuationsBuildings');
    await buildingArchive.clickRegisterPropertyValuationBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterPropertyValuationBuildings');
  });

  await safeStep('gotoPropertyValuationParts', async () => {
    await buildingArchive.gotoPropertyValuationParts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPropertyValuationParts');
  });

  await safeStep('gotoBuildingSystems', async () => {
    await buildingArchive.gotoBuildingSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSystems');
  });

  await safeStep('gotoRegisterBuildingComponents', async () => {
    await buildingArchive.gotoRegisterBuildingComponents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterBuildingComponents');
  });

  await safeStep('gotoRegisterBuildingComponentsCCS', async () => {
    await buildingArchive.gotoRegisterBuildingComponentsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterBuildingComponentsCCS');
  });

  await safeStep('gotoFunctionalSystemsCCS', async () => {
    await buildingArchive.gotoFunctionalSystemsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystemsCCS');
    await buildingArchive.clickRegisterFunctionalSystemsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterFunctionalSystemsCCS');
  });

  await safeStep('gotoTechnicalSystemsCCS', async () => {
    await buildingArchive.gotoTechnicalSystemsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemsCCS');
    await buildingArchive.clickRegisterTechnicalSystemsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTechnicalSystemsCCS');
  });

  await safeStep('gotoComponentsCCS', async () => {
    await buildingArchive.gotoComponentsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoComponentsCCS');
    await buildingArchive.clickRegisterComponentsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterComponentsCCS');
  });

  await safeStep('gotoFunctionalSystems', async () => {
    await buildingArchive.gotoFunctionalSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystems');
  });

  await safeStep('gotoTechnicalSystems', async () => {
    await buildingArchive.gotoTechnicalSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystems');
  });

  await safeStep('gotoComponents', async () => {
    await buildingArchive.gotoComponents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoComponents');
  });

  await safeStep('gotoDocumentationObjects', async () => {
    await buildingArchive.gotoDocumentationObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentationObjects');
    await buildingArchive.clickRegisterDocumentationObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterDocumentationObjects');
  });

  await safeStep('gotoProductData', async () => {
    await buildingArchive.gotoProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductData');
    await buildingArchive.clickRegisterProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProductData');
  });

  await safeStep('gotoLocationProductData', async () => {
    await buildingArchive.gotoLocationProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationProductData');
  });

  await safeStep('gotoLocationsOfObjects', async () => {
    await buildingArchive.gotoLocationsOfObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationsOfObjects');
  });

  await safeStep('gotoLocateSystems', async () => {
    await buildingArchive.gotoLocateSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateSystems');
  });

  await safeStep('gotoObjectLocations', async () => {
    await buildingArchive.gotoObjectLocations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectLocations');
  });
};

// Main test entry point
test('Visual Regression Test - Building Archive 2: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});