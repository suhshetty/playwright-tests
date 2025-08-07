// tests/UniversalDesignNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Universal Design', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, universalDesign } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await universalDesign.gotoUniversalDesign();

  // === General Overview ===
  await universalDesign.gotoGeneralOverview();
  await universalDesign.gotoGeneralInformation();

  // === Responsible Resources ===
  await universalDesign.gotoResponsibleResources();
  await universalDesign.gotoServicePartners();
  await universalDesign.gotoServicePartnerManagement();
  await universalDesign.gotoPersonPermit();

  // === Technical Documentation ===
  await universalDesign.gotoTechnicalDocumentation();
  await universalDesign.gotoUniversalDesignDocuments();
  await universalDesign.gotoUniversalDesignDocumentTypes();

  // === Object Marking ===
  await universalDesign.gotoObjectMarking();
  await universalDesign.gotoTechnicalSystem();
  await universalDesign.gotoCCSTechnicalSystem();
  await universalDesign.gotoThemeMarking();

  // === Activities ===
  await universalDesign.gotoActivities();
  await universalDesign.gotoTaskManagementUniversalDesign();
  await universalDesign.gotoWorkOrderUniversalDesign();
  await universalDesign.gotoIncidentUniversalDesign();

  // === Requirements and Guidelines ===
  await universalDesign.gotoRequirementsandGuidelines();
  await universalDesign.gotoLinksToLawsandRegulations();
  await universalDesign.gotoInstructionsandGuidelines();
  await universalDesign.gotoLocalRegulations();

  // === Data Setup ===
  await universalDesign.gotoDataSetup();
  await universalDesign.gotoDocumentTypes();
  await universalDesign.gotoServiceTypes();
  await universalDesign.gotoPermitUniversalDesign();

  // === Configuration ===
  await universalDesign.gotoConfiguration();
  await universalDesign.gotoAccessConfigurations();
});