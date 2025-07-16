// File: OperationAndMaintenanceNavigation.spec.js
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
  'gotoHomePage',
  'gotoModuleMenu',
  'clickOperationAndMaintenance',

  // Maintenance Incidents Overview
  'gotoMaintenanceIncidentsOverview',
  'gotoMaintenanceIncident',

  // Task Planning Overview
  'gotoTaskPlanningOverview',
  'gotoPPMRegistration',
  'gotoAnnualTaskBudgets',
  'gotoPendingStandardTask',
  'gotoObjectsShowingPendingStandardTasks',
  'gotoServicePartners',
  'gotoTaskInstance',
  'gotoTaskChecklist',
  'gotoTaskChecklistPoint',

  // Approved PPM
  'gotoApprovedPPM',
  'gotoApprovedPPMSubType',
  'gotoAnnualTaskBudget',

  // Incidents Overview
  'gotoIncidentsOverview',
  'gotoFailure',
  'gotoIssues',
  'gotoCheckItem',
  'gotoCleaningTask',
  'gotoIncidentCategory1s',
  'gotoIncidentCategory2s',
  'gotoAllIncidents',

  // Work Orders Overview
  'gotoWorkOrdersOverview',
  'gotoWorkOrder',
  'gotoWorkOrderExternal',
  'gotoWorkOrderAssignedCostWOO',
  'gotoTimeRegistrationWOO',
  'gotoInspections',
  'gotoChecklists',
  'gotoChecklistPoints',
  'gotoChecklistIncidents',

  // Costs and Resource Usage
  'gotoCostsAndResourceUsage',
  'gotoElectronicInvoices',
  'gotoWorkOrderAssignedCostCRU',
  'gotoTimeRegistrationCRU',
  'gotoWorkOrderMaterial',
  'gotoTransaction',

  // Service Contracts Overview
  'gotoServiceContractsOverview',
  'gotoServiceContract',
  'gotoServiceContractReminder',
  'gotoServiceContractPayments',
  'gotoServiceContractPaymemtItems',
  'gotoServiceContractItem',

  // Standard Tasks Overview
  'gotoStandardTasksOverview',
  'gotoStandardTaskManagement',
  'gotoStandardTaskObjectTypeManagement',
  'gotoStandardTask',
  'gotoStandardChecklistManagement',
  'gotoStandardCheckpointObjectTypeManagement',
  'gotoStandardChecklist',
  'gotoStandardCheckPoint',
  'gotoCheckpointGroups',
  'gotoPendingStandardTaskOnSite',

  // Data Setup
  'gotoDataSetup',
  'gotoTargetArea',
  'gotoScheduleType',
  'gotoTaskCategories',
  'gotoTaskSubcategories',
  'gotoTaskClassification',
  'gotoTaskSet',
  'gotoIncidentPriorities',
  'gotoTaskClassificationRelation',
  'gotoHealthSafetyAndEnvironmentItems',

  // Configuration
  'gotoConfiguration',
  'gotoAccessConfiguration'
];

