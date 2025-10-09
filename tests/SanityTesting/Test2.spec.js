const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

dotenv.config({ path: path.resolve('tests/src/.env') });

test('Sanity test: select & remove multi-select values (with separate inputs)', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize
  const { homePage, documentManagement } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await documentManagement.clickDocumentManagement();
  await documentManagement.gotoDocumentOverview();
  await documentManagement.gotoDocuments();

  const documents_register = page.locator('#newRecordButton');
const extra_document_subtypes_dropdown_field = '#select2-Modal1_TFDocumentSubtypeSelection-container';
const extra_document_subtypes_dropdown_field_values = 'ul#select2-Modal1_TFDocumentSubtypeSelection-results li.select2-results__option span.mm-combobox-item';

await documents_register.click();
await page.locator(extra_document_subtypes_dropdown_field).click(); // open dropdown

// 🔍 Debug 1 — check if result container exists
const containerLocator = page.locator('ul#select2-Modal1_TFDocumentSubtypeSelection-results');
const containerExists = await containerLocator.count();
console.log('✅ Result container count:', containerExists);

// 🔍 Debug 2 — print its HTML if present
if (containerExists > 0) {
  const html = await containerLocator.evaluate(el => el.innerHTML);
  console.log('📋 Dropdown innerHTML preview (first 500 chars):', html.substring(0, 500));
} else {
  console.log('⚠️ Result container NOT found yet after click.');
}

// 🔍 Debug 3 — check if visible in DOM
const isVisible = await containerLocator.isVisible().catch(() => false);
console.log('👀 Is dropdown visible:', isVisible);

// 🔍 Debug 4 — wait manually (10 s) for it to appear
try {
  await containerLocator.waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ Dropdown container became visible');
} catch (err) {
  console.error('❌ Still not visible after 10s');
}

// Wait until “Searching…” goes away
await page.waitForSelector('ul#select2-Modal1_TFDocumentSubtypeSelection-results li:not(.loading-results)', { timeout: 10000 });

// now attempt selection
await documentManagement.selectMultiValues(
  extra_document_subtypes_dropdown_field,
  extra_document_subtypes_dropdown_field_values,
  ['Type2-SubType1', 'Type3-SubType3']
);

await page.pause();





});
