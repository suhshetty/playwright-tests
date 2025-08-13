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

  // === Project Initiatives ===
  await projectManagement.gotoProjectInitiatives();
  await projectManagement.gotoPurchaseOrder();
  await projectManagement.gotoMaintenanceIncidents();
  await projectManagement.clickRegisterMaintenanceIncidents();

  // === Projects Overview ===
  await projectManagement.gotoProjectsOverview();
  await projectManagement.gotoProjects();
  await projectManagement.clickRegisterProjects();
  await projectManagement.gotoAnnualBudgetsForProjects();
  await projectManagement.clickRegisterAnnualBudgetsForProjects();
  await projectManagement.gotoTaskPlanning();
  await projectManagement.clickRegisterTaskPlanning();
  await projectManagement.gotoTaskManagement();
  await projectManagement.gotoProjectAnnualTaskBudgets();
  await projectManagement.gotoWorkOrders();
  await projectManagement.clickRegisterWorkOrders();
  await projectManagement.gotoInspections();
  await projectManagement.clickRegisterInspections();
  await projectManagement.gotoCheckItems();

  // === Project Details ===
  await projectManagement.gotoProjectDetails();
  await projectManagement.gotoProjectOrganisations();
  await projectManagement.gotoProjectAssessments();
  await projectManagement.gotoProjectChangeManagement();

  // === Project Contracts Overview ===
  await projectManagement.gotoProjectContractsOverview();
  await projectManagement.gotoProjectContracts(); // Fixed: was gotoProjectContrcats
  await projectManagement.clickRegisterProjectContracts();
  await projectManagement.gotoProjectContractPayments(); // Fixed: was gotoProjectContrcatPayments

  // === Costs and Resource Usage ===
  await projectManagement.gotoCostsAndResourceUsage();
  await projectManagement.gotoElectronicInvoices();
  await projectManagement.gotoWorkOrderCosts();
  await projectManagement.clickRegisterWorkOrderCosts();
  await projectManagement.gotoTimeRegistration();
  await projectManagement.gotoProjectWorkOrderMaterials();
  await projectManagement.clickRegisterProjectWorkOrderMaterials();
  await projectManagement.gotoTransactions();

  // === Project Web ===
  await projectManagement.gotoProjectWeb();
  await projectManagement.gotoProjectTreeWithDocuments();
  await projectManagement.gotoProjectWebSubmodule();

  // === Standard Tasks Overview ===
  await projectManagement.gotoStandardTasksOverview(); // Fixed: was gotoStandardsTasksOverview
  await projectManagement.gotoProjectStandardTasks();
  await projectManagement.clickRegisterProjectStandardTasks();

  // === Data Setup ===
  await projectManagement.gotoDataSetup();
  await projectManagement.gotoProjectGroups();
  await projectManagement.clickRegisterProjectGroups();
  await projectManagement.gotoTaskSets(); // Fixed: was gotoTasksSets
  await projectManagement.clickRegisterTaskSets();

  // === Configuration ===
  await projectManagement.gotoConfiguration();
  await projectManagement.gotoAccessConfigurations();
});