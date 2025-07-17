// File: ProjectManagementNav.spec.js
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

// Screens to validate
const labels = [
  'gotoPurchaseOrder', 'gotoMaintenanceIncidents',
  'gotoProjects', 'gotoAnnualBudgetForProjects', 'gotoTaskPlanning',
  'gotoTaskManagement', 'gotoProjectAnnualTaskBudgets', 'gotoWorkOrders', 'gotoInspections', 'gotoCheckItems',
  'gotoProjectOrganisations', 'gotoProjectAssessments', 'gotoProjectChangeManagement',
  'gotoProjectContrcats', 'gotoProjectContrcatPayments',
  'gotoElectronicInvoices', 'gotoWorkOrderCosts', 'gotoTimeRegistration',
  'gotoProjectWorkOrderMaterials', 'gotoTransactions',
  'gotoProjectTreeWithDocuments', 'gotoProjectWebSubmodule',
  'gotoProjectStandardTasks',
  'gotoProjectGroups', 'gotoTasksSets',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  // Main module navigation
await safeStep('clickProjectManagement', async () => {
  await projectManagement.clickProjectManagement();
  //await waitForProcessingAndTakeScreenshot(page, env, 'clickProjectManagement');
});

// Sub module: Project Initiatives
await safeStep('gotoProjectInitiatives', async () => {
  await projectManagement.gotoProjectInitiatives();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectInitiatives');
});

await safeStep('gotoPurchaseOrder', async () => {
  await projectManagement.gotoPurchaseOrder();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseOrder');
});

await safeStep('gotoMaintenanceIncidents', async () => {
  await projectManagement.gotoMaintenanceIncidents();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidents');
});

// Sub module: Projects Overview
await safeStep('gotoProjectsOverview', async () => {
  await projectManagement.gotoProjectsOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectsOverview');
});

await safeStep('gotoProjects', async () => {
  await projectManagement.gotoProjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjects');
});

await safeStep('gotoAnnualBudgetForProjects', async () => {
  await projectManagement.gotoAnnualBudgetForProjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualBudgetForProjects');
});

await safeStep('gotoTaskPlanning', async () => {
  await projectManagement.gotoTaskPlanning();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPlanning');
});

await safeStep('gotoTaskManagement', async () => {
  await projectManagement.gotoTaskManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagement');
});

await safeStep('gotoProjectAnnualTaskBudgets', async () => {
  await projectManagement.gotoProjectAnnualTaskBudgets();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectAnnualTaskBudgets');
});

await safeStep('gotoWorkOrders', async () => {
  await projectManagement.gotoWorkOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
});

await safeStep('gotoInspections', async () => {
  await projectManagement.gotoInspections();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');
});

await safeStep('gotoCheckItems', async () => {
  await projectManagement.gotoCheckItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItems');
});

// Sub module: Project Details
await safeStep('gotoProjectDetails', async () => {
  await projectManagement.gotoProjectDetails();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectDetails');
});

await safeStep('gotoProjectOrganisations', async () => {
  await projectManagement.gotoProjectOrganisations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectOrganisations');
});

await safeStep('gotoProjectAssessments', async () => {
  await projectManagement.gotoProjectAssessments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectAssessments');
});

await safeStep('gotoProjectChangeManagement', async () => {
  await projectManagement.gotoProjectChangeManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectChangeManagement');
});

// Sub module: Project Contracts Overview
await safeStep('gotoProjectContractsOverview', async () => {
  await projectManagement.gotoProjectContractsOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContractsOverview');
});

await safeStep('gotoProjectContrcats', async () => {
  await projectManagement.gotoProjectContrcats();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContrcats');
});

await safeStep('gotoProjectContrcatPayments', async () => {
  await projectManagement.gotoProjectContrcatPayments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContrcatPayments');
});

// Sub module: Costs and Resource Usage
await safeStep('gotoCostsAndResourceUsage', async () => {
  await projectManagement.gotoCostsAndResourceUsage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostsAndResourceUsage');
});

await safeStep('gotoElectronicInvoices', async () => {
  await projectManagement.gotoElectronicInvoices();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoElectronicInvoices');
});

await safeStep('gotoWorkOrderCosts', async () => {
  await projectManagement.gotoWorkOrderCosts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCosts');
});

await safeStep('gotoTimeRegistration', async () => {
  await projectManagement.gotoTimeRegistration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeRegistration');
});

await safeStep('gotoProjectWorkOrderMaterials', async () => {
  await projectManagement.gotoProjectWorkOrderMaterials();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWorkOrderMaterials');
});

await safeStep('gotoTransactions', async () => {
  await projectManagement.gotoTransactions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTransactions');
});

// Sub module: Project Web
await safeStep('gotoProjectWeb', async () => {
  await projectManagement.gotoProjectWeb();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWeb');
});

await safeStep('gotoProjectTreeWithDocuments', async () => {
  await projectManagement.gotoProjectTreeWithDocuments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectTreeWithDocuments');
});

await safeStep('gotoProjectWebSubmodule', async () => {
  await projectManagement.gotoProjectWebSubmodule();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWebSubmodule');
});

// Sub module: Standard Tasks Overview
await safeStep('gotoStandardsTasksOverview', async () => {
  await projectManagement.gotoStandardsTasksOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardsTasksOverview');
});

await safeStep('gotoProjectStandardTasks', async () => {
  await projectManagement.gotoProjectStandardTasks();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectStandardTasks');
});

// Sub module: Data Setup
await safeStep('gotoDataSetup', async () => {
  await projectManagement.gotoDataSetup();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoProjectGroups', async () => {
  await projectManagement.gotoProjectGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectGroups');
});

await safeStep('gotoTasksSets', async () => {
  await projectManagement.gotoTasksSets();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTasksSets');
});

// Sub module: Configuration
await safeStep('gotoConfiguration', async () => {
  await projectManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfigurations', async () => {
  await projectManagement.gotoAccessConfigurations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
});
};

// Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});