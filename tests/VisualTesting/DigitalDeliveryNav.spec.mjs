// File: DigitalDeliveryNav.spec.js
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

// Define navigation steps with their corresponding methods and screenshot requirements
const navigationSteps = [
  { name: 'gotoDigitalDeliverySub', screenshot: true, useTimeout: false },
  // Digital Delivery Sub-Types (direct under main module)
  { name: 'gotoProductData', screenshot: true, useTimeout: false },
  { name: 'gotoProductDataTask', screenshot: true, useTimeout: false },
  { name: 'gotoProductDataComponent', screenshot: true, useTimeout: false },
  { name: 'gotoProductDataTechnicalInformation', screenshot: true, useTimeout: false },
  { name: 'gotoEPD', screenshot: true, useTimeout: false },

  // Navigate to Building Systems sub-module, then its sub-types
  { name: 'gotoBuildingSystems', screenshot: false, useTimeout: false },
  { name: 'gotoRegisterBuildingComponents', screenshot: true, useTimeout: false },
  { name: 'gotoRegisterBuildingComponentsCSS', screenshot: true, useTimeout: false },
  { name: 'gotoFunctionalSystemCSS', screenshot: true, useTimeout: false },
  { name: 'gotoTechnicalSystemCSS', screenshot: true, useTimeout: false },
  { name: 'gotoComponentsCSS', screenshot: true, useTimeout: false },
  { name: 'gotoFunctionalSystem', screenshot: true, useTimeout: false },
  { name: 'gotoTechnicalSystem', screenshot: true, useTimeout: false },
  { name: 'gotoComponent', screenshot: true, useTimeout: false },

  // Navigate to Configuration sub-module, then its sub-types
  { name: 'gotoConfiguration', screenshot: false, useTimeout: false },
  { name: 'gotoAccessConfiguration', screenshot: true, useTimeout: false }
];

// Extract labels for screenshots
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper function to execute a navigation step
const executeNavigationStep = async (step, digitalDelivery, page, env) => {
  const stepFunction = async () => {
    await digitalDelivery[step.name]();
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

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context, loginMethod = 'core') => {
  const initializeFunction = loginMethod === 'core' ? loginAndInitializeWithCore : loginAndInitializeWithStandard;
  const { homePage, digitalDelivery } = await initializeFunction({ page, context, baseUrl });

  // Navigate to home and module menu
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickDigitalDelivery', async () => {
    await digitalDelivery.clickDigitalDelivery();
    // Wait for Digital Delivery module to fully load
    await page.waitForTimeout(6000);
    await page.locator("div[aria-label='Digital delivery Process step']").waitFor({ state: 'visible', timeout: 15000 });
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, digitalDelivery, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Digital Delivery - Compare url1 and url2', async ({ page, context }) => {
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