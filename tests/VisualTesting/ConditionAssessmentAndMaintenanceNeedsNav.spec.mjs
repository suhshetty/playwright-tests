// tests/ConditionAssessmentAndMaintenanceNeedsNav.spec.js
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

// Labels for visual comparison
const labels = [
  // Home and Module Navigation
  'gotoHomePage', 'gotoModuleMenu', 'clickConditionAssessmentAndMaintenanceNeeds',

  // === Planning of Inspection ===
  'gotoPlanningOfInspection', 'gotoPPMRegistration', 'gotoPPMRegistrationAddClicked',
  'gotoPPMRegistrationCloseClicked', 'gotoPPMRegistrationExportClicked',
  'gotoPPMRegistrationCloseClicked2', 'gotoRecurringIncident', 'gotoRecurringIncidentAddClicked',
  'gotoRecurringIncidentCloseClicked', 'gotoRecurringIncidentExportClicked',
  'gotoRecurringIncidentCloseClicked2',

  // === Maintenance Incident ===
  'gotoMaintenanceIncident', 'gotoMaintenanceIncidentSubType', 'gotoMaintenanceIncidentSubTypeAddClicked',
  'gotoMaintenanceIncidentSubTypeCloseClicked', 'gotoMaintenanceIncidentSubTypeExportClicked',
  'gotoMaintenanceIncidentSubTypeCloseClicked2',

  // === Condition Assessment ===
  'gotoConditionAssessment', 'gotoConditionAssessmentSubType', 'gotoConditionAssessmentSubTypeAddClicked',
  'gotoConditionAssessmentSubTypeCloseClicked', 'gotoConditionAssessmentSubTypeExportClicked',
  'gotoConditionAssessmentSubTypeCloseClicked2', 'gotoConditionRegistration',
  'gotoConditionRegistrationExportClicked', 'gotoConditionRegistrationCloseClicked',
  'gotoCondition', 'gotoConditionAddClicked', 'gotoConditionCloseClicked',
  'gotoConditionExportClicked', 'gotoConditionCloseClicked2', 'gotoFunctionalSystem',
  'gotoFunctionalSystemExportClicked', 'gotoFunctionalSystemCloseClicked',
  'gotoTechnicalSystem', 'gotoTechnicalSystemExportClicked', 'gotoTechnicalSystemCloseClicked',
  'gotoSensor', 'gotoSensorAddClicked', 'gotoSensorCloseClicked',
  'gotoSensorExportClicked', 'gotoSensorCloseClicked2',

  // === Data Setup ===
  'gotoDataSetup', 'gotoConditionAssessmentType', 'gotoConditionAssessmentTypeAddClicked',
  'gotoConditionAssessmentTypeCloseClicked', 'gotoConditionAssessmentTypeExportClicked',
  'gotoConditionAssessmentTypeCloseClicked2', 'gotoStandardCondition',
  'gotoStandardConditionAddClicked', 'gotoStandardConditionCloseClicked',
  'gotoStandardConditionExportClicked', 'gotoStandardConditionCloseClicked2',

  // === Configuration ===
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, conditionAssessmentAndMaintenanceNeeds } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickConditionAssessmentAndMaintenanceNeeds', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickConditionAssessmentAndMaintenanceNeeds();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickConditionAssessmentAndMaintenanceNeeds');
  });

  // === Planning of Inspection ===
  await safeStep('gotoPlanningOfInspection', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoPlanningOfInspection();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPlanningOfInspection');
  });

  await safeStep('gotoPPMRegistration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistration');
  });

  await safeStep('gotoPPMRegistrationAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistrationAddClicked');
  });

  await safeStep('gotoPPMRegistrationCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistrationCloseClicked');
  });

  await safeStep('gotoPPMRegistrationExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistrationExportClicked');
  });

  await safeStep('gotoPPMRegistrationCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistrationCloseClicked2');
  });

  await safeStep('gotoRecurringIncident', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoRecurringIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRecurringIncident');
  });

  await safeStep('gotoRecurringIncidentAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRecurringIncidentAddClicked');
  });

  await safeStep('gotoRecurringIncidentCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRecurringIncidentCloseClicked');
  });

  await safeStep('gotoRecurringIncidentExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRecurringIncidentExportClicked');
  });

  await safeStep('gotoRecurringIncidentCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRecurringIncidentCloseClicked2');
  });

  // === Maintenance Incident ===
  await safeStep('gotoMaintenanceIncident', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncident');
  });

  await safeStep('gotoMaintenanceIncidentSubType', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncidentSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentSubType');
  });

  await safeStep('gotoMaintenanceIncidentSubTypeAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentSubTypeAddClicked');
  });

  await safeStep('gotoMaintenanceIncidentSubTypeCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentSubTypeCloseClicked');
  });

  await safeStep('gotoMaintenanceIncidentSubTypeExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentSubTypeExportClicked');
  });

  await safeStep('gotoMaintenanceIncidentSubTypeCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentSubTypeCloseClicked2');
  });

  // === Condition Assessment ===
  await safeStep('gotoConditionAssessment', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessment();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessment');
  });

  await safeStep('gotoConditionAssessmentSubType', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentSubType');
  });

  await safeStep('gotoConditionAssessmentSubTypeAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentSubTypeAddClicked');
  });

  await safeStep('gotoConditionAssessmentSubTypeCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentSubTypeCloseClicked');
  });

  await safeStep('gotoConditionAssessmentSubTypeExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentSubTypeExportClicked');
  });

  await safeStep('gotoConditionAssessmentSubTypeCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentSubTypeCloseClicked2');
  });

  await safeStep('gotoConditionRegistration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionRegistration');
  });

  await safeStep('gotoConditionRegistrationExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionRegistrationExportClicked');
  });

  await safeStep('gotoConditionRegistrationCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionRegistrationCloseClicked');
  });

  await safeStep('gotoCondition', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoCondition();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCondition');
  });

  await safeStep('gotoConditionAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAddClicked');
  });

  await safeStep('gotoConditionCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionCloseClicked');
  });

  await safeStep('gotoConditionExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionExportClicked');
  });

  await safeStep('gotoConditionCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionCloseClicked2');
  });

  await safeStep('gotoFunctionalSystem', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoFunctionalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystem');
  });

  await safeStep('gotoFunctionalSystemExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystemExportClicked');
  });

  await safeStep('gotoFunctionalSystemCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystemCloseClicked');
  });

  await safeStep('gotoTechnicalSystem', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
  });

  await safeStep('gotoTechnicalSystemExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemExportClicked');
  });

  await safeStep('gotoTechnicalSystemCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCloseClicked');
  });

  await safeStep('gotoSensor', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoSensor();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSensor');
  });

  await safeStep('gotoSensorAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSensorAddClicked');
  });

  await safeStep('gotoSensorCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSensorCloseClicked');
  });

  await safeStep('gotoSensorExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSensorExportClicked');
  });

  await safeStep('gotoSensorCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSensorCloseClicked2');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoConditionAssessmentType', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentType');
  });

  await safeStep('gotoConditionAssessmentTypeAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentTypeAddClicked');
  });

  await safeStep('gotoConditionAssessmentTypeCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentTypeCloseClicked');
  });

  await safeStep('gotoConditionAssessmentTypeExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentTypeExportClicked');
  });

  await safeStep('gotoConditionAssessmentTypeCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentTypeCloseClicked2');
  });

  await safeStep('gotoStandardCondition', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoStandardCondition();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardCondition');
  });

  await safeStep('gotoStandardConditionAddClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardConditionAddClicked');
  });

  await safeStep('gotoStandardConditionCloseClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardConditionCloseClicked');
  });

  await safeStep('gotoStandardConditionExportClicked', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardConditionExportClicked');
  });

  await safeStep('gotoStandardConditionCloseClicked2', async () => {
    await conditionAssessmentAndMaintenanceNeeds.clickClose(); // ✅ Direct method call
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardConditionCloseClicked2');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoAccessConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
  });
};

// Main visual regression test
test('Visual Regression Test - Condition Assessment And Maintenance Needs: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});