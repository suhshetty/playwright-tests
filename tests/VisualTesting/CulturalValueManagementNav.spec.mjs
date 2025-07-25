// File: CulturalValueManagementNav.spec.js
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
  // General Overview
  { name: 'gotoGeneralOverview', screenshot: false, useTimeout: false },
  { name: 'gotoGeneralInformationCulturalValue', screenshot: true, useTimeout: false },

  // Responsible Resources
  { name: 'gotoResponsibleResources', screenshot: false, useTimeout: false },
  { name: 'gotoServicePartners', screenshot: true, useTimeout: false },
  { name: 'gotoServicePartnersManagementCulturalValue', screenshot: true, useTimeout: false },
  { name: 'gotoPersonPermitCulturalValue', screenshot: true, useTimeout: false },

  // Technical Documentation
  { name: 'gotoTechnicalDocumentation', screenshot: false, useTimeout: false },
  { name: 'gotoCulturalValueDocuments', screenshot: true, useTimeout: false },
  { name: 'gotoCulturalValueDocumentTree', screenshot: true, useTimeout: false },

  // Object Marking
  { name: 'gotoObjectMarking', screenshot: false, useTimeout: false },
  { name: 'gotoTechnicalSystemCulturalValue', screenshot: true, useTimeout: false },
  { name: 'gotoCCSTechnicalSystemCulturalValue', screenshot: true, useTimeout: false },
  { name: 'gotoThemeMarking', screenshot: true, useTimeout: false },

  // Activities
  { name: 'gotoActivities', screenshot: false, useTimeout: false },
  { name: 'gotoTaskManagementCulturalValue', screenshot: true, useTimeout: false },
  { name: 'gotoWorkOrderCulturalValue', screenshot: true, useTimeout: false },
  { name: 'gotoIncidentCulturalValue', screenshot: true, useTimeout: false },

  // Requirements and Guidelines
  { name: 'gotoRequirementAndGuidelines', screenshot: false, useTimeout: false },
  { name: 'gotoLinksToLawsAndRegulation', screenshot: true, useTimeout: false },
  { name: 'gotoInstructionsAndGuidelines', screenshot: true, useTimeout: false },
  { name: 'gotoLocalRegulations', screenshot: true, useTimeout: false },

  // Data Setup
  { name: 'gotoDataSetup', screenshot: false, useTimeout: false },
  { name: 'gotoDocumentTypes', screenshot: true, useTimeout: false },
  { name: 'gotoServiceTypes', screenshot: true, useTimeout: false },
  { name: 'gotoPermitCulturalValue', screenshot: true, useTimeout: false },

  // Configuration
  { name: 'gotoConfiguration', screenshot: false, useTimeout: false },
  { name: 'gotoAccessConfiguration', screenshot: true, useTimeout: false }
];

// Extract labels for screenshots
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Helper function to execute a navigation step
const executeNavigationStep = async (step, culturalValueManagement, page, env) => {
  const stepFunction = async () => {
    await culturalValueManagement[step.name]();
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
  const { homePage, culturalValueManagement } = await initializeFunction({ page, context, baseUrl });

  // Navigate to home and module menu
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickCulturalValueManagement', async () => {
    await culturalValueManagement.clickCulturalValueManagement();
    // Wait for Cultural Value Management module to fully load
    await page.waitForTimeout(8000);
  }, page, env);

  for (const step of navigationSteps) {
    await executeNavigationStep(step, culturalValueManagement, page, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Cultural Value Management - Compare url1 and url2', async ({ page, context }) => {
  // Set longer timeout for this specific test
  test.setTimeout(600000); // 10 minutes total

  // Run URL1 with standard LoginPage (now MMV2 Legacy)
  await runTestOnUrl('url1', process.env.URL1, page, context, 'standard');

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  // Run URL2 with LoginPageCore (now Core system)
  await runTestOnUrl('url2', process.env.URL2, newPage, context, 'core');

  compareAllScreenshots(labels, expect);
});

