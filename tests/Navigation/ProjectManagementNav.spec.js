// tests/ProjectManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Project Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await projectManagement.clickProjectManagement();

  // === Maintenance Incidents Overview ===
  await projectManagement.gotoMaintenanceIncidentsOverview();
  await projectManagement.gotoMaintenanceIncidents();
  await projectManagement.clickRegisterMaintenanceIncidents();

  // === Projects Overview ===
  await projectManagement.gotoProjectsOverview();
  await projectManagement.gotoProjects();
  await projectManagement.clickRegisterProjects();
  await projectManagement.gotoAnnualBudgetsForProjects();
  await projectManagement.clickRegisterAnnualBudgetsForProjects();

  // === Task Planning Overview ===
  await projectManagement.gotoTaskPlanningOverview();
  await projectManagement.gotoTaskPlanning();
  await projectManagement.clickRegisterTaskPlanning();

  // === Work Orders Overview ===
  await projectManagement.gotoWorkOrdersOverview();
  await projectManagement.gotoWorkOrders();
  await projectManagement.clickRegisterWorkOrders();

  // === Inspections Overview ===
  await projectManagement.gotoInspectionsOverview();
  await projectManagement.gotoInspections();
  await projectManagement.clickRegisterInspections();

  // === Project Contracts Overview ===
  await projectManagement.gotoProjectContractsOverview();
  await projectManagement.gotoProjectContracts();
  await projectManagement.clickRegisterProjectContracts();

  // === Work Order Costs Overview ===
  await projectManagement.gotoWorkOrderCostsOverview();
  await projectManagement.gotoWorkOrderCosts();
  await projectManagement.clickRegisterWorkOrderCosts();

  // === Project Work Order Materials Overview ===
  await projectManagement.gotoProjectWorkOrderMaterialsOverview();
  await projectManagement.gotoProjectWorkOrderMaterials();
  await projectManagement.clickRegisterProjectWorkOrderMaterials();

  // === Project Standard Tasks Overview ===
  await projectManagement.gotoProjectStandardTasksOverview();
  await projectManagement.gotoProjectStandardTasks();
  await projectManagement.clickRegisterProjectStandardTasks();

  // === Data Setup ===
  await projectManagement.gotoDataSetup();
  await projectManagement.gotoProjectGroups();
  await projectManagement.clickRegisterProjectGroups();
  await projectManagement.gotoTaskSets();
  await projectManagement.clickRegisterTaskSets();

  // === Configuration ===
  await projectManagement.gotoConfiguration();
  await projectManagement.gotoAccessConfiguration();
});