// tests/SpaceManagementNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Property Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, propertyManagement } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await propertyManagement.clickpropertyManagement();

  // === Lease Objects ===
await propertyManagement.gotoLeaseObjects();



await propertyManagement.gotoHousings();
//await propertyManagement.selectDropdown('site', 'ICECONSULT DANMARK ApS');

await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoBuildingSpaces();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoHousingSpaces();
await propertyManagement.gotoBuildingSpaceInformations();

await propertyManagement.gotoCapacityObjects();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoLocateCapacityObjects();

await propertyManagement.gotoLocationCostDivision();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoWorkOrderPayers();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoPublishedPriceLists();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);


// === Lease Contracts Overview ===
await propertyManagement.gotoLeaseContractsOverview();

await propertyManagement.gotoHeadLeaseContracts();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoLeaseContracts();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoSubLeaseContracts();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoLeaseContractReminders();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoLeaseContractRenegotiations();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoLeaseContractUtilizations();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoSiteLeases();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

// === Lease Contract Finance ===
await propertyManagement.gotoLeaseContractFinance();
await propertyManagement.gotoLeaseContractPaymentItems();

await propertyManagement.gotoLeaseContractPayments();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoLeaseContractCustomerRevenues();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoCostDistributionAgreements();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoCostDistributionAgreementGroups();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoProducts();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoInvoiceBasisLCF();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

// // === Lease Model ===
// await propertyManagement.gotoLeaseModel();
// await propertyManagement.gotoLeaseExaminations();
// await propertyManagement.gotoSiteKeyFigures();
// await propertyManagement.gotoSiteBasicCosts();
// await propertyManagement.gotoRevenues();
// await propertyManagement.gotoCostItems();
// await propertyManagement.gotoLoans();
// await propertyManagement.gotoSpaceUsages();
// await propertyManagement.gotoAnnualPercentages();
// await propertyManagement.gotoLeaseHistories();

// === Purchase Contracts Overview ===
await propertyManagement.gotoPurchaseContractsOverview();

await propertyManagement.gotoPurchaseContracts();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoPurchaseContractReminders();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoPurchaseContractPaymentItems();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoInvoiceBasisPCO();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

// === Lease Holders ===
await propertyManagement.gotoLeaseHolders();

await propertyManagement.gotoLeaseHolderOrganisations();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoResidents();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoOrganicVatDeclarations();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoCompanies();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoPersonsUsers();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoFailures();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

// === Housing Brokerage ===
await propertyManagement.gotoHousingBrokerage();

await propertyManagement.gotoLeaseApplications();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoOpportunities();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoOpportunityComments();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

// === Moving In/Out ===
await propertyManagement.gotoMovingInOut();

await propertyManagement.gotoWorkOrders();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoChecklists();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoInspections();

await propertyManagement.gotoCheckItems();
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

await propertyManagement.gotoHousingWorkProcessRules();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);


// // === Room Booking ===
// await propertyManagement.gotoRoomBooking();
// await propertyManagement.gotoMeetingRoomReservations();
// await propertyManagement.gotoMeetingRoomCateringOrders();
// await propertyManagement.gotoMeetingRoomEquipmentOrders();
// await propertyManagement.gotoInvoiceBasisRB();

// === Data Setup ===
await propertyManagement.gotoDataSetup();

await propertyManagement.gotoPriceIndexes();
await propertyManagement.clickElement(propertyManagement.Add);
await propertyManagement.clickElement(propertyManagement.Close);
await propertyManagement.clickElement(propertyManagement.Export);
await propertyManagement.clickElement(propertyManagement.Close);

// === Configuration ===
await propertyManagement.gotoConfiguration();
await propertyManagement.gotoAccessConfiguration();

});