// tests/UniversalDesignNav.spec.js
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
  // Home and Module Navigation
  'gotoHomePage', 'gotoModuleMenu', 'gotoUniversalDesign',

  // General Overview
  'gotoGeneralOverview', 'gotoGeneralInformation',

  // Responsible Resources
  'gotoResponsibleResources', 'gotoServicePartners', 'gotoServicePartnersExportClicked',
  'gotoServicePartnersCloseClicked', 'gotoServicePartnerManagement',
  'gotoPersonPermit', 'gotoPersonPermitExportClicked', 'gotoPersonPermitCloseClicked',

  // Technical Documentation
  'gotoTechnicalDocumentation', 'gotoUniversalDesignDocuments', 'gotoUniversalDesignDocumentsExportClicked',
  'gotoUniversalDesignDocumentsCloseClicked', 'gotoUniversalDesignDocumentTypes',

  // Object Marking
  'gotoObjectMarking', 'gotoTechnicalSystem', 'gotoTechnicalSystemExportClicked',
  'gotoTechnicalSystemCloseClicked', 'gotoCCSTechnicalSystem', 'gotoCCSTechnicalSystemAddClicked',
  'gotoCCSTechnicalSystemCloseClicked', 'gotoCCSTechnicalSystemExportClicked',
  'gotoCCSTechnicalSystemCloseClicked2', 'gotoThemeMarking',

  // Activities
  'gotoActivities', 'gotoTaskManagementUniversalDesign', 'gotoTaskManagementExportClicked',
  'gotoTaskManagementCloseClicked', 'gotoWorkOrderUniversalDesign', 'gotoWorkOrderAddClicked',
  'gotoWorkOrderCloseClicked', 'gotoWorkOrderExportClicked', 'gotoWorkOrderCloseClicked2',
  'gotoIncidentUniversalDesign', 'gotoIncidentAddClicked', 'gotoIncidentCloseClicked',
  'gotoIncidentExportClicked', 'gotoIncidentCloseClicked2',

  // Requirements and Guidelines
  'gotoRequirementsandGuidelines', 'gotoLinksToLawsandRegulations', 'gotoLinksToLawsExportClicked',
  'gotoLinksToLawsCloseClicked', 'gotoInstructionsandGuidelines', 'gotoInstructionsExportClicked',
  'gotoInstructionsCloseClicked', 'gotoLocalRegulations', 'gotoLocalRegulationsExportClicked',
  'gotoLocalRegulationsCloseClicked',

  // Data Setup
  'gotoDataSetup', 'gotoDocumentTypes', 'gotoDocumentTypesAddClicked', 'gotoDocumentTypesCloseClicked',
  'gotoDocumentTypesExportClicked', 'gotoDocumentTypesCloseClicked2', 'gotoServiceTypes',
  'gotoServiceTypesAddClicked', 'gotoServiceTypesCloseClicked', 'gotoServiceTypesExportClicked',
  'gotoServiceTypesCloseClicked2', 'gotoPermitUniversalDesign', 'gotoPermitAddClicked',
  'gotoPermitCloseClicked', 'gotoPermitExportClicked', 'gotoPermitCloseClicked2',

  // Configuration
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, universalDesign } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await universalDesign.toggleDarkModeAndClickProfile();

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoUniversalDesign', async () => {
    await universalDesign.gotoUniversalDesign();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesign');
  });

  // === General Overview ===
  await safeStep('gotoGeneralOverview', async () => {
    await universalDesign.gotoGeneralOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
  });

  await safeStep('gotoGeneralInformation', async () => {
    await universalDesign.gotoGeneralInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformation');
  });

  // === Responsible Resources ===
  await safeStep('gotoResponsibleResources', async () => {
    await universalDesign.gotoResponsibleResources();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
  });

  await safeStep('gotoServicePartners', async () => {
    await universalDesign.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoServicePartnersExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersExportClicked');
  });


  await safeStep('gotoServicePartnersCloseClicked', async () => {
   await universalDesign.clickClose();
   await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersCloseClicked');
});

   await safeStep('gotoServicePartnerManagement', async () => {
    await universalDesign.gotoServicePartnerManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerManagement');
  });

  await safeStep('gotoPersonPermit', async () => {
    await universalDesign.gotoPersonPermit();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermit');
  });

  await safeStep('gotoPersonPermitExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitExportClicked');
  });

  await safeStep('gotoPersonPermitCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitCloseClicked');
  });

  // === Technical Documentation ===
  await safeStep('gotoTechnicalDocumentation', async () => {
    await universalDesign.gotoTechnicalDocumentation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
  });

  await safeStep('gotoUniversalDesignDocuments', async () => {
    await universalDesign.gotoUniversalDesignDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesignDocuments');
  });

  await safeStep('gotoUniversalDesignDocumentsExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesignDocumentsExportClicked');
  });

  await safeStep('gotoUniversalDesignDocumentsCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesignDocumentsCloseClicked');
  });

  await safeStep('gotoUniversalDesignDocumentTypes', async () => {
    await universalDesign.gotoUniversalDesignDocumentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoUniversalDesignDocumentTypes');
  });

  // === Object Marking ===
  await safeStep('gotoObjectMarking', async () => {
    await universalDesign.gotoObjectMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
  });

  await safeStep('gotoTechnicalSystem', async () => {
    await universalDesign.gotoTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
  });

  await safeStep('gotoTechnicalSystemExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemExportClicked');
  });

  await safeStep('gotoTechnicalSystemCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCCSTechnicalSystem', async () => {
    await universalDesign.gotoCCSTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystem');
  });

  await safeStep('gotoCCSTechnicalSystemAddClicked', async () => {
    await universalDesign.clickElement(universalDesign.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemAddClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCCSTechnicalSystemExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemExportClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCloseClicked2', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCloseClicked2');
  });

  await safeStep('gotoThemeMarking', async () => {
    await universalDesign.gotoThemeMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarking');
  });

  // === Activities ===
  await safeStep('gotoActivities', async () => {
    await universalDesign.gotoActivities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
  });

  await safeStep('gotoTaskManagementUniversalDesign', async () => {
    await universalDesign.gotoTaskManagementUniversalDesign();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementUniversalDesign');
  });

  await safeStep('gotoTaskManagementExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementExportClicked');
  });

  await safeStep('gotoTaskManagementCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCloseClicked');
  });

  await safeStep('gotoWorkOrderUniversalDesign', async () => {
    await universalDesign.gotoWorkOrderUniversalDesign();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderUniversalDesign');
  });

  await safeStep('gotoWorkOrderAddClicked', async () => {
    await universalDesign.clickElement(universalDesign.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAddClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked');
  });

  await safeStep('gotoWorkOrderExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderExportClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked2', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked2');
  });

  await safeStep('gotoIncidentUniversalDesign', async () => {
    await universalDesign.gotoIncidentUniversalDesign();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentUniversalDesign');
  });

  await safeStep('gotoIncidentAddClicked', async () => {
    await universalDesign.clickElement(universalDesign.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentAddClicked');
  });

  await safeStep('gotoIncidentCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked');
  });

  await safeStep('gotoIncidentExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentExportClicked');
  });

  await safeStep('gotoIncidentCloseClicked2', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked2');
  });

  await page.pause();

  // === Requirements and Guidelines ===
  await safeStep('gotoRequirementsandGuidelines', async () => {
    await universalDesign.gotoRequirementsandGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementsandGuidelines');
  });

  await safeStep('gotoLinksToLawsandRegulations', async () => {
    await universalDesign.gotoLinksToLawsandRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsandRegulations');
  });

  await safeStep('gotoLinksToLawsExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsExportClicked');
  });

  await safeStep('gotoLinksToLawsCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsCloseClicked');
  });

  await safeStep('gotoInstructionsandGuidelines', async () => {
    await universalDesign.gotoInstructionsandGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsandGuidelines');
  });

  await safeStep('gotoInstructionsExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsExportClicked');
  });

  await safeStep('gotoInstructionsCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsCloseClicked');
  });

  await safeStep('gotoLocalRegulations', async () => {
    await universalDesign.gotoLocalRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
  });

  await safeStep('gotoLocalRegulationsExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsExportClicked');
  });

  await safeStep('gotoLocalRegulationsCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsCloseClicked');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await universalDesign.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoDocumentTypes', async () => {
    await universalDesign.gotoDocumentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
  });

  await safeStep('gotoDocumentTypesAddClicked', async () => {
    await universalDesign.clickElement(universalDesign.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesAddClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked');
  });

  await safeStep('gotoDocumentTypesExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesExportClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked2', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked2');
  });

  await safeStep('gotoServiceTypes', async () => {
    await universalDesign.gotoServiceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
  });

  await safeStep('gotoServiceTypesAddClicked', async () => {
    await universalDesign.clickElement(universalDesign.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesAddClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked');
  });

  await safeStep('gotoServiceTypesExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesExportClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked2', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked2');
  });

  await safeStep('gotoPermitUniversalDesign', async () => {
    await universalDesign.gotoPermitUniversalDesign();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitUniversalDesign');
  });

  await safeStep('gotoPermitAddClicked', async () => {
    await universalDesign.clickElement(universalDesign.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitAddClicked');
  });

  await safeStep('gotoPermitCloseClicked', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked');
  });

  await safeStep('gotoPermitExportClicked', async () => {
    await universalDesign.clickElement(universalDesign.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitExportClicked');
  });

  await safeStep('gotoPermitCloseClicked2', async () => {
    await universalDesign.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked2');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await universalDesign.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfigurations', async () => {
    await universalDesign.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });
};

// Main visual regression test
test('Visual Regression Test - Universal Design: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});