// File: SpaceManagementNavigation.spec.js
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
  // Home and Module Navigation
  'gotoHomePage', 'gotoModuleMenu', 'clickPropertyManagement',

  // Lease Objects
  'gotoLeaseObjects', 'gotoHousings', 'gotoHousingsAddClicked',
  'gotoHousingsCloseClicked', 'gotoHousingsExportClicked',
  'gotoHousingsCloseClicked2', 'gotoBuildingSpaces',
  'gotoBuildingSpacesAddClicked', 'gotoBuildingSpacesCloseClicked',
  'gotoHousingSpaces', 'gotoBuildingSpaceInformations',
  'gotoCapacityObjects', 'gotoCapacityObjectsAddClicked',
  'gotoCapacityObjectsCloseClicked', 'gotoCapacityObjectsExportClicked',
  'gotoCapacityObjectsCloseClicked2', 'gotoLocateCapacityObjects',
  'gotoLocationCostDivision', 'gotoLocationCostDivisionAddClicked',
  'gotoLocationCostDivisionCloseClicked', 'gotoLocationCostDivisionExportClicked',
  'gotoLocationCostDivisionCloseClicked2', 'gotoWorkOrderPayers',
  'gotoWorkOrderPayersAddClicked', 'gotoWorkOrderPayersCloseClicked',
  'gotoWorkOrderPayersExportClicked', 'gotoWorkOrderPayersCloseClicked2',
  'gotoPublishedPriceLists', 'gotoPublishedPriceListsAddClicked',
  'gotoPublishedPriceListsCloseClicked', 'gotoPublishedPriceListsExportClicked',
  'gotoPublishedPriceListsCloseClicked2',

  // Lease Contracts Overview
  'gotoLeaseContractsOverview', 'gotoHeadLeaseContracts',
  'gotoHeadLeaseContractsAddClicked', 'gotoHeadLeaseContractsCloseClicked',
  'gotoHeadLeaseContractsExportClicked', 'gotoHeadLeaseContractsCloseClicked2',
  'gotoLeaseContracts', 'gotoLeaseContractsAddClicked',
  'gotoLeaseContractsCloseClicked', 'gotoLeaseContractsExportClicked',
  'gotoLeaseContractsCloseClicked2', 'gotoSubLeaseContracts',
  'gotoSubLeaseContractsAddClicked', 'gotoSubLeaseContractsCloseClicked',
  'gotoSubLeaseContractsExportClicked', 'gotoSubLeaseContractsCloseClicked2',
  'gotoLeaseContractReminders', 'gotoLeaseContractRemindersExportClicked',
  'gotoLeaseContractRemindersCloseClicked', 'gotoLeaseContractRenegotiations',
  'gotoLeaseContractRenegotiationsAddClicked', 'gotoLeaseContractRenegotiationsCloseClicked',
  'gotoLeaseContractRenegotiationsExportClicked', 'gotoLeaseContractRenegotiationsCloseClicked2',
  'gotoLeaseContractUtilizations', 'gotoLeaseContractUtilizationsAddClicked',
  'gotoLeaseContractUtilizationsCloseClicked', 'gotoLeaseContractUtilizationsExportClicked',
  'gotoLeaseContractUtilizationsCloseClicked2', 'gotoSiteLeases',
  'gotoSiteLeasesAddClicked', 'gotoSiteLeasesCloseClicked',
  'gotoSiteLeasesExportClicked', 'gotoSiteLeasesCloseClicked2',

  // Lease Contract Finance
  'gotoLeaseContractFinance', 'gotoLeaseContractPaymentItems',
  'gotoLeaseContractPayments', 'gotoLeaseContractPaymentsAddClicked',
  'gotoLeaseContractPaymentsCloseClicked', 'gotoLeaseContractPaymentsExportClicked',
  'gotoLeaseContractPaymentsCloseClicked2', 'gotoLeaseContractCustomerRevenues',
  'gotoLeaseContractCustomerRevenuesAddClicked', 'gotoLeaseContractCustomerRevenuesCloseClicked',
  'gotoLeaseContractCustomerRevenuesExportClicked', 'gotoLeaseContractCustomerRevenuesCloseClicked2',
  'gotoCostDistributionAgreements', 'gotoCostDistributionAgreementsAddClicked',
  'gotoCostDistributionAgreementsCloseClicked', 'gotoCostDistributionAgreementsExportClicked',
  'gotoCostDistributionAgreementsCloseClicked2', 'gotoCostDistributionAgreementGroups',
  'gotoCostDistributionAgreementGroupsExportClicked', 'gotoCostDistributionAgreementGroupsCloseClicked',
  'gotoProducts', 'gotoProductsAddClicked', 'gotoProductsCloseClicked',
  'gotoProductsExportClicked', 'gotoProductsCloseClicked2',
  'gotoInvoiceBasisLCF', 'gotoInvoiceBasisLCFAddClicked',
  'gotoInvoiceBasisLCFCloseClicked', 'gotoInvoiceBasisLCFExportClicked',
  'gotoInvoiceBasisLCFCloseClicked2',

  // Purchase Contracts Overview
  'gotoPurchaseContractsOverview', 'gotoPurchaseContracts',
  'gotoPurchaseContractsAddClicked', 'gotoPurchaseContractsCloseClicked',
  'gotoPurchaseContractsExportClicked', 'gotoPurchaseContractsCloseClicked2',
  'gotoPurchaseContractReminders', 'gotoPurchaseContractRemindersExportClicked',
  'gotoPurchaseContractRemindersCloseClicked', 'gotoPurchaseContractPaymentItems',
  'gotoPurchaseContractPaymentItemsExportClicked', 'gotoPurchaseContractPaymentItemsCloseClicked',
  'gotoInvoiceBasisPCO', 'gotoInvoiceBasisPCOAddClicked',
  'gotoInvoiceBasisPCOCloseClicked', 'gotoInvoiceBasisPCOExportClicked',
  'gotoInvoiceBasisPCOCloseClicked2',

  // Lease Holders
  'gotoLeaseHolders', 'gotoLeaseHolderOrganisations',
  'gotoLeaseHolderOrganisationsAddClicked', 'gotoLeaseHolderOrganisationsCloseClicked',
  'gotoLeaseHolderOrganisationsExportClicked', 'gotoLeaseHolderOrganisationsCloseClicked2',
  'gotoResidents', 'gotoResidentsAddClicked', 'gotoResidentsCloseClicked',
  'gotoResidentsExportClicked', 'gotoResidentsCloseClicked2',
  'gotoOrganicVatDeclarations', 'gotoOrganicVatDeclarationsExportClicked',
  'gotoOrganicVatDeclarationsCloseClicked', 'gotoCompanies',
  'gotoCompaniesAddClicked', 'gotoCompaniesCloseClicked',
  'gotoPersonsUsers', 'gotoPersonsUsersAddClicked',
  'gotoPersonsUsersCloseClicked', 'gotoPersonsUsersExportClicked',
  'gotoPersonsUsersCloseClicked2', 'gotoFailures',
  'gotoFailuresAddClicked', 'gotoFailuresCloseClicked',
  'gotoFailuresExportClicked', 'gotoFailuresCloseClicked2',

  // Housing Brokerage
  'gotoHousingBrokerage', 'gotoLeaseApplications',
  'gotoLeaseApplicationsAddClicked', 'gotoLeaseApplicationsCloseClicked',
  'gotoLeaseApplicationsExportClicked', 'gotoLeaseApplicationsCloseClicked2',
  'gotoOpportunities', 'gotoOpportunitiesAddClicked',
  'gotoOpportunitiesCloseClicked', 'gotoOpportunitiesExportClicked',
  'gotoOpportunitiesCloseClicked2', 'gotoOpportunityComments',
  'gotoOpportunityCommentsExportClicked', 'gotoOpportunityCommentsCloseClicked',

  // Moving In/Out
  'gotoMovingInOut', 'gotoWorkOrders', 'gotoWorkOrdersAddClicked',
  'gotoWorkOrdersCloseClicked', 'gotoWorkOrdersExportClicked',
  'gotoWorkOrdersCloseClicked2', 'gotoChecklists',
  'gotoChecklistsExportClicked', 'gotoChecklistsCloseClicked',
  'gotoInspections', 'gotoCheckItems',
  'gotoCheckItemsExportClicked', 'gotoCheckItemsCloseClicked',
  'gotoHousingWorkProcessRules', 'gotoHousingWorkProcessRulesAddClicked',
  'gotoHousingWorkProcessRulesCloseClicked', 'gotoHousingWorkProcessRulesExportClicked',
  'gotoHousingWorkProcessRulesCloseClicked2',

  // Data Setup
  'gotoDataSetup', 'gotoPriceIndexes',
  'gotoPriceIndexesAddClicked', 'gotoPriceIndexesCloseClicked',
  'gotoPriceIndexesExportClicked', 'gotoPriceIndexesCloseClicked2',

  // Configuration
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, propertyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });


  await safeStep('clickpropertyManagement', async () => {
    await propertyManagement.clickpropertyManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickpropertyManagement');
  });

  // === Lease Objects ===
  await safeStep('gotoLeaseObjects', async () => {
    await propertyManagement.gotoLeaseObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseObjects');
  });

  await safeStep('gotoHousings', async () => {
    await propertyManagement.gotoHousings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousings');
  });

  await safeStep('gotoHousingsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingsAddClicked');
  });

  await safeStep('gotoHousingsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose());
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingsCloseClicked');
  });

  await safeStep('gotoHousingsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingsExportClicked');
  });

  await safeStep('gotoHousingsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingsCloseClicked2');
  });

  await safeStep('gotoBuildingSpaces', async () => {
    await propertyManagement.gotoBuildingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
  });

  await safeStep('gotoBuildingSpacesAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesAddClicked');
  });

  await safeStep('gotoBuildingSpacesCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpacesCloseClicked');
  });

  await safeStep('gotoHousingSpaces', async () => {
    await propertyManagement.gotoHousingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingSpaces');
  });

  await safeStep('gotoBuildingSpaceInformations', async () => {
    await propertyManagement.gotoBuildingSpaceInformations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaceInformations');
  });

  await safeStep('gotoCapacityObjects', async () => {
    await propertyManagement.gotoCapacityObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCapacityObjects');
  });

  await safeStep('gotoCapacityObjectsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCapacityObjectsAddClicked');
  });

  await safeStep('gotoCapacityObjectsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCapacityObjectsCloseClicked');
  });

  await safeStep('gotoCapacityObjectsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCapacityObjectsExportClicked');
  });

  await safeStep('gotoCapacityObjectsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCapacityObjectsCloseClicked2');
  });

  await safeStep('gotoLocateCapacityObjects', async () => {
    await propertyManagement.gotoLocateCapacityObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateCapacityObjects');
  });

  await safeStep('gotoLocationCostDivision', async () => {
    await propertyManagement.gotoLocationCostDivision();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationCostDivision');
  });

  await safeStep('gotoLocationCostDivisionAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationCostDivisionAddClicked');
  });

  await safeStep('gotoLocationCostDivisionCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationCostDivisionCloseClicked');
  });

  await safeStep('gotoLocationCostDivisionExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationCostDivisionExportClicked');
  });

  await safeStep('gotoLocationCostDivisionCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationCostDivisionCloseClicked2');
  });

  await safeStep('gotoWorkOrderPayers', async () => {
    await propertyManagement.gotoWorkOrderPayers();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderPayers');
  });

  await safeStep('gotoWorkOrderPayersAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderPayersAddClicked');
  });

  await safeStep('gotoWorkOrderPayersCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderPayersCloseClicked');
  });

  await safeStep('gotoWorkOrderPayersExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderPayersExportClicked');
  });

  await safeStep('gotoWorkOrderPayersCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderPayersCloseClicked2');
  });

  await safeStep('gotoPublishedPriceLists', async () => {
    await propertyManagement.gotoPublishedPriceLists();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPublishedPriceLists');
  });

  await safeStep('gotoPublishedPriceListsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPublishedPriceListsAddClicked');
  });

  await safeStep('gotoPublishedPriceListsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPublishedPriceListsCloseClicked');
  });

  await safeStep('gotoPublishedPriceListsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPublishedPriceListsExportClicked');
  });

  await safeStep('gotoPublishedPriceListsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPublishedPriceListsCloseClicked2');
  });

  // === Lease Contracts Overview ===
  await safeStep('gotoLeaseContractsOverview', async () => {
    await propertyManagement.gotoLeaseContractsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractsOverview');
  });

  await safeStep('gotoHeadLeaseContracts', async () => {
    await propertyManagement.gotoHeadLeaseContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHeadLeaseContracts');
  });

  await safeStep('gotoHeadLeaseContractsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHeadLeaseContractsAddClicked');
  });

  await safeStep('gotoHeadLeaseContractsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHeadLeaseContractsCloseClicked');
  });

  await safeStep('gotoHeadLeaseContractsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHeadLeaseContractsExportClicked');
  });

  await safeStep('gotoHeadLeaseContractsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHeadLeaseContractsCloseClicked2');
  });

  await safeStep('gotoLeaseContracts', async () => {
    await propertyManagement.gotoLeaseContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContracts');
  });

  await safeStep('gotoLeaseContractsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractsAddClicked');
  });

  await safeStep('gotoLeaseContractsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractsCloseClicked');
  });

  await safeStep('gotoLeaseContractsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractsExportClicked');
  });

  await safeStep('gotoLeaseContractsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractsCloseClicked2');
  });

  await safeStep('gotoSubLeaseContracts', async () => {
    await propertyManagement.gotoSubLeaseContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSubLeaseContracts');
  });

  await safeStep('gotoSubLeaseContractsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSubLeaseContractsAddClicked');
  });

  await safeStep('gotoSubLeaseContractsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSubLeaseContractsCloseClicked');
  });

  await safeStep('gotoSubLeaseContractsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSubLeaseContractsExportClicked');
  });

  await safeStep('gotoSubLeaseContractsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSubLeaseContractsCloseClicked2');
  });

  await safeStep('gotoLeaseContractReminders', async () => {
    await propertyManagement.gotoLeaseContractReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractReminders');
  });

  await safeStep('gotoLeaseContractRemindersExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRemindersExportClicked');
  });

  await safeStep('gotoLeaseContractRemindersCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRemindersCloseClicked');
  });

  await safeStep('gotoLeaseContractRenegotiations', async () => {
    await propertyManagement.gotoLeaseContractRenegotiations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRenegotiations');
  });

  await safeStep('gotoLeaseContractRenegotiationsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRenegotiationsAddClicked');
  });

  await safeStep('gotoLeaseContractRenegotiationsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRenegotiationsCloseClicked');
  });

  await safeStep('gotoLeaseContractRenegotiationsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRenegotiationsExportClicked');
  });

  await safeStep('gotoLeaseContractRenegotiationsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRenegotiationsCloseClicked2');
  });

  await safeStep('gotoLeaseContractUtilizations', async () => {
    await propertyManagement.gotoLeaseContractUtilizations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractUtilizations');
  });

  await safeStep('gotoLeaseContractUtilizationsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractUtilizationsAddClicked');
  });

  await safeStep('gotoLeaseContractUtilizationsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractUtilizationsCloseClicked');
  });

  await safeStep('gotoLeaseContractUtilizationsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractUtilizationsExportClicked');
  });

  await safeStep('gotoLeaseContractUtilizationsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractUtilizationsCloseClicked2');
  });

  await safeStep('gotoSiteLeases', async () => {
    await propertyManagement.gotoSiteLeases();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeases');
  });

  await safeStep('gotoSiteLeasesAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeasesAddClicked');
  });

  await safeStep('gotoSiteLeasesCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeasesCloseClicked');
  });

  await safeStep('gotoSiteLeasesExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeasesExportClicked');
  });

  await safeStep('gotoSiteLeasesCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeasesCloseClicked2');
  });

  // === Lease Contract Finance ===
  await safeStep('gotoLeaseContractFinance', async () => {
    await propertyManagement.gotoLeaseContractFinance();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractFinance');
  });

  await safeStep('gotoLeaseContractPaymentItems', async () => {
    await propertyManagement.gotoLeaseContractPaymentItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentItems');
  });

  await safeStep('gotoLeaseContractPayments', async () => {
    await propertyManagement.gotoLeaseContractPayments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPayments');
  });

  await safeStep('gotoLeaseContractPaymentsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentsAddClicked');
  });

  await safeStep('gotoLeaseContractPaymentsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentsCloseClicked');
  });

  await safeStep('gotoLeaseContractPaymentsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentsExportClicked');
  });

  await safeStep('gotoLeaseContractPaymentsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentsCloseClicked2');
  });

  await safeStep('gotoLeaseContractCustomerRevenues', async () => {
    await propertyManagement.gotoLeaseContractCustomerRevenues();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractCustomerRevenues');
  });

  await safeStep('gotoLeaseContractCustomerRevenuesAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractCustomerRevenuesAddClicked');
  });

  await safeStep('gotoLeaseContractCustomerRevenuesCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractCustomerRevenuesCloseClicked');
  });

  await safeStep('gotoLeaseContractCustomerRevenuesExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractCustomerRevenuesExportClicked');
  });

  await safeStep('gotoLeaseContractCustomerRevenuesCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractCustomerRevenuesCloseClicked2');
  });

  await safeStep('gotoCostDistributionAgreements', async () => {
    await propertyManagement.gotoCostDistributionAgreements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreements');
  });

  await safeStep('gotoCostDistributionAgreementsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementsAddClicked');
  });

  await safeStep('gotoCostDistributionAgreementsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementsCloseClicked');
  });

  await safeStep('gotoCostDistributionAgreementsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementsExportClicked');
  });

  await safeStep('gotoCostDistributionAgreementsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementsCloseClicked2');
  });

  await safeStep('gotoCostDistributionAgreementGroups', async () => {
    await propertyManagement.gotoCostDistributionAgreementGroups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementGroups');
  });

  await safeStep('gotoCostDistributionAgreementGroupsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementGroupsExportClicked');
  });

  await safeStep('gotoCostDistributionAgreementGroupsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementGroupsCloseClicked');
  });

  await safeStep('gotoProducts', async () => {
    await propertyManagement.gotoProducts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProducts');
  });

  await safeStep('gotoProductsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductsAddClicked');
  });

  await safeStep('gotoProductsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductsCloseClicked');
  });

  await safeStep('gotoProductsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductsExportClicked');
  });

  await safeStep('gotoProductsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductsCloseClicked2');
  });

  await safeStep('gotoInvoiceBasisLCF', async () => {
    await propertyManagement.gotoInvoiceBasisLCF();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisLCF');
  });

  await safeStep('gotoInvoiceBasisLCFAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisLCFAddClicked');
  });

  await safeStep('gotoInvoiceBasisLCFCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisLCFCloseClicked');
  });

  await safeStep('gotoInvoiceBasisLCFExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisLCFExportClicked');
  });

  await safeStep('gotoInvoiceBasisLCFCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisLCFCloseClicked2');
  });

  // === Purchase Contracts Overview ===
  await safeStep('gotoPurchaseContractsOverview', async () => {
    await propertyManagement.gotoPurchaseContractsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractsOverview');
  });

  await safeStep('gotoPurchaseContracts', async () => {
    await propertyManagement.gotoPurchaseContracts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContracts');
  });

  await safeStep('gotoPurchaseContractsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractsAddClicked');
  });

  await safeStep('gotoPurchaseContractsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractsCloseClicked');
  });

  await safeStep('gotoPurchaseContractsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractsExportClicked');
  });

  await safeStep('gotoPurchaseContractsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractsCloseClicked2');
  });

  await safeStep('gotoPurchaseContractReminders', async () => {
    await propertyManagement.gotoPurchaseContractReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractReminders');
  });

  await safeStep('gotoPurchaseContractRemindersExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractRemindersExportClicked');
  });

  await safeStep('gotoPurchaseContractRemindersCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractRemindersCloseClicked');
  });

  await safeStep('gotoPurchaseContractPaymentItems', async () => {
    await propertyManagement.gotoPurchaseContractPaymentItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractPaymentItems');
  });

  await safeStep('gotoPurchaseContractPaymentItemsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractPaymentItemsExportClicked');
  });

  await safeStep('gotoPurchaseContractPaymentItemsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractPaymentItemsCloseClicked');
  });

  await safeStep('gotoInvoiceBasisPCO', async () => {
    await propertyManagement.gotoInvoiceBasisPCO();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisPCO');
  });

  await safeStep('gotoInvoiceBasisPCOAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisPCOAddClicked');
  });

  await safeStep('gotoInvoiceBasisPCOCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisPCOCloseClicked');
  });

  await safeStep('gotoInvoiceBasisPCOExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisPCOExportClicked');
  });

  await safeStep('gotoInvoiceBasisPCOCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasisPCOCloseClicked2');
  });

  // === Lease Holders ===
  await safeStep('gotoLeaseHolders', async () => {
    await propertyManagement.gotoLeaseHolders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolders');
  });

  await safeStep('gotoLeaseHolderOrganisations', async () => {
    await propertyManagement.gotoLeaseHolderOrganisations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolderOrganisations');
  });

  await safeStep('gotoLeaseHolderOrganisationsAddClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolderOrganisationsAddClicked');
  });

  await safeStep('gotoLeaseHolderOrganisationsCloseClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolderOrganisationsCloseClicked');
  });

  await safeStep('gotoLeaseHolderOrganisationsExportClicked', async () => {
    await propertyManagement.clickElement(propertyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolderOrganisationsExportClicked');
  });

  await safeStep('gotoLeaseHolderOrganisationsCloseClicked2', async () => {
    await propertyManagement.clickElement(propertyManagement.clickClose);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolderOrganisationsCloseClicked2');
  });


await safeStep('gotoResidents', async () => {
  await propertyManagement.gotoResidents();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResidents');
});

await safeStep('gotoResidentsAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResidentsAddClicked');
});

