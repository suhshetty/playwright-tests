// File: OperationAndMaintenanceNav4.spec.mjs - Part 4 of 4
// Covers: Standard Tasks (remaining) + Data Setup + Configuration (16 screenshots)
import { test, expect } from '@playwright/test';
import { loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { safeStep, safeStepWithTimeout, safeScreenshot } from '../../src/utils/CommonFunctions.mjs';

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

// Define navigation steps for Part 4
const navigationSteps = [
  // Standard Tasks Overview (remaining parts)
  { name: 'gotoStandardTasksOverview', screenshot: false, useTimeout: false },
  { name: 'gotoStandardCheckpointObjectTypeManagement', screenshot: true, useTimeout: false },
  { name: 'gotoStandardChecklist', screenshot: true, useTimeout: false },
  { name: 'gotoStandardCheckPoint', screenshot: true, useTimeout: false },
  { name: 'gotoCheckpointGroups', screenshot: true, useTimeout: false },
  { name: 'gotoPendingStandardTasksOnSite', screenshot: true, useTimeout: false },

  // Data Setup
  { name: 'gotoDataSetup', screenshot: false, useTimeout: false },
  { name: 'gotoTargetArea', screenshot: true, useTimeout: false },
  { name: 'gotoScheduleType', screenshot: true, useTimeout: false },
  { name: 'gotoTaskCategories', screenshot: true, useTimeout: false },
  { name: 'gotoTaskSubcategories', screenshot: true, useTimeout: false },
  { name: 'gotoTaskClassification', screenshot: true, useTimeout: false },
  { name: 'gotoTaskSet', screenshot: true, useTimeout: false },
  { name: 'gotoIncidentPriorities', screenshot: true, useTimeout: false },
  { name: 'gotoTaskClassificationRelation', screenshot: true, useTimeout: false },
  { name: 'gotoHealthSafetyAndEnvironmentItems', screenshot: true, useTimeout: false },

  // Configuration
  { name: 'gotoConfiguration', screenshot: false, useTimeout: false },
  { name: 'gotoAccessConfiguration', screenshot: true, useTimeout: false }
];

// Extract labels for screenshots
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper function to execute a navigation step
const executeNavigationStep = async (step, operationAndMaintenance, page, env) => {
  const stepFunction = async () => {
    await operationAndMaintenance[step.name]();
    if (step.screenshot) {
      await safeScreenshot(page, env, step.name, waitForProcessingAndTakeScreenshot);
      // After taking screenshot of a sub-item, navigate back to main Operation and Maintenance view
      // so next main section can be accessed
      await operationAndMaintenance.clickOperationAndMaintenance();
      await page.waitForTimeout(2000); // Wait for navigation
    }
  };

  if (step.useTimeout) {
    await safeStepWithTimeout(step.name, stepFunction);
  } else {
    await safeStep(step.name, stepFunction, page, env);
  }
};

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, operationAndMaintenance } = await loginAndInitialize({ page, context, baseUrl });

  // Add additional wait time after login for page to fully load
  await page.waitForTimeout(5000);
  
  // Try to wait for network idle, but don't fail if it times out
  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 });
  } catch (error) {
    console.log('Network idle timeout, proceeding anyway...');
  }

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickOperationAndMaintenance', async () => {
    await operationAndMaintenance.clickOperationAndMaintenance();
    await page.waitForTimeout(8000); // Wait for full module load
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, operationAndMaintenance, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Operation And Maintenance Part 4 - Compare url1 and url2', async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
