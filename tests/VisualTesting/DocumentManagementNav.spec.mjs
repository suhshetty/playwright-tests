// File: CleaningManagementNavigation.spec.js
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
  'gotoHomePage', 'gotoModuleMenu',  
  'gotoDocumentSearches', 'gotoPictures', 'gotoDrawings', 'gotoDocuments', 'gotoDocumentStack',  
  'gotoManualChapters', 'gotoManualDefinitions', 'gotoManualSubscribers',  
  'gotoConfiguration', 'gotoAccessConfigurations'  
];  

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, documentManagement } = await loginAndInitialize({ page, context, baseUrl });

await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Module Navigation
await safeStep('clickDocumentManagement', async () => {
  await documentManagement.clickDocumentManagement();
  //await waitForProcessingAndTakeScreenshot(page, env, 'clickDocumentManagement');
});

// DocumentOverview
await safeStep('gotoDocumentOverview', async () => {
  await documentManagement.gotoDocumentOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentOverview');
});

await safeStep('gotoDocumentSearches', async () => {
  await documentManagement.gotoDocumentSearches();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentSearches');
});

await safeStep('gotoPictures', async () => {
  await documentManagement.gotoPictures();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPictures');
});

await safeStep('gotoDrawings', async () => {
  await documentManagement.gotoDrawings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawings');
});

await safeStep('gotoDocuments', async () => {
  await documentManagement.gotoDocuments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocuments');
});

await safeStep('gotoDocumentStack', async () => {
  await documentManagement.gotoDocumentStack();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentStack');
});

// Manuals Overview
await safeStep('gotoManualsOverview', async () => {
  await documentManagement.gotoManualsOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualsOverview');
});

await safeStep('gotoManualChapters', async () => {
  await documentManagement.gotoManualChapters();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualChapters');
});

await safeStep('gotoManualDefinitions', async () => {
  await documentManagement.gotoManualDefinitions();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualDefinitions');
});

await safeStep('gotoManualSubscribers', async () => {
  await documentManagement.gotoManualSubscribers();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoManualSubscribers');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await documentManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfigurations', async () => {
  await documentManagement.gotoAccessConfigurations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
});
}

// Main visual regression test
test('Visual Regression Test - Document Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});

