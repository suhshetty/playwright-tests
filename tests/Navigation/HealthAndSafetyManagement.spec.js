// tests/HealthAndSafetyManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Health and Safety Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, healthAndSafetyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await healthAndSafetyManagement.clickHealthAndSafetyManagement();

  // === General Overview ===
  await healthAndSafetyManagement.gotoGeneralOverview();
  await healthAndSafetyManagement.gotoGeneralInformationHSE();

  // === Responsible Resources ===
  await healthAndSafetyManagement.gotoResponsibleResources();
  await healthAndSafetyManagement.gotoServicePartners();
  await healthAndSafetyManagement.gotoServicePartnersManagementHSE();
  await healthAndSafetyManagement.gotoPersonPermitHSE();

  // === Technical Documentation ===
  await healthAndSafetyManagement.gotoTechnicalDocumentation();
  await healthAndSafetyManagement.gotoHSEDocuments();
  await healthAndSafetyManagement.gotoHSEDocumentTree();
  await healthAndSafetyManagement.gotoRadonRegistration();

  // === Object Marking ===
  await healthAndSafetyManagement.gotoObjectMarking();
  await healthAndSafetyManagement.gotoInsuranceCertificate();

  // === Activities ===
  await healthAndSafetyManagement.gotoActivities();
  await healthAndSafetyManagement.gotoTaskManagementHSE();
  await healthAndSafetyManagement.gotoWorkOrderHSE();
  await healthAndSafetyManagement.gotoChecklistsHSE();
  await healthAndSafetyManagement.gotoIncidentHSE();

  // === Requirements and Guidelines ===
  await healthAndSafetyManagement.gotoRequirementAndGuidelines();
  await healthAndSafetyManagement.gotoLinksToLawsAndRegulation();
  await healthAndSafetyManagement.gotoInstructionsAndGuidelines();
  await healthAndSafetyManagement.gotoLocalRegulations();

  // === Configuration ===
  await healthAndSafetyManagement.gotoConfiguration();
  await healthAndSafetyManagement.gotoAccessConfiguration();
});