// tests/FireSafetyManagementNavigation.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'clickFireSafetyManagement',

  // General Overview
  'gotoGeneralOverview', 'gotoGeneralInformationFireSafety',

  // Responsible Resources
  'gotoResponsibleResources', 'gotoServicePartners', 'gotoServicePartnersExportClicked',
  'gotoServicePartnersCloseClicked', 'gotoServicePartnerManagementFireSafety',
  'gotoPersonPermitFireSafety', 'gotoPersonPermitExportClicked', 'gotoPersonPermitCloseClicked',

  // Technical Documentation
  'gotoTechnicalDocumentation', 'gotoFireSafetyDocument', 'gotoFireSafetyDocumentExportClicked',
  'gotoFireSafetyDocumentCloseClicked', 'gotoFireSafetyDocumentTree',
  'gotoFlammableAndPressurizedMaterial', 'gotoFlammableMaterialAddClicked',
  'gotoFlammableMaterialCloseClicked', 'gotoFlammableMaterialExportClicked',
  'gotoFlammableMaterialCloseClicked2', 'gotoFireSafetyZone',

  // Object Marking
  'gotoObjectMarking', 'gotoTechnicalSystemFireSafety', 'gotoTechnicalSystemExportClicked',
  'gotoTechnicalSystemCloseClicked', 'gotoCSSTechnicalSystemFireSafety',
  'gotoCSSTechnicalSystemAddClicked', 'gotoCSSTechnicalSystemCloseClicked',
  'gotoCSSTechnicalSystemExportClicked', 'gotoCSSTechnicalSystemCloseClicked2',
  'gotoThemeMarking',

  // Activities
  'gotoActivities', 'gotoTaskManagementFireSafety', 'gotoTaskManagementExportClicked',
  'gotoTaskManagementCloseClicked', 'gotoWorkOrderFireSafety', 'gotoWorkOrderAddClicked',
  'gotoWorkOrderCloseClicked', 'gotoWorkOrderExportClicked', 'gotoWorkOrderCloseClicked2',
  'gotoChecklistsFireSafety', 'gotoChecklistsExportClicked', 'gotoChecklistsCloseClicked',
  'gotoIncidentFireSafety', 'gotoIncidentAddClicked', 'gotoIncidentCloseClicked',
  'gotoIncidentExportClicked', 'gotoIncidentCloseClicked2',

  // Activities (Local)
  'gotoActivitiesLocal', 'gotoTaskManagementFireSafetyLocal', 'gotoTaskManagementLocalExportClicked',
  'gotoTaskManagementLocalCloseClicked', 'gotoWorkOrderFireSafetyLocal', 'gotoWorkOrderLocalAddClicked',
  'gotoWorkOrderLocalCloseClicked', 'gotoWorkOrderLocalExportClicked', 'gotoWorkOrderLocalCloseClicked2',
  'gotoChecklistsFireSafetyLocal', 'gotoChecklistsLocalExportClicked', 'gotoChecklistsLocalCloseClicked',
  'gotoIncidentFireSafetyLocal', 'gotoIncidentLocalAddClicked', 'gotoIncidentLocalCloseClicked',
  'gotoIncidentLocalExportClicked', 'gotoIncidentLocalCloseClicked2',

  // Activities (Customer)
  'gotoActivitiesCustomer', 'gotoTaskManagementFireSafetyCustomer', 'gotoTaskManagementCustomerExportClicked',
  'gotoTaskManagementCustomerCloseClicked', 'gotoWorkOrderFireSafetyCustomer', 'gotoWorkOrderCustomerAddClicked',
  'gotoWorkOrderCustomerCloseClicked', 'gotoWorkOrderCustomerExportClicked', 'gotoWorkOrderCustomerCloseClicked2',
  'gotoChecklistsFireSafetyCustomer', 'gotoChecklistsCustomerExportClicked', 'gotoChecklistsCustomerCloseClicked',
  'gotoIncidentFireSafetyCustomer', 'gotoIncidentCustomerAddClicked', 'gotoIncidentCustomerCloseClicked',
  'gotoIncidentCustomerExportClicked', 'gotoIncidentCustomerCloseClicked2',

  // Requirements and Guidelines
  'gotoRequirementsAndGuidelines', 'gotoLinksToLawsAndRegulation', 'gotoLinksToLawsAddClicked',
  'gotoLinksToLawsCloseClicked', 'gotoInstructionsAndGuidelines', 'gotoInstructionsAddClicked',
  'gotoInstructionsCloseClicked', 'gotoLocalRegulations', 'gotoLocalRegulationsExportClicked',
  'gotoLocalRegulationsCloseClicked',

  // Data Setup
  'gotoDataSetup', 'gotoDocumentTypes', 'gotoDocumentTypesAddClicked', 'gotoDocumentTypesCloseClicked',
  'gotoDocumentTypesExportClicked', 'gotoDocumentTypesCloseClicked2', 'gotoServiceTypes',
  'gotoServiceTypesAddClicked', 'gotoServiceTypesCloseClicked', 'gotoServiceTypesExportClicked',
  'gotoServiceTypesCloseClicked2', 'gotoMaterialTypes', 'gotoMaterialTypesAddClicked',
  'gotoMaterialTypesCloseClicked', 'gotoMaterialTypesExportClicked', 'gotoMaterialTypesCloseClicked2',
  'gotoPermitFireSafety', 'gotoPermitAddClicked', 'gotoPermitCloseClicked', 'gotoPermitExportClicked',
  'gotoPermitCloseClicked2',

  // Configuration
  'gotoConfiguration', 'gotoAccessConfiguration'
];

