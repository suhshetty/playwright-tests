// tests/EnvironmentalManagementNav.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'gotoEnvironmentalManagement',

  // General Overview
  'gotoGeneralOverview', 'gotoGeneralInformation',

  // Responsible Resources
  'gotoResponsibleResources', 'gotoServicePartners', 'gotoServicePartnersExportClicked',
  'gotoServicePartnersCloseClicked', 'gotoServicePartnerManagement',
  'gotoPersonPermit', 'gotoPersonPermitExportClicked', 'gotoPersonPermitCloseClicked',

  // Technical Documentation
  'gotoTechnicalDocumentation', 'gotoEnvironmentDocuments', 'gotoEnvironmentDocumentsExportClicked',
  'gotoEnvironmentDocumentsCloseClicked', 'gotoEnvironmentDocumentTree',
  'gotoEnvironmentalGoals', 'selectPortfolioDropdown', 'selectSiteDropdown',
  'gotoEnvironmentalGoalsAddClicked', 'gotoEnvironmentalGoalsCloseClicked',
  'gotoEnvironmentalGoalsExportClicked', 'gotoEnvironmentalGoalsCloseClicked2',
  'gotoRandomRegistrations', 'gotoRandomRegistrationsAddClicked',
  'gotoRandomRegistrationsCloseClicked',

  // Object Marking
  'gotoObjectMarking', 'gotoTechnicalSystem', 'gotoTechnicalSystemExportClicked',
  'gotoTechnicalSystemCloseClicked', 'gotoCCSTechnicalSystem',
  'gotoCCSTechnicalSystemAddClicked', 'gotoCCSTechnicalSystemCloseClicked',
  'gotoCCSTechnicalSystemExportClicked', 'gotoCCSTechnicalSystemCloseClicked2',
  'gotoThemeMarkings',

  // Activities
  'gotoActivities', 'gotoTaskManagement', 'gotoTaskManagementExportClicked',
  'gotoTaskManagementCloseClicked', 'gotoWorkOrder', 'gotoWorkOrderAddClicked',
  'gotoWorkOrderCloseClicked', 'gotoWorkOrderExportClicked', 'gotoWorkOrderCloseClicked2',
  'gotoIncident', 'gotoIncidentAddClicked', 'gotoIncidentCloseClicked',
  'gotoIncidentExportClicked', 'gotoIncidentCloseClicked2',

  // Requirements and Guidelines
  'gotoRequirementandGuidelines', 'gotoLinksToLawsRegulations', 'gotoLinksToLawsAddClicked',
  'gotoLinksToLawsCloseClicked', 'gotoInstructionsAndGuidelines', 'gotoInstructionsAddClicked',
  'gotoInstructionsCloseClicked', 'gotoLocalRegulations', 'gotoLocalRegulationsExportClicked',
  'gotoLocalRegulationsCloseClicked',

  // Data Setup
  'gotoDataSetup', 'gotoDocumentTypes', 'gotoDocumentTypesAddClicked',
  'gotoDocumentTypesCloseClicked', 'gotoDocumentTypesExportClicked',
  'gotoDocumentTypesCloseClicked2', 'gotoServiceTypes', 'gotoServiceTypesAddClicked',
  'gotoServiceTypesCloseClicked', 'gotoServiceTypesExportClicked',
  'gotoServiceTypesCloseClicked2', 'gotoPermit', 'gotoPermitAddClicked',
  'gotoPermitCloseClicked', 'gotoPermitExportClicked', 'gotoPermitCloseClicked2',

  // Configuration
  'gotoConfiguration', 'gotoAccessConfigurations'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, environmentalManagement } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await environmentalManagement.toggleDarkModeAndClickProfile();

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotoEnvironmentalManagement', async () => {
    await environmentalManagement.gotoEnvironmentalManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalManagement');
  });

  // === General Overview ===
  await safeStep('gotoGeneralOverview', async () => {
    await environmentalManagement.gotoGeneralOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralOverview');
  });

  await safeStep('gotoGeneralInformation', async () => {
    await environmentalManagement.gotoGeneralInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGeneralInformation');
  });

  // === Responsible Resources ===
  await safeStep('gotoResponsibleResources', async () => {
    await environmentalManagement.gotoResponsibleResources();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoResponsibleResources');
  });

  await safeStep('gotoServicePartners', async () => {
    await environmentalManagement.gotoServicePartners();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartners');
  });

  await safeStep('gotoServicePartnersExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersExportClicked');
  });

  await safeStep('gotoServicePartnersCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersCloseClicked');
  });

  await safeStep('gotoServicePartnerManagement', async () => {
    await environmentalManagement.gotoServicePartnerManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerManagement');
  });

  await safeStep('gotoPersonPermit', async () => {
    await environmentalManagement.gotoPersonPermit();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermit');
  });

  await safeStep('gotoPersonPermitExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitExportClicked');
  });

  await safeStep('gotoPersonPermitCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitCloseClicked');
  });

  // === Technical Documentation ===
  await safeStep('gotoTechnicalDocumentation', async () => {
    await environmentalManagement.gotoTechnicalDocumentation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalDocumentation');
  });

  await safeStep('gotoEnvironmentDocuments', async () => {
    await environmentalManagement.gotoEnvironmentDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentDocuments');
  });

  await safeStep('gotoEnvironmentDocumentsExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentDocumentsExportClicked');
  });

  await safeStep('gotoEnvironmentDocumentsCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentDocumentsCloseClicked');
  });

  await safeStep('gotoEnvironmentDocumentTree', async () => {
    await environmentalManagement.gotoEnvironmentDocumentTree();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentDocumentTree');
  });

  await safeStep('gotoEnvironmentalGoals', async () => {
    await environmentalManagement.gotoEnvironmentalGoals();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalGoals');
  });

  await safeStep('selectPortfolioDropdown', async () => {
    await environmentalManagement.selectDropdown('portfolio', 'Aktivitetscentre');
    await waitForProcessingAndTakeScreenshot(page, env, 'selectPortfolioDropdown');
  });

  await safeStep('selectSiteDropdown', async () => {
    await environmentalManagement.selectDropdown('site', 'ICECONSULT DANMARK ApS');
    await waitForProcessingAndTakeScreenshot(page, env, 'selectSiteDropdown');
  });

  await safeStep('gotoEnvironmentalGoalsAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalGoalsAddClicked');
  });

  await safeStep('gotoEnvironmentalGoalsCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalGoalsCloseClicked');
  });

  await safeStep('gotoEnvironmentalGoalsExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalGoalsExportClicked');
  });

  await safeStep('gotoEnvironmentalGoalsCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEnvironmentalGoalsCloseClicked2');
  });

  await safeStep('gotoRandomRegistrations', async () => {
    await environmentalManagement.gotoRandomRegistrations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRandomRegistrations');
  });

  await safeStep('gotoRandomRegistrationsAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRandomRegistrationsAddClicked');
  });

  await safeStep('gotoRandomRegistrationsCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRandomRegistrationsCloseClicked');
  });

  // === Object Marking ===
  await safeStep('gotoObjectMarking', async () => {
    await environmentalManagement.gotoObjectMarking();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectMarking');
  });

  await safeStep('gotoTechnicalSystem', async () => {
    await environmentalManagement.gotoTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
  });

  await safeStep('gotoTechnicalSystemExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemExportClicked');
  });

  await safeStep('gotoTechnicalSystemCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCCSTechnicalSystem', async () => {
    await environmentalManagement.gotoCCSTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystem');
  });

  await safeStep('gotoCCSTechnicalSystemAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemAddClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCCSTechnicalSystemExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemExportClicked');
  });

  await safeStep('gotoCCSTechnicalSystemCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSTechnicalSystemCloseClicked2');
  });

  await safeStep('gotoThemeMarkings', async () => {
    await environmentalManagement.gotoThemeMarkings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoThemeMarkings');
  });

  // === Activities ===
  await safeStep('gotoActivities', async () => {
    await environmentalManagement.gotoActivities();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivities');
  });

  await safeStep('gotoTaskManagement', async () => {
    await environmentalManagement.gotoTaskManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagement');
  });

  await safeStep('gotoTaskManagementExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementExportClicked');
  });

  await safeStep('gotoTaskManagementCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCloseClicked');
  });

  await safeStep('gotoWorkOrder', async () => {
    await environmentalManagement.gotoWorkOrder();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrder');
  });

  await safeStep('gotoWorkOrderAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAddClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked');
  });

  await safeStep('gotoWorkOrderExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderExportClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked2');
  });

  await safeStep('gotoIncident', async () => {
    await environmentalManagement.gotoIncident();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncident');
  });

  await safeStep('gotoIncidentAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentAddClicked');
  });

  await safeStep('gotoIncidentCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked');
  });

  await safeStep('gotoIncidentExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentExportClicked');
  });

  await safeStep('gotoIncidentCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked2');
  });

  // === Requirements and Guidelines ===
  await safeStep('gotoRequirementandGuidelines', async () => {
    await environmentalManagement.gotoRequirementandGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRequirementandGuidelines');
  });

  await safeStep('gotoLinksToLawsRegulations', async () => {
    await environmentalManagement.gotoLinksToLawsRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsRegulations');
  });

  await safeStep('gotoLinksToLawsAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAddClicked');
  });

  await safeStep('gotoLinksToLawsCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsCloseClicked');
  });

  await safeStep('gotoInstructionsAndGuidelines', async () => {
    await environmentalManagement.gotoInstructionsAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
  });

  await safeStep('gotoInstructionsAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAddClicked');
  });

  await safeStep('gotoInstructionsCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsCloseClicked');
  });

  await safeStep('gotoLocalRegulations', async () => {
    await environmentalManagement.gotoLocalRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
  });

  await safeStep('gotoLocalRegulationsExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsExportClicked');
  });

  await safeStep('gotoLocalRegulationsCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsCloseClicked');
  });

  // === Data Setup ===
  await safeStep('gotoDataSetup', async () => {
    await environmentalManagement.gotoDataSetup();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDataSetup');
  });

  await safeStep('gotoDocumentTypes', async () => {
    await environmentalManagement.gotoDocumentTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypes');
  });

  await safeStep('gotoDocumentTypesAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesAddClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked');
  });

  await safeStep('gotoDocumentTypesExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesExportClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked2');
  });

  await safeStep('gotoServiceTypes', async () => {
    await environmentalManagement.gotoServiceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
  });

  await safeStep('gotoServiceTypesAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesAddClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked');
  });

  await safeStep('gotoServiceTypesExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesExportClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked2');
  });

  await safeStep('gotoPermit', async () => {
    await environmentalManagement.gotoPermit();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermit');
  });

  await safeStep('gotoPermitAddClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitAddClicked');
  });

  await safeStep('gotoPermitCloseClicked', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked');
  });

  await safeStep('gotoPermitExportClicked', async () => {
    await environmentalManagement.clickElement(environmentalManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitExportClicked');
  });

  await safeStep('gotoPermitCloseClicked2', async () => {
    await environmentalManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked2');
  });

  // === Configuration ===
  await safeStep('gotoConfiguration', async () => {
    await environmentalManagement.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  await safeStep('gotoAccessConfigurations', async () => {
    await environmentalManagement.gotoAccessConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfigurations');
  });
};

// Main visual regression test
test('Visual Regression Test - Environmental Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});