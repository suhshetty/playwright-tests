// File: ConditionAssessmentAndMaintenanceNeedsNav.spec.js
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
  'gotoHomePage',
  'gotoModuleMenu',
  'clickConditionAssessmentAndMaintenanceNeeds',
  "gotoPlanningOfInspection",
  "gotoMaintenanceIncident",
  "gotoConditionAssessment",
  "gotoDataSetup",
  "gotoConfiguration",
  "gotoPPMRegistration",
  "gotoRecurringIncident",
  "gotoMaintenanceIncidentSubType",
  "gotoConditionAssessmentSubType",
  "gotoConditionRegistration",
  "gotoCondition",
  "gotoFunctionalSystem",
  "gotoTechnicalSystem",
  "gotoSensor",
  "gotoConditionAssessmentType",
  "gotoStandardCondition",
  "gotoAccessConfiguration"
];

// Run the visual test for a given URL environment 
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, conditionAssessmentAndMaintenanceNeeds } = await loginAndInitialize({ page, context, baseUrl });

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

  await safeStep('gotoPlanningOfInspection', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoPlanningOfInspection();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPlanningOfInspection');
  });

    // 📌 Planning of Inspection - Sub Types
  await safeStep('gotoPPMRegistration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoPPMRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPPMRegistration');
  });

  await safeStep('gotoRecurringIncident', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoRecurringIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRecurringIncident');
  });

 
  await safeStep('gotoMaintenanceIncident', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncident');
  });

     // 📌 Maintenance Incident - Sub Types
  await safeStep('gotoMaintenanceIncidentSubType', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncidentSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaintenanceIncidentSubType');
  });


  await safeStep('gotoConditionAssessment', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessment();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessment');
  });

  // 📌 Condition Assessment - Sub Types
  await safeStep('gotoConditionAssessmentSubType', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentSubType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentSubType');
  });

   await safeStep('gotoConditionRegistration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionRegistration');
  });

  await safeStep('gotoCondition', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoCondition();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCondition');
  });

  await safeStep('gotoFunctionalSystem', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoFunctionalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystem');
  });

  await safeStep('gotoTechnicalSystem', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
  });

  await safeStep('gotoSensor', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoSensor();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSensor');
  });


  await safeStep('gotoDataSetup', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  // 📌 Data Setup - Sub Types
  await safeStep('gotoConditionAssessmentType', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentType();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConditionAssessmentType');
  });

  await safeStep('gotoStandardCondition', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoStandardCondition();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStandardCondition');
  });

  await safeStep('gotoConfiguration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

    // 📌 Configuration - Sub Types
  await safeStep('gotoAccessConfiguration', async () => {
    await conditionAssessmentAndMaintenanceNeeds.gotoAccessConfiguration();
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