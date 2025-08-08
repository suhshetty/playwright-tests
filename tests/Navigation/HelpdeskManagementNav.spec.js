// tests/HelpdeskManagementNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Helpdesk Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1; 

// Login and initialize Page Objects with base URL
const { homePage, helpdeskManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Click Helpdesk Management main module
await helpdeskManagement.clickHelpdeskManagement();

// Summary
//await helpdeskManagement.gotoSummary();

//Incidents Overview
await helpdeskManagement.gotoIncidentsOverview();
await helpdeskManagement.gotoFailures();
await helpdeskManagement.clickRegisterFailures();
await helpdeskManagement.gotoIssues();
await helpdeskManagement.clickRegisterIssues();
await helpdeskManagement.gotoConditionAssessmentType();
await helpdeskManagement.clickRegisterConditionAssessmentType();
await helpdeskManagement.gotoReleaseItems();
await helpdeskManagement.clickRegisterReleaseItems();
await helpdeskManagement.gotoIncidentCategory1s();
await helpdeskManagement.clickRegisterIncidentCategory1s();
await helpdeskManagement.gotoIncidentCategory2s();
await helpdeskManagement.gotoAllIncidents();
await helpdeskManagement.clickRegisterAllIncidents();

// Work Orders Overview
await helpdeskManagement.gotoWorkOrdersOverview();
await helpdeskManagement.gotoWorkOrders();
await helpdeskManagement.clickRegisterWorkOrders();

// Service Information Overview
await helpdeskManagement.gotoServiceInformationOverview();
await helpdeskManagement.gotoServicePartners();
await helpdeskManagement.gotoSLAKPIDemands();
await helpdeskManagement.clickRegisterSLAKPIDemands();
await helpdeskManagement.gotoSLAKPIDemandIncidentTypes();

// Notifications and Reminders
await helpdeskManagement.gotoNotificationsandReminders();
await helpdeskManagement.gotoReminders();
await helpdeskManagement.clickRegisterReminders();

// Data Setup
await helpdeskManagement.gotoDataSetup();
await helpdeskManagement.gotoIncidentGroups();
await helpdeskManagement.clickRegisterIncidentGroups();
await helpdeskManagement.gotoIncidentTypes();
await helpdeskManagement.clickRegisterIncidentTypes();
await helpdeskManagement.gotoTaskPriorities();
await helpdeskManagement.clickRegisterTaskPriorities();
await helpdeskManagement.gotoProfessions();
await helpdeskManagement.clickRegisterProfessions();

// Configuration
await helpdeskManagement.gotoConfiguration();
await helpdeskManagement.gotoAccessConfigurations();
});