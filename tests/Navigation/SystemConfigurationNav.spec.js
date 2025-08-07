// tests/SystemConfigurationNav.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation System Configuration', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, systemConfiguration } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await systemConfiguration.gotosystemConfiguration();

  // === System Localization ===
  await systemConfiguration.gotoSystemLocalization();
  await systemConfiguration.gotoMMTranslations();
  await systemConfiguration.gotoMMInternalTranslations();
  await systemConfiguration.gotoExternalHelp();
  await systemConfiguration.gotoTimeZones();

  // === System Statistic ===
  await systemConfiguration.gotoSystemStatistic();
  await systemConfiguration.gotoMainSummaries();
  await systemConfiguration.gotoProductConfigurations();
  await systemConfiguration.gotoReportTemplates();
  await systemConfiguration.gotoSnapshots();
  await systemConfiguration.gotoTemplates();
  await systemConfiguration.gotoMMShortcuts();
  await systemConfiguration.gotoDateWarehouseViews();

  // === System Services ===
  await systemConfiguration.gotoSystemServices();
  await systemConfiguration.gotoAutomaticActions();
  await systemConfiguration.gotoReminders();
  await systemConfiguration.gotoNotificationRules();
  await systemConfiguration.gotoActionLogs();
  await systemConfiguration.gotoHistoryLogs();
  await systemConfiguration.gotoMMLogs();
  await systemConfiguration.gotoWebServiceSettings();
  await systemConfiguration.gotoDocumentEmailImportSetups();
  await systemConfiguration.gotoMirrorDefinations();
  await systemConfiguration.gotoMirrorReceivingRules();
  await systemConfiguration.gotoMirrorItems();
  await systemConfiguration.gotoQueueImports();
  await systemConfiguration.gotoQueueExports();
  await systemConfiguration.gotoQueueItems();

  // === System Settings ===
  await systemConfiguration.gotoSystemSettings();
  await systemConfiguration.gotoGISSettings();
  await systemConfiguration.gotoWMSLayers();
  await systemConfiguration.gotoMMFormTemplates();
  await systemConfiguration.gotoTechnicalInformationTypes();
  await systemConfiguration.gotoMMBoards();
  await systemConfiguration.gotoGlobalActionMenus();
  await systemConfiguration.gotoExternalLinks();
  await systemConfiguration.gotoAppKeys();
  await systemConfiguration.gotoMMExternalSetups();
  await systemConfiguration.gotoCommonActions();
  await systemConfiguration.gotoMMTutorials();
  await systemConfiguration.gotoMMTutorialSteps();
});