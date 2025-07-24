// File: CulturalValueManagementNav.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';
import { safeStep, safeStepWithTimeout, safeScreenshot } from '../../src/utils/CommonFunctions.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Screens to validate
const labels = [
  // General Overview
  //'gotoGeneralOverview',
  'gotoGeneralInformationCulturalValue',

  // Responsible Resources
  //'gotoResponsibleResources',
  'gotoServicePartners',
  'gotoServicePartnersManagementCulturalValue',
  'gotoPersonPermitCulturalValue',

  // Technical Documentation
  //'gotoTechnicalDocumentation',
  'gotoCulturalValueDocuments',
  'gotoCulturalValueDocumentTree',

  // Object Marking
  //'gotoObjectMarking',
  'gotoTechnicalSystemCulturalValue',
  'gotoCCSTechnicalSystemCulturalValue',
  'gotoThemeMarking',

  // Activities
  //'gotoActivities',
  'gotoTaskManagementCulturalValue',
  'gotoWorkOrderCulturalValue',
  'gotoIncidentCulturalValue',

  // Requirements and Guidelines
  //'gotoRequirementAndGuidelines',
  'gotoLinksToLawsAndRegulation',
  'gotoInstructionsAndGuidelines',
  'gotoLocalRegulations',

  // Data Setup
  //'gotoDataSetup',
  'gotoDocumentTypes',
  'gotoServiceTypes',
  'gotoPermitCulturalValue',

  // Configuration
  //'gotoConfiguration',
  'gotoAccessConfiguration'
];

