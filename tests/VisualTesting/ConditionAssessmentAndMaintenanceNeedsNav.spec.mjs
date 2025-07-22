import { test, expect } from '@playwright/test';
import {
  loginAndInitializeWithCore,
  loginAndInitializeWithStandard
} from '../src/testSetup.js';

import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

import {
  safeStep,
  safeStepWithTimeout,
  safeScreenshot
} from '../../src/utils/CommonFunctions.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Define navigation steps
const navigationSteps = [
  // Main navigation
  { name: 'gotoPlanningOfInspection', screenshot: false, useTimeout: false },
  
  // 📌 Planning of Inspection - Sub Types
  { name: 'gotoPPMRegistration', screenshot: true, useTimeout: false },
  { name: 'gotoRecurringIncident', screenshot: true, useTimeout: false },
  
  // Maintenance Incident & Sub Types
  { name: 'gotoMaintenanceIncident', screenshot: false, useTimeout: false },
  { name: 'gotoMaintenanceIncidentSubType', screenshot: true, useTimeout: false },
  
  // Condition Assessment & Sub Types
  { name: 'gotoConditionAssessment', screenshot: false, useTimeout: false },
  { name: 'gotoConditionAssessmentSubType', screenshot: true, useTimeout: false },
  { name: 'gotoConditionRegistration', screenshot: true, useTimeout: false },
  { name: 'gotoCondition', screenshot: true, useTimeout: false },
  
  // Functional/Technical Systems & Sensor
  { name: 'gotoFunctionalSystem', screenshot: true, useTimeout: false },
  { name: 'gotoTechnicalSystem', screenshot: true, useTimeout: false },
  { name: 'gotoSensor', screenshot: true, useTimeout: false },
  
  // Data Setup & Sub Types
  { name: 'gotoDataSetup', screenshot: false, useTimeout: false },
  { name: 'gotoConditionAssessmentType', screenshot: true, useTimeout: false },
  { name: 'gotoStandardCondition', screenshot: true, useTimeout: false },
  
  // Configuration & Sub Types
  { name: 'gotoConfiguration', screenshot: false, useTimeout: false },
  { name: 'gotoAccessConfiguration', screenshot: true, useTimeout: false }
];

// Extract screenshot labels
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper to run each navigation step
const executeNavigationStep = async (step, module, page, env) => {
  const stepFunction = async () => {
    await module[step.name]();
    if (step.screenshot) {
      await safeScreenshot(page, env, step.name, waitForProcessingAndTakeScreenshot);
    }
  };

  if (step.useTimeout) {
    await safeStepWithTimeout(step.name, stepFunction);
  } else {
    await safeStep(step.name, stepFunction, page, env);
  }
};

// Main runner for each environment
const runTestOnUrl = async (env, baseUrl, page, context, loginMethod = 'core') => {
  const initializeFunction = loginMethod === 'core' ? loginAndInitializeWithCore : loginAndInitializeWithStandard;
  const { homePage, conditionAssessmentAndMaintenanceNeeds } = await initializeFunction({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickConditionAssessmentAndMaintenanceNeeds', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickConditionAssessmentAndMaintenanceNeeds();
    // Wait for initial sub-module to be visible
    await page.waitForTimeout(6000); // adjust if needed
    await page.locator("div[aria-label='Planning of inspections Process step']").waitFor({ state: 'visible', timeout: 15000 });
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, conditionAssessmentAndMaintenanceNeeds, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Condition Assessment & Maintenance Needs - Compare url1 and url2', async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  // Run test on URL1 with Core login
  await runTestOnUrl('url1', process.env.URL1, page, context, 'core');

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  // Run test on URL2 with Standard login
  await runTestOnUrl('url2', process.env.URL2, newPage, context, 'standard');

  compareAllScreenshots(labels, expect);
});