// Run the visual test for Operation And Maintenance module
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

  await safeStep('clickOperationAndMaintenance', async () => {
    await operationAndMaintenance.clickOperationAndMaintenance();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickOperationAndMaintenance');
  });

  // ================================
  // 📌 Maintenance Incidents Overview
  // ================================
  await safeStep('gotoMaintenanceIncidentsOverview', async () => {
    await operationAndMaintenance.gotoMaintenanceIncidentsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentsOverview');
  });

  await safeStep('gotoMaintenanceIncident', async () => {
    await operationAndMaintenance.gotoMaintenanceIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncident');
  });

  // ================================
  // 📌 Task Planning Overview
  // ================================
  await safeStep('gotoTaskPlanningOverview', async () => {
    await operationAndMaintenance.gotoTaskPlanningOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskPlanningOverview');
  });

  await safeStep('gotoPPMRegistration', async () => {
    await operationAndMaintenance.gotoPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistration');
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

  // ================================
  // 📌 Approved PPM
  // ================================
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

  // ================================
  // 📌 Incidents Overview
  // ================================
  await safeStep('gotoIncidentsOverview', async () => {
    await operationAndMaintenance.gotoIncidentsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentsOverview');
  });

  await safeStep('gotoFailure', async () => {
    await operationAndMaintenance.gotoFailure();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailure');
  });

  await safeStep('gotoIssues', async () => {
    await operationAndMaintenance.gotoIssues();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIssues');
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
  });

  await safeStep('gotoIncidentCategory2s', async () => {
    await operationAndMaintenance.gotoIncidentCategory2s();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCategory2s');
  });

  await safeStep('gotoAllIncidents', async () => {
    await operationAndMaintenance.gotoAllIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAllIncidents');
  });

  // ================================
  // 📌 Work Orders Overview
  // ================================
  await safeStep('gotoWorkOrdersOverview', async () => {
    await operationAndMaintenance.gotoWorkOrdersOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersOverview');
  });

  await safeStep('gotoWorkOrder', async () => {
    await operationAndMaintenance.gotoWorkOrder();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrder');
  });

  await safeStep('gotoWorkOrderExternal', async () => {
    await operationAndMaintenance.gotoWorkOrderExternal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderExternal');
  });

  await safeStep('gotoWorkOrderAssignedCostWOO', async () => {
    await operationAndMaintenance.gotoWorkOrderAssignedCost();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAssignedCostWOO');
  });

  await safeStep('gotoTimeRegistrationWOO', async () => {
    await operationAndMaintenance.gotoTimeRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeRegistrationWOO');
  });

  await safeStep('gotoInspections', async () => {
    await operationAndMaintenance.gotoInspections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');
  });

  await safeStep('gotoReccuringIncidents', async () => {
    await operationAndMaintenance.gotoReccuringIncidents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReccuringIncidents');
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

  // ================================
  // 📌 Costs and Resource Usage
  // ================================
  await safeStep('gotoCostsAndResourceUsage', async () => {
    await operationAndMaintenance.gotoCostsAndResourceUsage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostsAndResourceUsage');
  });

  await safeStep('gotoElectronicInvoices', async () => {
    await operationAndMaintenance.gotoElectronicInvoices();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoElectronicInvoices');
  });

    await safeStep('gotoWorkOrderAssignedCostCRU', async () => {
    await operationAndMaintenance.gotoWorkOrderAssignedCost();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAssignedCostCRU');
  });

    await safeStep('gotoTimeRegistrationCRU', async () => {
    await operationAndMaintenance.gotoTimeRegistration();
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

  // ================================
  // 📌 Service Contracts Overview
  // ================================
  await safeStep('gotoServiceContractsOverview', async () => {
    await operationAndMaintenance.gotoServiceContractsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractsOverview');
  });

  await safeStep('gotoServiceContract', async () => {
    await operationAndMaintenance.gotoServiceContract();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContract');
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

  // ================================
  // 📌 Standard Tasks Overview
  // ================================
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
  });

  await safeStep('gotoStandardCheckPoint', async () => {
    await operationAndMaintenance.gotoStandardCheckPoint();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardCheckPoint');
  });

  await safeStep('gotoCheckpointGroups', async () => {
    await operationAndMaintenance.gotoCheckpointGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckpointGroups');
  });

  await safeStep('gotoPendingStandardTaskOnSite', async () => {
    await operationAndMaintenance.gotoPendingStandardTaskOnSite();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPendingStandardTaskOnSite');
  });

  // ================================
  // 📌 Data Setup
  // ================================
  await safeStep('gotoDataSetup', async () => {
    await operationAndMaintenance.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoTargetArea', async () => {
    await operationAndMaintenance.gotoTargetArea();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTargetArea');
  });

  await safeStep('gotoScheduleType', async () => {
    await operationAndMaintenance.gotoScheduleType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoScheduleType');
  });

  await safeStep('gotoTaskCategories', async () => {
    await operationAndMaintenance.gotoTaskCategories();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskCategories');
  });

  await safeStep('gotoTaskSubcategories', async () => {
    await operationAndMaintenance.gotoTaskSubcategories();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskSubcategories');
  });

  await safeStep('gotoTaskClassification', async () => {
    await operationAndMaintenance.gotoTaskClassification();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskClassification');
  });

  await safeStep('gotoTaskSet', async () => {
    await operationAndMaintenance.gotoTaskSet();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskSet');
  });

  await safeStep('gotoIncidentPriorities', async () => {
    await operationAndMaintenance.gotoIncidentPriorities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentPriorities');
  });

  await safeStep('gotoTaskClassificationRelation', async () => {
    await operationAndMaintenance.gotoTaskClassificationRelation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskClassificationRelation');
  });

  await safeStep('gotoHealthSafetyAndEnvironmentItems', async () => {
    await operationAndMaintenance.gotoHealthSafetyAndEnvironmentItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHealthSafetyAndEnvironmentItems');
  });

  // ================================
  // 📌 Configuration
  // ================================
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
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});