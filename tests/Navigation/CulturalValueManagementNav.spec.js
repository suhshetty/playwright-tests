// tests/CulturalValueManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Cultural Value Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, culturalValueManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await culturalValueManagement.clickCulturalValueManagement();

  // === General Overview ===
  await culturalValueManagement.gotoGeneralOverview();
  await culturalValueManagement.gotoGeneralInformationCulturalValue();

  // === Responsible Resources ===
  await culturalValueManagement.gotoResponsibleResources();
  await culturalValueManagement.gotoServicePartners();
  await culturalValueManagement.gotoServicePartnersManagementCulturalValue();
  await culturalValueManagement.gotoPersonPermitCulturalValue();

  // === Technical Documentation ===
  await culturalValueManagement.gotoTechnicalDocumentation();
  await culturalValueManagement.gotoCulturalValueDocuments();
  await culturalValueManagement.gotoCulturalValueDocumentTree();

  // === Object Marking ===
  await culturalValueManagement.gotoObjectMarking();
  await culturalValueManagement.gotoTechnicalSystemCulturalValue();
  await culturalValueManagement.gotoCCSTechnicalSystemCulturalValue();
  await culturalValueManagement.gotoThemeMarking();

  // === Activities ===
  await culturalValueManagement.gotoActivities();
  await culturalValueManagement.gotoTaskManagementCulturalValue();
  await culturalValueManagement.gotoWorkOrderCulturalValue();
  await culturalValueManagement.gotoIncidentCulturalValue();

  // === Requirements and Guidelines ===
  await culturalValueManagement.gotoRequirementAndGuidelines();
  await culturalValueManagement.gotoLinksToLawsAndRegulation();
  await culturalValueManagement.gotoInstructionsAndGuidelines();
  await culturalValueManagement.gotoLocalRegulations();

  // === Data Setup ===
  await culturalValueManagement.gotoDataSetup();
  await culturalValueManagement.gotoDocumentTypes();
  await culturalValueManagement.gotoServiceTypes();
  await culturalValueManagement.gotoPermitCulturalValue();

  // === Configuration ===
  await culturalValueManagement.gotoConfiguration();
  await culturalValueManagement.gotoAccessConfiguration();
});