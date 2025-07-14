// File: PropertyManagementNav.spec.js
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

// Screens to validate
const labels = [
'gotoLeaseObjects','gotoLeaseContractsOverview','gotoLeaseContractFinance','gotoLeaseModel',
'gotoPurchaseContractsOverview','gotoLeaseHolders','gotoHousingBrokerage','gotoMovingInOut',
'gotoRoomBooking','gotoDataSetup','gotoConfiguration','gotoHousings','gotoBuildingSpaces',
'gotoHousingSpaces','gotoBuildingSpaceInformants','gotoCapacityObjects','gotoLocateCapacityObjects',
'gotoLocationCostDivision','gotoWorkOrderPayers','gotoPublishedPriceLists','gotoHeadLeaseContracts',
'gotoLeaseContracts','gotoSubLeaseContracts','gotoLeaseContractReminders','gotoLeaseContractRenegotiations',
'gotoLeaseContractUtilizations','gotoSiteLeases','gotoLeaseContractPaymentItems','gotoLeaseContractPayments',
'gotoLeaseContractCustomerRevenues','gotoCostDistributionAgreements','gotoCostDistributionAgreementGroups',
'gotoProducts','gotoInvoiceBasis','gotoLeaseExaminations','gotoSiteKeyFigures','gotoSiteBasicCosts',
'gotoRevenues','gotoCostItems','gotoLoans','gotoSpaceUsages','gotoAnnualPercentages','gotoLeaseHistories',
'gotoPurchaseContracts','gotoPurchaseContractReminders','gotoPurchaseContractPaymentItems',
'gotoLeaseHolderOrganisations','gotoResidents','gotoOrganicVatDeclarations','gotoCompanies',
'gotoPersonsUsers','gotoFailures','gotoLeaseApplications','gotoOpportunities','gotoOpportunityComments',
'gotoWorkOrders','gotoChecklists','gotoInspections','gotoCheckItems','gotoHousingWorkProcessRules',
'gotoMeetingRoomReservations','gotoMeetingRoomCateringOrders','gotoMeetingRoomEquipmentOrders',
'gotoPriceIndexes','gotoConfigurations'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, propertyManagement } = await loginAndInitialize({ page, context, baseUrl });

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
  });

// Lease Objects Module
await safeStep('gotoLeaseObjects', async () => {
  await propertyManagement.gotoLeaseObjects();
});

await safeStep('gotoHousings', async () => {
  await propertyManagement.gotoHousings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousings');
});

await safeStep('gotoBuildingSpaces', async () => {
  await propertyManagement.gotoBuildingSpaces();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
});

await safeStep('gotoHousingSpaces', async () => {
  await propertyManagement.gotoHousingSpaces();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingSpaces');
});

await safeStep('gotoBuildingSpaceInformantions', async () => {
  await propertyManagement.gotoBuildingSpaceInformantions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaceInformantions');
});

await safeStep('gotoCapacityObjects', async () => {
  await propertyManagement.gotoCapacityObjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCapacityObjects');
});

await safeStep('gotoLocateCapacityObjects', async () => {
  await propertyManagement.gotoLocateCapacityObjects();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateCapacityObjects');
});

await safeStep('gotoLocationCostDivision', async () => {
  await propertyManagement.gotoLocationCostDivision();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationCostDivision');
});

await safeStep('gotoWorkOrderPayers', async () => {
  await propertyManagement.gotoWorkOrderPayers();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderPayers');
});

await safeStep('gotoPublishedPriceLists', async () => {
  await propertyManagement.gotoPublishedPriceLists();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPublishedPriceLists');
});

// Lease Contracts Overview Module
await safeStep('gotoLeaseContractsOverview', async () => {
  await propertyManagement.gotoLeaseContractsOverview();
});

await safeStep('gotoHeadLeaseContracts', async () => {
  await propertyManagement.gotoHeadLeaseContracts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHeadLeaseContracts');
});

await safeStep('gotoLeaseContracts', async () => {
  await propertyManagement.gotoLeaseContracts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContracts');
});

await safeStep('gotoSubLeaseContracts', async () => {
  await propertyManagement.gotoSubLeaseContracts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSubLeaseContracts');
});

await safeStep('gotoLeaseContractReminders', async () => {
  await propertyManagement.gotoLeaseContractReminders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractReminders');
});

await safeStep('gotoLeaseContractRenegotiations', async () => {
  await propertyManagement.gotoLeaseContractRenegotiations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractRenegotiations');
});

await safeStep('gotoLeaseContractUtilizations', async () => {
  await propertyManagement.gotoLeaseContractUtilizations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractUtilizations');
});

await safeStep('gotoSiteLeases', async () => {
  await propertyManagement.gotoSiteLeases();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeases');
});

// Lease Contract Finance Module
await safeStep('gotoLeaseContractFinance', async () => {
  await propertyManagement.gotoLeaseContractFinance();
});

await safeStep('gotoLeaseContractPaymentItems', async () => {
  await propertyManagement.gotoLeaseContractPaymentItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPaymentItems');
});

await safeStep('gotoLeaseContractPayments', async () => {
  await propertyManagement.gotoLeaseContractPayments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractPayments');
});

await safeStep('gotoLeaseContractCustomerRevenues', async () => {
  await propertyManagement.gotoLeaseContractCustomerRevenues();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseContractCustomerRevenues');
});

await safeStep('gotoCostDistributionAgreements', async () => {
  await propertyManagement.gotoCostDistributionAgreements();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreements');
});

await safeStep('gotoCostDistributionAgreementGroups', async () => {
  await propertyManagement.gotoCostDistributionAgreementGroups();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostDistributionAgreementGroups');
});

