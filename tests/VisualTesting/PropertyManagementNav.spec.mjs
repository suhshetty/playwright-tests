// File: PropertyManagementNav.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { safeStep, safeStepWithTimeout, safeScreenshot } from '../../src/utils/CommonFunctions.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Define navigation steps (label = method name, screenshot = true/false, useTimeout = true/false)
const navigationSteps = [
  { name: 'gotoLeaseObjects', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractsOverview', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractFinance', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseModel', screenshot: true, useTimeout: true },
  { name: 'gotoPurchaseContractsOverview', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseHolders', screenshot: true, useTimeout: false },
  { name: 'gotoHousingBrokerage', screenshot: true, useTimeout: false },
  { name: 'gotoMovingInOut', screenshot: true, useTimeout: false },
  { name: 'gotoRoomBooking', screenshot: true, useTimeout: false },
  { name: 'gotoDataSetup', screenshot: true, useTimeout: false },
  { name: 'gotoConfiguration', screenshot: true, useTimeout: false },
  { name: 'gotoHousings', screenshot: true, useTimeout: false },
  { name: 'gotoBuildingSpaces', screenshot: true, useTimeout: false },
  { name: 'gotoHousingSpaces', screenshot: true, useTimeout: false },
  { name: 'gotoBuildingSpaceInformations', screenshot: true, useTimeout: false },
  { name: 'gotoCapacityObjects', screenshot: true, useTimeout: false },
  { name: 'gotoLocateCapacityObjects', screenshot: true, useTimeout: false },
  { name: 'gotoLocationCostDivision', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderPayers', screenshot: true, useTimeout: false },
  { name: 'gotoPublishedPriceLists', screenshot: true, useTimeout: false },
  { name: 'gotoHeadLeaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoSubLeaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractReminders', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractRenegotiations', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractUtilizations', screenshot: true, useTimeout: false },
  { name: 'gotoSiteLeases', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractPaymentItems', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractPayments', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseContractCustomerRevenues', screenshot: true, useTimeout: false },
  { name: 'gotoCostDistributionAgreements', screenshot: true, useTimeout: false },
  { name: 'gotoCostDistributionAgreementGroups', screenshot: true, useTimeout: false },
  { name: 'gotoProducts', screenshot: true, useTimeout: false },
  { name: 'gotoInvoiceBasisLCF', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseExaminations', screenshot: true, useTimeout: false },
  { name: 'gotoSiteKeyFigures', screenshot: true, useTimeout: false },
  { name: 'gotoSiteBasicCosts', screenshot: true, useTimeout: false },
  { name: 'gotoRevenues', screenshot: true, useTimeout: false },
  { name: 'gotoCostItems', screenshot: true, useTimeout: false },
  { name: 'gotoLoans', screenshot: true, useTimeout: false },
  { name: 'gotoSpaceUsages', screenshot: true, useTimeout: false },
  { name: 'gotoAnnualPercentages', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseHistories', screenshot: true, useTimeout: false },
  { name: 'gotoPurchaseContracts', screenshot: true, useTimeout: false },
  { name: 'gotoPurchaseContractReminders', screenshot: true, useTimeout: false },
  { name: 'gotoPurchaseContractPaymentItems', screenshot: true, useTimeout: false },
  { name: 'gotoInvoiceBasisPCO', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseHolderOrganisations', screenshot: true, useTimeout: false },
  { name: 'gotoResidents', screenshot: true, useTimeout: false },
  { name: 'gotoOrganicVatDeclarations', screenshot: true, useTimeout: false },
  { name: 'gotoCompanies', screenshot: true, useTimeout: false },
  { name: 'gotoPersonsUsers', screenshot: true, useTimeout: false },
  { name: 'gotoFailures', screenshot: true, useTimeout: false },
  { name: 'gotoLeaseApplications', screenshot: true, useTimeout: false },
  { name: 'gotoOpportunities', screenshot: true, useTimeout: false },
  { name: 'gotoOpportunityComments', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrders', screenshot: true, useTimeout: false },
  { name: 'gotoChecklists', screenshot: true, useTimeout: false },
  { name: 'gotoInspections', screenshot: true, useTimeout: false },
  { name: 'gotoCheckItems', screenshot: true, useTimeout: false },
  { name: 'gotoHousingWorkProcessRules', screenshot: true, useTimeout: false },
  { name: 'gotoMeetingRoomReservations', screenshot: true, useTimeout: false },
  { name: 'gotoMeetingRoomCateringOrders', screenshot: true, useTimeout: false },
  { name: 'gotoMeetingRoomEquipmentOrders', screenshot: true, useTimeout: false },
  { name: 'gotoInvoiceBasisRB', screenshot: true, useTimeout: false },
  { name: 'gotoPriceIndexes', screenshot: true, useTimeout: false },
  { name: 'gotoAccessConfigurations', screenshot: true, useTimeout: false }
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
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, propertyManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickpropertyManagement', async () => {
    await propertyManagement.clickpropertyManagement();
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, propertyManagement, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
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