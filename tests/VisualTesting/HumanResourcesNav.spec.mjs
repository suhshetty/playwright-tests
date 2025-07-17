// File: HumanResourcesNavigation.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

const labels = [
  'gotoBuildOrganisationTrees', 'gotoCompanies', 'gotoWorkGroups',
  'gotoEmployees', 'gotoPersonsUsers', 'gotoOrganisationReminders', 'gotoOrganisationDocuments',
  'gotoOrganisationAbsences', 'gotoPunchinPunchout', 'gotoStakeholderManagement', 'gotoVendorIssues', 'gotoPermitsandQualifications',
  'gotoPersonPermits', 'gotoOrganisationGroups', 'gotoProfessions', 'gotoPermits',
  'gotoEmployeeGroups', 'gotoAvailabilityProfiles', 'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, humanResources } = await loginAndInitialize({ page, context, baseUrl });

    // Home Page
await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Main module navigation
await safeStep('clickHumanResources', async () => {
  await humanResources.clickHumanResources();
  //await waitForProcessingAndTakeScreenshot(page, env, 'clickHumanResources');
});

// Navigate to sub modules
await safeStep('gotoOrganisationsOverview', async () => {
  await humanResources.gotoOrganisationsOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationsOverview');
});

// Navigate to sub types in Organisations Overview
await safeStep('gotoBuildOrganisationTrees', async () => {
  await humanResources.gotoBuildOrganisationTrees();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildOrganisationTrees');
});

await safeStep('gotoCompanies', async () => {
  await humanResources.gotoCompanies();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompanies');
});

await safeStep('gotoWorkGroups', async () => {
  await humanResources.gotoWorkGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkGroups');
});

await safeStep('gotoEmployees', async () => {
  await humanResources.gotoEmployees();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEmployees');
});

await safeStep('gotoPersonsUsers', async () => {
  await humanResources.gotoPersonsUsers();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsers');
});

// Navigate to sub types in Organisations Data
await safeStep('gotoOrganisationData', async () => {
  await humanResources.gotoOrganisationData();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationData');
});

await safeStep('gotoOrganisationReminders', async () => {
  await humanResources.gotoOrganisationReminders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationReminders');
});

await safeStep('gotoOrganisationDocuments', async () => {
  await humanResources.gotoOrganisationDocuments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationDocuments');
});

await safeStep('gotoOrganisationAbsences', async () => {
  await humanResources.gotoOrganisationAbsences();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationAbsences');
});

await safeStep('gotoPunchinPunchout', async () => {
  await humanResources.gotoPunchinPunchout();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPunchinPunchout');
});

// Navigate to sub types in Stakeholder Management
await safeStep('gotoStakeholderManagement', async () => {
  await humanResources.gotoStakeholderManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoStakeholderManagement');
});

await safeStep('gotoVendorIssues', async () => {
  await humanResources.gotoVendorIssues();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoVendorIssues');
});

// Navigate to sub types in Permits and Qualifications
await safeStep('gotoPermitsandQualifications', async () => {
  await humanResources.gotoPermitsandQualifications();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitsandQualifications');
});

await safeStep('gotoPersonPermits', async () => {
  await humanResources.gotoPersonPermits();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermits');
});

// Navigate to sub types in Data Setup
await safeStep('gotoDataSetup', async () => {
  await humanResources.gotoDataSetup();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoOrganisationGroups', async () => {
  await humanResources.gotoOrganisationGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationGroups');
});

await safeStep('gotoProfessions', async () => {
  await humanResources.gotoProfessions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProfessions');
});

await safeStep('gotoPermits', async () => {
  await humanResources.gotoPermits();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermits');
});

await safeStep('gotoEmployeeGroups', async () => {
  await humanResources.gotoEmployeeGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEmployeeGroups');
});

await safeStep('gotoAvailabilityProfiles', async () => {
  await humanResources.gotoAvailabilityProfiles();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAvailabilityProfiles');
});

// Navigate to sub types in Configuration
await safeStep('gotoConfiguration', async () => {
  await humanResources.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfiguration', async () => {
  await humanResources.gotoAccessConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
});

}

// Main visual regression test
test('Visual Regression Test - Human Resources: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});