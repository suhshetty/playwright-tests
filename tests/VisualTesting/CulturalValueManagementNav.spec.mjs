// File: CulturalValueManagementNav.spec.js
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

// Screens to validate
const labels = [
  // General Overview
  'gotoGeneralOverview',
  'gotoGeneralInformationCulturalValue',

  // Responsible Resources
  'gotoResponsibleResources',
  'gotoServicePartners',
  'gotoServicePartnersManagementCulturalValue',
  'gotoPersonPermitCulturalValue',

  // Technical Documentation
  'gotoTechnicalDocumentation',
  'gotoCulturalValueDocuments',
  'gotoCulturalValueDocumentTree',

  // Object Marking
  'gotoObjectMarking',
  'gotoTechnicalSystemCulturalValue',
  'gotoCCSTechnicalSystemCulturalValue',
  'gotoThemeMarking',

  // Activities
  'gotoActivities',
  'gotoTaskManagementCulturalValue',
  'gotoWorkOrderCulturalValue',
  'gotoIncidentCulturalValue',

  // Requirements and Guidelines
  'gotoRequirementAndGuidelines',
  'gotoLinksToLawsAndRegulation',
  'gotoInstructionsAndGuidelines',
  'gotoLocalRegulations',

  // Data Setup
  'gotoDataSetup',
  'gotoDocumentTypes',
  'gotoServiceTypes',
  'gotoPermitCulturalValue',

  // Configuration
  'gotoConfiguration',
  'gotoAccessConfiguration'
];

// Run the visual test for a given URL environment 
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, culturalValueManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

// 🎯 Cultural Value Management - Navigation and Screenshot Capture
await safeStep('clickCulturalValueManagement', async () => {
  await culturalValueManagement.clickCulturalValueManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickCulturalValueManagement');
});

// 📌 General Overview
await safeStep('gotoGeneralOverview', async () => {
  await culturalValueManagement.gotoGeneralOverview();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
});

await safeStep('gotoGeneralInformationCulturalValue', async () => {
  await culturalValueManagement.gotoGeneralInformationCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformationCulturalValue');
});

// 📌 Responsible Resources
await safeStep('gotoResponsibleResources', async () => {
  await culturalValueManagement.gotoResponsibleResources();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
});

await safeStep('gotoServicePartners', async () => {
  await culturalValueManagement.gotoServicePartners();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
});

await safeStep('gotoServicePartnersManagementCulturalValue', async () => {
  await culturalValueManagement.gotoServicePartnersManagementCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersManagementCulturalValue');
});

await safeStep('gotoPersonPermitCulturalValue', async () => {
  await culturalValueManagement.gotoPersonPermitCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitCulturalValue');
});

// 📌 Technical Documentation
await safeStep('gotoTechnicalDocumentation', async () => {
  await culturalValueManagement.gotoTechnicalDocumentation();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
});

await safeStep('gotoCulturalValueDocuments', async () => {
  await culturalValueManagement.gotoCulturalValueDocuments();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCulturalValueDocuments');
});

await safeStep('gotoCulturalValueDocumentTree', async () => {
  await culturalValueManagement.gotoCulturalValueDocumentTree();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCulturalValueDocumentTree');
});

// 📌 Object Marking
await safeStep('gotoObjectMarking', async () => {
  await culturalValueManagement.gotoObjectMarking();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
});

await safeStep('gotoTechnicalSystemCulturalValue', async () => {
  await culturalValueManagement.gotoTechnicalSystemCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCulturalValue');
});

await safeStep('gotoCCSTechnicalSystemCulturalValue', async () => {
  await culturalValueManagement.gotoCCSTechnicalSystemCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCulturalValue');
});

await safeStep('gotoThemeMarking', async () => {
  await culturalValueManagement.gotoThemeMarking();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarking');
});

// 📌 Activities
await safeStep('gotoActivities', async () => {
  await culturalValueManagement.gotoActivities();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
});

await safeStep('gotoTaskManagementCulturalValue', async () => {
  await culturalValueManagement.gotoTaskManagementCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCulturalValue');
});

await safeStep('gotoWorkOrderCulturalValue', async () => {
  await culturalValueManagement.gotoWorkOrderCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCulturalValue');
});

await safeStep('gotoIncidentCulturalValue', async () => {
  await culturalValueManagement.gotoIncidentCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCulturalValue');
});

// 📌 Requirements and Guidelines
await safeStep('gotoRequirementAndGuidelines', async () => {
  await culturalValueManagement.gotoRequirementAndGuidelines();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementAndGuidelines');
});

await safeStep('gotoLinksToLawsAndRegulation', async () => {
  await culturalValueManagement.gotoLinksToLawsAndRegulation();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAndRegulation');
});

await safeStep('gotoInstructionsAndGuidelines', async () => {
  await culturalValueManagement.gotoInstructionsAndGuidelines();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
});

await safeStep('gotoLocalRegulations', async () => {
  await culturalValueManagement.gotoLocalRegulations();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
});

// 📌 Data Setup
await safeStep('gotoDataSetup', async () => {
  await culturalValueManagement.gotoDataSetup();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
});

await safeStep('gotoDocumentTypes', async () => {
  await culturalValueManagement.gotoDocumentTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
});

await safeStep('gotoServiceTypes', async () => {
  await culturalValueManagement.gotoServiceTypes();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
});

await safeStep('gotoPermitCulturalValue', async () => {
  await culturalValueManagement.gotoPermitCulturalValue();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCulturalValue');
});

// 📌 Configuration
await safeStep('gotoConfiguration', async () => {
  await culturalValueManagement.gotoConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
});

await safeStep('gotoAccessConfiguration', async () => {
  await culturalValueManagement.gotoAccessConfiguration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
});

};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});

