// tests/FireSafetyManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Fire Safety Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, fireSafetyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await fireSafetyManagement.clickFireSafetyManagement();

  // === General Overview ===
  await fireSafetyManagement.gotoGeneralOverview();
  await fireSafetyManagement.gotoGeneralInformationFireSafety();

  // === Responsible Resources ===
  await fireSafetyManagement.gotoResponsibleResources();
  await fireSafetyManagement.gotoServicePartners();
  await fireSafetyManagement.gotoServicePartnerManagementFireSafety();
  await fireSafetyManagement.gotoPersonPermitFireSafety();

  // === Technical Documentation ===
  await fireSafetyManagement.gotoTechnicalDocumentation();
  await fireSafetyManagement.gotoFireSafetyDocument();
  await fireSafetyManagement.gotoFireSafetyDocumentTree();
  await fireSafetyManagement.gotoFlammableAndPressurizedMaterial();
  await fireSafetyManagement.gotoFireSafetyZone();

  // === Object Marking ===
  await fireSafetyManagement.gotoObjectMarking();
  await fireSafetyManagement.gotoTechnicalSystemFireSafety();
  await fireSafetyManagement.gotoCSSTechnicalSystemFireSafety();
  await fireSafetyManagement.gotoThemeMarking();

  // === Activities ===
  await fireSafetyManagement.gotoActivities();
  await fireSafetyManagement.gotoTaskManagementFireSafety();
  await fireSafetyManagement.gotoWorkOrderFireSafety();
  await fireSafetyManagement.gotoChecklistsFireSafety();
  await fireSafetyManagement.gotoIncidentFireSafety();

  // === Activities (Local) ===
  await fireSafetyManagement.gotoActivitiesLocal();
  await fireSafetyManagement.gotoTaskManagementFireSafetyLocal();
  await fireSafetyManagement.gotoWorkOrderFireSafetyLocal();
  await fireSafetyManagement.gotoChecklistsFireSafetyLocal();
  await fireSafetyManagement.gotoIncidentFireSafetyLocal();

  // === Activities (Customer) ===
  await fireSafetyManagement.gotoActivitiesCustomer();
  await fireSafetyManagement.gotoTaskManagementFireSafetyCustomer();
  await fireSafetyManagement.gotoWorkOrderFireSafetyCustomer();
  await fireSafetyManagement.gotoChecklistsFireSafetyCustomer();
  await fireSafetyManagement.gotoIncidentFireSafetyCustomer();

  // === Requirements and Guidelines ===
  await fireSafetyManagement.gotoRequirementsAndGuidelines();
  await fireSafetyManagement.gotoLinksToLawsAndRegulation();
  await fireSafetyManagement.gotoInstructionsAndGuidelines();
  await fireSafetyManagement.gotoLocalRegulations();

  // === Data Setup ===
  await fireSafetyManagement.gotoDataSetup();
  await fireSafetyManagement.gotoDocumentTypes();
  await fireSafetyManagement.gotoServiceTypes();
  await fireSafetyManagement.gotoMaterialTypes();
  await fireSafetyManagement.gotoPermitFireSafety();

  // === Configuration ===
  await fireSafetyManagement.gotoConfiguration();
  await fireSafetyManagement.gotoAccessConfiguration();
});