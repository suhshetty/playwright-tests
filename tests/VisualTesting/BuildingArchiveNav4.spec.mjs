// File: BuildingArchiveNav4.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'gotoQRBarCodes', 'gotoObjectInformation',
  'gotoTechnicalInformation', 'gotoObjectColors', 'gotoObjectExternalReferences',
  'gotoMaterials', 'gotoMaster', 'gotoStructureTemplateManagement', 'gotoStructureTemplates',
  'gotoObjectTypeThemes', 'gotoCCSStandard', 'gotoSfbStandard', 'gotoObjectTypes',
  'gotoObjectSubTypes', 'gotoConfiguration'
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

  await safeStep('gotoTechnicalData', async () => {
    await buildingArchive.gotoTechnicalData();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalData');
  });

  await safeStep('gotoQRBarCodes', async () => {
    await buildingArchive.gotoQRBarCodes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQRBarCodes');
  });

  await safeStep('gotoObjectInformation', async () => {
    await buildingArchive.gotoObjectInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectInformation');
  });

  await safeStep('gotoTechnicalInformation', async () => {
    await buildingArchive.gotoTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformation');
  });

  await safeStep('gotoObjectColors', async () => {
    await buildingArchive.gotoObjectColors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectColors');
  });

  await safeStep('gotoObjectExternalReferences', async () => {
    await buildingArchive.gotoObjectExternalReferences();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectExternalReferences');
  });

  await safeStep('gotoMaterials', async () => {
    await buildingArchive.gotoMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterials');
  });

  await safeStep('gotoClassificationSystems', async () => {
    await buildingArchive.gotoClassificationSystems();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoClassificationSystems');
  });

  await safeStep('gotoMaster', async () => {
    await buildingArchive.gotoMaster();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaster');
  });

  await safeStep('gotoStructureTemplateManagement', async () => {
    await buildingArchive.gotoStructureTemplateManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStructureTemplateManagement');
  });

  await safeStep('gotoStructureTemplates', async () => {
    await buildingArchive.gotoStructureTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStructureTemplates');
  });

  await safeStep('gotoObjectTypeThemes', async () => {
    await buildingArchive.gotoObjectTypeThemes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectTypeThemes');
  });

  await safeStep('gotoCCSStandard', async () => {
    await buildingArchive.gotoCCSStandard();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSStandard');
  });

  await safeStep('gotoSfbStandard', async () => {
    await buildingArchive.gotoSfbStandard();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSfbStandard');
  });

  await safeStep('gotoObjectTypes', async () => {
    await buildingArchive.gotoObjectTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectTypes');
  });

  await safeStep('gotoObjectSubTypes', async () => {
    await buildingArchive.gotoObjectSubTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectSubTypes');
  });

  await safeStep('gotoConfiguration', async () => {
    await buildingArchive.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
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
