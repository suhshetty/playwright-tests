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
await environmentalManagement.gotoServicePartnerManagement();
await environmentalManagement.gotoPersonPermit();

// Technical Documentation
await environmentalManagement.gotoTechnicalDocumentation();
await environmentalManagement.gotoEnvironmentDocuments();
await environmentalManagement.gotoEnvironmentDocumentTree();
await environmentalManagement.gotoEnvironmentalGoals();
await environmentalManagement.gotoRandomRegistrations();

// Object Marking
await environmentalManagement.gotoObjectMarking();
await environmentalManagement.gotoTechnicalSystem();
await environmentalManagement.gotoCCSTechnicalSystem();
await environmentalManagement.gotoThemeMarkings();

// Activities
await environmentalManagement.gotoActivities();
await environmentalManagement.gotoTaskManagement();
await environmentalManagement.gotoWorkOrder();
await environmentalManagement.gotoIncident();

// Requirements and Guidelines
await environmentalManagement.gotoRequirementandGuidelines();
await environmentalManagement.gotoLinksToLawsRegulations();
await environmentalManagement.gotoInstructionsAndGuidelines();
await environmentalManagement.gotoLocalRegulations();

// Data Setup
await environmentalManagement.gotoDataSetup();
await environmentalManagement.gotoDocumentTypes();
await environmentalManagement.gotoServiceTypes();
await environmentalManagement.gotoPermit();

// Configuration
await environmentalManagement.gotoConfiguration();
await environmentalManagement.gotoAccessConfigurations();
});