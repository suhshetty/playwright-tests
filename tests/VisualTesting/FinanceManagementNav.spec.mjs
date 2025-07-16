// File: FinanceManagementNav.spec.js
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
  'gotoElectronicInvoices', 'gotoWorkOrderCosts', 'gotoTimeRegistration', 
  'gotoWorkOrderMaterials', 'gotoLeaseContractPaymentItems', 'gotoPurchaseContractPaymentItems',
  'gotoServiceContractPaymentItems', 'gotoTransactions', 'gotoTransactionCorrections', 'gotoBudgetTargetAreas',
  'gotoBudgetFrames', 'gotoBudgetFrameYears', 'gotoWorkOrders',
  'gotoBudgetForFilloutTargetAreas', 'gotoBudgetForRegions', 'gotoBudgetFilloutsForRegions',
  'gotoBudgetForPortfolios', 'gotoBudgetFilloutForPortfolios',
  'gotoBudgetForObjects', 'gotoBudgetFilloutForObjects', 'gotoAnnualMaintenanceBudgets', 'gotoFundings', 'gotoTargetAreas',
  'gotoFixedAssets', 'gotoFixedAssetGroups', 'gotoFixedAssetSubGroups',
  'gotoCompanies', 'gotoDepartments', 'gotoDivisions', 'gotoBranches',
  'gotoAccounts', 'gotoAccountSections', 'gotoAccountActivities', 'gotoAccountKeys',
  'gotoFinanceSubjects', 'gotoCostCenters', 'gotoFinanceSections', 'gotoPurposes', 'gotoFinanceProjects',
  'gotoProducts', 'gotoFinanceDataSets',
  'gotoConfigureFinanceSettings',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, financeManagement } = await loginAndInitialize({ page, context, baseUrl });

 // Home Page
await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Main Finance Management module
await safeStep('gotoFinanceManagement', async () => {
  await financeManagement.gotoFinanceManagement();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceManagement');
});

// Invoice Transactions
await safeStep('gotoInvoiceTransactions', async () => {
  await financeManagement.gotoInvoiceTransactions();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceTransactions');
});

await safeStep('gotoElectronicInvoices', async () => {
  await financeManagement.gotoElectronicInvoices();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoElectronicInvoices');
});

await safeStep('gotoWorkOrderCosts', async () => {
  await financeManagement.gotoWorkOrderCosts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCosts');
});

await safeStep('gotoTimeRegistration', async () => {
  await financeManagement.gotoTimeRegistration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeRegistration');
});

await safeStep('gotoWorkOrderMaterials', async () => {
  await financeManagement.gotoWorkOrderMaterials();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderMaterials');
});

await safeStep('gotoLeaseContractPaymentItems', async () => {
  await financeManagement.gotoLeaseContractPaymentItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentItems');
});

await safeStep('gotoPurchaseContractPaymentItems', async () => {
  await financeManagement.gotoPurchaseContractPaymentItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractPaymentItems');
});

await safeStep('gotoServiceContractPaymentItems', async () => {
  await financeManagement.gotoServiceContractPaymentItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceContractPaymentItems');
});

await safeStep('gotoTransactions', async () => {
  await financeManagement.gotoTransactions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTransactions');
});

await safeStep('gotoTransactionCorrections', async () => {
  await financeManagement.gotoTransactionCorrections();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTransactionCorrections');
});

// Budget Frames Overview
await safeStep('gotoBudgetFramesOverview', async () => {
  await financeManagement.gotoBudgetFramesOverview();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFramesOverview');
});

await safeStep('gotoBudgetFrames', async () => {
  await financeManagement.gotoBudgetFrames();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFrames');
});

await safeStep('gotoBudgetFrameYears', async () => {
  await financeManagement.gotoBudgetFrameYears();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFrameYears');
});

await safeStep('gotoWorkOrders', async () => {
  await financeManagement.gotoWorkOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
});

// Main Budget Frames
await safeStep('gotoMainBudgetFrames', async () => {
  await financeManagement.gotoMainBudgetFrames();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainBudgetFrames');
});

await safeStep('gotoBudgetTargetAreas', async () => {
  await financeManagement.gotoBudgetTargetAreas();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetTargetAreas');
});

await safeStep('gotoBudgetFilloutForTargetAreas', async () => {
  await financeManagement.gotoBudgetFilloutForTargetAreas();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFilloutForTargetAreas');
});

await safeStep('gotoBudgetForRegions', async () => {
  await financeManagement.gotoBudgetForRegions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetForRegions');
});