// Run the visual test for a given URL environment 
const runTestOnUrl = async (env, baseUrl, page, context, loginMethod = 'core') => {
  const initializeFunction = loginMethod === 'core' ? loginAndInitializeWithCore : loginAndInitializeWithStandard;
  const { homePage, culturalValueManagement } = await initializeFunction({ page, context, baseUrl });

  // Navigate to home and module menu
  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
  }, page, env);

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
  }, page, env);

  await safeStep('clickCulturalValueManagement', async () => {
    await culturalValueManagement.clickCulturalValueManagement();
    // Wait for Cultural Value Management module to fully load
    await page.waitForTimeout(6000);
    await page.locator("div[aria-label='Cultural value management Process step']").waitFor({ state: 'visible', timeout: 15000 });
  }, page, env);

  // 📌 General Overview
  await safeStep('gotoGeneralOverview', async () => {
    await culturalValueManagement.gotoGeneralOverview();
  }, page, env);

  await safeStep('gotoGeneralInformationCulturalValue', async () => {
    await culturalValueManagement.gotoGeneralInformationCulturalValue();
    await safeScreenshot(page, env, 'gotoGeneralInformationCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Responsible Resources
  await safeStep('gotoResponsibleResources', async () => {
    await culturalValueManagement.gotoResponsibleResources();
  }, page, env);

  await safeStep('gotoServicePartners', async () => {
    await culturalValueManagement.gotoServicePartners();
    await safeScreenshot(page, env, 'gotoServicePartners', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoServicePartnersManagementCulturalValue', async () => {
    await culturalValueManagement.gotoServicePartnersManagementCulturalValue();
    await safeScreenshot(page, env, 'gotoServicePartnersManagementCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoPersonPermitCulturalValue', async () => {
    await culturalValueManagement.gotoPersonPermitCulturalValue();
    await safeScreenshot(page, env, 'gotoPersonPermitCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Technical Documentation
  await safeStep('gotoTechnicalDocumentation', async () => {
    await culturalValueManagement.gotoTechnicalDocumentation();
  }, page, env);

  await safeStep('gotoCulturalValueDocuments', async () => {
    await culturalValueManagement.gotoCulturalValueDocuments();
    await safeScreenshot(page, env, 'gotoCulturalValueDocuments', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoCulturalValueDocumentTree', async () => {
    await culturalValueManagement.gotoCulturalValueDocumentTree();
    await safeScreenshot(page, env, 'gotoCulturalValueDocumentTree', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Object Marking
  await safeStep('gotoObjectMarking', async () => {
    await culturalValueManagement.gotoObjectMarking();
  }, page, env);

  await safeStep('gotoTechnicalSystemCulturalValue', async () => {
    await culturalValueManagement.gotoTechnicalSystemCulturalValue();
    await safeScreenshot(page, env, 'gotoTechnicalSystemCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoCCSTechnicalSystemCulturalValue', async () => {
    await culturalValueManagement.gotoCCSTechnicalSystemCulturalValue();
    await safeScreenshot(page, env, 'gotoCCSTechnicalSystemCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoThemeMarking', async () => {
    await culturalValueManagement.gotoThemeMarking();
    await safeScreenshot(page, env, 'gotoThemeMarking', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Activities
  await safeStep('gotoActivities', async () => {
    await culturalValueManagement.gotoActivities();
  }, page, env);

  await safeStep('gotoTaskManagementCulturalValue', async () => {
    await culturalValueManagement.gotoTaskManagementCulturalValue();
    await safeScreenshot(page, env, 'gotoTaskManagementCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoWorkOrderCulturalValue', async () => {
    await culturalValueManagement.gotoWorkOrderCulturalValue();
    await safeScreenshot(page, env, 'gotoWorkOrderCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoIncidentCulturalValue', async () => {
    await culturalValueManagement.gotoIncidentCulturalValue();
    await safeScreenshot(page, env, 'gotoIncidentCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Requirements and Guidelines  
  await safeStep('gotoRequirementAndGuidelines', async () => {
    await culturalValueManagement.gotoRequirementAndGuidelines();
  }, page, env);

  await safeStep('gotoLinksToLawsAndRegulation', async () => {
    await culturalValueManagement.gotoLinksToLawsAndRegulation();
    await safeScreenshot(page, env, 'gotoLinksToLawsAndRegulation', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoInstructionsAndGuidelines', async () => {
    await culturalValueManagement.gotoInstructionsAndGuidelines();
    await safeScreenshot(page, env, 'gotoInstructionsAndGuidelines', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoLocalRegulations', async () => {
    await culturalValueManagement.gotoLocalRegulations();
    await safeScreenshot(page, env, 'gotoLocalRegulations', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Data Setup
  await safeStep('gotoDataSetup', async () => {
    await culturalValueManagement.gotoDataSetup();
  }, page, env);

  await safeStep('gotoDocumentTypes', async () => {
    await culturalValueManagement.gotoDocumentTypes();
    await safeScreenshot(page, env, 'gotoDocumentTypes', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoServiceTypes', async () => {
    await culturalValueManagement.gotoServiceTypes();
    await safeScreenshot(page, env, 'gotoServiceTypes', waitForProcessingAndTakeScreenshot);
  }, page, env);

  await safeStep('gotoPermitCulturalValue', async () => {
    await culturalValueManagement.gotoPermitCulturalValue();
    await safeScreenshot(page, env, 'gotoPermitCulturalValue', waitForProcessingAndTakeScreenshot);
  }, page, env);

  // 📌 Configuration
  await safeStep('gotoConfiguration', async () => {
    await culturalValueManagement.gotoConfiguration();
  }, page, env);

  await safeStep('gotoAccessConfiguration', async () => {
    await culturalValueManagement.gotoAccessConfiguration();
    await safeScreenshot(page, env, 'gotoAccessConfiguration', waitForProcessingAndTakeScreenshot);
  }, page, env);
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Cultural Value Management - Compare url1 and url2', async ({ page, context }) => {
  // Set longer timeout for this specific test
  test.setTimeout(600000); // 10 minutes total

  // Run URL1 with LoginPageCore
  await runTestOnUrl('url1', process.env.URL1, page, context, 'core');

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  // Run URL2 with standard LoginPage
  await runTestOnUrl('url2', process.env.URL2, newPage, context, 'standard');

  compareAllScreenshots(labels, expect);
});

