// File: DocumentManagementNavigation.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.noMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Labels for visual comparison
const labels = [
  // Home and Module Navigation
  'gotoHomePage', 'gotoModuleMenu', 'clickDocumentManagement',

  // Document Overview
  'gotoDocumentOverview', 'gotoDocumentSearches', 'gotoDocumentSearchesExportClicked',
  'gotoDocumentSearchesCloseClicked', 'gotoPictures', 'gotoPicturesSiteSelected',
  'gotoPicturesMultiRegisterClicked', 'gotoPicturesCloseClicked', 'gotoPicturesExportClicked',
  'gotoPicturesCloseClicked2', 'gotoDrawings', 'gotoDrawingsMultiRegisterClicked',
  'gotoDrawingsCloseClicked', 'gotoDrawingsExportClicked', 'gotoDrawingsCloseClicked2',
  'gotoDocuments', 'gotoDocumentsMultiRegisterClicked', 'gotoDocumentsCloseClicked',
  'gotoDocumentsExportClicked', 'gotoDocumentsCloseClicked2', 'gotoDocumentStack',
  'gotoDocumentStackMultiRegisterClicked', 'gotoDocumentStackCloseClicked',
  'gotoDocumentStackExportClicked', 'gotoDocumentStackCloseClicked2',

  // Manuals Overview
  'gotoManualsOverview', 'gotoManualChapters', 'gotoManualChaptersExportClicked',
  'gotoManualChaptersCloseClicked', 'gotoManualDefinitions', 'gotoManualDefinitionsAddClicked',
  'gotoManualDefinitionsCloseClicked', 'gotoManualDefinitionsExportClicked',
  'gotoManualDefinitionsCloseClicked2', 'gotoManualSubscribers', 'gotoManualSubscribersExportClicked',
  'gotoManualSubscribersCloseClicked',

  // Configuration
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, documentManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickDocumentManagement', async () => {
    await documentManagement.clickDocumentManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickDocumentManagement');
  });

  await page.pause();

  // === Document Overview ===
  await safeStep('gotoDocumentOverview', async () => {
    await documentManagement.gotoDocumentOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentOverview');
  });

  await safeStep('gotoDocumentSearches', async () => {
    await documentManagement.gotoDocumentSearches();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentSearches');
  });


  await safeStep('gotoDocumentSearchesExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentSearchesExportClicked');
  });

  await safeStep('gotoDocumentSearchesCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentSearchesCloseClicked');
  });

  // Pictures Section
  await safeStep('gotoPictures', async () => {
    await documentManagement.gotoPictures();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPictures');
  });

  await safeStep('gotoPicturesSiteSelected', async () => {
    await documentManagement.selectDropdown('site', 'ICECONSULT DANMARK ApS');
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPicturesSiteSelected');
  });

  await safeStep('gotoPicturesMultiRegisterClicked', async () => {
    await documentManagement.clickElement(documentManagement.MultiRegister);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPicturesMultiRegisterClicked');
  });

  await safeStep('gotoPicturesCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPicturesCloseClicked');
  });

  await safeStep('gotoPicturesExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPicturesExportClicked');
  });

  await safeStep('gotoPicturesCloseClicked2', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPicturesCloseClicked2');
  });

  // Drawings Section
  await safeStep('gotoDrawings', async () => {
    await documentManagement.gotoDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawings');
  });

  await safeStep('gotoDrawingsMultiRegisterClicked', async () => {
    await documentManagement.clickElement(documentManagement.MultiRegister);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawingsMultiRegisterClicked');
  });

  await safeStep('gotoDrawingsCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawingsCloseClicked');
  });

  await safeStep('gotoDrawingsExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawingsExportClicked');
  });

  await safeStep('gotoDrawingsCloseClicked2', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawingsCloseClicked2');
  });

  // Documents Section
  await safeStep('gotoDocuments', async () => {
    await documentManagement.gotoDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocuments');
  });

  await safeStep('gotoDocumentsMultiRegisterClicked', async () => {
    await documentManagement.clickElement(documentManagement.MultiRegister);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentsMultiRegisterClicked');
  });

  await safeStep('gotoDocumentsCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentsCloseClicked');
  });

  await safeStep('gotoDocumentsExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentsExportClicked');
  });

  await safeStep('gotoDocumentsCloseClicked2', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentsCloseClicked2');
  });

  // Document Stack Section
  await safeStep('gotoDocumentStack', async () => {
    await documentManagement.gotoDocumentStack();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentStack');
  });

  await safeStep('gotoDocumentStackMultiRegisterClicked', async () => {
    await documentManagement.clickElement(documentManagement.MultiRegister);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentStackMultiRegisterClicked');
  });

  await safeStep('gotoDocumentStackCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentStackCloseClicked');
  });

  await safeStep('gotoDocumentStackExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentStackExportClicked');
  });

  await safeStep('gotoDocumentStackCloseClicked2', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentStackCloseClicked2');
  });

  // === Manuals Overview ===
  await safeStep('gotoManualsOverview', async () => {
    await documentManagement.gotoManualsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualsOverview');
  });

  // Manual Chapters
  await safeStep('gotoManualChapters', async () => {
    await documentManagement.gotoManualChapters();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualChapters');
  });

  await safeStep('gotoManualChaptersExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualChaptersExportClicked');
  });

  await safeStep('gotoManualChaptersCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualChaptersCloseClicked');
  });

  // Manual Definitions
  await safeStep('gotoManualDefinitions', async () => {
    await documentManagement.gotoManualDefinitions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualDefinitions');
  });

  await safeStep('gotoManualDefinitionsAddClicked', async () => {
    await documentManagement.clickElement(documentManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualDefinitionsAddClicked');
  });

  await safeStep('gotoManualDefinitionsCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualDefinitionsCloseClicked');
  });

  await safeStep('gotoManualDefinitionsExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualDefinitionsExportClicked');
  });

  await safeStep('gotoManualDefinitionsCloseClicked2', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualDefinitionsCloseClicked2');
  });

  // Manual Subscribers
  await safeStep('gotoManualSubscribers', async () => {
    await documentManagement.gotoManualSubscribers();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualSubscribers');
  });

  await safeStep('gotoManualSubscribersExportClicked', async () => {
    await documentManagement.clickElement(documentManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualSubscribersExportClicked');
  });

  await safeStep('gotoManualSubscribersCloseClicked', async () => {
    await documentManagement.clickElement(documentManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualSubscribersCloseClicked');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await documentManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfigurations', async () => {
    await documentManagement.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });
};

// Main visual regression test
test('Visual Regression Test - Document Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});