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
await propertyManagement.gotoBuildingSpaces();
await propertyManagement.gotoHousingSpaces();
await propertyManagement.gotoBuildingSpaceInformations();
await propertyManagement.gotoCapacityObjects();
await propertyManagement.gotoLocateCapacityObjects();
await propertyManagement.gotoLocationCostDivision();
await propertyManagement.gotoWorkOrderPayers();
await propertyManagement.gotoPublishedPriceLists();

// === Lease Contracts Overview ===
await propertyManagement.gotoLeaseContractsOverview();
await propertyManagement.gotoHeadLeaseContracts();
await propertyManagement.gotoLeaseContracts();
await propertyManagement.gotoSubLeaseContracts();
await propertyManagement.gotoLeaseContractReminders();
await propertyManagement.gotoLeaseContractRenegotiations();
await propertyManagement.gotoLeaseContractUtilizations();
await propertyManagement.gotoSiteLeases();

// === Lease Contract Finance ===
await propertyManagement.gotoLeaseContractFinance();
await propertyManagement.gotoLeaseContractPaymentItems();
await propertyManagement.gotoLeaseContractPayments();
await propertyManagement.gotoLeaseContractCustomerRevenues();
await propertyManagement.gotoCostDistributionAgreements();
await propertyManagement.gotoCostDistributionAgreementGroups();
await propertyManagement.gotoProducts();
await propertyManagement.gotoInvoiceBasisLCF();

// === Lease Model ===
await propertyManagement.gotoLeaseModel();
await propertyManagement.gotoLeaseExaminations();
await propertyManagement.gotoSiteKeyFigures();
await propertyManagement.gotoSiteBasicCosts();
await propertyManagement.gotoRevenues();
await propertyManagement.gotoCostItems();
await propertyManagement.gotoLoans();
await propertyManagement.gotoSpaceUsages();
await propertyManagement.gotoAnnualPercentages();
await propertyManagement.gotoLeaseHistories();

// === Purchase Contracts Overview ===
await propertyManagement.gotoPurchaseContractsOverview();
await propertyManagement.gotoPurchaseContracts();
await propertyManagement.gotoPurchaseContractReminders();
await propertyManagement.gotoPurchaseContractPaymentItems();
await propertyManagement.gotoInvoiceBasisPCO();

// === Lease Holders ===
await propertyManagement.gotoLeaseHolders();
await propertyManagement.gotoLeaseHolderOrganisations();
await propertyManagement.gotoResidents();
await propertyManagement.gotoOrganicVatDeclarations();
await propertyManagement.gotoCompanies();
await propertyManagement.gotoPersonsUsers();
await propertyManagement.gotoFailures();

// === Housing Brokerage ===
await propertyManagement.gotoHousingBrokerage();
await propertyManagement.gotoLeaseApplications();
await propertyManagement.gotoOpportunities();
await propertyManagement.gotoOpportunityComments();

// === Moving In/Out ===
await propertyManagement.gotoMovingInOut();
await propertyManagement.gotoWorkOrders();
await propertyManagement.gotoChecklists();
await propertyManagement.gotoInspections();
await propertyManagement.gotoCheckItems();
await propertyManagement.gotoHousingWorkProcessRules();

// === Room Booking ===
await propertyManagement.gotoRoomBooking();
await propertyManagement.gotoMeetingRoomReservations();
await propertyManagement.gotoMeetingRoomCateringOrders();
await propertyManagement.gotoMeetingRoomEquipmentOrders();
await propertyManagement.gotoInvoiceBasisRB();

// === Data Setup ===
await propertyManagement.gotoDataSetup();
await propertyManagement.gotoPriceIndexes();

// === Configuration ===
await propertyManagement.gotoConfiguration();
await propertyManagement.gotoAccessConfiguration();

});