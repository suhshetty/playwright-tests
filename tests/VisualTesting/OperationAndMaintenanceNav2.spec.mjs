// File: OperationAndMaintenanceNav2.spec.mjs - Second Part
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

// Define navigation steps for second part - Work Orders to Service Contracts (21 screenshots)
const navigationSteps = [
  // Work Orders Overview
  { name: 'gotoWorkOrdersOverview', screenshot: false, useTimeout: false },
  { name: 'gotoWorkOrder', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderExternal', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderAssignedCostWOO', screenshot: true, useTimeout: false },
  { name: 'gotoTimeRegistrationWOO', screenshot: true, useTimeout: false },
  { name: 'gotoInspections', screenshot: true, useTimeout: false },
  { name: 'gotoRecurringIncidents', screenshot: true, useTimeout: false },
  { name: 'gotoChecklists', screenshot: true, useTimeout: false },
  { name: 'gotoChecklistPoints', screenshot: true, useTimeout: false },
  { name: 'gotoChecklistIncidents', screenshot: true, useTimeout: false },

  // Costs and Resource Usage
  { name: 'gotoCostsAndResourceUsage', screenshot: false, useTimeout: false },
  { name: 'gotoElectronicInvoices', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderAssignedCost', screenshot: true, useTimeout: false },
  { name: 'gotoTimeRegistration', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderMaterial', screenshot: true, useTimeout: false },
  { name: 'gotoTransaction', screenshot: true, useTimeout: false },

  // Service Contracts Overview
  { name: 'gotoServiceContractsOverview', screenshot: false, useTimeout: false },
  { name: 'gotoServiceContract', screenshot: true, useTimeout: false },
  { name: 'gotoServiceContractReminder', screenshot: true, useTimeout: false },
  { name: 'gotoServiceContractPayments', screenshot: true, useTimeout: false },
  { name: 'gotoServiceContractPaymentItems', screenshot: true, useTimeout: false },
  { name: 'gotoServiceContractItem', screenshot: true, useTimeout: false }
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
test('Visual Regression Test - Operation And Maintenance Part 2 - Compare url1 and url2', async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
