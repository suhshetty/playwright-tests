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
  await documentManagement.clickElement(documentManagement.Export);
  await documentManagement.clickElement(documentManagement.Close);

await documentManagement.gotoPictures();
await spaceManagement.selectDropdown('site', 'ICECONSULT DANMARK ApS');
await documentManagement.clickElement(documentManagement.MultiRegister);
await documentManagement.clickElement(documentManagement.Close);
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

await documentManagement.gotoDrawings();
await documentManagement.clickElement(documentManagement.MultiRegister);
await documentManagement.clickElement(documentManagement.Close);
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

await documentManagement.gotoDocuments();
await documentManagement.clickElement(documentManagement.MultiRegister);
await documentManagement.clickElement(documentManagement.Close);
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

await documentManagement.gotoDocumentStack();
await documentManagement.clickElement(documentManagement.MultiRegister);
await documentManagement.clickElement(documentManagement.Close);
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

// Manuals Overview
await documentManagement.gotoManualsOverview();

await documentManagement.gotoManualChapters();
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

await documentManagement.gotoManualDefinitions();
await documentManagement.clickElement(documentManagement.Add);
await documentManagement.clickElement(documentManagement.Close);
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

await documentManagement.gotoManualSubscribers();
await documentManagement.clickElement(documentManagement.Export);
await documentManagement.clickElement(documentManagement.Close);

// Configuration
await documentManagement.gotoConfiguration();
await documentManagement.gotoAccessConfigurations();
});

