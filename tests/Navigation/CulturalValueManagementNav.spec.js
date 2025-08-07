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
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoServicePartnersManagementCulturalValue();

  await culturalValueManagement.gotoPersonPermitCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  // === Technical Documentation ===
  await culturalValueManagement.gotoTechnicalDocumentation();

  await culturalValueManagement.gotoCulturalValueDocuments();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoCulturalValueDocumentTree();

  // === Object Marking ===
  await culturalValueManagement.gotoObjectMarking();

  await culturalValueManagement.gotoTechnicalSystemCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoCCSTechnicalSystemCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoThemeMarking();

  // === Activities ===
  await culturalValueManagement.gotoActivities();

  await culturalValueManagement.gotoTaskManagementCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoWorkOrderCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoIncidentCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  // === Requirements and Guidelines ===
  await culturalValueManagement.gotoRequirementAndGuidelines();

  await culturalValueManagement.gotoLinksToLawsAndRegulation();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoInstructionsAndGuidelines();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoLocalRegulations();
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  // === Data Setup ===
  await culturalValueManagement.gotoDataSetup();

  await culturalValueManagement.gotoDocumentTypes();
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoServiceTypes();
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  await culturalValueManagement.gotoPermitCulturalValue();
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await culturalValueManagement.clickElement(culturalValueManagement.Close);

  // === Configuration ===
  await culturalValueManagement.gotoConfiguration();
  await culturalValueManagement.gotoAccessConfiguration();
});