await safeStep('gotoResidentsCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResidentsCloseClicked');
});

await safeStep('gotoResidentsExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResidentsExportClicked');
});

await safeStep('gotoResidentsCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResidentsCloseClicked2');
});

await safeStep('gotoOrganicVatDeclarations', async () => {
  await propertyManagement.gotoOrganicVatDeclarations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganicVatDeclarations');
});

await safeStep('gotoOrganicVatDeclarationsExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganicVatDeclarationsExportClicked');
});

await safeStep('gotoOrganicVatDeclarationsCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganicVatDeclarationsCloseClicked');
});

await safeStep('gotoCompanies', async () => {
  await propertyManagement.gotoCompanies();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompanies');
});

await safeStep('gotoCompaniesAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompaniesAddClicked');
});

await safeStep('gotoCompaniesCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompaniesCloseClicked');
});

await safeStep('gotoPersonsUsers', async () => {
  await propertyManagement.gotoPersonsUsers();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsers');
});

await safeStep('gotoPersonsUsersAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsersAddClicked');
});

await safeStep('gotoPersonsUsersCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsersCloseClicked');
});

await safeStep('gotoPersonsUsersExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsersExportClicked');
});

await safeStep('gotoPersonsUsersCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsersCloseClicked2');
});

