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

await humanResources.gotoOrganisationsOverview();
await humanResources.gotoBuildOrganisationTrees();
await humanResources.gotoCompanies();
await humanResources.gotoWorkGroups();
await humanResources.gotoEmployees();
await humanResources.gotoPersonsUsers();

// Navigate to sub types in Organisations Data
await humanResources.gotoOrganisationData();
await humanResources.gotoOrganisationReminders();
await humanResources.gotoOrganisationDocuments();
await humanResources.gotoOrganisationAbsences();
await humanResources.gotoPunchinPunchout();

// Navigate to sub types in Stakeholder Management
await humanResources.gotoStakeholderManagement();
await humanResources.gotoVendorIssues();

// Navigate to sub types in Permits and Qualifications
await humanResources.gotoPermitsandQualifications();
await humanResources.gotoPersonPermits();

// Navigate to sub types in Data Setup
await humanResources.gotoDataSetup();
await humanResources.gotoOrganisationGroups();
await humanResources.gotoProfessions();
await humanResources.gotoPermits();
await humanResources.gotoEmployeeGroups();
await humanResources.gotoAvailabilityProfiles();

// Navigate to sub types in Configuration
await humanResources.gotoConfiguration();
await humanResources.gotoAccessConfiguration();
});

