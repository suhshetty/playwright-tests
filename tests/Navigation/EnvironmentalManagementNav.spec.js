// tests/EnvironmentalManagementNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Environmental Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1; 

// Login and initialize Page Objects with base URL
const { homePage, environmentalManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main Environmental Management module
await environmentalManagement.gotoEnvironmentalManagement();

// General Overview
await environmentalManagement.gotoGeneralOverview();
await environmentalManagement.gotoGeneralInformation();

// Responsible Resources
await environmentalManagement.gotoResponsibleResources();

await environmentalManagement.gotoServicePartners();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoServicePartnerManagement();

await environmentalManagement.gotoPersonPermit();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

// Technical Documentation
await environmentalManagement.gotoTechnicalDocumentation();

await environmentalManagement.gotoEnvironmentDocuments();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoEnvironmentDocumentTree();

await environmentalManagement.gotoEnvironmentalGoals();

  await page.pause();
  await environmentalManagement.selectDropdown('portfolio', 'Aktivitetscentre');
  await environmentalManagement.selectDropdown('site', 'ICECONSULT DANMARK ApS');
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);

  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoRandomRegistrations();
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);

// Object Marking
await environmentalManagement.gotoObjectMarking();

await environmentalManagement.gotoTechnicalSystem();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoCCSTechnicalSystem();
 await environmentalManagement.clickElement(environmentalManagement.Add);
 await environmentalManagement.clickElement(environmentalManagement.Close);

  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoThemeMarkings();

// Activities
await environmentalManagement.gotoActivities();

await environmentalManagement.gotoTaskManagement();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoWorkOrder();
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoIncident();
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

// Requirements and Guidelines
await environmentalManagement.gotoRequirementandGuidelines();

await environmentalManagement.gotoLinksToLawsRegulations();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoInstructionsAndGuidelines();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoLocalRegulations();
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

// Data Setup
await environmentalManagement.gotoDataSetup();
await environmentalManagement.gotoDocumentTypes();
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoServiceTypes();
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);

await environmentalManagement.gotoPermit();
  await environmentalManagement.clickElement(environmentalManagement.Add);
  await environmentalManagement.clickElement(environmentalManagement.Close);
  await environmentalManagement.clickElement(environmentalManagement.Export);
  await environmentalManagement.clickElement(environmentalManagement.Close);


// Configuration
await environmentalManagement.gotoConfiguration();
await environmentalManagement.gotoAccessConfigurations();
});