await safeStep('gotoFailures', async () => {
  await propertyManagement.gotoFailures();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailures');
});

await safeStep('gotoFailuresAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailuresAddClicked');
});

await safeStep('gotoFailuresCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailuresCloseClicked');
});

await safeStep('gotoFailuresExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailuresExportClicked');
});

await safeStep('gotoFailuresCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailuresCloseClicked2');
});

// Housing Brokerage
await safeStep('gotoHousingBrokerage', async () => {
  await propertyManagement.gotoHousingBrokerage();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingBrokerage');
});

await safeStep('gotoLeaseApplications', async () => {
  await propertyManagement.gotoLeaseApplications();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseApplications');
});

await safeStep('gotoLeaseApplicationsAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseApplicationsAddClicked');
});

await safeStep('gotoLeaseApplicationsCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseApplicationsCloseClicked');
});

await safeStep('gotoLeaseApplicationsExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseApplicationsExportClicked');
});

await safeStep('gotoLeaseApplicationsCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseApplicationsCloseClicked2');
});

await safeStep('gotoOpportunities', async () => {
  await propertyManagement.gotoOpportunities();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunities');
});

await safeStep('gotoOpportunitiesAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunitiesAddClicked');
});

await safeStep('gotoOpportunitiesCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunitiesCloseClicked');
});

