// File: HelpdeskManagementNavigation.spec.js
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
  'gotoFailures', 'gotoIssues', 'gotoConditionAssessmentType', 'gotoReleaseItems', 'gotoIncidentCategory1s', 'gotoIncidentCategory2s', 'gotoAllIncidents',
  'gotoWorkOrdersOverview', 'gotoWorkOrders', 'gotoServicePartners', 'gotoSLAKPIDemands', 'gotoSLAKPIDemandIncidentTypes',
  'gotoNotificationsandReminders', 'gotoReminders',
  'gotoIncidentGroups', 'gotoIncidentTypes', 'gotoTaskPriorities', 'gotoProfessions',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, helpdeskManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Home Page
await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Main Helpdesk Management module
await safeStep('gotoHelpdeskManagement', async () => {
  await helpdeskManagement.clickHelpdeskManagement();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHelpdeskManagement');
});

// Incidents Overview
await safeStep('gotoIncidentsOverview', async () => {
  await helpdeskManagement.gotoIncidentsOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentsOverview');
});

await safeStep('gotoFailures', async () => {
  await helpdeskManagement.gotoFailures();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailures');
});

await safeStep('gotoIssues', async () => {
  await helpdeskManagement.gotoIssues();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIssues');
});

await safeStep('gotoConditionAssessmentType', async () => {
  await helpdeskManagement.gotoConditionAssessmentType();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentType');
});

await safeStep('gotoReleaseItems', async () => {
  await helpdeskManagement.gotoReleaseItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoReleaseItems');
});

await safeStep('gotoIncidentCategory1s', async () => {
  await helpdeskManagement.gotoIncidentCategory1s();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory1s');
});

await safeStep('gotoIncidentCategory2s', async () => {
  await helpdeskManagement.gotoIncidentCategory2s();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory2s');
});

await safeStep('gotoAllIncidents', async () => {
  await helpdeskManagement.gotoAllIncidents();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAllIncidents');
});

// Work Orders Overview
await safeStep('gotoWorkOrdersOverview', async () => {
  await helpdeskManagement.gotoWorkOrdersOverview();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersOverview');
});

await safeStep('gotoWorkOrders', async () => {
  await helpdeskManagement.gotoWorkOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
});

// Service Information Overview
await safeStep('gotoServiceInformationOverview', async () => {
  await helpdeskManagement.gotoServiceInformationOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceInformationOverview');
});

await safeStep('gotoServicePartners', async () => {
  await helpdeskManagement.gotoServicePartners();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
});

await safeStep('gotoSLAKPIDemands', async () => {
  await helpdeskManagement.gotoSLAKPIDemands();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSLAKPIDemands');
});

await safeStep('gotoSLAKPIDemandIncidentTypes', async () => {
  await helpdeskManagement.gotoSLAKPIDemandIncidentTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSLAKPIDemandIncidentTypes');
});

// Notifications and Reminders
await safeStep('gotoNotificationsandReminders', async () => {
  await helpdeskManagement.gotoNotificationsandReminders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationsandReminders');
});

await safeStep('gotoReminders', async () => {
  await helpdeskManagement.gotoReminders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoReminders');
});

// Data Setup
await safeStep('gotoDataSetup', async () => {
  await helpdeskManagement.gotoDataSetup();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoIncidentGroups', async () => {
  await helpdeskManagement.gotoIncidentGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentGroups');
});

await safeStep('gotoIncidentTypes', async () => {
  await helpdeskManagement.gotoIncidentTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentTypes');
});

await safeStep('gotoTaskPriorities', async () => {
  await helpdeskManagement.gotoTaskPriorities();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPriorities');
});

await safeStep('gotoProfessions', async () => {
  await helpdeskManagement.gotoProfessions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProfessions');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await helpdeskManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfigurations', async () => {
  await helpdeskManagement.gotoAccessConfigurations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
});
}

// Main visual regression test
test('Visual Regression Test - Helpdesk Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});

