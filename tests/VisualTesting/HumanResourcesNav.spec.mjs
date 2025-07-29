// File: HumanResourcesNavigation.spec.mjs
import { test, expect } from '@playwright/test';
import { loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { safeScreenshot } from '../../src/utils/CommonFunctions.mjs';

// Dynamic login selector
const loginAndInitialize = async ({ page, context, baseUrl }) => {
  if (baseUrl === process.env.URL1) {
    return await loginAndInitializeWithStandard({ page, context, baseUrl });
  } else {
    return await loginAndInitializeWithCore({ page, context, baseUrl });
  }
};

// Initialize environment
initializeVisualTestEnv();

// Navigation steps for Human Resources
const navigationSteps = [
  // Home and Module
  { name: 'gotoHomePage', screenshot: false },
  { name: 'gotoModuleMenu', screenshot: false },
  { name: 'clickHumanResources', screenshot: false },

  // Organisation Overview
  { name: 'gotoOrganisationsOverview', screenshot: false },
  { name: 'gotoBuildOrganisationTrees', screenshot: true },
  { name: 'gotoCompanies', screenshot: true },
  { name: 'gotoWorkGroups', screenshot: true },
  { name: 'gotoEmployees', screenshot: true },
  { name: 'gotoPersonsUsers', screenshot: true },

  // Organisation Data
  { name: 'gotoOrganisationData', screenshot: false },
  { name: 'gotoOrganisationReminders', screenshot: true },
  { name: 'gotoOrganisationDocuments', screenshot: true },
  { name: 'gotoOrganisationAbsences', screenshot: true },
  { name: 'gotoPunchinPunchout', screenshot: true },

  // Stakeholder Management
  { name: 'gotoStakeholderManagement', screenshot: true },
  { name: 'gotoVendorIssues', screenshot: true },

  // Permits and Qualifications
  { name: 'gotoPermitsandQualifications', screenshot: true },
  { name: 'gotoPersonPermits', screenshot: true },

  // Data Setup
  { name: 'gotoDataSetup', screenshot: false },
  { name: 'gotoOrganisationGroups', screenshot: true },
  { name: 'gotoProfessions', screenshot: true },
  { name: 'gotoPermits', screenshot: true },
  { name: 'gotoEmployeeGroups', screenshot: true },
  { name: 'gotoAvailabilityProfiles', screenshot: true },

  // Configuration
  { name: 'gotoConfiguration', screenshot: false },
  { name: 'gotoAccessConfiguration', screenshot: true }
];

// Extract screenshot labels
const labels = navigationSteps.filter(step => step.screenshot).map(step => step.name);

// Step executor
const executeNavigationStep = async (step, homePage, humanResources, page, env) => {
  if (step.name.includes('HomePage') || step.name.includes('ModuleMenu')) {
    await homePage[step.name]();
  } else {
    await humanResources[step.name]();
  }

  if (step.screenshot) {
    await safeScreenshot(page, env, step.name, waitForProcessingAndTakeScreenshot);
  }
};

// Run test for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, humanResources } = await loginAndInitialize({ page, context, baseUrl });

  for (const step of navigationSteps) {
    await executeNavigationStep(step, homePage, humanResources, page, env);
  }
};

// Main test
test('Visual Regression Test - Human Resources: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});