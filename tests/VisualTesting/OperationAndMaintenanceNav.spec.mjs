// File: OperationAndMaintenanceNav.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'gotoOperationAndMaintenance',
  'gotoMaintenanceIncidentsOverview', 'gotoMaintenanceIncident', 'clickRegisterMaintenanceIncidents',
  'gotoTaskPlanningOverview', 'gotoPPMRegistration', 'clickRegisterPPMRegistration', 'gotoAnnualTaskBudgets', 'gotoPendingStandardTask', 'gotoObjectsShowingPendingStandardTasks', 'gotoServicePartners', 'gotoTaskInstance', 'gotoTaskChecklist', 'gotoTaskChecklistPoint',
  'gotoApprovedPPM', 'gotoApprovedPPMSubType', 'gotoAnnualTaskBudget',
  'gotoIncidentsOverview', 'gotoFailure', 'clickRegisterFailures', 'gotoIssues', 'clickRegisterIssues', 'gotoCheckItem', 'gotoCleaningTask', 'gotoIncidentCategory1s', 'clickRegisterIncidentCategory1s', 'gotoIncidentCategory2s', 'gotoAllIncidents', 'clickRegisterAllIncidents',
  'gotoWorkOrdersOverview', 'gotoWorkOrder', 'clickRegisterWorkOrders', 'gotoWorkOrderExternal', 'clickRegisterWorkOrdersExternal', 'gotoWorkOrderAssignedCostWOO', 'clickRegisterWorkOrderAssignedCosts', 'gotoTimeRegistrationWOO', 'gotoInspections', 'clickRegisterInspections', 'gotoReccuringIncidents', 'clickRegisterRecurringIncidents', 'gotoChecklists', 'gotoChecklistPoints', 'gotoChecklistIncidents',
  'gotoCostsAndResourceUsage', 'gotoElectronicInvoices', 'gotoWorkOrderAssignedCostCRU', 'gotoTimeRegistrationCRU', 'gotoWorkOrderMaterial', 'gotoTransaction',
  'gotoServiceContractsOverview', 'gotoServiceContract', 'clickRegisterServiceContracts', 'gotoServiceContractReminder', 'gotoServiceContractPayments', 'gotoServiceContractPaymemtItems', 'gotoServiceContractItem',
  'gotoStandardTasksOverview', 'gotoStandardTaskManagement', 'gotoStandardTaskObjectTypeManagement', 'gotoStandardTask', 'clickRegisterStandardTasks', 'gotoStandardChecklistManagement', 'gotoStandardCheckpointObjectTypeManagement', 'gotoStandardChecklist', 'clickRegisterStandardChecklists', 'gotoStandardCheckPoint', 'clickRegisterStandardCheckpoints', 'gotoCheckpointGroups', 'clickRegisterCheckpointGroups', 'gotoPendingStandardTaskOnSite',
  'gotoDataSetup', 'gotoTargetArea', 'clickRegisterTargetAreas', 'gotoScheduleType', 'clickRegisterScheduleTypes', 'gotoTaskCategories', 'clickRegisterTaskCategories', 'gotoTaskSubcategories', 'gotoTaskClassification', 'clickRegisterTaskClassifications', 'gotoTaskSet', 'clickRegisterTaskSets', 'gotoIncidentPriorities', 'clickRegisterIncidentPriorities', 'gotoTaskClassificationRelation', 'clickRegisterTaskClassificationRelations', 'gotoHealthSafetyAndEnvironmentItems', 'clickRegisterHealthSafetyEnvironmentItems',
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, operationAndMaintenance } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoOperationAndMaintenance', async () => {
    await operationAndMaintenance.clickOperationAndMaintenance();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoOperationAndMaintenance');
  });

  // === Maintenance Incidents Overview ===
  await safeStep('gotoMaintenanceIncidentsOverview', async () => {
    await operationAndMaintenance.gotoMaintenanceIncidentsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentsOverview');
  });

  await safeStep('gotoMaintenanceIncident', async () => {
    await operationAndMaintenance.gotoMaintenanceIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncident');
    await operationAndMaintenance.clickRegisterMaintenanceIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterMaintenanceIncidents');
  });

  // === Task Planning Overview ===
  await safeStep('gotoTaskPlanningOverview', async () => {
    await operationAndMaintenance.gotoTaskPlanningOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPlanningOverview');
  });

  await safeStep('gotoPPMRegistration', async () => {
    await operationAndMaintenance.gotoPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistration');
    await operationAndMaintenance.clickRegisterPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterPPMRegistration');
  });

  await safeStep('gotoAnnualTaskBudgets', async () => {
    await operationAndMaintenance.gotoAnnualTaskBudgets();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualTaskBudgets');
  });

  await safeStep('gotoPendingStandardTask', async () => {
    await operationAndMaintenance.gotoPendingStandardTask();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPendingStandardTask');
  });

  await safeStep('gotoObjectsShowingPendingStandardTasks', async () => {
    await operationAndMaintenance.gotoObjectsShowingPendingStandardTasks();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectsShowingPendingStandardTasks');
  });

  await safeStep('gotoServicePartners', async () => {
    await operationAndMaintenance.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoTaskInstance', async () => {
    await operationAndMaintenance.gotoTaskInstance();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskInstance');
  });

  await safeStep('gotoTaskChecklist', async () => {
    await operationAndMaintenance.gotoTaskChecklist();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskChecklist');
  });

  await safeStep('gotoTaskChecklistPoint', async () => {
    await operationAndMaintenance.gotoTaskChecklistPoint();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskChecklistPoint');
  });

  // === Approved PPM ===
  await safeStep('gotoApprovedPPM', async () => {
    await operationAndMaintenance.gotoApprovedPPM();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoApprovedPPM');
  });

  await safeStep('gotoApprovedPPMSubType', async () => {
    await operationAndMaintenance.gotoApprovedPPMSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoApprovedPPMSubType');
  });

  await safeStep('gotoAnnualTaskBudget', async () => {
    await operationAndMaintenance.gotoAnnualTaskBudget();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualTaskBudget');
  });

  // === Incidents Overview ===
  await safeStep('gotoIncidentsOverview', async () => {
    await operationAndMaintenance.gotoIncidentsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentsOverview');
  });

  await safeStep('gotoFailure', async () => {
    await operationAndMaintenance.gotoFailure();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailure');
    await operationAndMaintenance.clickRegisterFailures();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterFailures');
  });

  await safeStep('gotoIssues', async () => {
    await operationAndMaintenance.gotoIssues();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIssues');
    await operationAndMaintenance.clickRegisterIssues();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIssues');
  });

  await safeStep('gotoCheckItem', async () => {
    await operationAndMaintenance.gotoCheckItem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItem');
  });

  await safeStep('gotoCleaningTask', async () => {
    await operationAndMaintenance.gotoCleaningTask();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCleaningTask');
  });

  await safeStep('gotoIncidentCategory1s', async () => {
    await operationAndMaintenance.gotoIncidentCategory1s();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory1s');
    await operationAndMaintenance.clickRegisterIncidentCategory1s();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIncidentCategory1s');
  });

  await safeStep('gotoIncidentCategory2s', async () => {
    await operationAndMaintenance.gotoIncidentCategory2s();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory2s');
  });

  await safeStep('gotoAllIncidents', async () => {
    await operationAndMaintenance.gotoAllIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAllIncidents');
    await operationAndMaintenance.clickRegisterAllIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterAllIncidents');
  });

  // === Work Orders Overview ===
  await safeStep('gotoWorkOrdersOverview', async () => {
    await operationAndMaintenance.gotoWorkOrdersOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersOverview');
  });

  await safeStep('gotoWorkOrder', async () => {
    await operationAndMaintenance.gotoWorkOrder();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrder');
    await operationAndMaintenance.clickRegisterWorkOrders();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrders');
  });

  await safeStep('gotoWorkOrderExternal', async () => {
    await operationAndMaintenance.gotoWorkOrderExternal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderExternal');
    await operationAndMaintenance.clickRegisterWorkOrdersExternal();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrdersExternal');
  });

  await safeStep('gotoWorkOrderAssignedCostWOO', async () => {
    await operationAndMaintenance.gotoWorkOrderAssignedCostWOO();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAssignedCostWOO');
    await operationAndMaintenance.clickRegisterWorkOrderAssignedCosts();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterWorkOrderAssignedCosts');
  });

  await safeStep('gotoTimeRegistrationWOO', async () => {
    await operationAndMaintenance.gotoTimeRegistrationWOO();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeRegistrationWOO');
  });

  await safeStep('gotoInspections', async () => {
    await operationAndMaintenance.gotoInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');
    await operationAndMaintenance.clickRegisterInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterInspections');
  });

  await safeStep('gotoReccuringIncidents', async () => {
    await operationAndMaintenance.gotoReccuringIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReccuringIncidents');
    await operationAndMaintenance.clickRegisterRecurringIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterRecurringIncidents');
  });

  await safeStep('gotoChecklists', async () => {
    await operationAndMaintenance.gotoChecklists();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklists');
  });

  await safeStep('gotoChecklistPoints', async () => {
    await operationAndMaintenance.gotoChecklistPoints();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistPoints');
  });

  await safeStep('gotoChecklistIncidents', async () => {
    await operationAndMaintenance.gotoChecklistIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistIncidents');
  });

  // === Costs and Resource Usage ===
  await safeStep('gotoCostsAndResourceUsage', async () => {
    await operationAndMaintenance.gotoCostsAndResourceUsage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostsAndResourceUsage');
  });

  await safeStep('gotoElectronicInvoices', async () => {
    await operationAndMaintenance.gotoElectronicInvoices();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoElectronicInvoices');
  });

  await safeStep('gotoWorkOrderAssignedCostCRU', async () => {
    await operationAndMaintenance.gotoWorkOrderAssignedCostCRU();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAssignedCostCRU');
  });

  await safeStep('gotoTimeRegistrationCRU', async () => {
    await operationAndMaintenance.gotoTimeRegistrationCRU();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeRegistrationCRU');
  });

  await safeStep('gotoWorkOrderMaterial', async () => {
    await operationAndMaintenance.gotoWorkOrderMaterial();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderMaterial');
  });

  await safeStep('gotoTransaction', async () => {
    await operationAndMaintenance.gotoTransaction();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTransaction');
  });

  // === Service Contracts Overview ===
  await safeStep('gotoServiceContractsOverview', async () => {
    await operationAndMaintenance.gotoServiceContractsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractsOverview');
  });

  await safeStep('gotoServiceContract', async () => {
    await operationAndMaintenance.gotoServiceContract();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContract');
    await operationAndMaintenance.clickRegisterServiceContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterServiceContracts');
  });

  await safeStep('gotoServiceContractReminder', async () => {
    await operationAndMaintenance.gotoServiceContractReminder();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractReminder');
  });

  await safeStep('gotoServiceContractPayments', async () => {
    await operationAndMaintenance.gotoServiceContractPayments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractPayments');
  });

  await safeStep('gotoServiceContractPaymemtItems', async () => {
    await operationAndMaintenance.gotoServiceContractPaymemtItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractPaymemtItems');
  });

  await safeStep('gotoServiceContractItem', async () => {
    await operationAndMaintenance.gotoServiceContractItem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractItem');
  });

  // === Standard Tasks Overview ===
  await safeStep('gotoStandardTasksOverview', async () => {
    await operationAndMaintenance.gotoStandardTasksOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardTasksOverview');
  });

  await safeStep('gotoStandardTaskManagement', async () => {
    await operationAndMaintenance.gotoStandardTaskManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardTaskManagement');
  });

  await safeStep('gotoStandardTaskObjectTypeManagement', async () => {
    await operationAndMaintenance.gotoStandardTaskObjectTypeManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardTaskObjectTypeManagement');
  });

  await safeStep('gotoStandardTask', async () => {
    await operationAndMaintenance.gotoStandardTask();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardTask');
    await operationAndMaintenance.clickRegisterStandardTasks();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterStandardTasks');
  });

  await safeStep('gotoStandardChecklistManagement', async () => {
    await operationAndMaintenance.gotoStandardChecklistManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardChecklistManagement');
  });

  await safeStep('gotoStandardCheckpointObjectTypeManagement', async () => {
    await operationAndMaintenance.gotoStandardCheckpointObjectTypeManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardCheckpointObjectTypeManagement');
  });

  await safeStep('gotoStandardChecklist', async () => {
    await operationAndMaintenance.gotoStandardChecklist();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardChecklist');
    await operationAndMaintenance.clickRegisterStandardChecklists();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterStandardChecklists');
  });

  await safeStep('gotoStandardCheckPoint', async () => {
    await operationAndMaintenance.gotoStandardCheckPoint();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardCheckPoint');
    await operationAndMaintenance.clickRegisterStandardCheckpoints();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterStandardCheckpoints');
  });

  await safeStep('gotoCheckpointGroups', async () => {
    await operationAndMaintenance.gotoCheckpointGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckpointGroups');
    await operationAndMaintenance.clickRegisterCheckpointGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterCheckpointGroups');
  });

  await safeStep('gotoPendingStandardTaskOnSite', async () => {
    await operationAndMaintenance.gotoPendingStandardTaskOnSite();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPendingStandardTaskOnSite');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await operationAndMaintenance.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoTargetArea', async () => {
    await operationAndMaintenance.gotoTargetArea();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTargetArea');
    await operationAndMaintenance.clickRegisterTargetAreas();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTargetAreas');
  });

  await safeStep('gotoScheduleType', async () => {
    await operationAndMaintenance.gotoScheduleType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoScheduleType');
    await operationAndMaintenance.clickRegisterScheduleTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterScheduleTypes');
  });

  await safeStep('gotoTaskCategories', async () => {
    await operationAndMaintenance.gotoTaskCategories();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskCategories');
    await operationAndMaintenance.clickRegisterTaskCategories();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskCategories');
  });

  await safeStep('gotoTaskSubcategories', async () => {
    await operationAndMaintenance.gotoTaskSubcategories();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskSubcategories');
  });

  await safeStep('gotoTaskClassification', async () => {
    await operationAndMaintenance.gotoTaskClassification();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskClassification');
    await operationAndMaintenance.clickRegisterTaskClassifications();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskClassifications');
  });

  await safeStep('gotoTaskSet', async () => {
    await operationAndMaintenance.gotoTaskSet();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskSet');
    await operationAndMaintenance.clickRegisterTaskSets();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskSets');
  });

  await safeStep('gotoIncidentPriorities', async () => {
    await operationAndMaintenance.gotoIncidentPriorities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentPriorities');
    await operationAndMaintenance.clickRegisterIncidentPriorities();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterIncidentPriorities');
  });

  await safeStep('gotoTaskClassificationRelation', async () => {
    await operationAndMaintenance.gotoTaskClassificationRelation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskClassificationRelation');
    await operationAndMaintenance.clickRegisterTaskClassificationRelations();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterTaskClassificationRelations');
  });

  await safeStep('gotoHealthSafetyAndEnvironmentItems', async () => {
    await operationAndMaintenance.gotoHealthSafetyAndEnvironmentItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHealthSafetyAndEnvironmentItems');
    await operationAndMaintenance.clickRegisterHealthSafetyEnvironmentItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickRegisterHealthSafetyEnvironmentItems');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await operationAndMaintenance.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await operationAndMaintenance.gotoAccessConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
  });
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Operation And Maintenance: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});