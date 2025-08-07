// tests/ConditionAssessmentAndMaintenanceNeedsNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Condition Assessment And Maintenance Needs', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, conditionAssessmentAndMaintenanceNeeds } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await conditionAssessmentAndMaintenanceNeeds.clickConditionAssessmentAndMaintenanceNeeds();

  // === Planning of Inspection ===
  await conditionAssessmentAndMaintenanceNeeds.gotoPlanningOfInspection();
  await conditionAssessmentAndMaintenanceNeeds.gotoPPMRegistration();
  await conditionAssessmentAndMaintenanceNeeds.gotoRecurringIncident();

  // === Maintenance Incident ===
  await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncident();
  await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncidentSubType();

  // === Condition Assessment ===
  await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessment();
  await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentSubType();
  await conditionAssessmentAndMaintenanceNeeds.gotoConditionRegistration();
  await conditionAssessmentAndMaintenanceNeeds.gotoCondition();
  await conditionAssessmentAndMaintenanceNeeds.gotoFunctionalSystem();
  await conditionAssessmentAndMaintenanceNeeds.gotoTechnicalSystem();
  await conditionAssessmentAndMaintenanceNeeds.gotoSensor();

  // === Data Setup ===
  await conditionAssessmentAndMaintenanceNeeds.gotoDataSetup();
  await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentType();
  await conditionAssessmentAndMaintenanceNeeds.gotoStandardCondition();

  // === Configuration ===
  await conditionAssessmentAndMaintenanceNeeds.gotoConfiguration();
  await conditionAssessmentAndMaintenanceNeeds.gotoAccessConfiguration();
});