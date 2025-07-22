// File: PropertyManagementNav3.spec.js - Part 3: Operations & Configuration
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

// Define navigation steps - Part 3: Final sub-modules
const navigationSteps = [
  // Navigate to Moving In/Out sub-module, then its sub-types
  { name: 'gotoMovingInOut', screenshot: false, useTimeout: true },
  { name: 'gotoWorkOrders', screenshot: true, useTimeout: false },
  { name: 'gotoChecklists', screenshot: true, useTimeout: false },
  { name: 'gotoInspections', screenshot: true, useTimeout: false },
  { name: 'gotoCheckItems', screenshot: true, useTimeout: false },
  { name: 'gotoHousingWorkProcessRules', screenshot: true, useTimeout: false },
  
  // Navigate to Room Booking sub-module, then its sub-types
  { name: 'gotoRoomBooking', screenshot: false, useTimeout: false },
  { name: 'gotoMeetingRoomReservations', screenshot: true, useTimeout: false },
  { name: 'gotoMeetingRoomCateringOrders', screenshot: true, useTimeout: false },
  { name: 'gotoMeetingRoomEquipmentOrders', screenshot: true, useTimeout: false },
  { name: 'gotoInvoiceBasisRB', screenshot: true, useTimeout: false },
  
  // Navigate to Data Setup sub-module, then its sub-types
  { name: 'gotoDataSetup', screenshot: false, useTimeout: false },
  { name: 'gotoPriceIndexes', screenshot: true, useTimeout: false },
  
  // Navigate to Configuration sub-module, then its sub-types
  { name: 'gotoConfiguration', screenshot: false, useTimeout: false },
  { name: 'gotoAccessConfiguration', screenshot: true, useTimeout: false }
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
    // Wait specifically for the Moving In/Out sub-module to be visible (first one in Nav3)
    await page.locator("div[aria-label='Moving In/Out Process step']").waitFor({ state: 'visible', timeout: 15000 });
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, propertyManagement, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Property Management Part 3 - Compare url1 and url2', async ({ page, context }) => {
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
