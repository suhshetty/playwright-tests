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
const { homePage, humanResources } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main module navigation
await humanResources.clickHumanResources();

// Navigate to sub modules
//humanResources.gotoSummary();

// Navigate to sub types in Organisations Overview

// === Organisations Overview ===
await humanResources.gotoOrganisationsOverview();
await humanResources.gotoBuildOrganisationTrees();
await humanResources.gotoCompanies();
await humanResources.clickRegisterCompanies();
await humanResources.gotoWorkGroups();
await humanResources.clickRegisterWorkGroups();
await humanResources.gotoEmployees();
await humanResources.clickRegisterEmployees();
await humanResources.gotoPersonsUsers();
await humanResources.clickRegisterPersonsUsers();

// === Organisation Data ===
await humanResources.gotoOrganisationData();
await humanResources.gotoOrganisationReminders();
await humanResources.gotoOrganisationDocuments();

// === Stakeholder Management ===
await humanResources.gotoStakeholderManagement();
await humanResources.gotoVendorIssues();
await humanResources.clickRegisterVendorIssues();

// === Permits and Qualifications ===
await humanResources.gotoPermitsandQualifications();
await humanResources.gotoPersonPermits();
await humanResources.clickRegisterPersonPermits();

// === Data Setup ===
await humanResources.gotoDataSetup();
await humanResources.gotoOrganisationGroups();
await humanResources.clickRegisterOrganisationGroups();
await humanResources.gotoProfessions();
await humanResources.clickRegisterProfessions();
await humanResources.gotoPermits();
await humanResources.clickRegisterPermits();
await humanResources.gotoEmployeeGroups();
await humanResources.clickRegisterEmployeeGroups();
await humanResources.gotoAvailabilityProfiles();
await humanResources.clickRegisterAvailabilityProfiles();
});

