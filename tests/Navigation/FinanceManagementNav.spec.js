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
await financeManagement.clickRegisterWorkOrderCost();
await financeManagement.gotoTimeRegistration();
await financeManagement.gotoWorkOrderMaterials();
await financeManagement.clickRegisterWorkOrderMaterials();
await financeManagement.gotoLeaseContractPaymentItems();
await financeManagement.gotoPurchaseContractPaymentItems();
await financeManagement.gotoServiceContractPaymentItems();
await financeManagement.gotoTransactions();
await financeManagement.gotoTransactionCorrections();

// Budget Frames Overview
await financeManagement.gotoMainBudgetFrames();
await financeManagement.gotoBudgetFramesOverview();
await financeManagement.gotoBudgetFrames();
await financeManagement.clickRegisterBudgetFrames();
await financeManagement.gotoBudgetFrameYears();
await financeManagement.clickRegisterBudgetFrameYears();
await financeManagement.gotoWorkOrders();

// Main Budget Frames
await financeManagement.gotoMainBudgetFrames();
await financeManagement.gotoBudgetTargetAreas();
await financeManagement.clickRegisterBudgetForTargetAreas();
await financeManagement.gotoBudgetFilloutForTargetAreas();
await financeManagement.gotoBudgetForRegions();
await financeManagement.clickRegisterBudgetForRegions();
await financeManagement.gotoBudgetFilloutsForRegions();
await financeManagement.gotoBudgetForPortfolios();
await financeManagement.clickRegisterBudgetForPortfolios();
await financeManagement.gotoBudgetFilloutForPortfolios();
await financeManagement.gotoBudgetForObjects();
await financeManagement.clickRegisterBudgetForObjects();
await financeManagement.gotoBudgetFilloutForObjects();
await financeManagement.gotoAnnualMaintenanceBudgets();
await financeManagement.clickRegisterAnnualMaintenanceBudgets();
await financeManagement.gotoFundings();
await financeManagement.clickRegisterFundings();
await financeManagement.gotoTargetAreas();
await financeManagement.clickRegisterTargetAreas();

// Fixed Assets and Depreciations
await financeManagement.gotoFixedAssetsDepreciations();
await financeManagement.gotoFixedAssets();
await financeManagement.clickRegisterFixedAssets();
await financeManagement.gotoFixedAssetGroups();
await financeManagement.clickRegisterFixedAssetGroups();
await financeManagement.gotoFixedAssetSubGroups();
await financeManagement.clickRegisterFixedAssetSubGroups();

// Intern Organisation and Creditors
await financeManagement.gotoInternOrganisationAndCreditors();
await financeManagement.gotoCompanies();
await financeManagement.clickRegisterCompanies();
await financeManagement.gotoDepartments();
await financeManagement.gotoDivisions();
await financeManagement.gotoBranches();
await financeManagement.clickRegisterBranches();

// Finance Dimensions
await financeManagement.gotoFinanceDimensions();
await financeManagement.gotoAccounts();
await financeManagement.clickRegisterAccounts();
await financeManagement.gotoAccountSections();
await financeManagement.gotoAccountActivities();
await financeManagement.gotoAccountKeys();
await financeManagement.clickRegisterAccountKeys();
await financeManagement.gotoFinanceSubjects();
await financeManagement.clickRegisterFinanceSubjects();
await financeManagement.gotoCostCenters();
await financeManagement.clickRegisterCostCenters();
await financeManagement.gotoFinanceSections();
await financeManagement.clickRegisterFinanceSections();
await financeManagement.gotoPurposes();
await financeManagement.clickRegisterPurposes();
await financeManagement.gotoFinanceProjects();
await financeManagement.clickRegisterFinanceProjects();
await financeManagement.gotoProducts();
await financeManagement.clickRegisterProducts();
await financeManagement.gotoFinanceDataSets();
await financeManagement.clickRegisterFinanceDataSets();

// Finance Administration Settings
await financeManagement.gotoFinanceAdministrationSettings();
await financeManagement.gotoConfigureFinanceSettings();

// Configuration
await financeManagement.gotoConfiguration();
await financeManagement.gotoAccessConfigurations();
});