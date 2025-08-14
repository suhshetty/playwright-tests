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
  'gotoHomePage', 'gotoModuleMenu', 'clickBuildingArchive', 'gotoTechnicalData',
  'gotoQRBarCodes', 'clickRegisterQRBarCodes', 'gotoObjectInformation', 'clickRegisterObjectInformation',
  'gotoTechnicalInformation', 'clickRegisterTechnicalInformation', 'gotoObjectColors', 
  'gotoObjectExternalReferences', 'clickRegisterObjectExternalReferences',
  'gotoMaterials', 'clickRegisterMaterials', 'gotoClassificationSystems', 'gotoMaster', 
  'gotoStructureTemplateManagement', 'gotoStructureTemplates', 'clickRegisterStructureTemplates',
  'gotoObjectTypeThemes', 'gotoCCSStandard', 'gotoSfbStandard', 'clickRegisterSfBStandards', 
  'gotoObjectTypes', 'gotoObjectSubTypes', 'gotoConfiguration'
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

  await safeStep('gotoTechnicalData', async () => {
    await buildingArchive.gotoTechnicalData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalData');
  });

  await safeStep('gotoQRBarCodes', async () => {
    await buildingArchive.gotoQRBarCodes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQRBarCodes');
    await buildingArchive.clickRegisterQRBarCodes();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterQRBarCodes');
  });

  await safeStep('gotoObjectInformation', async () => {
    await buildingArchive.gotoObjectInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectInformation');
    await buildingArchive.clickRegisterObjectInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterObjectInformation');
  });

  await safeStep('gotoTechnicalInformation', async () => {
    await buildingArchive.gotoTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformation');
    await buildingArchive.clickRegisterTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTechnicalInformation');
  });

  await safeStep('gotoObjectColors', async () => {
    await buildingArchive.gotoObjectColors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectColors');
  });

  await safeStep('gotoObjectExternalReferences', async () => {
    await buildingArchive.gotoObjectExternalReferences();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectExternalReferences');
    await buildingArchive.clickRegisterObjectExternalReferences();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterObjectExternalReferences');
  });

  await safeStep('gotoMaterials', async () => {
    await buildingArchive.gotoMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterials');
    await buildingArchive.clickRegisterMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterMaterials');
  });

  await safeStep('gotoClassificationSystems', async () => {
    await buildingArchive.gotoClassificationSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoClassificationSystems');
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
    await buildingArchive.clickRegisterStructureTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterStructureTemplates');
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
    await buildingArchive.clickRegisterSfBStandards();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterSfBStandards');
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
};

// Main test entry point
test('Visual Regression Test - Building Archive 4: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});