await safeStep('gotoBudgetFilloutsForRegions', async () => {
  await financeManagement.gotoBudgetFilloutsForRegions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFilloutsForRegions');
});

await safeStep('gotoBudgetForPortfolios', async () => {
  await financeManagement.gotoBudgetForPortfolios();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetForPortfolios');
});

await safeStep('gotoBudgetFilloutForPortfolios', async () => {
  await financeManagement.gotoBudgetFilloutForPortfolios();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFilloutForPortfolios');
});

await safeStep('gotoBudgetForObjects', async () => {
  await financeManagement.gotoBudgetForObjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetForObjects');
});

await safeStep('gotoBudgetFilloutForObjects', async () => {
  await financeManagement.gotoBudgetFilloutForObjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBudgetFilloutForObjects');
});

await safeStep('gotoAnnualMaintenanceBudgets', async () => {
  await financeManagement.gotoAnnualMaintenanceBudgets();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualMaintenanceBudgets');
});

await safeStep('gotoFundings', async () => {
  await financeManagement.gotoFundings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFundings');
});

await safeStep('gotoTargetAreas', async () => {
  await financeManagement.gotoTargetAreas();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTargetAreas');
});

// Fixed Assets and Depreciations
await safeStep('gotoFixedAssetsDepreciations', async () => {
  await financeManagement.gotoFixedAssetsDepreciations();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoFixedAssetsDepreciations');
});

await safeStep('gotoFixedAssets', async () => {
  await financeManagement.gotoFixedAssets();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFixedAssets');
});

await safeStep('gotoFixedAssetGroups', async () => {
  await financeManagement.gotoFixedAssetGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFixedAssetGroups');
});

await safeStep('gotoFixedAssetSubGroups', async () => {
  await financeManagement.gotoFixedAssetSubGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFixedAssetSubGroups');
});

// Intern Organisation and Creditors
await safeStep('gotoInternOrganisationAndCreditors', async () => {
  await financeManagement.gotoInternOrganisationAndCreditors();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoInternOrganisationAndCreditors');
});

await safeStep('gotoCompanies', async () => {
  await financeManagement.gotoCompanies();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompanies');
});

await safeStep('gotoDepartments', async () => {
  await financeManagement.gotoDepartments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDepartments');
});

await safeStep('gotoDivisions', async () => {
  await financeManagement.gotoDivisions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDivisions');
});

await safeStep('gotoBranches', async () => {
  await financeManagement.gotoBranches();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBranches');
});

// Finance Dimensions
await safeStep('gotoFinanceDimensions', async () => {
  await financeManagement.gotoFinanceDimensions();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceDimensions');
});

await safeStep('gotoAccounts', async () => {
  await financeManagement.gotoAccounts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccounts');
});

await safeStep('gotoAccountSections', async () => {
  await financeManagement.gotoAccountSections();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccountSections');
});

await safeStep('gotoAccountActivities', async () => {
  await financeManagement.gotoAccountActivities();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccountActivities');
});

await safeStep('gotoAccountKeys', async () => {
  await financeManagement.gotoAccountKeys();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccountKeys');
});

await safeStep('gotoFinanceSubjects', async () => {
  await financeManagement.gotoFinanceSubjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceSubjects');
});

await safeStep('gotoCostCenters', async () => {
  await financeManagement.gotoCostCenters();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostCenters');
});

await safeStep('gotoFinanceSections', async () => {
  await financeManagement.gotoFinanceSections();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceSections');
});

await safeStep('gotoPurposes', async () => {
  await financeManagement.gotoPurposes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurposes');
});

await safeStep('gotoFinanceProjects', async () => {
  await financeManagement.gotoFinanceProjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceProjects');
});

await safeStep('gotoProducts', async () => {
  await financeManagement.gotoProducts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProducts');
});

await safeStep('gotoFinanceDataSets', async () => {
  await financeManagement.gotoFinanceDataSets();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceDataSets');
});

// Finance Administration Settings
await safeStep('gotoFinanceAdministrationSettings', async () => {
  await financeManagement.gotoFinanceAdministrationSettings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFinanceAdministrationSettings');
});

await safeStep('gotoConfigureFinanceSettings', async () => {
  await financeManagement.gotoConfigureFinanceSettings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfigureFinanceSettings');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await financeManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfigurations', async () => {
  await financeManagement.gotoAccessConfigurations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
});
}

// Main visual regression test
test('Visual Regression Test - Finance Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});