// File: FireSafetyManagementNavigation2.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { safeStep, safeStepWithTimeout, safeScreenshot } from '../../src/utils/CommonFunctions.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Login initialization
const loginAndInitialize = async ({ page, context, baseUrl }) => {
  if (baseUrl === process.env.URL1) {
    return await loginAndInitializeWithStandard({ page, context, baseUrl });
  } else {
    return await loginAndInitializeWithCore({ page, context, baseUrl });
  }
};

// Define navigation steps for Fire Safety module - Part 2 (Activities Local through Configuration)
const navigationSteps = [
  // Activities Local
  { name: 'gotoActivitiesLocal', screenshot: false },
  { name: 'gotoTaskManagementFireSafetyLocal', screenshot: true },
  { name: 'gotoWorkOrderFireSafetyLocal', screenshot: true },
  { name: 'gotoChecklistsFireSafetyLocal', screenshot: true },
  { name: 'gotoIncidentFireSafetyLocal', screenshot: true },

  // Activities Customer
  { name: 'gotoActivitiesCustomer', screenshot: false },
  { name: 'gotoTaskManagementFireSafetyCustomer', screenshot: true },
  { name: 'gotoWorkOrderFireSafetyCustomer', screenshot: true },
  { name: 'gotoChecklistsFireSafetyCustomer', screenshot: true },
  { name: 'gotoIncidentFireSafetyCustomer', screenshot: true },

  // Requirements and Guidelines
  { name: 'gotoRequirementsAndGuidelines', screenshot: false },
  { name: 'gotoLinksToLawsAndRegulation', screenshot: true },
  { name: 'gotoInstructionsAndGuidelines', screenshot: true },
  { name: 'gotoLocalRegulations', screenshot: true },

  // Data Setup
  { name: 'gotoDataSetup', screenshot: false },
  { name: 'gotoDocumentTypes', screenshot: true },
  { name: 'gotoServiceTypes', screenshot: true },
  { name: 'gotoMaterialTypes', screenshot: true },
  { name: 'gotoPermitFireSafety', screenshot: true },

  // Configuration
  { name: 'gotoConfiguration', screenshot: false },
  { name: 'gotoAccessConfiguration', screenshot: true }
];

// Extract screenshot labels
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Execute a navigation step with optional screenshot
const executeNavigationStep = async (step, page, fireSafetyManagement, env) => {
  await safeStep(step.name, async () => {
    await fireSafetyManagement[step.name]();
    if (step.screenshot) {
      await waitForProcessingAndTakeScreenshot(page, env, step.name);
    }
  });
};

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, fireSafetyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  });

  await safeStep('clickFireSafetyManagement', async () => {
    await fireSafetyManagement.clickFireSafetyManagement();
  });

  // === Execute All Navigation Steps ===
  for (const step of navigationSteps) {
    await executeNavigationStep(step, page, fireSafetyManagement, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Fire Safety Management Part 2 - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
