// File: AccessManagementNav.spec.js
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

// Labels for screenshot steps
const labels = [
  'gotoHomePage', 'gotoModuleMenu', 'gotoAccessManagement',
  'gotoOrganisationsOverview', 'gotoBuildOrganisationTrees',
  'gotoCompanies', 'gotoDepartments', 'gotoDivisions', 'gotoBranches',
  'gotoBranchSections', 'gotoBranchSubSections', 'gotoWorkGroups',
  'gotoEmployees', 'gotoDataAccessAdministration', 'gotoMergeOrganisations',
  'gotoPortfolioAccess', 'gotoPortfolioManagement', 'gotoMainGroupAccesses',
  'gotoSiteAccesses', 'gotoPortfolios', 'gotoUserRoleAdministration',
  'gotoPersonsUsers', 'gotoPersonandUserRoles', 'gotoUserRoles',
  'gotoAppSetups', 'gotoMainModuleSelection', 'gotoDataTable',
  'gotoMainModules', 'gotoMainModuleItems', 'gotoMainModuleAccesses',
  'gotoMainModuleItemAccesses', 'gotoMMProcessIncluded',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Navigation test runner
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, accessManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoAccessManagement', async () => {
    await accessManagement.gotoAccessManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessManagement');
  });

  await safeStep('gotoOrganisationsOverview', async () => {
    await accessManagement.gotoOrganisationsOverview();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganisationsOverview');
  });

  await safeStep('gotoBuildOrganisationTrees', async () => {
    await accessManagement.gotoBuildOrganisationTrees();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildOrganisationTrees');
  });

  await safeStep('gotoCompanies', async () => {
    await accessManagement.gotoCompanies();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompanies');
  });

  await safeStep('gotoDepartments', async () => {
    await accessManagement.gotoDepartments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDepartments');
  });

  await safeStep('gotoDivisions', async () => {
    await accessManagement.gotoDivisions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDivisions');
  });

  await safeStep('gotoBranches', async () => {
    await accessManagement.gotoBranches();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranches');
  });

  await safeStep('gotoBranchSections', async () => {
    await accessManagement.gotoBranchSections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSections');
  });

  await safeStep('gotoBranchSubSections', async () => {
    await accessManagement.gotoBranchSubSections();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranchSubSections');
  });

  await safeStep('gotoWorkGroups', async () => {
    await accessManagement.gotoWorkGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkGroups');
  });

  await safeStep('gotoEmployees', async () => {
    await accessManagement.gotoEmployees();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEmployees');
  });

  await safeStep('gotoDataAccessAdministration', async () => {
    await accessManagement.gotoDataAccessAdministration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataAccessAdministration');
  });

  await safeStep('gotoMergeOrganisations', async () => {
    await accessManagement.gotoMergeOrganisations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMergeOrganisations');
  });

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

  await safeStep('gotoPortfolios', async () => {
    await accessManagement.gotoPortfolios();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolios');
  });

  await safeStep('gotoUserRoleAdministration', async () => {
    await accessManagement.gotoUserRoleAdministration();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoUserRoleAdministration');
  });

  await safeStep('gotoPersonsUsers', async () => {
    await accessManagement.gotoPersonsUsers();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsers');
  });

  await safeStep('gotoPersonandUserRoles', async () => {
    await accessManagement.gotoPersonandUserRoles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonandUserRoles');
  });

  await safeStep('gotoUserRoles', async () => {
    await accessManagement.gotoUserRoles();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUserRoles');
  });

  await safeStep('gotoAppSetups', async () => {
    await accessManagement.gotoAppSetups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppSetups');
  });

  await safeStep('gotoMainModuleSelection', async () => {
    await accessManagement.gotoMainModuleSelection();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleSelection');
  });

  await safeStep('gotoDataTable', async () => {
    await accessManagement.gotoDataTable();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataTable');
  });

  await safeStep('gotoMainModules', async () => {
    await accessManagement.gotoMainModules();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModules');
  });

  await safeStep('gotoMainModuleItems', async () => {
    await accessManagement.gotoMainModuleItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItems');
  });

  await safeStep('gotoMainModuleAccesses', async () => {
    await accessManagement.gotoMainModuleAccesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleAccesses');
  });

  await safeStep('gotoMainModuleItemAccesses', async () => {
    await accessManagement.gotoMainModuleItemAccesses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainModuleItemAccesses');
  });

  await safeStep('gotoMMProcessIncluded', async () => {
    await accessManagement.gotoMMProcessIncluded();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMProcessIncluded');
  });

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
