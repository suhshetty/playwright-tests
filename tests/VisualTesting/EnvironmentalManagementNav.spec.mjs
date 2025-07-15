// File: EnvironmentalManagementNavigation.spec.js
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
  'gotoEnvironmentDocuments', 'gotoEnvironmentDocumentTree', 'gotoEnvironmentalGoals', 'gotoRandomRegistrations',
  'gotoTechnicalSystem', 'gotoCCSTechnicalSystem', 'gotoThemeMarkings',
  'gotoTaskManagement', 'gotoWorkOrder', 'gotoIncident',
  'gotoLinksToLawsRegulations', 'gotoInstructionsAndGuidelines', 'gotoLocalRegulations',
  'gotoDocumentTypes', 'gotoServiceTypes', 'gotoPermit',
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, environmentalManagement } = await loginAndInitialize({ page, context, baseUrl });

// Home Page
await safeStep('gotoHomePage', async () => {
  await homePage.gotoHomePage();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
});

await safeStep('gotoModuleMenu', async () => {
  await homePage.gotoModuleMenu();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
});

// Main Environmental Management module
await safeStep('gotoEnvironmentalManagement', async () => {
  await environmentalManagement.gotoEnvironmentalManagement();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalManagement');
});

// General Overview
await safeStep('gotoGeneralOverview', async () => {
  await environmentalManagement.gotoGeneralOverview();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
});

await safeStep('gotoGeneralInformation', async () => {
  await environmentalManagement.gotoGeneralInformation();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformation');
});

// Responsible Resources
await safeStep('gotoResponsibleResources', async () => {
  await environmentalManagement.gotoResponsibleResources();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
});

await safeStep('gotoServicePartners', async () => {
  await environmentalManagement.gotoServicePartners();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
});

await safeStep('gotoServicePartnerManagement', async () => {
  await environmentalManagement.gotoServicePartnerManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerManagement');
});

await safeStep('gotoPersonPermit', async () => {
  await environmentalManagement.gotoPersonPermit();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermit');
});

// Technical Documentation
await safeStep('gotoTechnicalDocumentation', async () => {
  await environmentalManagement.gotoTechnicalDocumentation();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
});

await safeStep('gotoEnvironmentDocuments', async () => {
  await environmentalManagement.gotoEnvironmentDocuments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentDocuments');
});

await safeStep('gotoEnvironmentDocumentTree', async () => {
  await environmentalManagement.gotoEnvironmentDocumentTree();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentDocumentTree');
});

await safeStep('gotoEnvironmentalGoals', async () => {
  await environmentalManagement.gotoEnvironmentalGoals();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalGoals');
});

await safeStep('gotoRandomRegistrations', async () => {
  await environmentalManagement.gotoRandomRegistrations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoRandomRegistrations');
});

// Object Marking
await safeStep('gotoObjectMarking', async () => {
  await environmentalManagement.gotoObjectMarking();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
});

await safeStep('gotoTechnicalSystem', async () => {
  await environmentalManagement.gotoTechnicalSystem();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
});

await safeStep('gotoCCSTechnicalSystem', async () => {
  await environmentalManagement.gotoCCSTechnicalSystem();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystem');
});

await safeStep('gotoThemeMarkings', async () => {
  await environmentalManagement.gotoThemeMarkings();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarkings');
});

// Activities
await safeStep('gotoActivities', async () => {
  await environmentalManagement.gotoActivities();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
});

await safeStep('gotoTaskManagement', async () => {
  await environmentalManagement.gotoTaskManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagement');
});

await safeStep('gotoWorkOrder', async () => {
  await environmentalManagement.gotoWorkOrder();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrder');
});

await safeStep('gotoIncident', async () => {
  await environmentalManagement.gotoIncident();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncident');
});

// Requirements and Guidelines
await safeStep('gotoRequirementandGuidelines', async () => {
  await environmentalManagement.gotoRequirementandGuidelines();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementandGuidelines');
});

await safeStep('gotoLinksToLawsRegulations', async () => {
  await environmentalManagement.gotoLinksToLawsRegulations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsRegulations');
});

await safeStep('gotoInstructionsAndGuidelines', async () => {
  await environmentalManagement.gotoInstructionsAndGuidelines();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
});

await safeStep('gotoLocalRegulations', async () => {
  await environmentalManagement.gotoLocalRegulations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
});

// Data Setup
await safeStep('gotoDataSetup', async () => {
  await environmentalManagement.gotoDataSetup();
  //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoDocumentTypes', async () => {
  await environmentalManagement.gotoDocumentTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
});

await safeStep('gotoServiceTypes', async () => {
  await environmentalManagement.gotoServiceTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
});

await safeStep('gotoPermit', async () => {
  await environmentalManagement.gotoPermit();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermit');
});

// Configuration
await safeStep('gotoConfiguration', async () => {
  await environmentalManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfigurations', async () => {
  await environmentalManagement.gotoAccessConfigurations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
});
}

// Main visual regression test
test('Visual Regression Test - Environmental Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
