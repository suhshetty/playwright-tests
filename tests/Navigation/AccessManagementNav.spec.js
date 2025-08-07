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
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoDepartments();
  await accessManagement.clickElement(accessManagement.Export);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoDivisions();
  await accessManagement.clickElement(accessManagement.Export);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoBranches();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoBranchSections();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoBranchSubSections();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoWorkGroups();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoEmployees();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoDataAccessAdministration();
await accessManagement.gotoMergeOrganisations();

// Portfolio Access
await accessManagement.gotoPortfolioAccess();
await accessManagement.gotoPortfolioManagement();
await accessManagement.gotoMainGroupAccesses();
await accessManagement.gotoSiteAccesses();

await accessManagement.gotoPortfolios();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

// User Role Administration
await accessManagement.gotoUserRoleAdministration();

await accessManagement.gotoPersonsUsers();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoPersonandUserRoles();

await accessManagement.gotoUserRoles();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoAppSetups();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

// Main module selection
await accessManagement.gotoMainModuleSelection();

await accessManagement.gotoDataTable();
  await accessManagement.selectDropdown('site', 'Activity center');
  await accessManagement.clickElement(accessManagement.MultiRegister);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoMainModules();
  await accessManagement.clickElement(accessManagement.Export);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoMainModuleItems();
  await accessManagement.clickElement(accessManagement.Export);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoMainModuleAccesses();
  await accessManagement.clickElement(accessManagement.Export);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoMainModuleItemAccesses();
  await accessManagement.clickElement(accessManagement.Export);
  await accessManagement.clickElement(accessManagement.Close);

await accessManagement.gotoMMProcessIncluded();
  await accessManagement.clickElement(accessManagement.Add);
  await accessManagement.clickElement(accessManagement.Close);

// Configuration
await accessManagement.gotoConfiguration();
await accessManagement.gotoAccessConfigurations();
});