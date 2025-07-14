// tests/AccessManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });
test('Test Navigation Access Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;
  // Login and initialize Page Objects with base URL
  const { homePage, accessManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page  
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Module Navigation
await accessManagement.gotoAccessManagement();

//await accessManagement.gotoSummary();

// Organisations Overview
await accessManagement.gotoOrganisationsOverview();
await accessManagement.gotoBuildOrganisationTrees();
await accessManagement.gotoCompanies();
await accessManagement.gotoDepartments();
await accessManagement.gotoDivisions();
await accessManagement.gotoBranches();
await accessManagement.gotoBranchSections();
await accessManagement.gotoBranchSubSections();
await accessManagement.gotoWorkGroups();
await accessManagement.gotoEmployees();
await accessManagement.gotoDataAccessAdministration();
await accessManagement.gotoMergeOrganisations();

// Portfolio Access
await accessManagement.gotoPortfolioAccess();
await accessManagement.gotoPortfolioManagement();
await accessManagement.gotoMainGroupAccesses();
await accessManagement.gotoSiteAccesses();
await accessManagement.gotoPortfolios();

// User Role Administration
await accessManagement.gotoUserRoleAdministration();
await accessManagement.gotoPersonsUsers();
await accessManagement.gotoPersonandUserRoles();
await accessManagement.gotoUserRoles();
await accessManagement.gotoAppSetups();

// Main module selection
await accessManagement.gotoMainModuleSelection();
await accessManagement.gotoDataTable();
await accessManagement.gotoMainModules();
await accessManagement.gotoMainModuleItems();
await accessManagement.gotoMainModuleAccesses();
await accessManagement.gotoMainModuleItemAccesses();
await accessManagement.gotoMMProcessIncluded();

// Configuration
await accessManagement.gotoConfiguration();
await accessManagement.gotoAccessConfigurations();
});