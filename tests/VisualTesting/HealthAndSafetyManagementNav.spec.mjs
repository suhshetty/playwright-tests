// File: HealthAndSafetyManagementNavigation.spec.js

import { test, expect } from '@playwright/test';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import { safeStep } from '../../src/utils/CommonFunctions.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Login initialization (based on URL)
const loginAndInitialize = async ({ page, context, baseUrl }) => {
  if (baseUrl === process.env.URL1) {
    return await loginAndInitializeWithStandard({ page, context, baseUrl });
  } else {
    return await loginAndInitializeWithCore({ page, context, baseUrl });
  }
};

// Define navigation steps for Health & Safety Management
const navigationSteps = [
  // General Overview
  { name: 'gotoGeneralOverview', screenshot: false },
  { name: 'gotoGeneralInformationHSE', screenshot: true },

  // Responsible Resources
  { name: 'gotoResponsibleResources', screenshot: false },
  { name: 'gotoServicePartners', screenshot: true },
  { name: 'gotoServicePartnersManagementHSE', screenshot: true },
  { name: 'gotoPersonPermitHSE', screenshot: true },

  // Technical Documentation
  { name: 'gotoTechnicalDocumentation', screenshot: false },
  { name: 'gotoHSEDocuments', screenshot: true },
  { name: 'gotoHSEDocumentTree', screenshot: true },
  { name: 'gotoRadonRegistration', screenshot: true },

  // Object Marking
  { name: 'gotoObjectMarking', screenshot: false },
  { name: 'gotoInsuranceCertificate', screenshot: true },

  // Activities
  { name: 'gotoActivities', screenshot: false },
  { name: 'gotoTaskManagementHSE', screenshot: true },
  { name: 'gotoWorkOrderHSE', screenshot: true },
  { name: 'gotoChecklistsHSE', screenshot: true },
  { name: 'gotoIncidentHSE', screenshot: true },

  // Requirements and Guidelines
  { name: 'gotoRequirementAndGuidelines', screenshot: false },
  { name: 'gotoLinksToLawsAndRegulation', screenshot: true },
  { name: 'gotoInstructionsAndGuidelines', screenshot: true },
  { name: 'gotoLocalRegulations', screenshot: true },

  // Configuration
  { name: 'gotoConfiguration', screenshot: false },
  { name: 'gotoAccessConfiguration', screenshot: true }
];

// Extract screenshot labels
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Execute a navigation step
const executeNavigationStep = async (step, page, healthAndSafetyManagement, env) => {
  await safeStep(step.name, async () => {
    await healthAndSafetyManagement[step.name]();
    if (step.screenshot) {
      await waitForProcessingAndTakeScreenshot(page, env, step.name);
    }
  });
};

// Run visual test for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, healthAndSafetyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Navigation to module
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  });

  await safeStep('clickHealthAndSafetyManagement', async () => {
    await healthAndSafetyManagement.clickHealthAndSafetyManagement();
  });

  // Module-specific navigation steps
  for (const step of navigationSteps) {
    await executeNavigationStep(step, page, healthAndSafetyManagement, env);
  }
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Health & Safety Management - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
