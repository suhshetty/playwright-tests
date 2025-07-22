// File: PropertyManagementNav2.spec.js - Part 2: Lease Model & Housing Services
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

// Define navigation steps - Part 2: First half of remaining sub-modules
const navigationSteps = [
  // Navigate to Lease Model sub-module, then its sub-types
  { name: 'gotoLeaseModel', screenshot: false, useTimeout: true },
  { name: 'gotoLeaseExaminations', screenshot: true, useTimeout: false },
  { name: 'gotoSiteKeyFigures', screenshot: true, useTimeout: false },
  { name: 'gotoSiteBasicCosts', screenshot: true, useTimeout: false },
  { name: 'gotoRevenues', screenshot: true, useTimeout: false },
  { name: 'gotoCostItems', screenshot: true, useTimeout: false },
  { name: 'gotoLoans', screenshot: true, useTimeout: false },
  { name: 'gotoSpaceUsages', screenshot: true, useTimeout: false },
  { name: 'gotoAnnualPercentages', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseHistories', screenshot: true, useTimeout: false },
  
  // Navigate to Purchase Contracts Overview sub-module, then its sub-types
  { name: 'gotoPurchaseContractsOverview', screenshot: false, useTimeout: false },
  { name: 'gotoPurchaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoPurchaseContractReminders', screenshot: true, useTimeout: false },
  { name: 'gotoPurchaseContractPaymentItems', screenshot: true, useTimeout: false },
  { name: 'gotoInvoiceBasisPCO', screenshot: true, useTimeout: false },
  
  // Navigate to Lease Holders sub-module, then its sub-types
  { name: 'gotoLeaseHolders', screenshot: false, useTimeout: false },
  { name: 'gotoLeaseHolderOrganisations', screenshot: true, useTimeout: false },
  { name: 'gotoResidents', screenshot: true, useTimeout: false },
  { name: 'gotoOrganicVatDeclarations', screenshot: true, useTimeout: false },
  { name: 'gotoCompanies', screenshot: true, useTimeout: false },
  { name: 'gotoPersonsUsers', screenshot: true, useTimeout: false },
  { name: 'gotoFailures', screenshot: true, useTimeout: false },
  
  // Navigate to Housing Brokerage sub-module, then its sub-types
  { name: 'gotoHousingBrokerage', screenshot: false, useTimeout: false },
  { name: 'gotoLeaseApplications', screenshot: true, useTimeout: false },
  { name: 'gotoOpportunities', screenshot: true, useTimeout: false },
  { name: 'gotoOpportunityComments', screenshot: true, useTimeout: false }
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
    await page.locator("div[aria-label='Lease Model Process step']").waitFor({ state: 'visible', timeout: 10000 });
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, propertyManagement, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Property Management Part 2 - Compare url1 and url2', async ({ page, context }) => {
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
