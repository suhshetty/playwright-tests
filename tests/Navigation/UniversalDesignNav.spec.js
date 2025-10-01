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
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);
  
  await universalDesign.gotoServicePartnerManagement();

  await universalDesign.gotoPersonPermit();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  // === Technical Documentation ===
  await universalDesign.gotoTechnicalDocumentation();

  await universalDesign.gotoUniversalDesignDocuments();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoUniversalDesignDocumentTypes();

  // === Object Marking ===
  await universalDesign.gotoObjectMarking();

  await universalDesign.gotoTechnicalSystem();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoCCSTechnicalSystem();
  await universalDesign.clickElement(universalDesign.Add);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoThemeMarking();

  // === Activities ===
  await universalDesign.gotoActivities();

  await universalDesign.gotoTaskManagementUniversalDesign();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoWorkOrderUniversalDesign();
  await universalDesign.clickElement(universalDesign.Add);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoIncidentUniversalDesign();
  await universalDesign.clickElement(universalDesign.Add);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  // === Requirements and Guidelines ===
  await universalDesign.gotoRequirementsandGuidelines();

  await universalDesign.gotoLinksToLawsandRegulations();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoInstructionsandGuidelines();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoLocalRegulations();
  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  // === Data Setup ===
  await universalDesign.gotoDataSetup();

  await universalDesign.gotoDocumentTypes();
  await universalDesign.clickElement(universalDesign.Add);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoServiceTypes();
  await universalDesign.clickElement(universalDesign.Add);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.gotoPermitUniversalDesign();
  await universalDesign.clickElement(universalDesign.Add);
  await universalDesign.clickElement(universalDesign.Close);

  await universalDesign.clickElement(universalDesign.Export);
  await universalDesign.clickElement(universalDesign.Close);

  // === Configuration ===
  await universalDesign.gotoConfiguration();
  await universalDesign.gotoAccessConfigurations();
});