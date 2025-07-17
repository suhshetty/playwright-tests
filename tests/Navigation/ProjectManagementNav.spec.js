// tests/EnvironmentalManagementNav.spec.js
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
const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Main module navigation
await projectManagement.clickProjectManagement();

// Sub module: Project Initiatives
await projectManagement.gotoProjectInitiatives();
await projectManagement.gotoPurchaseOrder();
await projectManagement.gotoMaintenanceIncidents();

// Sub module: Projects Overview

await projectManagement.gotoProjectsOverview();
await projectManagement.gotoProjects();
await projectManagement.gotoAnnualBudgetForProjects();
await projectManagement.gotoTaskPlanning();
await projectManagement.gotoTaskManagement();
await projectManagement.gotoProjectAnnualTaskBudgets();
await projectManagement.gotoWorkOrders();
await projectManagement.gotoInspections();
await projectManagement.gotoCheckItems();

// Sub module: Project Details
await projectManagement.gotoProjectDetails();
await projectManagement.gotoProjectOrganisations();
await projectManagement.gotoProjectAssessments();
await projectManagement.gotoProjectChangeManagement();

// Sub module: Project Contracts Overview
await projectManagement.gotoProjectContractsOverview();
await projectManagement.gotoProjectContrcats();
await projectManagement.gotoProjectContrcatPayments();

// Sub module: Costs and Resource Usage
await projectManagement.gotoCostsAndResourceUsage();
await projectManagement.gotoElectronicInvoices();
await projectManagement.gotoWorkOrderCosts();
await projectManagement.gotoTimeRegistration();
await projectManagement.gotoProjectWorkOrderMaterials();
await projectManagement.gotoTransactions();

// Sub module: Project Web
await projectManagement.gotoProjectWeb();
await projectManagement.gotoProjectTreeWithDocuments();
await projectManagement.gotoProjectWebSubmodule();

// Sub module: Standard Tasks Overview
await projectManagement.gotoStandardsTasksOverview();
await projectManagement.gotoProjectStandardTasks();

// Sub module: Data Setup
await projectManagement.gotoDataSetup();
await projectManagement.gotoProjectGroups();
await projectManagement.gotoTasksSets();

// Sub module: Configuration
await projectManagement.gotoConfiguration();
await projectManagement.gotoAccessConfigurations();
});