await safeStep('gotoOpportunitiesExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunitiesExportClicked');
});

await safeStep('gotoOpportunitiesCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunitiesCloseClicked2');
});

await safeStep('gotoOpportunityComments', async () => {
  await propertyManagement.gotoOpportunityComments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunityComments');
});

await safeStep('gotoOpportunityCommentsExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunityCommentsExportClicked');
});

await safeStep('gotoOpportunityCommentsCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunityCommentsCloseClicked');
});

// Moving In/Out
await safeStep('gotoMovingInOut', async () => {
  await propertyManagement.gotoMovingInOut();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoMovingInOut');
});

await safeStep('gotoWorkOrders', async () => {
  await propertyManagement.gotoWorkOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
});

await safeStep('gotoWorkOrdersAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersAddClicked');
});

await safeStep('gotoWorkOrdersCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersCloseClicked');
});

await safeStep('gotoWorkOrdersExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersExportClicked');
});

await safeStep('gotoWorkOrdersCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrdersCloseClicked2');
});

await safeStep('gotoChecklists', async () => {
  await propertyManagement.gotoChecklists();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklists');
});

await safeStep('gotoChecklistsExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsExportClicked');
});

await safeStep('gotoChecklistsCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsCloseClicked');
});

await safeStep('gotoInspections', async () => {
  await propertyManagement.gotoInspections();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');
});

