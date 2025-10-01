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
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoServicePartnerManagementFireSafety();

  await fireSafetyManagement.gotoPersonPermitFireSafety();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  // === Technical Documentation ===
  await fireSafetyManagement.gotoTechnicalDocumentation();

  await fireSafetyManagement.gotoFireSafetyDocument();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoFireSafetyDocumentTree();

  await fireSafetyManagement.gotoFlammableAndPressurizedMaterial();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoFireSafetyZone();

  // === Object Marking ===
  await fireSafetyManagement.gotoObjectMarking();

  await fireSafetyManagement.gotoTechnicalSystemFireSafety();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoCSSTechnicalSystemFireSafety();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoThemeMarking();

  // === Activities ===
  await fireSafetyManagement.gotoActivities();
  
  await fireSafetyManagement.gotoTaskManagementFireSafety();

  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoWorkOrderFireSafety();
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoChecklistsFireSafety();
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoIncidentFireSafety();
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  // === Activities (Local) ===
  await fireSafetyManagement.gotoActivitiesLocal();

  await fireSafetyManagement.gotoTaskManagementFireSafetyLocal();
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoWorkOrderFireSafetyLocal();
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoChecklistsFireSafetyLocal();
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoIncidentFireSafetyLocal();
      await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  // === Activities (Customer) ===
  await fireSafetyManagement.gotoActivitiesCustomer();

  await fireSafetyManagement.gotoTaskManagementFireSafetyCustomer();
      await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoWorkOrderFireSafetyCustomer();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoChecklistsFireSafetyCustomer();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoIncidentFireSafetyCustomer();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  // === Requirements and Guidelines ===
  await fireSafetyManagement.gotoRequirementsAndGuidelines();

  await fireSafetyManagement.gotoLinksToLawsAndRegulation();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoInstructionsAndGuidelines();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoLocalRegulations();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  // === Data Setup ===
  await fireSafetyManagement.gotoDataSetup();

  await fireSafetyManagement.gotoDocumentTypes();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  await fireSafetyManagement.gotoServiceTypes();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoMaterialTypes();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);


  await fireSafetyManagement.gotoPermitFireSafety();
  await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
  await fireSafetyManagement.clickElement(fireSafetyManagement.Close);

  // === Configuration ===
  await fireSafetyManagement.gotoConfiguration();
  await fireSafetyManagement.gotoAccessConfiguration();
});