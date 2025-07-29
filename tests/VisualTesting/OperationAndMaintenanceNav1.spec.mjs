// File: OperationAndMaintenanceNav1.spec.mjs - First Part
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

// Define navigation steps for first part - Maintenance Incidents to Incidents Overview (17 screenshots)
const navigationSteps = [
  // Maintenance Incidents Overview
  { name: 'gotoMaintenanceIncidentsOverview', screenshot: false, useTimeout: false },
  { name: 'gotoMaintenanceIncident', screenshot: true, useTimeout: false },

  // Task Planning Overview  
  { name: 'gotoTaskPlanningOverview', screenshot: false, useTimeout: false },
  { name: 'gotoPPMRegistration', screenshot: true, useTimeout: false },
  { name: 'gotoAnnualTaskBudgets', screenshot: true, useTimeout: false },
  { name: 'gotoPendingStandardTask', screenshot: true, useTimeout: false },
  { name: 'gotoObjectsShowingPendingStandardTasks', screenshot: true, useTimeout: false },
  { name: 'gotoServicePartners', screenshot: true, useTimeout: false },
  { name: 'gotoTaskInstance', screenshot: true, useTimeout: false },
  { name: 'gotoTaskChecklist', screenshot: true, useTimeout: false },
  { name: 'gotoTaskChecklistPoint', screenshot: true, useTimeout: false },

  // Approved PPM
  { name: 'gotoApprovedPPM', screenshot: false, useTimeout: false },
  { name: 'gotoApprovedPPMSubType', screenshot: true, useTimeout: false },
  { name: 'gotoAnnualTaskBudget', screenshot: true, useTimeout: false },

  // Incidents Overview
  { name: 'gotoIncidentsOverview', screenshot: false, useTimeout: false },
  { name: 'gotoFailure', screenshot: true, useTimeout: false },
  { name: 'gotoIssues', screenshot: true, useTimeout: false },
  { name: 'gotoCheckItem', screenshot: true, useTimeout: false },
  { name: 'gotoCleaningTask', screenshot: true, useTimeout: false },
  { name: 'gotoIncidentCategory1s', screenshot: true, useTimeout: false },
  { name: 'gotoIncidentCategory2s', screenshot: true, useTimeout: false },
  { name: 'gotoAllIncidents', screenshot: true, useTimeout: false }
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
test('Visual Regression Test - Operation And Maintenance Part 1 - Compare url1 and url2', async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