await safeStep('gotoCheckItems', async () => {
  await propertyManagement.gotoCheckItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItems');
});

await safeStep('gotoCheckItemsExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItemsExportClicked');
});

await safeStep('gotoCheckItemsCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItemsCloseClicked');
});

await safeStep('gotoHousingWorkProcessRules', async () => {
  await propertyManagement.gotoHousingWorkProcessRules();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingWorkProcessRules');
});

await safeStep('gotoHousingWorkProcessRulesAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingWorkProcessRulesAddClicked');
});

await safeStep('gotoHousingWorkProcessRulesCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingWorkProcessRulesCloseClicked');
});

await safeStep('gotoHousingWorkProcessRulesExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingWorkProcessRulesExportClicked');
});

await safeStep('gotoHousingWorkProcessRulesCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingWorkProcessRulesCloseClicked2');
});

// Data Setup
await safeStep('gotoDataSetup', async () => {
  await propertyManagement.gotoDataSetup();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoPriceIndexes', async () => {
  await propertyManagement.gotoPriceIndexes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPriceIndexes');
});

await safeStep('gotoPriceIndexesAddClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Add);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPriceIndexesAddClicked');
});

await safeStep('gotoPriceIndexesCloseClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPriceIndexesCloseClicked');
});

await safeStep('gotoPriceIndexesExportClicked', async () => {
  await propertyManagement.clickElement(propertyManagement.Export);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPriceIndexesExportClicked');
});

await safeStep('gotoPriceIndexesCloseClicked2', async () => {
  await propertyManagement.clickElement(propertyManagement.clickClose);
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPriceIndexesCloseClicked2');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await propertyManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfiguration', async () => {
  await propertyManagement.gotoAccessConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
  });
};

// Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});