// Run for a given environment
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

  await safeStep('gotoServicePartnersExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersExportClicked');
  });

  await safeStep('gotoServicePartnersCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnersCloseClicked');
  });

  await safeStep('gotoServicePartnerManagementFireSafety', async () => {
    await fireSafetyManagement.gotoServicePartnerManagementFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServicePartnerManagementFireSafety');
  });

  await safeStep('gotoPersonPermitFireSafety', async () => {
    await fireSafetyManagement.gotoPersonPermitFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitFireSafety');
  });

  await safeStep('gotoPersonPermitExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitExportClicked');
  });

  await safeStep('gotoPersonPermitCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPersonPermitCloseClicked');
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

  await safeStep('gotoFireSafetyDocumentExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFireSafetyDocumentExportClicked');
  });

  await safeStep('gotoFireSafetyDocumentCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFireSafetyDocumentCloseClicked');
  });

  await safeStep('gotoFireSafetyDocumentTree', async () => {
    await fireSafetyManagement.gotoFireSafetyDocumentTree();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFireSafetyDocumentTree');
  });

  await safeStep('gotoFlammableAndPressurizedMaterial', async () => {
    await fireSafetyManagement.gotoFlammableAndPressurizedMaterial();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFlammableAndPressurizedMaterial');
  });

  await safeStep('gotoFlammableMaterialAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFlammableMaterialAddClicked');
  });

  await safeStep('gotoFlammableMaterialCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFlammableMaterialCloseClicked');
  });

  await safeStep('gotoFlammableMaterialExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFlammableMaterialExportClicked');
  });

  await safeStep('gotoFlammableMaterialCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFlammableMaterialCloseClicked2');
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

  await safeStep('gotoTechnicalSystemExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemExportClicked');
  });

  await safeStep('gotoTechnicalSystemCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCSSTechnicalSystemFireSafety', async () => {
    await fireSafetyManagement.gotoCSSTechnicalSystemFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCSSTechnicalSystemFireSafety');
  });

  await safeStep('gotoCSSTechnicalSystemAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCSSTechnicalSystemAddClicked');
  });

  await safeStep('gotoCSSTechnicalSystemCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCSSTechnicalSystemCloseClicked');
  });

  await safeStep('gotoCSSTechnicalSystemExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCSSTechnicalSystemExportClicked');
  });

  await safeStep('gotoCSSTechnicalSystemCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCSSTechnicalSystemCloseClicked2');
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

  await safeStep('gotoTaskManagementExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementExportClicked');
  });

  await safeStep('gotoTaskManagementCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCloseClicked');
  });

  await safeStep('gotoWorkOrderFireSafety', async () => {
    await fireSafetyManagement.gotoWorkOrderFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderFireSafety');
  });

  await safeStep('gotoWorkOrderAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderAddClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked');
  });

  await safeStep('gotoWorkOrderExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderExportClicked');
  });

  await safeStep('gotoWorkOrderCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCloseClicked2');
  });

  await safeStep('gotoChecklistsFireSafety', async () => {
    await fireSafetyManagement.gotoChecklistsFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsFireSafety');
  });

  await safeStep('gotoChecklistsExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsExportClicked');
  });

  await safeStep('gotoChecklistsCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsCloseClicked');
  });

  await safeStep('gotoIncidentFireSafety', async () => {
    await fireSafetyManagement.gotoIncidentFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentFireSafety');
  });

  await safeStep('gotoIncidentAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentAddClicked');
  });

  await safeStep('gotoIncidentCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked');
  });

  await safeStep('gotoIncidentExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentExportClicked');
  });

  await safeStep('gotoIncidentCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCloseClicked2');
  });

  // === Activities (Local) ===
  await safeStep('gotoActivitiesLocal', async () => {
    await fireSafetyManagement.gotoActivitiesLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivitiesLocal');
  });

  await safeStep('gotoTaskManagementFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoTaskManagementFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementFireSafetyLocal');
  });

  await safeStep('gotoTaskManagementLocalExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementLocalExportClicked');
  });

  await safeStep('gotoTaskManagementLocalCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementLocalCloseClicked');
  });

  await safeStep('gotoWorkOrderFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoWorkOrderFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderFireSafetyLocal');
  });

  await safeStep('gotoWorkOrderLocalAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderLocalAddClicked');
  });

  await safeStep('gotoWorkOrderLocalCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderLocalCloseClicked');
  });

  await safeStep('gotoWorkOrderLocalExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderLocalExportClicked');
  });

  await safeStep('gotoWorkOrderLocalCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderLocalCloseClicked2');
  });

  await safeStep('gotoChecklistsFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoChecklistsFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsFireSafetyLocal');
  });

  await safeStep('gotoChecklistsLocalExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsLocalExportClicked');
  });

  await safeStep('gotoChecklistsLocalCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsLocalCloseClicked');
  });

  await safeStep('gotoIncidentFireSafetyLocal', async () => {
    await fireSafetyManagement.gotoIncidentFireSafetyLocal();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentFireSafetyLocal');
  });

  await safeStep('gotoIncidentLocalAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentLocalAddClicked');
  });

  await safeStep('gotoIncidentLocalCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentLocalCloseClicked');
  });

  await safeStep('gotoIncidentLocalExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentLocalExportClicked');
  });

  await safeStep('gotoIncidentLocalCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentLocalCloseClicked2');
  });

  // === Activities (Customer) ===
  await safeStep('gotoActivitiesCustomer', async () => {
    await fireSafetyManagement.gotoActivitiesCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActivitiesCustomer');
  });

  await safeStep('gotoTaskManagementFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoTaskManagementFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementFireSafetyCustomer');
  });

  await safeStep('gotoTaskManagementCustomerExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCustomerExportClicked');
  });

  await safeStep('gotoTaskManagementCustomerCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTaskManagementCustomerCloseClicked');
  });

  await safeStep('gotoWorkOrderFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoWorkOrderFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderFireSafetyCustomer');
  });

  await safeStep('gotoWorkOrderCustomerAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCustomerAddClicked');
  });

  await safeStep('gotoWorkOrderCustomerCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCustomerCloseClicked');
  });

  await safeStep('gotoWorkOrderCustomerExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCustomerExportClicked');
  });

  await safeStep('gotoWorkOrderCustomerCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderCustomerCloseClicked2');
  });

  await safeStep('gotoChecklistsFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoChecklistsFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsFireSafetyCustomer');
  });

  await safeStep('gotoChecklistsCustomerExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsCustomerExportClicked');
  });

  await safeStep('gotoChecklistsCustomerCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoChecklistsCustomerCloseClicked');
  });

  await safeStep('gotoIncidentFireSafetyCustomer', async () => {
    await fireSafetyManagement.gotoIncidentFireSafetyCustomer();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentFireSafetyCustomer');
  });

  await safeStep('gotoIncidentCustomerAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCustomerAddClicked');
  });

  await safeStep('gotoIncidentCustomerCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCustomerCloseClicked');
  });

  await safeStep('gotoIncidentCustomerExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCustomerExportClicked');
  });

  await safeStep('gotoIncidentCustomerCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoIncidentCustomerCloseClicked2');
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

  await safeStep('gotoLinksToLawsAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsAddClicked');
  });

  await safeStep('gotoLinksToLawsCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLinksToLawsCloseClicked');
  });

  await safeStep('gotoInstructionsAndGuidelines', async () => {
    await fireSafetyManagement.gotoInstructionsAndGuidelines();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAndGuidelines');
  });

  await safeStep('gotoInstructionsAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsAddClicked');
  });

  await safeStep('gotoInstructionsCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInstructionsCloseClicked');
  });

  await safeStep('gotoLocalRegulations', async () => {
    await fireSafetyManagement.gotoLocalRegulations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulations');
  });

  await safeStep('gotoLocalRegulationsExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsExportClicked');
  });

  await safeStep('gotoLocalRegulationsCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocalRegulationsCloseClicked');
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

  await safeStep('gotoDocumentTypesAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesAddClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked');
  });

  await safeStep('gotoDocumentTypesExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesExportClicked');
  });

  await safeStep('gotoDocumentTypesCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentTypesCloseClicked2');
  });

  await safeStep('gotoServiceTypes', async () => {
    await fireSafetyManagement.gotoServiceTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypes');
  });

  await safeStep('gotoServiceTypesAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesAddClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked');
  });

  await safeStep('gotoServiceTypesExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesExportClicked');
  });

  await safeStep('gotoServiceTypesCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoServiceTypesCloseClicked2');
  });

  await safeStep('gotoMaterialTypes', async () => {
    await fireSafetyManagement.gotoMaterialTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterialTypes');
  });

  await safeStep('gotoMaterialTypesAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterialTypesAddClicked');
  });

  await safeStep('gotoMaterialTypesCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterialTypesCloseClicked');
  });

  await safeStep('gotoMaterialTypesExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterialTypesExportClicked');
  });

  await safeStep('gotoMaterialTypesCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterialTypesCloseClicked2');
  });

  await safeStep('gotoPermitFireSafety', async () => {
    await fireSafetyManagement.gotoPermitFireSafety();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitFireSafety');
  });

  await safeStep('gotoPermitAddClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitAddClicked');
  });

  await safeStep('gotoPermitCloseClicked', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked');
  });

  await safeStep('gotoPermitExportClicked', async () => {
    await fireSafetyManagement.clickElement(fireSafetyManagement.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitExportClicked');
  });

  await safeStep('gotoPermitCloseClicked2', async () => {
    await fireSafetyManagement.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPermitCloseClicked2');
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

// Main visual regression test
test('Visual Regression Test - Fire Safety Management: Compare URL1 and URL2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});