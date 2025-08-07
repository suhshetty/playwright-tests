// File: CulturalValueManagementNavigation.spec.js
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


  // General Overview
  'gotoGeneralOverview', 'gotoGeneralInformationCulturalValue',

  // Responsible Resources
  'gotoServicePartners', 'gotoServicePartnersExportClicked',
  'gotoServicePartnersCloseClicked', 'gotoServicePartnersManagementCulturalValue',
  'gotoPersonPermitCulturalValue', 'gotoPersonPermitExportClicked', 'gotoPersonPermitCloseClicked',

  // Technical Documentation
  'gotoCulturalValueDocuments', 'gotoCulturalValueDocumentsExportClicked',
  'gotoCulturalValueDocumentsCloseClicked', 'gotoCulturalValueDocumentTree',

  // Object Marking
  'gotoTechnicalSystemCulturalValue', 'gotoTechnicalSystemExportClicked',
  'gotoTechnicalSystemCloseClicked', 'gotoCCSTechnicalSystemCulturalValue',
  'gotoCCSTechnicalSystemAddClicked', 'gotoCCSTechnicalSystemCloseClicked',
  'gotoCCSTechnicalSystemExportClicked', 'gotoCCSTechnicalSystemCloseClicked2',
  'gotoThemeMarking',

  // Activities
  'gotoTaskManagementCulturalValue', 'gotoTaskManagementExportClicked',
  'gotoTaskManagementCloseClicked', 'gotoWorkOrderCulturalValue', 'gotoWorkOrderAddClicked',
  'gotoWorkOrderCloseClicked', 'gotoWorkOrderExportClicked', 'gotoWorkOrderCloseClicked2',
  'gotoIncidentCulturalValue', 'gotoIncidentAddClicked', 'gotoIncidentCloseClicked',

  // Requirements and Guidelines
  'gotoLinksToLawsAndRegulation', 'gotoLinksToLawsExportClicked',
  'gotoLinksToLawsCloseClicked', 'gotoInstructionsAndGuidelines', 'gotoInstructionsExportClicked',
  'gotoInstructionsCloseClicked', 'gotoLocalRegulations', 'gotoLocalRegulationsExportClicked',
  'gotoLocalRegulationsCloseClicked',

  // Data Setup
  'gotoDocumentTypes', 'gotoDocumentTypesAddClicked', 'gotoDocumentTypesCloseClicked',
  'gotoDocumentTypesExportClicked', 'gotoDocumentTypesCloseClicked2', 'gotoServiceTypes',
  'gotoServiceTypesAddClicked', 'gotoServiceTypesCloseClicked', 'gotoServiceTypesExportClicked',
  'gotoServiceTypesCloseClicked2', 'gotoPermitCulturalValue', 'gotoPermitAddClicked',
  'gotoPermitCloseClicked', 'gotoPermitExportClicked', 'gotoPermitCloseClicked2',

  // Configuration
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, culturalValueManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickCulturalValueManagement', async () => {
    await culturalValueManagement.clickCulturalValueManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickCulturalValueManagement');
  });

  // === General Overview ===
  await safeStep('gotoGeneralOverview', async () => {
    await culturalValueManagement.gotoGeneralOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
  });

  await safeStep('gotoGeneralInformationCulturalValue', async () => {
    await culturalValueManagement.gotoGeneralInformationCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformationCulturalValue');
  });

  // === Responsible Resources ===
  await safeStep('gotoResponsibleResources', async () => {
    await culturalValueManagement.gotoResponsibleResources();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
  });

  await safeStep('gotoServicePartners', async () => {
    await culturalValueManagement.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoServicePartnersExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersExportClicked');
  });

  await safeStep('gotoServicePartnersCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersCloseClicked');
  });

  await safeStep('gotoServicePartnersManagementCulturalValue', async () => {
    await culturalValueManagement.gotoServicePartnersManagementCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersManagementCulturalValue');
  });

  await safeStep('gotoPersonPermitCulturalValue', async () => {
    await culturalValueManagement.gotoPersonPermitCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitCulturalValue');
  });

  await safeStep('gotoPersonPermitExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitExportClicked');
  });

  await safeStep('gotoPersonPermitCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitCloseClicked');
  });

  // === Technical Documentation ===
  await safeStep('gotoTechnicalDocumentation', async () => {
    await culturalValueManagement.gotoTechnicalDocumentation();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
  });

  await safeStep('gotoCulturalValueDocuments', async () => {
    await culturalValueManagement.gotoCulturalValueDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCulturalValueDocuments');
  });

  await safeStep('gotoCulturalValueDocumentsExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCulturalValueDocumentsExportClicked');
  });

  await safeStep('gotoCulturalValueDocumentsCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCulturalValueDocumentsCloseClicked');
  });

  await safeStep('gotoCulturalValueDocumentTree', async () => {
    await culturalValueManagement.gotoCulturalValueDocumentTree();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCulturalValueDocumentTree');
  });

  // === Object Marking ===
  await safeStep('gotoObjectMarking', async () => {
    await culturalValueManagement.gotoObjectMarking();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
  });

  await safeStep('gotoTechnicalSystemCulturalValue', async () => {
    await culturalValueManagement.gotoTechnicalSystemCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCulturalValue');
  });

  await safeStep('gotoTechnicalSystemExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemExportClicked');
  });

  await safeStep('gotoTechnicalSystemCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCulturalValue', async () => {
    await culturalValueManagement.gotoCCSTechnicalSystemCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCulturalValue');
  });

  await safeStep('gotoCCSTechnicalSystemAddClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemAddClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCCSTechnicalSystemExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemExportClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCloseClicked2', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCloseClicked2');
  });

  await safeStep('gotoThemeMarking', async () => {
    await culturalValueManagement.gotoThemeMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarking');
  });

  // === Activities ===
  await safeStep('gotoActivities', async () => {
    await culturalValueManagement.gotoActivities();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
  });

  await safeStep('gotoTaskManagementCulturalValue', async () => {
    await culturalValueManagement.gotoTaskManagementCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCulturalValue');
  });

  await safeStep('gotoTaskManagementExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementExportClicked');
  });

  await safeStep('gotoTaskManagementCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCloseClicked');
  });

  await safeStep('gotoWorkOrderCulturalValue', async () => {
    await culturalValueManagement.gotoWorkOrderCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCulturalValue');
  });

  await safeStep('gotoWorkOrderAddClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAddClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked');
  });

  await safeStep('gotoWorkOrderExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderExportClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked2', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked2');
  });

  await safeStep('gotoIncidentCulturalValue', async () => {
    await culturalValueManagement.gotoIncidentCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCulturalValue');
  });

  await safeStep('gotoIncidentAddClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentAddClicked');
  });

  await safeStep('gotoIncidentCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked');
  });

  // === Requirements and Guidelines ===
  await safeStep('gotoRequirementAndGuidelines', async () => {
    await culturalValueManagement.gotoRequirementAndGuidelines();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementAndGuidelines');
  });

  await safeStep('gotoLinksToLawsAndRegulation', async () => {
    await culturalValueManagement.gotoLinksToLawsAndRegulation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAndRegulation');
  });

  await safeStep('gotoLinksToLawsExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsExportClicked');
  });

  await safeStep('gotoLinksToLawsCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsCloseClicked');
  });

  await safeStep('gotoInstructionsAndGuidelines', async () => {
    await culturalValueManagement.gotoInstructionsAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
  });

  await safeStep('gotoInstructionsExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsExportClicked');
  });

  await safeStep('gotoInstructionsCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsCloseClicked');
  });

  await safeStep('gotoLocalRegulations', async () => {
    await culturalValueManagement.gotoLocalRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
  });

  await safeStep('gotoLocalRegulationsExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsExportClicked');
  });

  await safeStep('gotoLocalRegulationsCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsCloseClicked');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await culturalValueManagement.gotoDataSetup();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoDocumentTypes', async () => {
    await culturalValueManagement.gotoDocumentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
  });

  await safeStep('gotoDocumentTypesAddClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesAddClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked');
  });

  await safeStep('gotoDocumentTypesExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesExportClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked2', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked2');
  });

  await safeStep('gotoServiceTypes', async () => {
    await culturalValueManagement.gotoServiceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
  });

  await safeStep('gotoServiceTypesAddClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesAddClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked');
  });

  await safeStep('gotoServiceTypesExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesExportClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked2', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked2');
  });

  await safeStep('gotoPermitCulturalValue', async () => {
    await culturalValueManagement.gotoPermitCulturalValue();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCulturalValue');
  });

  await safeStep('gotoPermitAddClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitAddClicked');
  });

  await safeStep('gotoPermitCloseClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked');
  });

  await safeStep('gotoPermitExportClicked', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitExportClicked');
  });

  await safeStep('gotoPermitCloseClicked2', async () => {
    await culturalValueManagement.clickElement(culturalValueManagement.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked2');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await culturalValueManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await culturalValueManagement.gotoAccessConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
  });
};

// Main visual regression test
test('Visual Regression Test - Cultural Value Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});