await safeStep('gotoProducts', async () => {
  await propertyManagement.gotoProducts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoProducts');
});

await safeStep('gotoInvoiceBasis', async () => {
  await propertyManagement.gotoInvoiceBasis();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInvoiceBasis');
});


//Lease Model Module
await safeStep('gotoLeaseModel', async () => {
  await propertyManagement.gotoLeaseModel();
});

await safeStep('gotoLeaseExaminations', async () => {
  await propertyManagement.gotoLeaseExaminations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseExaminations');
});

await safeStep('gotoSiteKeyFigures', async () => {
  await propertyManagement.gotoSiteKeyFigures();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteKeyFigures');
});

await safeStep('gotoSiteBasicCosts', async () => {
  await propertyManagement.gotoSiteBasicCosts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteBasicCosts');
});

await safeStep('gotoSiteLeases', async () => {
  await propertyManagement.gotoSiteLeases();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteLeases');
});

await safeStep('gotoRevenues', async () => {
  await propertyManagement.gotoRevenues();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoRevenues');
});

await safeStep('gotoCostItems', async () => {
  await propertyManagement.gotoCostItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCostItems');
});

await safeStep('gotoLoans', async () => {
  await propertyManagement.gotoLoans();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLoans');
});

await safeStep('gotoSpaceUsages', async () => {
  await propertyManagement.gotoSpaceUsages();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSpaceUsages');
});

await safeStep('gotoAnnualPercentages', async () => {
  await propertyManagement.gotoAnnualPercentages();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAnnualPercentages');
});

await safeStep('gotoLeaseHistories', async () => {
  await propertyManagement.gotoLeaseHistories();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHistories');
});

// Purchase Contracts Overview Module
await safeStep('gotoPurchaseContractsOverview', async () => {
  await propertyManagement.gotoPurchaseContractsOverview();
});

await safeStep('gotoPurchaseContracts', async () => {
  await propertyManagement.gotoPurchaseContracts();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContracts');
});

await safeStep('gotoPurchaseContractReminders', async () => {
  await propertyManagement.gotoPurchaseContractReminders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractReminders');
});

await safeStep('gotoPurchaseContractPaymentItems', async () => {
  await propertyManagement.gotoPurchaseContractPaymentItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPurchaseContractPaymentItems');
});

// Lease Holders Module
await safeStep('gotoLeaseHolders', async () => {
  await propertyManagement.gotoLeaseHolders();
});

await safeStep('gotoLeaseHolderOrganisations', async () => {
  await propertyManagement.gotoLeaseHolderOrganisations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseHolderOrganisations');
});

await safeStep('gotoResidents', async () => {
  await propertyManagement.gotoResidents();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResidents');
});

await safeStep('gotoOrganicVatDeclarations', async () => {
  await propertyManagement.gotoOrganicVatDeclarations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOrganicVatDeclarations');
});

await safeStep('gotoCompanies', async () => {
  await propertyManagement.gotoCompanies();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCompanies');
});

await safeStep('gotoPersonsUsers', async () => {
  await propertyManagement.gotoPersonsUsers();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonsUsers');
});

await safeStep('gotoFailures', async () => {
  await propertyManagement.gotoFailures();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoFailures');
});

//Housing Brokerage Module
await safeStep('gotoHousingBrokerage', async () => {
  await propertyManagement.gotoHousingBrokerage();
});

await safeStep('gotoLeaseApplications', async () => {
  await propertyManagement.gotoLeaseApplications();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLeaseApplications');
});

await safeStep('gotoOpportunities', async () => {
  await propertyManagement.gotoOpportunities();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunities');
});

await safeStep('gotoOpportunityComments', async () => {
  await propertyManagement.gotoOpportunityComments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpportunityComments');
});

//Moving In/Out Module
await safeStep('gotoMovingInOut', async () => {
  await propertyManagement.gotoMovingInOut();
});

await safeStep('gotoWorkOrders', async () => {
  await propertyManagement.gotoWorkOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrders');
});

await safeStep('gotoChecklists', async () => {
  await propertyManagement.gotoChecklists();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklists');
});

await safeStep('gotoInspections', async () => {
  await propertyManagement.gotoInspections();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInspections');
});

await safeStep('gotoCheckItems', async () => {
  await propertyManagement.gotoCheckItems();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCheckItems');
});

await safeStep('gotoHousingWorkProcessRules', async () => {
  await propertyManagement.gotoHousingWorkProcessRules();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousingWorkProcessRules');
});

//Room Booking Module
await safeStep('gotoRoomBooking', async () => {
  await propertyManagement.gotoRoomBooking();
});

await safeStep('gotoMeetingRoomReservations', async () => {
  await propertyManagement.gotoMeetingRoomReservations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoMeetingRoomReservations');
});

await safeStep('gotoMeetingRoomCateringOrders', async () => {
  await propertyManagement.gotoMeetingRoomCateringOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoMeetingRoomCateringOrders');
});

await safeStep('gotoMeetingRoomEquipmentOrders', async () => {
  await propertyManagement.gotoMeetingRoomEquipmentOrders();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoMeetingRoomEquipmentOrders');
});

//Data Setup Module
await safeStep('gotoDataSetup', async () => {
  await propertyManagement.gotoDataSetup();
});

await safeStep('gotoPriceIndexes', async () => {
  await propertyManagement.gotoPriceIndexes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPriceIndexes');
});


// Configuration Module
await safeStep('gotoConfiguration', async () => {
  await propertyManagement.gotoConfiguration();
});


};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});