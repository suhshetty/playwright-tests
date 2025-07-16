// tests/OperationAndMaintenanceNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Operation And Maintenance', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, operationAndMaintenance } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await operationAndMaintenance.clickOperationAndMaintenance();

  // === Maintenance Incidents Overview ===
  await operationAndMaintenance.gotoMaintenanceIncidentsOverview();
  await operationAndMaintenance.gotoMaintenanceIncident();

  // === Task Planning Overview ===
  await operationAndMaintenance.gotoTaskPlanningOverview();
  await operationAndMaintenance.gotoPPMRegistration();
  await operationAndMaintenance.gotoAnnualTaskBudgets();
  await operationAndMaintenance.gotoPendingStandardTask();
  await operationAndMaintenance.gotoObjectsShowingPendingStandardTasks();
  await operationAndMaintenance.gotoServicePartners();
  await operationAndMaintenance.gotoTaskInstance();
  await operationAndMaintenance.gotoTaskChecklist();
  await operationAndMaintenance.gotoTaskChecklistPoint();

  // === Approved PPM ===
  await operationAndMaintenance.gotoApprovedPPM();
  await operationAndMaintenance.gotoApprovedPPMSubType();
  await operationAndMaintenance.gotoAnnualTaskBudget();

  // === Incidents Overview ===
  await operationAndMaintenance.gotoIncidentsOverview();
  await operationAndMaintenance.gotoFailure();
  await operationAndMaintenance.gotoIssues();
  await operationAndMaintenance.gotoCheckItem();
  await operationAndMaintenance.gotoCleaningTask();
  await operationAndMaintenance.gotoIncidentCategory1s();
  await operationAndMaintenance.gotoIncidentCategory2s();
  await operationAndMaintenance.gotoAllIncidents();

  // === Work Orders Overview ===
  await operationAndMaintenance.gotoWorkOrdersOverview();
  await operationAndMaintenance.gotoWorkOrder();
  await operationAndMaintenance.gotoWorkOrderExternal();
  await operationAndMaintenance.gotoWorkOrderAssignedCostWOO();
  await operationAndMaintenance.gotoTimeRegistrationWOO();
  await operationAndMaintenance.gotoInspections();
  await operationAndMaintenance.gotoReccuringIncidents();
  await operationAndMaintenance.gotoChecklists();
  await operationAndMaintenance.gotoChecklistPoints();
  await operationAndMaintenance.gotoChecklistIncidents();

  // === Costs and Resource Usage ===
  await operationAndMaintenance.gotoCostsAndResourceUsage();
  await operationAndMaintenance.gotoElectronicInvoices();
  await operationAndMaintenance.gotoWorkOrderAssignedCostCRU();
  await operationAndMaintenance.gotoTimeRegistrationCRU();
  await operationAndMaintenance.gotoWorkOrderMaterial();
  await operationAndMaintenance.gotoTransaction();

  // === Service Contracts Overview ===
  await operationAndMaintenance.gotoServiceContractsOverview();
  await operationAndMaintenance.gotoServiceContract();
  await operationAndMaintenance.gotoServiceContractReminder();
  await operationAndMaintenance.gotoServiceContractPayments();
  await operationAndMaintenance.gotoServiceContractPaymemtItems();
  await operationAndMaintenance.gotoServiceContractItem();

  // === Standard Tasks Overview ===
  await operationAndMaintenance.gotoStandardTasksOverview();
  await operationAndMaintenance.gotoStandardTaskManagement();
  await operationAndMaintenance.gotoStandardTaskObjectTypeManagement();
  await operationAndMaintenance.gotoStandardTask();
  await operationAndMaintenance.gotoStandardChecklistManagement();
  await operationAndMaintenance.gotoStandardCheckpointObjectTypeManagement();
  await operationAndMaintenance.gotoStandardChecklist();
  await operationAndMaintenance.gotoStandardCheckPoint();
  await operationAndMaintenance.gotoCheckpointGroups();
  await operationAndMaintenance.gotoPendingStandardTaskOnSite();

  // === Data Setup ===
  await operationAndMaintenance.gotoDataSetup();
  await operationAndMaintenance.gotoTargetArea();
  await operationAndMaintenance.gotoScheduleType();
  await operationAndMaintenance.gotoTaskCategories();
  await operationAndMaintenance.gotoTaskSubcategories();
  await operationAndMaintenance.gotoTaskClassification();
  await operationAndMaintenance.gotoTaskSet();
  await operationAndMaintenance.gotoIncidentPriorities();
  await operationAndMaintenance.gotoTaskClassificationRelation();
  await operationAndMaintenance.gotoHealthSafetyAndEnvironmentItems();

  // === Configuration ===
  await operationAndMaintenance.gotoConfiguration();
  await operationAndMaintenance.gotoAccessConfiguration();
});