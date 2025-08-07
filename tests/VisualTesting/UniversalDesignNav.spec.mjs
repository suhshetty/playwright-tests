// File: UniversalDesignNavigation.spec.js
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

const labels = [
  'gotoGeneralInformation',
  'gotoServicePartners', 'gotoServicePartnerManagement', 'gotoPersonPermit',
  'gotoUniversalDesignDocuments', 'gotoUniversalDesignDocumentTypes',
  'gotoTechnicalSystem', 'gotoCCSTechnicalSystem', 'gotoThemeMarking',
  'gotoTaskManagementUniversalDesign', 'gotoWorkOrderUniversalDesign', 'gotoIncidentUniversalDesign',
  'gotoLinksToLawsandRegulations', 'gotoInstructionsandGuidelines', 'gotoLocalRegulations',
  'gotoDocumentTypes', 'gotoServiceTypes', 'gotoPermitUniversalDesign',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, universalDesign } = await loginAndInitialize({ page, context, baseUrl });

// Home Page
await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Main Universal Design module
await safeStep('clickUniversalDesign', async () => {
  await universalDesign.clickUniversalDesign();
  //await waitForProcessingAndTakeScreenshot(page, env, 'clickUniversalDesign');
});

// General Overview
await safeStep('gotoGeneralOverview', async () => {
  await universalDesign.gotoGeneralOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
});

await safeStep('gotoGeneralInformation', async () => {
  await universalDesign.gotoGeneralInformation();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformation');
});

// Responsible Resources
await safeStep('gotoResponsibleResources', async () => {
  await universalDesign.gotoResponsibleResources();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
});

await safeStep('gotoServicePartners', async () => {
  await universalDesign.gotoServicePartners();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
});

await safeStep('gotoServicePartnerManagement', async () => {
  await universalDesign.gotoServicePartnerManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerManagement');
});

await safeStep('gotoPersonPermit', async () => {
  await universalDesign.gotoPersonPermit();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermit');
});

// Technical Documentation
await safeStep('gotoTechnicalDocumentation', async () => {
  await universalDesign.gotoTechnicalDocumentation();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
});

await safeStep('gotoUniversalDesignDocuments', async () => {
  await universalDesign.gotoUniversalDesignDocuments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesignDocuments');
});

await safeStep('gotoUniversalDesignDocumentTypes', async () => {
  await universalDesign.gotoUniversalDesignDocumentTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesignDocumentTypes');
});

// Object Marking
await safeStep('gotoObjectMarking', async () => {
  await universalDesign.gotoObjectMarking();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
});

await safeStep('gotoTechnicalSystem', async () => {
  await universalDesign.gotoTechnicalSystem();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
});

await safeStep('gotoCCSTechnicalSystem', async () => {
  await universalDesign.gotoCCSTechnicalSystem();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystem');
});

await safeStep('gotoThemeMarking', async () => {
  await universalDesign.gotoThemeMarking();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarking');
});

// Activities
await safeStep('gotoActivities', async () => {
  await universalDesign.gotoActivities();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
});

await safeStep('gotoTaskManagementUniversalDesign', async () => {
  await universalDesign.gotoTaskManagementUniversalDesign();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementUniversalDesign');
});

await safeStep('gotoWorkOrderUniversalDesign', async () => {
  await universalDesign.gotoWorkOrderUniversalDesign();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderUniversalDesign');
});

await safeStep('gotoIncidentUniversalDesign', async () => {
  await universalDesign.gotoIncidentUniversalDesign();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentUniversalDesign');
});

// Requirements and Guidelines
await safeStep('gotoRequirementsandGuidelines', async () => {
  await universalDesign.gotoRequirementsandGuidelines();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementsandGuidelines');
});

await safeStep('gotoLinksToLawsandRegulations', async () => {
  await universalDesign.gotoLinksToLawsandRegulations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsandRegulations');
});

await safeStep('gotoInstructionsandGuidelines', async () => {
  await universalDesign.gotoInstructionsandGuidelines();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsandGuidelines');
});

await safeStep('gotoLocalRegulations', async () => {
  await universalDesign.gotoLocalRegulations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
});

// Data Setup
await safeStep('gotoDataSetup', async () => {
  await universalDesign.gotoDataSetup();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoDocumentTypes', async () => {
  await universalDesign.gotoDocumentTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
});

await safeStep('gotoServiceTypes', async () => {
  await universalDesign.gotoServiceTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
});

await safeStep('gotoPermitUniversalDesign', async () => {
  await universalDesign.gotoPermitUniversalDesign();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitUniversalDesign');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await universalDesign.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfigurations', async () => {
  await universalDesign.gotoAccessConfigurations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
});
}

// Main visual regression test
test('Visual Regression Test - Universal Design: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});