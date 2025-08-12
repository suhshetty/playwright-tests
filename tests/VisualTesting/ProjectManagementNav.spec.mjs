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
  'gotoHomePage', 'gotoModuleMenu', 'gotoProjectManagement',
  'gotoProjectInitiatives', 'gotoPurchaseOrder', 'gotoMaintenanceIncidents', 'clickRegisterMaintenanceIncidents',
  'gotoProjectsOverview', 'gotoProjects', 'clickRegisterProjects', 'gotoAnnualBudgetsForProjects', 'clickRegisterAnnualBudgetsForProjects',
  'gotoTaskPlanningOverview', 'gotoTaskPlanning', 'clickRegisterTaskPlanning',
  'gotoWorkOrdersOverview', 'gotoWorkOrders', 'clickRegisterWorkOrders',
  'gotoInspectionsOverview', 'gotoInspections', 'clickRegisterInspections',
  'gotoProjectContractsOverview', 'gotoProjectContracts', 'clickRegisterProjectContracts',
  'gotoWorkOrderCostsOverview', 'gotoWorkOrderCosts', 'clickRegisterWorkOrderCosts',
  'gotoProjectWorkOrderMaterialsOverview', 'gotoProjectWorkOrderMaterials', 'clickRegisterProjectWorkOrderMaterials',
  'gotoProjectStandardTasksOverview', 'gotoProjectStandardTasks', 'clickRegisterProjectStandardTasks',
  'gotoDataSetup', 'gotoProjectGroups', 'clickRegisterProjectGroups', 'gotoTaskSets', 'clickRegisterTaskSets',
  'gotoConfiguration', 'gotoAccessConfiguration'
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
    await projectManagement.clickRegisterMaintenanceIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterMaintenanceIncidents');
  });

  // === Projects Overview ===
  await safeStep('gotoProjectsOverview', async () => {
    await projectManagement.gotoProjectsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectsOverview');
  });

  await safeStep('gotoProjects', async () => {
    await projectManagement.gotoProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjects');
    await projectManagement.clickRegisterProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjects');
  });

  await safeStep('gotoAnnualBudgetsForProjects', async () => {
    await projectManagement.gotoAnnualBudgetsForProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualBudgetsForProjects');
    await projectManagement.clickRegisterAnnualBudgetsForProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAnnualBudgetsForProjects');
  });

  // === Task Planning Overview ===
  await safeStep('gotoTaskPlanningOverview', async () => {
    await projectManagement.gotoTaskPlanningOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPlanningOverview');
  });

  await safeStep('gotoTaskPlanning', async () => {
    await projectManagement.gotoTaskPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPlanning');
    await projectManagement.clickRegisterTaskPlanning();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskPlanning');
  });

  // === Work Orders Overview ===
  await safeStep('gotoWorkOrdersOverview', async () => {
    await projectManagement.gotoWorkOrdersOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersOverview');
  });

  await safeStep('gotoWorkOrders', async () => {
    await projectManagement.gotoWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
    await projectManagement.clickRegisterWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrders');
  });

  // === Inspections Overview ===
  await safeStep('gotoInspectionsOverview', async () => {
    await projectManagement.gotoInspectionsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspectionsOverview');
  });

  await safeStep('gotoInspections', async () => {
    await projectManagement.gotoInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');
    await projectManagement.clickRegisterInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterInspections');
  });

  // === Project Contracts Overview ===
  await safeStep('gotoProjectContractsOverview', async () => {
    await projectManagement.gotoProjectContractsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContractsOverview');
  });

  await safeStep('gotoProjectContracts', async () => {
    await projectManagement.gotoProjectContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectContracts');
    await projectManagement.clickRegisterProjectContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectContracts');
  });

  // === Work Order Costs Overview ===
  await safeStep('gotoWorkOrderCostsOverview', async () => {
    await projectManagement.gotoWorkOrderCostsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCostsOverview');
  });

  await safeStep('gotoWorkOrderCosts', async () => {
    await projectManagement.gotoWorkOrderCosts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCosts');
    await projectManagement.clickRegisterWorkOrderCosts();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrderCosts');
  });

  // === Project Work Order Materials Overview ===
  await safeStep('gotoProjectWorkOrderMaterialsOverview', async () => {
    await projectManagement.gotoProjectWorkOrderMaterialsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWorkOrderMaterialsOverview');
  });

  await safeStep('gotoProjectWorkOrderMaterials', async () => {
    await projectManagement.gotoProjectWorkOrderMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectWorkOrderMaterials');
    await projectManagement.clickRegisterProjectWorkOrderMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectWorkOrderMaterials');
  });

  // === Project Standard Tasks Overview ===
  await safeStep('gotoProjectStandardTasksOverview', async () => {
    await projectManagement.gotoProjectStandardTasksOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectStandardTasksOverview');
  });

  await safeStep('gotoProjectStandardTasks', async () => {
    await projectManagement.gotoProjectStandardTasks();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectStandardTasks');
    await projectManagement.clickRegisterProjectStandardTasks();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectStandardTasks');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await projectManagement.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoProjectGroups', async () => {
    await projectManagement.gotoProjectGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProjectGroups');
    await projectManagement.clickRegisterProjectGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterProjectGroups');
  });

  await safeStep('gotoTaskSets', async () => {
    await projectManagement.gotoTaskSets();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskSets');
    await projectManagement.clickRegisterTaskSets();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskSets');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await projectManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await projectManagement.gotoAccessConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
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