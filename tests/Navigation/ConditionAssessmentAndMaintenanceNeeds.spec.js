// tests/ConditionAssessmentAndMaintenanceNeedsNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

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
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  await conditionAssessmentAndMaintenanceNeeds.gotoRecurringIncident();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  // === Maintenance Incident ===
  await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncident();

  await conditionAssessmentAndMaintenanceNeeds.gotoMaintenanceIncidentSubType();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  // === Condition Assessment ===
  await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessment();

  await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentSubType();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  await conditionAssessmentAndMaintenanceNeeds.gotoConditionRegistration();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  await conditionAssessmentAndMaintenanceNeeds.gotoCondition();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);


  await conditionAssessmentAndMaintenanceNeeds.gotoFunctionalSystem();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  await conditionAssessmentAndMaintenanceNeeds.gotoTechnicalSystem();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  await conditionAssessmentAndMaintenanceNeeds.gotoSensor();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  // === Data Setup ===
  await conditionAssessmentAndMaintenanceNeeds.gotoDataSetup();

  await conditionAssessmentAndMaintenanceNeeds.gotoConditionAssessmentType();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  await conditionAssessmentAndMaintenanceNeeds.gotoStandardCondition();
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Add);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Export);
  await conditionAssessmentAndMaintenanceNeeds.clickElement(conditionAssessmentAndMaintenanceNeeds.Close);

  // === Configuration ===
  await conditionAssessmentAndMaintenanceNeeds.gotoConfiguration();
  await conditionAssessmentAndMaintenanceNeeds.gotoAccessConfiguration();
});