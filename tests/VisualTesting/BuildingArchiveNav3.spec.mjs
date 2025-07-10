// File: BuildingArchiveNav3.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'gotoInteractiveDrawingImports', 'gotoInteractiveDrawings',
  'gotoDrawings', 'gotoReleaseItems', 'gotoLocateDrawingIcons', 'gotoDocumentLayouts',
  'gotoBimProjects', 'gotoBIMModels', 'gotoBIMElements', 'gotoAttributeMapping',
  'gotoProcessingOfLocationElements', 'gotoProcessingOfSystemElements', 'gotoProductDataAgain',
  'gotoRegisterSystemStructures', 'gotoPictures', 'gotoDrawingsAgain',
  'gotoDocuments', 'gotoObjectDocuments', 'gotoStructureWithDocuments'
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
    //await waitForProcessingAndTakeScreenshot(page, env, 'clickBuildingArchive');
  });

  await safeStep('gotoInteractiveDrawingImport', async () => {
    await buildingArchive.gotoInteractiveDrawingImport();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoInteractiveDrawingImport');
  });

  await safeStep('gotoInteractiveDrawingImports', async () => {
    await buildingArchive.gotoInteractiveDrawingImports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInteractiveDrawingImports');
  });

  await safeStep('gotoInteractiveDrawings', async () => {
    await buildingArchive.gotoInteractiveDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInteractiveDrawings');
  });


  await safeStep('gotoDrawings', async () => {
    await buildingArchive.gotoDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawings');
  });

  await safeStep('gotoReleaseItems', async () => {
    await buildingArchive.gotoReleaseItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReleaseItems');
  });

  await safeStep('gotoLocateDrawingIcons', async () => {
    await buildingArchive.gotoLocateDrawingIcons();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateDrawingIcons');
  });

  await safeStep('gotoDocumentLayouts', async () => {
    await buildingArchive.gotoDocumentLayouts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentLayouts');
  });

  await safeStep('gotoBimProcessing', async () => {
    await buildingArchive.gotoBimProcessing();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoBimProcessing');
  });

  await safeStep('gotoBimProjects', async () => {
    await buildingArchive.gotoBimProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBimProjects');
  });

  await safeStep('gotoBIMModels', async () => {
    await buildingArchive.gotoBIMModels();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBIMModels');
  });

  await safeStep('gotoBIMElements', async () => {
    await buildingArchive.gotoBIMElements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBIMElements');
  });

  await safeStep('gotoAttributeMapping', async () => {
    await buildingArchive.gotoAttributeMapping();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAttributeMapping');
  });

  await safeStep('gotoProcessingOfLocationElements', async () => {
    await buildingArchive.gotoProcessingOfLocationElements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProcessingOfLocationElements');
  });

  await safeStep('gotoProcessingOfSystemElements', async () => {
    await buildingArchive.gotoProcessingOfSystemElements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProcessingOfSystemElements');
  });

  await safeStep('gotoProductData', async () => {
    await buildingArchive.gotoProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductDataAgain');
  });

  await safeStep('gotoRegisterSystemStructures', async () => {
    await buildingArchive.gotoRegisterSystemStructures();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterSystemStructures');
  });

  await safeStep('gotoOMdocuments', async () => {
    await buildingArchive.gotoOMdocuments();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoOMdocuments');
  });

  await safeStep('gotoPictures', async () => {
    await buildingArchive.gotoPictures();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPictures');
  });

  await safeStep('gotoDrawingsAgain', async () => {
    await buildingArchive.gotoDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawingsAgain');
  });

  await safeStep('gotoDocuments', async () => {
    await buildingArchive.gotoDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocuments');
  });

  await safeStep('gotoObjectDocuments', async () => {
    await buildingArchive.gotoObjectDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectDocuments');
  });

  await safeStep('gotoStructureWithDocuments', async () => {
    await buildingArchive.gotoStructureWithDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStructureWithDocuments');
  });

  
} 

// Main test entry point
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
