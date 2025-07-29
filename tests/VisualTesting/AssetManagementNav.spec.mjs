// File: AssetManagementNav.spec.mjs
import { test, expect } from '@playwright/test';
import { loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { safeScreenshot } from '../../src/utils/CommonFunctions.mjs';

// URL-based login selection
const loginAndInitialize = async ({ page, context, baseUrl }) => {
  if (baseUrl === process.env.URL1) {
    return await loginAndInitializeWithStandard({ page, context, baseUrl });
  } else {
    return await loginAndInitializeWithCore({ page, context, baseUrl });
  }
};

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Navigation steps for Asset Management
const navigationSteps = [
  // Home and Module Access
  { name: 'gotoHomePage', screenshot: false },
  { name: 'gotoModuleMenu', screenshot: false },
  { name: 'gotoAssetManagement', screenshot: true },

  // Equipment Overview
  { name: 'gotoEquipmentOverview', screenshot: false },
  { name: 'gotoEquipment', screenshot: true },
  { name: 'gotoLocateEquipment', screenshot: true },
  { name: 'gotoPhones', screenshot: true },
  { name: 'gotoTechnicalInformation', screenshot: true },

  // Navigate back to main Asset Management
  { name: 'gotoAssetManagement', screenshot: false },

  // Vehicles Overview
  { name: 'gotoVehiclesOverview', screenshot: false },
  { name: 'gotoVehicles', screenshot: true },

  // Navigate back to main Asset Management
  { name: 'gotoAssetManagement', screenshot: false },

  // Artifacts Overview
  { name: 'gotoArtifactsOverview', screenshot: false },
  { name: 'gotoArtifacts', screenshot: true },
  { name: 'gotoArtists', screenshot: true },
  { name: 'gotoLocateArtifacts', screenshot: true },

  // Navigate back to main Asset Management
  { name: 'gotoAssetManagement', screenshot: false },

  // Data Setup
  { name: 'gotoDataSetup', screenshot: false },
  { name: 'gotoEquipmentGroups', screenshot: true },
  { name: 'gotoEquipmentTypes', screenshot: true },
  { name: 'gotoProductTypes', screenshot: true },
  { name: 'gotoServicePartnerGlobal', screenshot: true },

  // Navigate back to main Asset Management
  { name: 'gotoAssetManagement', screenshot: false },

  // Configuration
  { name: 'gotoConfiguration', screenshot: false },
  { name: 'gotoAccessConfigurations', screenshot: true }
];

// Extract labels for screenshots
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper function to execute a navigation step
const executeNavigationStep = async (step, homePage, assetManagement, page, env) => {
  if (step.name.includes('HomePage')) {
    await homePage[step.name]();
  } else if (step.name.includes('ModuleMenu')) {
    await homePage[step.name]();
  } else {
    await assetManagement[step.name]();
  }
  
  if (step.screenshot) {
    await safeScreenshot(page, env, step.name, waitForProcessingAndTakeScreenshot);
  }
};

// Run test for a specific environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, assetManagement } = await loginAndInitialize({ page, context, baseUrl });

  for (const step of navigationSteps) {
    await executeNavigationStep(step, homePage, assetManagement, page, env);
  }
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