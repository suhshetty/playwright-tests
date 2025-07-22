// File: SpaceManagementNav.spec.js
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
  { name: 'gotoBuildingSpaces', screenshot: true, useTimeout: false },
  { name: 'gotoBuildingSpaceInformation', screenshot: true, useTimeout: false },
  { name: 'gotoDrawing', screenshot: true, useTimeout: true },
  { name: 'gotoLocateOrganisation', screenshot: false, useTimeout: false },
  { name: 'gotoLocateOrganisationSubType', screenshot: true, useTimeout: true },
  { name: 'gotoObjectOwner', screenshot: true, useTimeout: true },
  { name: 'gotoSpaceManagementScenario', screenshot: true, useTimeout: true },
  { name: 'gotoLocateEquipment', screenshot: false, useTimeout: false },
  { name: 'gotoLocateEquipmentSubType', screenshot: true, useTimeout: true },
  { name: 'gotoKeyManagement', screenshot: false, useTimeout: false },
  { name: 'gotoKeyToLock', screenshot: true, useTimeout: true },
  { name: 'gotoConfiguration', screenshot: false, useTimeout: false },
  { name: 'gotoAccessConfiguration', screenshot: true, useTimeout: true },
  { name: 'gotoTestÞT', screenshot: false, useTimeout: false },
  { name: 'gotoWorkOrderHours', screenshot: true, useTimeout: true }
];

// Extract labels for screenshots
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper function to execute a navigation step
const executeNavigationStep = async (step, spaceManagement, page, env) => {
  const stepFunction = async () => {
    await spaceManagement[step.name]();
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
  const { homePage, spaceManagement } = await initializeFunction({ page, context, baseUrl });

  // Navigate to home and module menu
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    console.log(`Going to module menu for ${env}...`);
    await homePage.gotoModuleMenu();
    await page.waitForTimeout(2000);
    
    const spaceManagementExists = await page.locator("//span[@class='m-menu__link-text mm-menu-link-text' and text()='Space management']").count();
    console.log(`Space Management menu items found for ${env}: ${spaceManagementExists}`);
  }, page, env);

  // Click Space Management
  await safeStep('clickSpaceManagement', async () => {
    console.log(`Attempting to click Space Management for ${env}...`);
    await spaceManagement.clickSpaceManagement();
    console.log(`Successfully clicked Space Management for ${env}`);
  }, page, env);

  // Navigate to building space overview
  await safeStep('gotoBuildingSpaceOverview', async () => {
    await spaceManagement.gotoBuildingSpaceOverview();
  }, page, env);

  // Execute all navigation steps
  for (const step of navigationSteps) {
    await executeNavigationStep(step, spaceManagement, page, env);
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