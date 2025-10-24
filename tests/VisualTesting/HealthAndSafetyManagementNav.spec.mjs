// File: HealthAndSafetyManagementNavigation.spec.js
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
  'clickHealthAndSafetyManagement',

  'gotoGeneralOverview',
  'gotoGeneralInformationHSE',

  'gotoResponsibleResources',
  'gotoServicePartners',
  'gotoServicePartnersAddClicked',
  'gotoServicePartnersCloseClicked',
  'gotoServicePartnersExportClicked',
  'gotoServicePartnersExportCloseClicked',
  'gotoServicePartnersManagementHSE',
  'gotoPersonPermitHSE',
  'gotoPersonPermitHSEExportClicked',
  'gotoPersonPermitHSEExportCloseClicked',

  'gotoTechnicalDocumentation',
  'gotoHSEDocuments',
  'gotoHSEDocumentsAddClicked',
  'gotoHSEDocumentsCloseClicked',
  'gotoHSEDocumentTree',
  'gotoRadonRegistration',
  'gotoRadonRegistrationAddClicked',
  'gotoRadonRegistrationCloseClicked',

  'gotoObjectMarking',
  'gotoInsuranceCertificate',
  'gotoInsuranceCertificateAddClicked',
  'gotoInsuranceCertificateCloseClicked',
  'gotoInsuranceCertificateExportClicked',
  'gotoInsuranceCertificateExportCloseClicked',

  'gotoActivities',
  'gotoTaskManagementHSE',
  'gotoTaskManagementHSEExportClicked',
  'gotoTaskManagementHSEExportCloseClicked',
  'gotoWorkOrderHSE',
  'gotoWorkOrderHSEExportClicked',
  'gotoWorkOrderHSEExportCloseClicked',
  'gotoChecklistsHSE',
  'gotoChecklistsHSEExportClicked',
  'gotoChecklistsHSEExportCloseClicked',
  'gotoIncidentHSE',
  'gotoIncidentHSEAddClicked',
  'gotoIncidentHSECloseClicked',

  'gotoRequirementAndGuidelines',
  'gotoLinksToLawsAndRegulation',
  'gotoLinksToLawsAndRegulationAddClicked',
  'gotoLinksToLawsAndRegulationCloseClicked',
  'gotoInstructionsAndGuidelines',
  'gotoInstructionsAndGuidelinesAddClicked',
  'gotoInstructionsAndGuidelinesCloseClicked',
  'gotoLocalRegulations',
  'gotoLocalRegulationsAddClicked',
  'gotoLocalRegulationsCloseClicked',
  'gotoLocalRegulationsExportClicked',
  'gotoLocalRegulationsExportCloseClicked',

  'gotoConfiguration',
  'gotoAccessConfiguration'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, healthAndSafetyManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickHealthAndSafetyManagement', async () => {
    await healthAndSafetyManagement.clickHealthAndSafetyManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickHealthAndSafetyManagement');
  });

  // === General Overview ===
  await safeStep('gotoGeneralOverview', async () => {
    await healthAndSafetyManagement.gotoGeneralOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
  });

  await safeStep('gotoGeneralInformationHSE', async () => {
    await healthAndSafetyManagement.gotoGeneralInformationHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformationHSE');
  });

  // === Responsible Resources ===
  await safeStep('gotoResponsibleResources', async () => {
    await healthAndSafetyManagement.gotoResponsibleResources();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
  });

  await safeStep('gotoServicePartners', async () => {
    await healthAndSafetyManagement.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoServicePartnersAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersAddClicked');
  });

  await safeStep('gotoServicePartnersCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersCloseClicked');
  });

  await safeStep('gotoServicePartnersExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersExportClicked');
  });

  await safeStep('gotoServicePartnersExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersExportCloseClicked');
  });

  await safeStep('gotoServicePartnersManagementHSE', async () => {
    await healthAndSafetyManagement.gotoServicePartnersManagementHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersManagementHSE');
  });

  await safeStep('gotoPersonPermitHSE', async () => {
    await healthAndSafetyManagement.gotoPersonPermitHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitHSE');
  });

  await safeStep('gotoPersonPermitHSEExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitHSEExportClicked');
  });

  await safeStep('gotoPersonPermitHSEExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitHSEExportCloseClicked');
  });

  // === Technical Documentation ===
  await safeStep('gotoTechnicalDocumentation', async () => {
    await healthAndSafetyManagement.gotoTechnicalDocumentation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
  });

  await safeStep('gotoHSEDocuments', async () => {
    await healthAndSafetyManagement.gotoHSEDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHSEDocuments');
  });

  await safeStep('gotoHSEDocumentsAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHSEDocumentsAddClicked');
  });

  await safeStep('gotoHSEDocumentsCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHSEDocumentsCloseClicked');
  });

  await safeStep('gotoHSEDocumentTree', async () => {
    await healthAndSafetyManagement.gotoHSEDocumentTree();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHSEDocumentTree');
  });

  await safeStep('gotoRadonRegistration', async () => {
    await healthAndSafetyManagement.gotoRadonRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRadonRegistration');
  });

  await safeStep('gotoRadonRegistrationAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRadonRegistrationAddClicked');
  });

  await safeStep('gotoRadonRegistrationCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRadonRegistrationCloseClicked');
  });

  // === Object Marking ===
  await safeStep('gotoObjectMarking', async () => {
    await healthAndSafetyManagement.gotoObjectMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
  });

  await safeStep('gotoInsuranceCertificate', async () => {
    await healthAndSafetyManagement.gotoInsuranceCertificate();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsuranceCertificate');
  });

  await safeStep('gotoInsuranceCertificateAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsuranceCertificateAddClicked');
  });

  await safeStep('gotoInsuranceCertificateCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsuranceCertificateCloseClicked');
  });

  await safeStep('gotoInsuranceCertificateExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsuranceCertificateExportClicked');
  });

  await safeStep('gotoInsuranceCertificateExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInsuranceCertificateExportCloseClicked');
  });

  // === Activities ===
  await safeStep('gotoActivities', async () => {
    await healthAndSafetyManagement.gotoActivities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
  });

  await safeStep('gotoTaskManagementHSE', async () => {
    await healthAndSafetyManagement.gotoTaskManagementHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementHSE');
  });

  await safeStep('gotoTaskManagementHSEExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementHSEExportClicked');
  });

  await safeStep('gotoTaskManagementHSEExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementHSEExportCloseClicked');
  });

  await safeStep('gotoWorkOrderHSE', async () => {
    await healthAndSafetyManagement.gotoWorkOrderHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderHSE');
  });

  await safeStep('gotoWorkOrderHSEExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderHSEExportClicked');
  });

  await safeStep('gotoWorkOrderHSEExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderHSEExportCloseClicked');
  });

  await safeStep('gotoChecklistsHSE', async () => {
    await healthAndSafetyManagement.gotoChecklistsHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsHSE');
  });

  await safeStep('gotoChecklistsHSEExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsHSEExportClicked');
  });

  await safeStep('gotoChecklistsHSEExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsHSEExportCloseClicked');
  });

  await safeStep('gotoIncidentHSE', async () => {
    await healthAndSafetyManagement.gotoIncidentHSE();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentHSE');
  });

  await safeStep('gotoIncidentHSEAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentHSEAddClicked');
  });

  await safeStep('gotoIncidentHSECloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentHSECloseClicked');
  });

  // === Requirements and Guidelines ===
  await safeStep('gotoRequirementAndGuidelines', async () => {
    await healthAndSafetyManagement.gotoRequirementAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementAndGuidelines');
  });

  await safeStep('gotoLinksToLawsAndRegulation', async () => {
    await healthAndSafetyManagement.gotoLinksToLawsAndRegulation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAndRegulation');
  });

  await safeStep('gotoLinksToLawsAndRegulationAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAndRegulationAddClicked');
  });

  await safeStep('gotoLinksToLawsAndRegulationCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAndRegulationCloseClicked');
  });

  await safeStep('gotoInstructionsAndGuidelines', async () => {
    await healthAndSafetyManagement.gotoInstructionsAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
  });

  await safeStep('gotoInstructionsAndGuidelinesAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelinesAddClicked');
  });

  await safeStep('gotoInstructionsAndGuidelinesCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelinesCloseClicked');
  });

  await safeStep('gotoLocalRegulations', async () => {
    await healthAndSafetyManagement.gotoLocalRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
  });

  await safeStep('gotoLocalRegulationsAddClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsAddClicked');
  });

  await safeStep('gotoLocalRegulationsCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsCloseClicked');
  });

  await safeStep('gotoLocalRegulationsExportClicked', async () => {
    await healthAndSafetyManagement.clickElement(healthAndSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsExportClicked');
  });

  await safeStep('gotoLocalRegulationsExportCloseClicked', async () => {
    await healthAndSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsExportCloseClicked');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await healthAndSafetyManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfiguration', async () => {
    await healthAndSafetyManagement.gotoAccessConfiguration();
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
