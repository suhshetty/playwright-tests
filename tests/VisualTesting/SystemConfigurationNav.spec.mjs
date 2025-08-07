// File: SystemConfigurationNav.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 
  'gotoSystemLocalization', 'gotoSystemStatistic', 'gotoSystemServices', 'gotoSystemSettings',
  'gotoMMTranslations', 'gotoMMInternalTranslations', 'gotoExternalHelp', 'gotoTimeZones',
  'gotoMainSummaries', 'gotoProductConfigurations', 'gotoReportTemplates', 'gotoSnapshots', 'gotoTemplates', 'gotoMMShortcuts', 'gotoDateWarehouseViews',
  'gotoAutomaticActions', 'gotoReminders', 'gotoNotificationRules', 'gotoActionLogs', 'gotoHistoryLogs', 'gotoMMLogs', 'gotoWebServiceSettings', 'gotoDocumentEmailImportSetups', 'gotoMirrorDefinations', 'gotoMirrorReceivingRules', 'gotoMirrorItems', 'gotoQueueImports', 'gotoQueueExports', 'gotoQueueItems',
  'gotoGISSettings', 'gotoWMSLayers', 'gotoMMFormTemplates', 'gotoTechnicalInformationTypes', 'gotoMMBoards', 'gotoGlobalActionMenus', 'gotoExternalLinks', 'gotoAppKeys', 'gotoMMExternalSetups', 'gotoCommonActions', 'gotoMMTutorials', 'gotoMMTutorialSteps'
];

// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, systemConfiguration } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('gotosystemConfiguration', async () => {
    await systemConfiguration.gotosystemConfiguration();
  });

  // === System Localization ===
  await safeStep('gotoSystemLocalization', async () => {
    await systemConfiguration.gotoSystemLocalization();
  });

  await safeStep('gotoMMTranslations', async () => {
    await systemConfiguration.gotoMMTranslations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTranslations');
  });

  await safeStep('gotoMMInternalTranslations', async () => {
    await systemConfiguration.gotoMMInternalTranslations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMInternalTranslations');
  });

  await safeStep('gotoExternalHelp', async () => {
    await systemConfiguration.gotoExternalHelp();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalHelp');
  });

  await safeStep('gotoTimeZones', async () => {
    await systemConfiguration.gotoTimeZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeZones');
  });

  // === System Statistic ===
  await safeStep('gotoSystemStatistic', async () => {
    await systemConfiguration.gotoSystemStatistic();
  });

  await safeStep('gotoMainSummaries', async () => {
    await systemConfiguration.gotoMainSummaries();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainSummaries');
  });

  await safeStep('gotoProductConfigurations', async () => {
    await systemConfiguration.gotoProductConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductConfigurations');
  });

  await safeStep('gotoReportTemplates', async () => {
    await systemConfiguration.gotoReportTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReportTemplates');
  });

  await safeStep('gotoSnapshots', async () => {
    await systemConfiguration.gotoSnapshots();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSnapshots');
  });

  await safeStep('gotoTemplates', async () => {
    await systemConfiguration.gotoTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTemplates');
  });

  await safeStep('gotoMMShortcuts', async () => {
    await systemConfiguration.gotoMMShortcuts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMShortcuts');
  });

  await safeStep('gotoDateWarehouseViews', async () => {
    await systemConfiguration.gotoDateWarehouseViews();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDateWarehouseViews');
  });

  // === System Services ===
  await safeStep('gotoSystemServices', async () => {
    await systemConfiguration.gotoSystemServices();
  });

  await safeStep('gotoAutomaticActions', async () => {
    await systemConfiguration.gotoAutomaticActions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAutomaticActions');
  });

  await safeStep('gotoReminders', async () => {
    await systemConfiguration.gotoReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReminders');
  });

  await safeStep('gotoNotificationRules', async () => {
    await systemConfiguration.gotoNotificationRules();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationRules');
  });

  await safeStep('gotoActionLogs', async () => {
    await systemConfiguration.gotoActionLogs();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActionLogs');
  });

  await safeStep('gotoHistoryLogs', async () => {
    await systemConfiguration.gotoHistoryLogs();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHistoryLogs');
  });

  await safeStep('gotoMMLogs', async () => {
    await systemConfiguration.gotoMMLogs();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMLogs');
  });

  await safeStep('gotoWebServiceSettings', async () => {
    await systemConfiguration.gotoWebServiceSettings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWebServiceSettings');
  });

  await safeStep('gotoDocumentEmailImportSetups', async () => {
    await systemConfiguration.gotoDocumentEmailImportSetups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentEmailImportSetups');
  });

  await safeStep('gotoMirrorDefinations', async () => {
    await systemConfiguration.gotoMirrorDefinations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorDefinations');
  });

  await safeStep('gotoMirrorReceivingRules', async () => {
    await systemConfiguration.gotoMirrorReceivingRules();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorReceivingRules');
  });

  await safeStep('gotoMirrorItems', async () => {
    await systemConfiguration.gotoMirrorItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorItems');
  });

  await safeStep('gotoQueueImports', async () => {
    await systemConfiguration.gotoQueueImports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueImports');
  });

  await safeStep('gotoQueueExports', async () => {
    await systemConfiguration.gotoQueueExports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueExports');
  });

  await safeStep('gotoQueueItems', async () => {
    await systemConfiguration.gotoQueueItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueItems');
  });

  // === System Settings ===
  await safeStep('gotoSystemSettings', async () => {
    await systemConfiguration.gotoSystemSettings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSystemSettings');
  });

  await safeStep('gotoGISSettings', async () => {
    await systemConfiguration.gotoGISSettings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGISSettings');
  });

  await safeStep('gotoWMSLayers', async () => {
    await systemConfiguration.gotoWMSLayers();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWMSLayers');
  });

  await safeStep('gotoMMFormTemplates', async () => {
    await systemConfiguration.gotoMMFormTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMFormTemplates');
  });

  await safeStep('gotoTechnicalInformationTypes', async () => {
    await systemConfiguration.gotoTechnicalInformationTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformationTypes');
  });

  await safeStep('gotoMMBoards', async () => {
    await systemConfiguration.gotoMMBoards();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMBoards');
  });

  await safeStep('gotoGlobalActionMenus', async () => {
    await systemConfiguration.gotoGlobalActionMenus();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalActionMenus');
  });

  await safeStep('gotoExternalLinks', async () => {
    await systemConfiguration.gotoExternalLinks();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalLinks');
  });

  await safeStep('gotoAppKeys', async () => {
    await systemConfiguration.gotoAppKeys();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppKeys');
  });

  await safeStep('gotoMMExternalSetups', async () => {
    await systemConfiguration.gotoMMExternalSetups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMExternalSetups');
  });

  await safeStep('gotoCommonActions', async () => {
    await systemConfiguration.gotoCommonActions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCommonActions');
  });

  await safeStep('gotoMMTutorials', async () => {
    await systemConfiguration.gotoMMTutorials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorials');
  });

  await safeStep('gotoMMTutorialSteps', async () => {
    await systemConfiguration.gotoMMTutorialSteps();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialSteps');
  });
};

// 🎯 Main visual regression test entry
test('Visual Regression Test - System Configuration: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});