// File: PropertyManagementNav1.spec.js - Part 1: Lease & Property Management
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

// Define navigation steps - Part 1: Sub-types from first sub-modules
const navigationSteps = [
  // First navigate to Lease Objects sub-module, then its sub-types
  { name: 'gotoLeaseObjects', screenshot: false, useTimeout: false },
  { name: 'gotoHousings', screenshot: true, useTimeout: false },
  { name: 'gotoBuildingSpaces', screenshot: true, useTimeout: false },
  { name: 'gotoHousingSpaces', screenshot: true, useTimeout: false },
  { name: 'gotoBuildingSpaceInformations', screenshot: true, useTimeout: false },
  { name: 'gotoCapacityObjects', screenshot: true, useTimeout: false },
  { name: 'gotoLocateCapacityObjects', screenshot: true, useTimeout: false },
  { name: 'gotoLocationCostDivision', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderPayers', screenshot: true, useTimeout: false },
  { name: 'gotoPublishedPriceLists', screenshot: true, useTimeout: false },
  
  // Navigate to Lease Contracts Overview sub-module, then its sub-types
  { name: 'gotoLeaseContractsOverview', screenshot: false, useTimeout: false },
  { name: 'gotoHeadLeaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoSubLeaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractReminders', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractRenegotiations', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractUtilizations', screenshot: true, useTimeout: false },
  { name: 'gotoSiteLeases', screenshot: true, useTimeout: false },
  
  // Navigate to Lease Contract Finance sub-module, then its sub-types
  { name: 'gotoLeaseContractFinance', screenshot: false, useTimeout: false },
  { name: 'gotoLeaseContractPaymentItems', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractPayments', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractCustomerRevenues', screenshot: true, useTimeout: false },
  { name: 'gotoCostDistributionAgreements', screenshot: true, useTimeout: false },
  { name: 'gotoCostDistributionAgreementGroups', screenshot: true, useTimeout: false },
  { name: 'gotoProducts', screenshot: true, useTimeout: false },
  { name: 'gotoInvoiceBasisLCF', screenshot: true, useTimeout: false }
];

// Extract screenshot labels
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper to run each navigation step
const executeNavigationStep = async (step, propertyManagement, page, env) => {
  const stepFunction = async () => {
    await propertyManagement[step.name]();
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
  const { homePage, propertyManagement } = await initializeFunction({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickpropertyManagement', async () => {
    await propertyManagement.clickpropertyManagement();
    // Wait for Property Management module to fully load
    await page.waitForTimeout(8000);
    // Wait for the first sub-module to be visible
    await page.locator("div[aria-label='Lease objects Process step']").waitFor({ state: 'visible', timeout: 10000 });
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, propertyManagement, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Property Management Part 1 - Compare url1 and url2', async ({ page, context }) => {
  // Set longer timeout for this specific test
  test.setTimeout(600000); // 10 minutes total
  
  // Run URL1 with LoginPageCore
  await runTestOnUrl('url1', process.env.URL1, page, context, 'core');

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  // Run URL2 with standard LoginPage
  await runTestOnUrl('url2', process.env.URL2, newPage, context, 'standard');

  compareAllScreenshots(labels, expect);
});
