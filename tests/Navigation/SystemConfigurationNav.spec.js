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
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMInternalTranslations();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoExternalHelp();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoTimeZones();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  // === System Statistic ===
  await systemConfiguration.gotoSystemStatistic();

  await systemConfiguration.gotoMainSummaries();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);


  await systemConfiguration.gotoProductConfigurations();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoReportTemplates();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoSnapshots();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoTemplates();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMShortcuts();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoDateWarehouseViews();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  // === System Services ===
  await systemConfiguration.gotoSystemServices();

  await systemConfiguration.gotoAutomaticActions();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoReminders();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoNotificationRules();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoActionLogs();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoHistoryLogs();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMLogs();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoWebServiceSettings();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoDocumentEmailImportSetups();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMirrorDefinations();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMirrorReceivingRules();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMirrorItems();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoQueueImports();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoQueueExports();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoQueueItems();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);


  // === System Settings ===
  await systemConfiguration.gotoSystemSettings();
  await systemConfiguration.gotoGISSettings();

  await systemConfiguration.gotoWMSLayers();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMFormTemplates();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoTechnicalInformationTypes();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMBoards();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoGlobalActionMenus();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoExternalLinks();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoAppKeys();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMExternalSetups();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoCommonActions();

  await systemConfiguration.gotoMMTutorials();
  await systemConfiguration.clickElement(systemConfiguration.Add);
  await systemConfiguration.clickElement(systemConfiguration.Close);
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

  await systemConfiguration.gotoMMTutorialSteps();
  await systemConfiguration.clickElement(systemConfiguration.Export);
  await systemConfiguration.clickElement(systemConfiguration.Close);

});