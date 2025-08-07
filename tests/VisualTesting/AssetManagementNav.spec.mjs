// File: AssetManagementNav.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'gotoAssetManagement',
  'gotoEquipmentOverview', 'gotoEquipment', 'gotoLocateEquipment', 'gotoPhones', 'gotoTechnicalInformation',
  'gotoVehiclesOverview', 'gotoVehicles',
  'gotoArtifactsOverview', 'gotoArtifacts', 'gotoArtists', 'gotoLocateArtifacts',
  'gotoDataSetup', 'gotoEquipmentGroups', 'gotoEquipmentTypes', 'gotoProductTypes', 'gotoServicePartnerGlobal',
  'gotoAccessConfigurations', 'gotoConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, assetManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoAssetManagement', async () => {
    await assetManagement.gotoAssetManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAssetManagement');
  });

  await safeStep('gotoEquipmentOverview', async () => {
    await assetManagement.gotoEquipmentOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEquipmentOverview');
  });

  await safeStep('gotoEquipment', async () => {
    await assetManagement.gotoEquipment();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEquipment');
    await assetManagement.clickRegisterEquipment();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEquipment');
  });

  await safeStep('gotoLocateEquipment', async () => {
    await assetManagement.gotoLocateEquipment();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateEquipment');
  });

  await safeStep('gotoPhones', async () => {
    await assetManagement.gotoPhones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPhones');
    await assetManagement.clickRegisterPhones();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterPhones');
  });

  await safeStep('gotoTechnicalInformation', async () => {
    await assetManagement.gotoTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformation');
    await assetManagement.clickRegisterTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTechnicalInformation');
  });

  await safeStep('gotoVehiclesOverview', async () => {
    await assetManagement.gotoVehiclesOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoVehiclesOverview');
  });

  await safeStep('gotoVehicles', async () => {
    await assetManagement.gotoVehicles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoVehicles');
    await assetManagement.clickRegisterVehicles();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterVehicles');
  });

  await safeStep('gotoArtifactsOverview', async () => {
    await assetManagement.gotoArtifactsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoArtifactsOverview');
  });

  await safeStep('gotoArtifacts', async () => {
    await assetManagement.gotoArtifacts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoArtifacts');
    await assetManagement.clickRegisterArtifacts();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterArtifacts');
  });

  await safeStep('gotoArtists', async () => {
    await assetManagement.gotoArtists();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoArtists');
    await assetManagement.clickRegisterArtists();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterArtists');
  });

  await safeStep('gotoLocateArtifacts', async () => {
    await assetManagement.gotoLocateArtifacts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateArtifacts');
  });

  await safeStep('gotoDataSetup', async () => {
    await assetManagement.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoEquipmentGroups', async () => {
    await assetManagement.gotoEquipmentGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEquipmentGroups');
    await assetManagement.clickRegisterEquipmentGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEquipmentGroups');
  });

  await safeStep('gotoEquipmentTypes', async () => {
    await assetManagement.gotoEquipmentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEquipmentTypes');
    await assetManagement.clickRegisterEquipmentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterEquipmentTypes');
  });

  await safeStep('gotoProductTypes', async () => {
    await assetManagement.gotoProductTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductTypes');
    await assetManagement.clickRegisterProductTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProductTypes');
  });

  await safeStep('gotoServicePartnerGlobal', async () => {
    await assetManagement.gotoServicePartnerGlobal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerGlobal');
    await assetManagement.clickRegisterServicePartnerGlobals();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterServicePartnerGlobals');
  });

  await safeStep('gotoAccessConfigurations', async () => {
    await assetManagement.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });

  await safeStep('gotoConfiguration', async () => {
    await assetManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });
};

// Main visual regression test
test('Visual Regression Test - Asset Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
