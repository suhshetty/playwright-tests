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
  'gotoHomePage', 'gotoModuleMenu', 'gotoProjectManagement',
  'gotoProjectInitiatives', 'gotoPurchaseOrder', 'gotoMaintenanceIncidents', 'clickRegisterMaintenanceIncidents',
  'gotoProjectsOverview', 'gotoProjects', 'clickRegisterProjects', 'gotoAnnualBudgetsForProjects', 'clickRegisterAnnualBudgetsForProjects', 'gotoTaskPlanning', 'clickRegisterTaskPlanning', 'gotoTaskManagement', 'gotoProjectAnnualTaskBudgets', 'gotoWorkOrders', 'clickRegisterWorkOrders', 'gotoInspections', 'clickRegisterInspections', 'gotoCheckItems',
  'gotoProjectDetails', 'gotoProjectOrganisations', 'gotoProjectAssessments', 'gotoProjectChangeManagement',
  'gotoProjectContractsOverview', 'gotoProjectContracts', 'clickRegisterProjectContracts', 'gotoProjectContractPayments',
  'gotoCostsAndResourceUsage', 'gotoElectronicInvoices', 'gotoWorkOrderCosts', 'clickRegisterWorkOrderCosts', 'gotoTimeRegistration', 'gotoProjectWorkOrderMaterials', 'clickRegisterProjectWorkOrderMaterials', 'gotoTransactions',
  'gotoProjectWeb', 'gotoProjectTreeWithDocuments', 'gotoProjectWebSubmodule',
  'gotoStandardTasksOverview', 'gotoProjectStandardTasks', 'clickRegisterProjectStandardTasks',
  'gotoDataSetup', 'gotoProjectGroups', 'clickRegisterProjectGroups', 'gotoTaskSets', 'clickRegisterTaskSets',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoProjectManagement', async () => {
    await projectManagement.clickProjectManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectManagement');
  });

  // === Project Initiatives ===
  await safeStep('gotoProjectInitiatives', async () => {
    await projectManagement.gotoProjectInitiatives();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectInitiatives');
  });

  await safeStep('gotoPurchaseOrder', async () => {
    await projectManagement.gotoPurchaseOrder();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseOrder');
  });

  await safeStep('gotoMaintenanceIncidents', async () => {
    await projectManagement.gotoMaintenanceIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidents');

    // click add -> screenshot -> close -> screenshot
    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterMaintenanceIncidents');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterMaintenanceIncidents_close');
  });

  // === Projects Overview ===
  await safeStep('gotoProjectsOverview', async () => {
    await projectManagement.gotoProjectsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectsOverview');
  });

  await safeStep('gotoProjects', async () => {
    await projectManagement.gotoProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjects');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjects');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjects_close');
  });

  await safeStep('gotoAnnualBudgetsForProjects', async () => {
    await projectManagement.gotoAnnualBudgetsForProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualBudgetsForProjects');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAnnualBudgetsForProjects');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAnnualBudgetsForProjects_close');
  });

  await safeStep('gotoTaskPlanning', async () => {
    await projectManagement.gotoTaskPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPlanning');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskPlanning');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskPlanning_close');
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

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrders');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrders_close');
  });

  await safeStep('gotoInspections', async () => {
    await projectManagement.gotoInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterInspections');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterInspections_close');
  });

  await safeStep('gotoCheckItems', async () => {
    await projectManagement.gotoCheckItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItems');
  });

  // === Project Details ===
  await safeStep('gotoProjectDetails', async () => {
    await projectManagement.gotoProjectDetails();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectDetails');
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

  // === Project Contracts Overview ===
  await safeStep('gotoProjectContractsOverview', async () => {
    await projectManagement.gotoProjectContractsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContractsOverview');
  });

  await safeStep('gotoProjectContracts', async () => {
    await projectManagement.gotoProjectContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContracts');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectContracts');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectContracts_close');
  });

  await safeStep('gotoProjectContractPayments', async () => {
    await projectManagement.gotoProjectContractPayments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContractPayments');
  });

  // === Costs and Resource Usage ===
  await safeStep('gotoCostsAndResourceUsage', async () => {
    await projectManagement.gotoCostsAndResourceUsage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostsAndResourceUsage');
  });

  await safeStep('gotoElectronicInvoices', async () => {
    await projectManagement.gotoElectronicInvoices();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoElectronicInvoices');
  });

  await safeStep('gotoWorkOrderCosts', async () => {
    await projectManagement.gotoWorkOrderCosts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCosts');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrderCosts');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrderCosts_close');
  });

  await safeStep('gotoTimeRegistration', async () => {
    await projectManagement.gotoTimeRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeRegistration');
  });

  await safeStep('gotoProjectWorkOrderMaterials', async () => {
    await projectManagement.gotoProjectWorkOrderMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWorkOrderMaterials');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectWorkOrderMaterials');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectWorkOrderMaterials_close');
  });

  await safeStep('gotoTransactions', async () => {
    await projectManagement.gotoTransactions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTransactions');
  });

  // === Project Web ===
  await safeStep('gotoProjectWeb', async () => {
    await projectManagement.gotoProjectWeb();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWeb');
  });

  await safeStep('gotoProjectTreeWithDocuments', async () => {
    await projectManagement.gotoProjectTreeWithDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectTreeWithDocuments');
  });

  await safeStep('gotoProjectWebSubmodule', async () => {
    await projectManagement.gotoProjectWebSubmodule();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWebSubmodule');
  });

  // === Standard Tasks Overview ===
  await safeStep('gotoStandardTasksOverview', async () => {
    await projectManagement.gotoStandardTasksOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardTasksOverview');
  });

  await safeStep('gotoProjectStandardTasks', async () => {
    await projectManagement.gotoProjectStandardTasks();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectStandardTasks');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectStandardTasks');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectStandardTasks_close');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await projectManagement.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoProjectGroups', async () => {
    await projectManagement.gotoProjectGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectGroups');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectGroups');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectGroups_close');
  });

  await safeStep('gotoTaskSets', async () => {
    await projectManagement.gotoTaskSets();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskSets');

    await projectManagement.clickElement(projectManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskSets');
    await projectManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskSets_close');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await projectManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfigurations', async () => {
    await projectManagement.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Project Management: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
