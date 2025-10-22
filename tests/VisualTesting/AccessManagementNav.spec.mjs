// File: AccessManagementNavigation.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Labels for visual comparison
const labels = [
  'gotoBuildOrganisationTrees', 'gotoCompanies', 'gotoCompaniesAddClicked', 'gotoCompaniesCloseClicked',
  'gotoDepartments', 'gotoDepartmentsExportClicked', 'gotoDepartmentsCloseClicked',
  'gotoDivisions', 'gotoDivisionsExportClicked', 'gotoDivisionsCloseClicked',
  'gotoBranches', 'gotoBranchesAddClicked', 'gotoBranchesCloseClicked',
  'gotoBranchSections', 'gotoBranchSectionsAddClicked', 'gotoBranchSectionsCloseClicked',
  'gotoBranchSubSections', 'gotoBranchSubSectionsAddClicked', 'gotoBranchSubSectionsCloseClicked',
  'gotoWorkGroups', 'gotoWorkGroupsAddClicked', 'gotoWorkGroupsCloseClicked',
  'gotoEmployees', 'gotoEmployeesAddClicked', 'gotoEmployeesCloseClicked',
  'gotoDataAccessAdministration', 'gotoMergeOrganisations', 
  'gotoPortfolioManagement', 'gotoMainGroupAccesses', 'gotoSiteAccesses', 'gotoPortfolios',
  'gotoPortfoliosAddClicked', 'gotoPortfoliosCloseClicked',
  'gotoPersonsUsers', 'gotoPersonsUsersAddClicked', 'gotoPersonsUsersCloseClicked',
  'gotoPersonandUserRoles', 'gotoUserRoles', 'gotoUserRolesAddClicked', 'gotoUserRolesCloseClicked',
  'gotoAppSetups', 'gotoAppSetupsAddClicked', 'gotoAppSetupsCloseClicked',
  'gotoDataTable', 'gotoDataTableSiteSelected', 'gotoDataTableMultiRegisterClicked',
  'gotoDataTableCloseClicked', 'gotoMainModules', 'gotoMainModulesExportClicked',
  'gotoMainModulesCloseClicked', 'gotoMainModuleItems', 'gotoMainModuleItemsExportClicked',
  'gotoMainModuleItemsCloseClicked', 'gotoMainModuleAccesses', 'gotoMainModuleAccessesExportClicked',
  'gotoMainModuleAccessesCloseClicked', 'gotoMainModuleItemAccesses', 'gotoMainModuleItemAccessesExportClicked',
  'gotoMainModuleItemAccessesCloseClicked', 'gotoMMProcessIncluded', 'gotoMMProcessIncludedAddClicked',
  'gotoMMProcessIncludedCloseClicked', 'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, accessManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Home Page Navigation
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  // Access Management Module
  await safeStep('gotoAccessManagement', async () => {
    await accessManagement.gotoAccessManagement();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessManagement');
  });

  // Organisations Overview
  await safeStep('gotoOrganisationsOverview', async () => {
    await accessManagement.gotoOrganisationsOverview();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationsOverview');
  });

  await safeStep('gotoBuildOrganisationTrees', async () => {
    await accessManagement.gotoBuildOrganisationTrees();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildOrganisationTrees');
  });

  // Companies Section
  await safeStep('gotoCompanies', async () => {
    await accessManagement.gotoCompanies();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompanies');
  });

  await safeStep('gotoCompaniesAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompaniesAddClicked');
  });

  await safeStep('gotoCompaniesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompaniesCloseClicked');
  });

  // Departments Section
  await safeStep('gotoDepartments', async () => {
    await accessManagement.gotoDepartments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDepartments');
  });

  await safeStep('gotoDepartmentsExportClicked', async () => {
    await accessManagement.clickElement(accessManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDepartmentsExportClicked');
  });

  await safeStep('gotoDepartmentsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDepartmentsCloseClicked');
  });

  // Divisions Section
  await safeStep('gotoDivisions', async () => {
    await accessManagement.gotoDivisions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDivisions');
  });

  await safeStep('gotoDivisionsExportClicked', async () => {
    await accessManagement.clickElement(accessManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDivisionsExportClicked');
  });

  await safeStep('gotoDivisionsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDivisionsCloseClicked');
  });

  // Branches Section
  await safeStep('gotoBranches', async () => {
    await accessManagement.gotoBranches();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranches');
  });

  await safeStep('gotoBranchesAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchesAddClicked');
  });

  await safeStep('gotoBranchesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchesCloseClicked');
  });

  // Branch Sections
  await safeStep('gotoBranchSections', async () => {
    await accessManagement.gotoBranchSections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSections');
  });

  await safeStep('gotoBranchSectionsAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSectionsAddClicked');
  });

  await safeStep('gotoBranchSectionsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSectionsCloseClicked');
  });

  // Branch Sub-Sections
  await safeStep('gotoBranchSubSections', async () => {
    await accessManagement.gotoBranchSubSections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSubSections');
  });

  await safeStep('gotoBranchSubSectionsAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSubSectionsAddClicked');
  });

  await safeStep('gotoBranchSubSectionsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSubSectionsCloseClicked');
  });

  // Work Groups
  await safeStep('gotoWorkGroups', async () => {
    await accessManagement.gotoWorkGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkGroups');
  });

  await safeStep('gotoWorkGroupsAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkGroupsAddClicked');
  });

  await safeStep('gotoWorkGroupsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkGroupsCloseClicked');
  });

  // Employees
  await safeStep('gotoEmployees', async () => {
    await accessManagement.gotoEmployees();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEmployees');
  });

  await safeStep('gotoEmployeesAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEmployeesAddClicked');
  });

  await safeStep('gotoEmployeesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEmployeesCloseClicked');
  });

  // Data Access Administration
  await safeStep('gotoDataAccessAdministration', async () => {
    await accessManagement.gotoDataAccessAdministration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataAccessAdministration');
  });

  await safeStep('gotoMergeOrganisations', async () => {
    await accessManagement.gotoMergeOrganisations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMergeOrganisations');
  });

  // Portfolio Access
  await safeStep('gotoPortfolioAccess', async () => {
    await accessManagement.gotoPortfolioAccess();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolioAccess');
  });

  await safeStep('gotoPortfolioManagement', async () => {
    await accessManagement.gotoPortfolioManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolioManagement');
  });

  await safeStep('gotoMainGroupAccesses', async () => {
    await accessManagement.gotoMainGroupAccesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainGroupAccesses');
  });

  await safeStep('gotoSiteAccesses', async () => {
    await accessManagement.gotoSiteAccesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteAccesses');
  });

  // Portfolios
  await safeStep('gotoPortfolios', async () => {
    await accessManagement.gotoPortfolios();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolios');
  });

  await safeStep('gotoPortfoliosAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfoliosAddClicked');
  });

  await safeStep('gotoPortfoliosCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfoliosCloseClicked');
  });

  // User Role Administration
  await safeStep('gotoUserRoleAdministration', async () => {
    await accessManagement.gotoUserRoleAdministration();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoUserRoleAdministration');
  });

  // Persons/Users
  await safeStep('gotoPersonsUsers', async () => {
    await accessManagement.gotoPersonsUsers();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsers');
  });

  await safeStep('gotoPersonsUsersAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsersAddClicked');
  });

  await safeStep('gotoPersonsUsersCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsersCloseClicked');
  });

  await safeStep('gotoPersonandUserRoles', async () => {
    await accessManagement.gotoPersonandUserRoles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonandUserRoles');
  });

  // User Roles
  await safeStep('gotoUserRoles', async () => {
    await accessManagement.gotoUserRoles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUserRoles');
  });

  await safeStep('gotoUserRolesAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUserRolesAddClicked');
  });

  await safeStep('gotoUserRolesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUserRolesCloseClicked');
  });

  // App Setups
  await safeStep('gotoAppSetups', async () => {
    await accessManagement.gotoAppSetups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppSetups');
  });

  await safeStep('gotoAppSetupsAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppSetupsAddClicked');
  });

  await safeStep('gotoAppSetupsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppSetupsCloseClicked');
  });

  // Main Module Selection
  await safeStep('gotoMainModuleSelection', async () => {
    await accessManagement.gotoMainModuleSelection();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleSelection');
  });

  // Data Table
  await safeStep('gotoDataTable', async () => {
    await accessManagement.gotoDataTable();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataTable');
  });

  await safeStep('gotoDataTableSiteSelected', async () => {
    await accessManagement.selectDropdown('site', 'Activity center');
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataTableSiteSelected');
  });

  await safeStep('gotoDataTableMultiRegisterClicked', async () => {
    await accessManagement.clickElement(accessManagement.MultiRegister);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataTableMultiRegisterClicked');
  });

  await safeStep('gotoDataTableCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataTableCloseClicked');
  });

  // Main Modules
  await safeStep('gotoMainModules', async () => {
    await accessManagement.gotoMainModules();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModules');
  });

  await safeStep('gotoMainModulesExportClicked', async () => {
    await accessManagement.clickElement(accessManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModulesExportClicked');
  });

  await safeStep('gotoMainModulesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModulesCloseClicked');
  });

  // Main Module Items
  await safeStep('gotoMainModuleItems', async () => {
    await accessManagement.gotoMainModuleItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItems');
  });

  await safeStep('gotoMainModuleItemsExportClicked', async () => {
    await accessManagement.clickElement(accessManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItemsExportClicked');
  });

  await safeStep('gotoMainModuleItemsCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItemsCloseClicked');
  });

  // Main Module Accesses
  await safeStep('gotoMainModuleAccesses', async () => {
    await accessManagement.gotoMainModuleAccesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleAccesses');
  });

  await safeStep('gotoMainModuleAccessesExportClicked', async () => {
    await accessManagement.clickElement(accessManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleAccessesExportClicked');
  });

  await safeStep('gotoMainModuleAccessesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleAccessesCloseClicked');
  });

  // Main Module Item Accesses
  await safeStep('gotoMainModuleItemAccesses', async () => {
    await accessManagement.gotoMainModuleItemAccesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItemAccesses');
  });

  await safeStep('gotoMainModuleItemAccessesExportClicked', async () => {
    await accessManagement.clickElement(accessManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItemAccessesExportClicked');
  });

  await safeStep('gotoMainModuleItemAccessesCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItemAccessesCloseClicked');
  });

  // MM Process Included
  await safeStep('gotoMMProcessIncluded', async () => {
    await accessManagement.gotoMMProcessIncluded();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMProcessIncluded');
  });

  await safeStep('gotoMMProcessIncludedAddClicked', async () => {
    await accessManagement.clickElement(accessManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMProcessIncludedAddClicked');
  });

  await safeStep('gotoMMProcessIncludedCloseClicked', async () => {
    await accessManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMProcessIncludedCloseClicked');
  });

  // Configuration
  await safeStep('gotoConfiguration', async () => {
    await accessManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfigurations', async () => {
    await accessManagement.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });
};

// Main visual regression test
test('Visual Regression Test - Access Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});