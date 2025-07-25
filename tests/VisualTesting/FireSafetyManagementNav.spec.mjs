// File: FireSafetyManagementNav.spec.js

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

// Define navigation steps for Fire Safety module
const navigationSteps = [
  // General Overview
  { name: 'gotoGeneralOverview', screenshot: false },
  { name: 'gotoGeneralInformationFireSafety', screenshot: true },

  // Responsible Resources
  { name: 'gotoResponsibleResources', screenshot: false },
  { name: 'gotoServicePartners', screenshot: true },
  { name: 'gotoServicePartnerManagementFireSafety', screenshot: true },
  { name: 'gotoPersonPermitFireSafety', screenshot: true },

  // Technical Documentation
  { name: 'gotoTechnicalDocumentation', screenshot: false },
  { name: 'gotoFireSafetyDocument', screenshot: true },
  { name: 'gotoFireSafetyDocumentTree', screenshot: true },
  { name: 'gotoFlammableAndPressurizedMaterial', screenshot: true },
  { name: 'gotoFireSafetyZone', screenshot: true },

  // Object Marking
  { name: 'gotoObjectMarking', screenshot: false },
  { name: 'gotoTechnicalSystemFireSafety', screenshot: true },
  { name: 'gotoCSSTechnicalSystemFireSafety', screenshot: true },
  { name: 'gotoThemeMarking', screenshot: true },

  // Activities
  { name: 'gotoActivities', screenshot: false },
  { name: 'gotoTaskManagementFireSafety', screenshot: true },
  { name: 'gotoWorkOrderFireSafety', screenshot: true },
  { name: 'gotoChecklistsFireSafety', screenshot: true },
  { name: 'gotoIncidentFireSafety', screenshot: true },

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

// Helper function to execute steps
const executeNavigationStep = async (step, fireSafetyManagement, page, env) => {
  const stepFn = async () => {
    await fireSafetyManagement[step.name]();
    if (step.screenshot) {
      await safeScreenshot(page, env, step.name, waitForProcessingAndTakeScreenshot);
    }
  };

  // Apply timeout wrapper if flagged
  if (step.useTimeout) {
    await safeStepWithTimeout(step.name, stepFn);
  } else {
    await safeStep(step.name, stepFn, page, env);
  }
};

// Visual test runner for an environment
const runTestOnUrl = async (env, baseUrl, page, context, loginMethod = 'core') => {
  const initializeFunction = loginMethod === 'core' ? loginAndInitializeWithCore : loginAndInitializeWithStandard;
  const { homePage, fireSafetyManagement } = await initializeFunction({ page, context, baseUrl });

  // Top-level navigation
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickFireSafetyManagement', async () => {
    await fireSafetyManagement.clickFireSafetyManagement();
    await page.waitForTimeout(8000); // wait for module load
  }, page, env);

  // Run all defined steps
  for (const step of navigationSteps) {
    await executeNavigationStep(step, fireSafetyManagement, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Fire Safety Management - Compare url1 and url2', async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  await runTestOnUrl('url1', process.env.URL1, page, context, 'standard');

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context, 'core');

  compareAllScreenshots(labels, expect);
});