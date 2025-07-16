// tests/FinanceManagementNav.spec.js
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
const { homePage, financeManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main Finance Management module
await financeManagement.gotoFinanceManagement();

// Invoice Transactions
await financeManagement.gotoInvoiceTransactions();
await financeManagement.gotoElectronicInvoices();
await financeManagement.gotoWorkOrderCosts();
await financeManagement.gotoTimeRegistration();
await financeManagement.gotoWorkOrderMaterials();
await financeManagement.gotoLeaseContractPaymentItems();
await financeManagement.gotoPurchaseContractPaymentItems();
await financeManagement.gotoServiceContractPaymentItems();
await financeManagement.gotoTransactions();
await financeManagement.gotoTransactionCorrections();

// Budget Frames Overview
await financeManagement.gotoMainBudgetFrames();
await financeManagement.gotoBudgetFramesOverview();
await financeManagement.gotoBudgetFrames();
await financeManagement.gotoBudgetFrameYears();
await financeManagement.gotoWorkOrders();

// Main Budget Frames
await financeManagement.gotoMainBudgetFrames();
await financeManagement.gotoBudgetTargetAreas();
await financeManagement.gotoBudgetFilloutForTargetAreas();
await financeManagement.gotoBudgetForRegions();
await financeManagement.gotoBudgetFilloutsForRegions();
await financeManagement.gotoBudgetForPortfolios();
await financeManagement.gotoBudgetFilloutForPortfolios();
await financeManagement.gotoBudgetForObjects();
await financeManagement.gotoBudgetFilloutForObjects();
await financeManagement.gotoAnnualMaintenanceBudgets();
await financeManagement.gotoFundings();
await financeManagement.gotoTargetAreas();

// Fixed Assets and Depreciations
await financeManagement.gotoFixedAssetsDepreciations();
await financeManagement.gotoFixedAssets();
await financeManagement.gotoFixedAssetGroups();
await financeManagement.gotoFixedAssetSubGroups();

// Intern Organisation and Creditors
await financeManagement.gotoInternOrganisationAndCreditors();
await financeManagement.gotoCompanies();
await financeManagement.gotoDepartments();
await financeManagement.gotoDivisions();
await financeManagement.gotoBranches();

// Finance Dimensions
await financeManagement.gotoFinanceDimensions();
await financeManagement.gotoAccounts();
await financeManagement.gotoAccountSections();
await financeManagement.gotoAccountActivities();
await financeManagement.gotoAccountKeys();
await financeManagement.gotoFinanceSubjects();
await financeManagement.gotoCostCenters();
await financeManagement.gotoFinanceSections();
await financeManagement.gotoPurposes();
await financeManagement.gotoFinanceProjects();
await financeManagement.gotoProducts();
await financeManagement.gotoFinanceDataSets();

// Finance Administration Settings
await financeManagement.gotoFinanceAdministrationSettings();
await financeManagement.gotoConfigureFinanceSettings();

// Configuration
await financeManagement.gotoConfiguration();
await financeManagement.gotoAccessConfigurations();
});