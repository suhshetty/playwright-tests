// tests/DocumentManagementNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');
const { access } = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Asset Management', async ({ page, context }) => {
  const baseUrl = process.env.URL1; 

// Login and initialize Page Objects with base URL
const { homePage, documentManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page   
await homePage.gotoHomePage();
await homePage.gotoModuleMenu();

// Module Navigation
await documentManagement.clickDocumentManagement();

// DocumentOverview
await documentManagement.gotoDocumentOverview();
await documentManagement.gotoDocumentSearches();
await documentManagement.gotoPictures();
await documentManagement.gotoDrawings();
await documentManagement.gotoDocuments();
await documentManagement.gotoDocumentStack();

// Manuals Overview
await documentManagement.gotoManualsOverview();
await documentManagement.gotoManualChapters();
await documentManagement.gotoManualDefinitions();
await documentManagement.gotoManualSubscribers();

// Configuration
await documentManagement.gotoConfiguration();
await documentManagement.gotoAccessConfigurations();
});

