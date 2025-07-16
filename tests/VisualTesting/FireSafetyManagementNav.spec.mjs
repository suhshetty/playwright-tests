// File: FireSafetyManagementNav.spec.js
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
  'gotoHomePage',
  'gotoModuleMenu',
  'clickFireSafetyManagement',

  'gotoGeneralOverview',
  'gotoGeneralInformationFireSafety',

  'gotoResponsibleResources',
  'gotoServicePartners',
  'gotoServicePartnerManagementFireSafety',
  'gotoPersonPermitFireSafety',

  'gotoTechnicalDocumentation',
  'gotoFireSafetyDocument',
  'gotoFireSafetyDocumentTree',
  'gotoFlammableAndPressurizedMaterial',
  'gotoFireSafetyZone',

  'gotoObjectMarking',
  'gotoTechnicalSystemFireSafety',
  'gotoCSSTechnicalSystemFireSafety',
  'gotoThemeMarking',

  'gotoActivities',
  'gotoTaskManagementFireSafety',
  'gotoWorkOrderFireSafety',
  'gotoChecklistsFireSafety',
  'gotoIncidentFireSafety',

  'gotoActivitiesLocal',
  'gotoTaskManagementFireSafetyLocal',
  'gotoWorkOrderFireSafetyLocal',
  'gotoChecklistsFireSafetyLocal',
  'gotoIncidentFireSafetyLocal',

  'gotoActivitiesCustomer',
  'gotoTaskManagementFireSafetyCustomer',
  'gotoWorkOrderFireSafetyCustomer',
  'gotoChecklistsFireSafetyCustomer',
  'gotoIncidentFireSafetyCustomer',

  'gotoRequirementsAndGuidelines',
  'gotoLinksToLawsAndRegulation',
  'gotoInstructionsAndGuidelines',
  'gotoLocalRegulations',

  'gotoDataSetup',
  'gotoDocumentTypes',
  'gotoServiceTypes',
  'gotoMaterialTypes',
  'gotoPermitFireSafety',

  'gotoConfiguration',
  'gotoAccessConfiguration'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, fireSafetyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickFireSafetyManagement', async () => {
    await fireSafetyManagement.clickFireSafetyManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickFireSafetyManagement');
  });

  // === General Overview ===
  await safeStep('gotoGeneralOverview', async () => {
    await fireSafetyManagement.gotoGeneralOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
  });

  await safeStep('gotoGeneralInformationFireSafety', async () => {
    await fireSafetyManagement.gotoGeneralInformationFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformationFireSafety');
  });

  // === Responsible Resources ===
  await safeStep('gotoResponsibleResources', async () => {
    await fireSafetyManagement.gotoResponsibleResources();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
  });

  await safeStep('gotoServicePartners', async () => {
    await fireSafetyManagement.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoServicePartnerManagementFireSafety', async () => {
    await fireSafetyManagement.gotoServicePartnerManagementFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerManagementFireSafety');
  });

  await safeStep('gotoPersonPermitFireSafety', async () => {
    await fireSafetyManagement.gotoPersonPermitFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitFireSafety');
  });

  // === Technical Documentation ===
  await safeStep('gotoTechnicalDocumentation', async () => {
    await fireSafetyManagement.gotoTechnicalDocumentation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
  });

  await safeStep('gotoFireSafetyDocument', async () => {
    await fireSafetyManagement.gotoFireSafetyDocument();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFireSafetyDocument');
  });

  await safeStep('gotoFireSafetyDocumentTree', async () => {
    await fireSafetyManagement.gotoFireSafetyDocumentTree();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFireSafetyDocumentTree');
  });

  await safeStep('gotoFlammableAndPressurizedMaterial', async () => {
    await fireSafetyManagement.gotoFlammableAndPressurizedMaterial();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFlammableAndPressurizedMaterial');
  });

  await safeStep('gotoFireSafetyZone', async () => {
    await fireSafetyManagement.gotoFireSafetyZone();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFireSafetyZone');
  });

  // === Object Marking ===
  await safeStep('gotoObjectMarking', async () => {
    await fireSafetyManagement.gotoObjectMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
  });

  await safeStep('gotoTechnicalSystemFireSafety', async () => {
    await fireSafetyManagement.gotoTechnicalSystemFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemFireSafety');
  });

  await safeStep('gotoCSSTechnicalSystemFireSafety', async () => {
    await fireSafetyManagement.gotoCSSTechnicalSystemFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCSSTechnicalSystemFireSafety');
  });

  await safeStep('gotoThemeMarking', async () => {
    await fireSafetyManagement.gotoThemeMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarking');
  });

  // === Activities ===
  await safeStep('gotoActivities', async () => {
    await fireSafetyManagement.gotoActivities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
  });

  await safeStep('gotoTaskManagementFireSafety', async () => {
    await fireSafetyManagement.gotoTaskManagementFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementFireSafety');
  });

  await safeStep('gotoWorkOrderFireSafety', async () => {
    await fireSafetyManagement.gotoWorkOrderFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderFireSafety');
  });

  await safeStep('gotoChecklistsFireSafety', async () => {
    await fireSafetyManagement.gotoChecklistsFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsFireSafety');
  });

  await safeStep('gotoIncidentFireSafety', async () => {
    await fireSafetyManagement.gotoIncidentFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentFireSafety');
  });

  // === Activities Local ===
  await safeStep('gotoActivitiesLocal', async () => {
    await fireSafetyManagement.gotoActivitiesLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivitiesLocal');
  });

  await safeStep('gotoTaskManagementFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoTaskManagementFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementFireSafetyLocal');
  });

  await safeStep('gotoWorkOrderFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoWorkOrderFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderFireSafetyLocal');
  });

  await safeStep('gotoChecklistsFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoChecklistsFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsFireSafetyLocal');
  });

  await safeStep('gotoIncidentFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoIncidentFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentFireSafetyLocal');
  });

  // === Activities Customer ===
  await safeStep('gotoActivitiesCustomer', async () => {
    await fireSafetyManagement.gotoActivitiesCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivitiesCustomer');
  });

  await safeStep('gotoTaskManagementFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoTaskManagementFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementFireSafetyCustomer');
  });

  await safeStep('gotoWorkOrderFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoWorkOrderFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderFireSafetyCustomer');
  });

  await safeStep('gotoChecklistsFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoChecklistsFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsFireSafetyCustomer');
  });

  await safeStep('gotoIncidentFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoIncidentFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentFireSafetyCustomer');
  });

  // === Requirements and Guidelines ===
  await safeStep('gotoRequirementsAndGuidelines', async () => {
    await fireSafetyManagement.gotoRequirementsAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementsAndGuidelines');
  });

  await safeStep('gotoLinksToLawsAndRegulation', async () => {
    await fireSafetyManagement.gotoLinksToLawsAndRegulation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAndRegulation');
  });

  await safeStep('gotoInstructionsAndGuidelines', async () => {
    await fireSafetyManagement.gotoInstructionsAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
  });

  await safeStep('gotoLocalRegulations', async () => {
    await fireSafetyManagement.gotoLocalRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await fireSafetyManagement.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoDocumentTypes', async () => {
    await fireSafetyManagement.gotoDocumentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
  });

  await safeStep('gotoServiceTypes', async () => {
    await fireSafetyManagement.gotoServiceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
  });

  await safeStep('gotoMaterialTypes', async () => {
    await fireSafetyManagement.gotoMaterialTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterialTypes');
  });

  await safeStep('gotoPermitFireSafety', async () => {
    await fireSafetyManagement.gotoPermitFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitFireSafety');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await fireSafetyManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await fireSafetyManagement.gotoAccessConfiguration();
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