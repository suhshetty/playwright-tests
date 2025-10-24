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
  'gotoFailures', 'clickRegisterFailures', 'clickCloseRegisterFailures',
  'gotoIssues', 'clickRegisterIssues', 'clickCloseRegisterIssues',
  'gotoConditionAssessmentType', 'clickRegisterConditionAssessmentType', 'clickCloseRegisterConditionAssessmentType',
  'gotoReleaseItems', 'clickRegisterReleaseItems', 'clickCloseRegisterReleaseItems',
  'gotoIncidentCategory1s', 'clickRegisterIncidentCategory1s', 'clickCloseRegisterIncidentCategory1s',
  'gotoIncidentCategory2s',
  'gotoAllIncidents', 'clickRegisterAllIncidents', 'clickCloseRegisterAllIncidents',

  'gotoWorkOrdersOverview', 'gotoWorkOrders', 'clickRegisterWorkOrders', 'clickCloseRegisterWorkOrders',

  'gotoServiceInformationOverview',
  'gotoServicePartners',
  'gotoSLAKPIDemands', 'clickRegisterSLAKPIDemands', 'clickCloseRegisterSLAKPIDemands',
  'gotoSLAKPIDemandIncidentTypes',

  'gotoNotificationsandReminders',
  'gotoReminders', 'clickRegisterReminders', 'clickCloseRegisterReminders',

  'gotoDataSetup',
  'gotoIncidentGroups', 'clickRegisterIncidentGroups', 'clickCloseRegisterIncidentGroups',
  'gotoIncidentTypes', 'clickRegisterIncidentTypes', 'clickCloseRegisterIncidentTypes',
  'gotoTaskPriorities', 'clickRegisterTaskPriorities', 'clickCloseRegisterTaskPriorities',
  'gotoProfessions', 'clickRegisterProfessions', 'clickCloseRegisterProfessions',

  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, helpdeskManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Home Page
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  });

  //Wait for 2 seconds to ensure all elements are loaded
  await page.waitForTimeout(2000);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  });

  //Wait for 2 seconds to ensure all elements are loaded
  await page.waitForTimeout(2000);

  // Main Helpdesk Management module
  await safeStep('gotoHelpdeskManagement', async () => {
    await helpdeskManagement.clickHelpdeskManagement();
  });

  // === Incidents Overview ===
  await safeStep('gotoIncidentsOverview', async () => {
    await helpdeskManagement.gotoIncidentsOverview();
  });

  // Failures
  await safeStep('gotoFailures', async () => {
    await helpdeskManagement.gotoFailures();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailures');
  });
  await safeStep('clickRegisterFailures', async () => {
    await helpdeskManagement.clickRegisterFailures();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterFailures');
  });
  await safeStep('clickCloseRegisterFailures', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterFailures');
  });

  // Issues
  await safeStep('gotoIssues', async () => {
    await helpdeskManagement.gotoIssues();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIssues');
  });
  await safeStep('clickRegisterIssues', async () => {
    await helpdeskManagement.clickRegisterIssues();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIssues');
  });
  await safeStep('clickCloseRegisterIssues', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterIssues');
  });

  // Condition Assessment Type
  await safeStep('gotoConditionAssessmentType', async () => {
    await helpdeskManagement.gotoConditionAssessmentType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentType');
  });
  await safeStep('clickRegisterConditionAssessmentType', async () => {
    await helpdeskManagement.clickRegisterConditionAssessmentType();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterConditionAssessmentType');
  });
  await safeStep('clickCloseRegisterConditionAssessmentType', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterConditionAssessmentType');
  });

  // Release Items
  await safeStep('gotoReleaseItems', async () => {
    await helpdeskManagement.gotoReleaseItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReleaseItems');
  });
  await safeStep('clickRegisterReleaseItems', async () => {
    await helpdeskManagement.clickRegisterReleaseItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterReleaseItems');
  });
  await safeStep('clickCloseRegisterReleaseItems', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterReleaseItems');
  });

  // Incident Category 1
  await safeStep('gotoIncidentCategory1s', async () => {
    await helpdeskManagement.gotoIncidentCategory1s();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory1s');
  });
  await safeStep('clickRegisterIncidentCategory1s', async () => {
    await helpdeskManagement.clickRegisterIncidentCategory1s();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIncidentCategory1s');
  });
  await safeStep('clickCloseRegisterIncidentCategory1s', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterIncidentCategory1s');
  });

  // Incident Category 2
  await safeStep('gotoIncidentCategory2s', async () => {
    await helpdeskManagement.gotoIncidentCategory2s();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory2s');
  });

  // All Incidents
  await safeStep('gotoAllIncidents', async () => {
    await helpdeskManagement.gotoAllIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAllIncidents');
  });
  await safeStep('clickRegisterAllIncidents', async () => {
    await helpdeskManagement.clickRegisterAllIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAllIncidents');
  });
  await safeStep('clickCloseRegisterAllIncidents', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterAllIncidents');
  });

  // === Work Orders Overview ===
  await safeStep('gotoWorkOrdersOverview', async () => {
    await helpdeskManagement.gotoWorkOrdersOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersOverview');
  });
  await safeStep('gotoWorkOrders', async () => {
    await helpdeskManagement.gotoWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
  });
  await safeStep('clickRegisterWorkOrders', async () => {
    await helpdeskManagement.clickRegisterWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrders');
  });
  await safeStep('clickCloseRegisterWorkOrders', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterWorkOrders');
  });

  // === Service Information Overview ===
  await safeStep('gotoServiceInformationOverview', async () => {
    await helpdeskManagement.gotoServiceInformationOverview();
  });

  await safeStep('gotoServicePartners', async () => {
    await helpdeskManagement.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoSLAKPIDemands', async () => {
    await helpdeskManagement.gotoSLAKPIDemands();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSLAKPIDemands');
  });
  await safeStep('clickRegisterSLAKPIDemands', async () => {
    await helpdeskManagement.clickRegisterSLAKPIDemands();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterSLAKPIDemands');
  });
  await safeStep('clickCloseRegisterSLAKPIDemands', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterSLAKPIDemands');
  });

  await safeStep('gotoSLAKPIDemandIncidentTypes', async () => {
    await helpdeskManagement.gotoSLAKPIDemandIncidentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSLAKPIDemandIncidentTypes');
  });

  // === Notifications and Reminders ===
  await safeStep('gotoNotificationsandReminders', async () => {
    await helpdeskManagement.gotoNotificationsandReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationsandReminders');
  });
  await safeStep('gotoReminders', async () => {
    await helpdeskManagement.gotoReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReminders');
  });
  await safeStep('clickRegisterReminders', async () => {
    await helpdeskManagement.clickRegisterReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterReminders');
  });
  await safeStep('clickCloseRegisterReminders', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterReminders');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await helpdeskManagement.gotoDataSetup();
  });

  await safeStep('gotoIncidentGroups', async () => {
    await helpdeskManagement.gotoIncidentGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentGroups');
  });
  await safeStep('clickRegisterIncidentGroups', async () => {
    await helpdeskManagement.clickRegisterIncidentGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIncidentGroups');
  });
  await safeStep('clickCloseRegisterIncidentGroups', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterIncidentGroups');
  });

  await safeStep('gotoIncidentTypes', async () => {
    await helpdeskManagement.gotoIncidentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentTypes');
  });
  await safeStep('clickRegisterIncidentTypes', async () => {
    await helpdeskManagement.clickRegisterIncidentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIncidentTypes');
  });
  await safeStep('clickCloseRegisterIncidentTypes', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterIncidentTypes');
  });

  await safeStep('gotoTaskPriorities', async () => {
    await helpdeskManagement.gotoTaskPriorities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPriorities');
  });
  await safeStep('clickRegisterTaskPriorities', async () => {
    await helpdeskManagement.clickRegisterTaskPriorities();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskPriorities');
  });
  await safeStep('clickCloseRegisterTaskPriorities', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterTaskPriorities');
  });

  await safeStep('gotoProfessions', async () => {
    await helpdeskManagement.gotoProfessions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProfessions');
  });
  await safeStep('clickRegisterProfessions', async () => {
    await helpdeskManagement.clickRegisterProfessions();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProfessions');
  });
  await safeStep('clickCloseRegisterProfessions', async () => {
    await helpdeskManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCloseRegisterProfessions');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await helpdeskManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });
  await safeStep('gotoAccessConfigurations', async () => {
    await helpdeskManagement.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });
};

// Main visual regression test
test('Visual Regression Test - Helpdesk Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
