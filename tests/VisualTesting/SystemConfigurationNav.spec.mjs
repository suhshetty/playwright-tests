// tests/SystemConfigurationNav.spec.js
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
  'gotoHomePage', 'gotoModuleMenu', 'gotosystemConfiguration',

  // === System Localization ===
  'gotoSystemLocalization', 'gotoMMTranslations', 'gotoMMTranslationsAddClicked',
  'gotoMMTranslationsCloseClicked', 'gotoMMTranslationsExportClicked',
  'gotoMMTranslationsCloseClicked2', 'gotoMMInternalTranslations',
  'gotoMMInternalTranslationsAddClicked', 'gotoMMInternalTranslationsCloseClicked',
  'gotoMMInternalTranslationsExportClicked', 'gotoMMInternalTranslationsCloseClicked2',
  'gotoExternalHelp', 'gotoExternalHelpAddClicked', 'gotoExternalHelpCloseClicked',
  'gotoExternalHelpExportClicked', 'gotoExternalHelpCloseClicked2', 'gotoTimeZones',
  'gotoTimeZonesExportClicked', 'gotoTimeZonesCloseClicked',

  // === System Statistic ===
  'gotoSystemStatistic', 'gotoMainSummaries', 'gotoMainSummariesAddClicked',
  'gotoMainSummariesCloseClicked', 'gotoMainSummariesExportClicked',
  'gotoMainSummariesCloseClicked2', 'gotoProductConfigurations',
  'gotoProductConfigurationsAddClicked', 'gotoProductConfigurationsCloseClicked',
  'gotoProductConfigurationsExportClicked', 'gotoProductConfigurationsCloseClicked2',
  'gotoReportTemplates', 'gotoReportTemplatesAddClicked', 'gotoReportTemplatesCloseClicked',
  'gotoReportTemplatesExportClicked', 'gotoReportTemplatesCloseClicked2',
  'gotoSnapshots', 'gotoSnapshotsAddClicked', 'gotoSnapshotsCloseClicked',
  'gotoSnapshotsExportClicked', 'gotoSnapshotsCloseClicked2', 'gotoTemplates',
  'gotoTemplatesExportClicked', 'gotoTemplatesCloseClicked', 'gotoMMShortcuts',
  'gotoMMShortcutsAddClicked', 'gotoMMShortcutsCloseClicked', 'gotoMMShortcutsExportClicked',
  'gotoMMShortcutsCloseClicked2', 'gotoDateWarehouseViews', 'gotoDateWarehouseViewsAddClicked',
  'gotoDateWarehouseViewsCloseClicked', 'gotoDateWarehouseViewsExportClicked',
  'gotoDateWarehouseViewsCloseClicked2',

  // === System Services ===
  'gotoSystemServices', 'gotoAutomaticActions', 'gotoAutomaticActionsAddClicked',
  'gotoAutomaticActionsCloseClicked', 'gotoAutomaticActionsExportClicked',
  'gotoAutomaticActionsCloseClicked2', 'gotoReminders', 'gotoRemindersAddClicked',
  'gotoRemindersCloseClicked', 'gotoRemindersExportClicked', 'gotoRemindersCloseClicked2',
  'gotoNotificationRules', 'gotoNotificationRulesAddClicked', 'gotoNotificationRulesCloseClicked',
  'gotoNotificationRulesExportClicked', 'gotoNotificationRulesCloseClicked2',
  'gotoActionLogs', 'gotoActionLogsExportClicked', 'gotoActionLogsCloseClicked',
  'gotoHistoryLogs', 'gotoHistoryLogsAddClicked', 'gotoHistoryLogsCloseClicked',
  'gotoMMLogs', 'gotoMMLogsExportClicked', 'gotoMMLogsCloseClicked',
  'gotoWebServiceSettings', 'gotoWebServiceSettingsAddClicked', 'gotoWebServiceSettingsCloseClicked',
  'gotoWebServiceSettingsExportClicked', 'gotoWebServiceSettingsCloseClicked2',
  'gotoDocumentEmailImportSetups', 'gotoDocumentEmailImportSetupsAddClicked',
  'gotoDocumentEmailImportSetupsCloseClicked', 'gotoDocumentEmailImportSetupsExportClicked',
  'gotoDocumentEmailImportSetupsCloseClicked2', 'gotoMirrorDefinations',
  'gotoMirrorDefinationsAddClicked', 'gotoMirrorDefinationsCloseClicked',
  'gotoMirrorDefinationsExportClicked', 'gotoMirrorDefinationsCloseClicked2',
  'gotoMirrorReceivingRules', 'gotoMirrorReceivingRulesAddClicked',
  'gotoMirrorReceivingRulesCloseClicked', 'gotoMirrorReceivingRulesExportClicked',
  'gotoMirrorReceivingRulesCloseClicked2', 'gotoMirrorItems', 'gotoMirrorItemsExportClicked',
  'gotoMirrorItemsCloseClicked', 'gotoQueueImports', 'gotoQueueImportsAddClicked',
  'gotoQueueImportsCloseClicked', 'gotoQueueImportsExportClicked',
  'gotoQueueImportsCloseClicked2', 'gotoQueueExports', 'gotoQueueExportsAddClicked',
  'gotoQueueExportsCloseClicked', 'gotoQueueExportsExportClicked',
  'gotoQueueExportsCloseClicked2', 'gotoQueueItems', 'gotoQueueItemsAddClicked',
  'gotoQueueItemsCloseClicked', 'gotoQueueItemsExportClicked', 'gotoQueueItemsCloseClicked2',

  // === System Settings ===
  'gotoSystemSettings', 'gotoGISSettings', 'gotoWMSLayers', 'gotoWMSLayersAddClicked',
  'gotoWMSLayersCloseClicked', 'gotoWMSLayersExportClicked', 'gotoWMSLayersCloseClicked2',
  'gotoMMFormTemplates', 'gotoMMFormTemplatesAddClicked', 'gotoMMFormTemplatesCloseClicked',
  'gotoMMFormTemplatesExportClicked', 'gotoMMFormTemplatesCloseClicked2',
  'gotoTechnicalInformationTypes', 'gotoTechnicalInformationTypesAddClicked',
  'gotoTechnicalInformationTypesCloseClicked', 'gotoTechnicalInformationTypesExportClicked',
  'gotoTechnicalInformationTypesCloseClicked2', 'gotoMMBoards',
  'gotoMMBoardsExportClicked', 'gotoMMBoardsCloseClicked', 'gotoGlobalActionMenus',
  'gotoGlobalActionMenusAddClicked', 'gotoGlobalActionMenusCloseClicked',
  'gotoGlobalActionMenusExportClicked', 'gotoGlobalActionMenusCloseClicked2',
  'gotoExternalLinks', 'gotoExternalLinksAddClicked', 'gotoExternalLinksCloseClicked',
  'gotoExternalLinksExportClicked', 'gotoExternalLinksCloseClicked2',
  'gotoAppKeys', 'gotoAppKeysAddClicked', 'gotoAppKeysCloseClicked',
  'gotoAppKeysExportClicked', 'gotoAppKeysCloseClicked2', 'gotoMMExternalSetups',
  'gotoMMExternalSetupsAddClicked', 'gotoMMExternalSetupsCloseClicked',
  'gotoMMExternalSetupsExportClicked', 'gotoMMExternalSetupsCloseClicked2',
  'gotoCommonActions', 'gotoMMTutorials', 'gotoMMTutorialsAddClicked',
  'gotoMMTutorialsCloseClicked', 'gotoMMTutorialsExportClicked',
  'gotoMMTutorialsCloseClicked2', 'gotoMMTutorialSteps', 'gotoMMTutorialStepsExportClicked',
  'gotoMMTutorialStepsCloseClicked'
];

// Run for a given environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, systemConfiguration } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
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
    await waitForProcessingAndTakeScreenshot(page, env, 'gotosystemConfiguration');
  });

  // === System Localization ===
  await safeStep('gotoSystemLocalization', async () => {
    await systemConfiguration.gotoSystemLocalization();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSystemLocalization');
  });

  await safeStep('gotoMMTranslations', async () => {
    await systemConfiguration.gotoMMTranslations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTranslations');
  });

  await safeStep('gotoMMTranslationsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTranslationsAddClicked');
  });

  await safeStep('gotoMMTranslationsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTranslationsCloseClicked');
  });

  await safeStep('gotoMMTranslationsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTranslationsExportClicked');
  });

  await safeStep('gotoMMTranslationsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTranslationsCloseClicked2');
  });

  await safeStep('gotoMMInternalTranslations', async () => {
    await systemConfiguration.gotoMMInternalTranslations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMInternalTranslations');
  });

  await safeStep('gotoMMInternalTranslationsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMInternalTranslationsAddClicked');
  });

  await safeStep('gotoMMInternalTranslationsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMInternalTranslationsCloseClicked');
  });

  await safeStep('gotoMMInternalTranslationsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMInternalTranslationsExportClicked');
  });

  await safeStep('gotoMMInternalTranslationsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMInternalTranslationsCloseClicked2');
  });

  await safeStep('gotoExternalHelp', async () => {
    await systemConfiguration.gotoExternalHelp();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalHelp');
  });

  await safeStep('gotoExternalHelpAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalHelpAddClicked');
  });

  await safeStep('gotoExternalHelpCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalHelpCloseClicked');
  });

  await safeStep('gotoExternalHelpExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalHelpExportClicked');
  });

  await safeStep('gotoExternalHelpCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalHelpCloseClicked2');
  });

  await safeStep('gotoTimeZones', async () => {
    await systemConfiguration.gotoTimeZones();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeZones');
  });

  await safeStep('gotoTimeZonesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeZonesExportClicked');
  });

  await safeStep('gotoTimeZonesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTimeZonesCloseClicked');
  });

  // === System Statistic ===
  await safeStep('gotoSystemStatistic', async () => {
    await systemConfiguration.gotoSystemStatistic();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSystemStatistic');
  });

  await safeStep('gotoMainSummaries', async () => {
    await systemConfiguration.gotoMainSummaries();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainSummaries');
  });

  await safeStep('gotoMainSummariesAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainSummariesAddClicked');
  });

  await safeStep('gotoMainSummariesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainSummariesCloseClicked');
  });

  await safeStep('gotoMainSummariesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainSummariesExportClicked');
  });

  await safeStep('gotoMainSummariesCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMainSummariesCloseClicked2');
  });

  await safeStep('gotoProductConfigurations', async () => {
    await systemConfiguration.gotoProductConfigurations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductConfigurations');
  });

  await safeStep('gotoProductConfigurationsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductConfigurationsAddClicked');
  });

  await safeStep('gotoProductConfigurationsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductConfigurationsCloseClicked');
  });

  await safeStep('gotoProductConfigurationsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductConfigurationsExportClicked');
  });

  await safeStep('gotoProductConfigurationsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductConfigurationsCloseClicked2');
  });

  await safeStep('gotoReportTemplates', async () => {
    await systemConfiguration.gotoReportTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReportTemplates');
  });

  await safeStep('gotoReportTemplatesAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReportTemplatesAddClicked');
  });

  await safeStep('gotoReportTemplatesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReportTemplatesCloseClicked');
  });

  await safeStep('gotoReportTemplatesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReportTemplatesExportClicked');
  });

  await safeStep('gotoReportTemplatesCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReportTemplatesCloseClicked2');
  });

  await safeStep('gotoSnapshots', async () => {
    await systemConfiguration.gotoSnapshots();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSnapshots');
  });

  await safeStep('gotoSnapshotsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSnapshotsAddClicked');
  });

  await safeStep('gotoSnapshotsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSnapshotsCloseClicked');
  });

  await safeStep('gotoSnapshotsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSnapshotsExportClicked');
  });

  await safeStep('gotoSnapshotsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSnapshotsCloseClicked2');
  });

  await safeStep('gotoTemplates', async () => {
    await systemConfiguration.gotoTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTemplates');
  });

  await safeStep('gotoTemplatesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTemplatesExportClicked');
  });

  await safeStep('gotoTemplatesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTemplatesCloseClicked');
  });

  await safeStep('gotoMMShortcuts', async () => {
    await systemConfiguration.gotoMMShortcuts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMShortcuts');
  });

  await safeStep('gotoMMShortcutsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMShortcutsAddClicked');
  });

  await safeStep('gotoMMShortcutsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMShortcutsCloseClicked');
  });

  await safeStep('gotoMMShortcutsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMShortcutsExportClicked');
  });

  await safeStep('gotoMMShortcutsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMShortcutsCloseClicked2');
  });

  await safeStep('gotoDateWarehouseViews', async () => {
    await systemConfiguration.gotoDateWarehouseViews();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDateWarehouseViews');
  });

  await safeStep('gotoDateWarehouseViewsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDateWarehouseViewsAddClicked');
  });

  await safeStep('gotoDateWarehouseViewsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDateWarehouseViewsCloseClicked');
  });

  await safeStep('gotoDateWarehouseViewsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDateWarehouseViewsExportClicked');
  });

  await safeStep('gotoDateWarehouseViewsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDateWarehouseViewsCloseClicked2');
  });

  // === System Services ===
  await safeStep('gotoSystemServices', async () => {
    await systemConfiguration.gotoSystemServices();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSystemServices');
  });

  await safeStep('gotoAutomaticActions', async () => {
    await systemConfiguration.gotoAutomaticActions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAutomaticActions');
  });

  await safeStep('gotoAutomaticActionsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAutomaticActionsAddClicked');
  });

  await safeStep('gotoAutomaticActionsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAutomaticActionsCloseClicked');
  });

  await safeStep('gotoAutomaticActionsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAutomaticActionsExportClicked');
  });

  await safeStep('gotoAutomaticActionsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAutomaticActionsCloseClicked2');
  });

  await safeStep('gotoReminders', async () => {
    await systemConfiguration.gotoReminders();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReminders');
  });

  await safeStep('gotoRemindersAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRemindersAddClicked');
  });

  await safeStep('gotoRemindersCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRemindersCloseClicked');
  });

  await safeStep('gotoRemindersExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRemindersExportClicked');
  });

  await safeStep('gotoRemindersCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRemindersCloseClicked2');
  });

  await safeStep('gotoNotificationRules', async () => {
    await systemConfiguration.gotoNotificationRules();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationRules');
  });

  await safeStep('gotoNotificationRulesAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationRulesAddClicked');
  });

  await safeStep('gotoNotificationRulesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationRulesCloseClicked');
  });

  await safeStep('gotoNotificationRulesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationRulesExportClicked');
  });

  await safeStep('gotoNotificationRulesCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoNotificationRulesCloseClicked2');
  });

  await safeStep('gotoActionLogs', async () => {
    await systemConfiguration.gotoActionLogs();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActionLogs');
  });

  await safeStep('gotoActionLogsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActionLogsExportClicked');
  });

  await safeStep('gotoActionLogsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoActionLogsCloseClicked');
  });

  await safeStep('gotoHistoryLogs', async () => {
    await systemConfiguration.gotoHistoryLogs();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHistoryLogs');
  });

  await safeStep('gotoHistoryLogsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHistoryLogsAddClicked');
  });

  await safeStep('gotoHistoryLogsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHistoryLogsCloseClicked');
  });

  await safeStep('gotoMMLogs', async () => {
    await systemConfiguration.gotoMMLogs();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMLogs');
  });

  await safeStep('gotoMMLogsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMLogsExportClicked');
  });

  await safeStep('gotoMMLogsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMLogsCloseClicked');
  });

  await safeStep('gotoWebServiceSettings', async () => {
    await systemConfiguration.gotoWebServiceSettings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWebServiceSettings');
  });

  await safeStep('gotoWebServiceSettingsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWebServiceSettingsAddClicked');
  });

  await safeStep('gotoWebServiceSettingsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWebServiceSettingsCloseClicked');
  });

  await safeStep('gotoWebServiceSettingsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWebServiceSettingsExportClicked');
  });

  await safeStep('gotoWebServiceSettingsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWebServiceSettingsCloseClicked2');
  });

  await safeStep('gotoDocumentEmailImportSetups', async () => {
    await systemConfiguration.gotoDocumentEmailImportSetups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentEmailImportSetups');
  });

  await safeStep('gotoDocumentEmailImportSetupsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentEmailImportSetupsAddClicked');
  });

  await safeStep('gotoDocumentEmailImportSetupsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentEmailImportSetupsCloseClicked');
  });

  await safeStep('gotoDocumentEmailImportSetupsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentEmailImportSetupsExportClicked');
  });

  await safeStep('gotoDocumentEmailImportSetupsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentEmailImportSetupsCloseClicked2');
  });

  await safeStep('gotoMirrorDefinations', async () => {
    await systemConfiguration.gotoMirrorDefinations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorDefinations');
  });

  await safeStep('gotoMirrorDefinationsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorDefinationsAddClicked');
  });

  await safeStep('gotoMirrorDefinationsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorDefinationsCloseClicked');
  });

  await safeStep('gotoMirrorDefinationsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorDefinationsExportClicked');
  });

  await safeStep('gotoMirrorDefinationsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorDefinationsCloseClicked2');
  });

  await safeStep('gotoMirrorReceivingRules', async () => {
    await systemConfiguration.gotoMirrorReceivingRules();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorReceivingRules');
  });

  await safeStep('gotoMirrorReceivingRulesAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorReceivingRulesAddClicked');
  });

  await safeStep('gotoMirrorReceivingRulesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorReceivingRulesCloseClicked');
  });

  await safeStep('gotoMirrorReceivingRulesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorReceivingRulesExportClicked');
  });

  await safeStep('gotoMirrorReceivingRulesCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorReceivingRulesCloseClicked2');
  });

  await safeStep('gotoMirrorItems', async () => {
    await systemConfiguration.gotoMirrorItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorItems');
  });

  await safeStep('gotoMirrorItemsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorItemsExportClicked');
  });

  await safeStep('gotoMirrorItemsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMirrorItemsCloseClicked');
  });

  await safeStep('gotoQueueImports', async () => {
    await systemConfiguration.gotoQueueImports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueImports');
  });

  await safeStep('gotoQueueImportsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueImportsAddClicked');
  });

  await safeStep('gotoQueueImportsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueImportsCloseClicked');
  });

  await safeStep('gotoQueueImportsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueImportsExportClicked');
  });

  await safeStep('gotoQueueImportsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueImportsCloseClicked2');
  });

  await safeStep('gotoQueueExports', async () => {
    await systemConfiguration.gotoQueueExports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueExports');
  });

  await safeStep('gotoQueueExportsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueExportsAddClicked');
  });

  await safeStep('gotoQueueExportsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueExportsCloseClicked');
  });

  await safeStep('gotoQueueExportsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueExportsExportClicked');
  });

  await safeStep('gotoQueueExportsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueExportsCloseClicked2');
  });

  await safeStep('gotoQueueItems', async () => {
    await systemConfiguration.gotoQueueItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueItems');
  });

  await safeStep('gotoQueueItemsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueItemsAddClicked');
  });

  await safeStep('gotoQueueItemsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueItemsCloseClicked');
  });

  await safeStep('gotoQueueItemsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueItemsExportClicked');
  });

  await safeStep('gotoQueueItemsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQueueItemsCloseClicked2');
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

  await safeStep('gotoWMSLayersAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWMSLayersAddClicked');
  });

  await safeStep('gotoWMSLayersCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWMSLayersCloseClicked');
  });

  await safeStep('gotoWMSLayersExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWMSLayersExportClicked');
  });

  await safeStep('gotoWMSLayersCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoWMSLayersCloseClicked2');
  });

  await safeStep('gotoMMFormTemplates', async () => {
    await systemConfiguration.gotoMMFormTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMFormTemplates');
  });

  await safeStep('gotoMMFormTemplatesAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMFormTemplatesAddClicked');
  });

  await safeStep('gotoMMFormTemplatesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMFormTemplatesCloseClicked');
  });

  await safeStep('gotoMMFormTemplatesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMFormTemplatesExportClicked');
  });

  await safeStep('gotoMMFormTemplatesCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMFormTemplatesCloseClicked2');
  });

    await safeStep('gotoTechnicalInformationTypes', async () => {
    await systemConfiguration.gotoTechnicalInformationTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformationTypes');
  });
  await safeStep('gotoTechnicalInformationTypesAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformationTypesAddClicked');
  });
  await safeStep('gotoTechnicalInformationTypesCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformationTypesCloseClicked');
  });
  await safeStep('gotoTechnicalInformationTypesExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformationTypesExportClicked');
  });
  await safeStep('gotoTechnicalInformationTypesCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformationTypesCloseClicked2');
  });

  await safeStep('gotoMMBoards', async () => {
    await systemConfiguration.gotoMMBoards();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMBoards');
  });
  await safeStep('gotoMMBoardsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMBoardsExportClicked');
  });
  await safeStep('gotoMMBoardsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMBoardsCloseClicked');
  });

  await safeStep('gotoGlobalActionMenus', async () => {
    await systemConfiguration.gotoGlobalActionMenus();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalActionMenus');
  });
  await safeStep('gotoGlobalActionMenusAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalActionMenusAddClicked');
  });
  await safeStep('gotoGlobalActionMenusCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalActionMenusCloseClicked');
  });
  await safeStep('gotoGlobalActionMenusExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalActionMenusExportClicked');
  });
  await safeStep('gotoGlobalActionMenusCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGlobalActionMenusCloseClicked2');
  });

  await safeStep('gotoExternalLinks', async () => {
    await systemConfiguration.gotoExternalLinks();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalLinks');
  });
  await safeStep('gotoExternalLinksAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalLinksAddClicked');
  });
  await safeStep('gotoExternalLinksCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalLinksCloseClicked');
  });
  await safeStep('gotoExternalLinksExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalLinksExportClicked');
  });
  await safeStep('gotoExternalLinksCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoExternalLinksCloseClicked2');
  });

  await safeStep('gotoAppKeys', async () => {
    await systemConfiguration.gotoAppKeys();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppKeys');
  });
  await safeStep('gotoAppKeysAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppKeysAddClicked');
  });
  await safeStep('gotoAppKeysCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppKeysCloseClicked');
  });
  await safeStep('gotoAppKeysExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppKeysExportClicked');
  });
  await safeStep('gotoAppKeysCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAppKeysCloseClicked2');
  });

  await safeStep('gotoMMExternalSetups', async () => {
    await systemConfiguration.gotoMMExternalSetups();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMExternalSetups');
  });
  await safeStep('gotoMMExternalSetupsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMExternalSetupsAddClicked');
  });
  await safeStep('gotoMMExternalSetupsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMExternalSetupsCloseClicked');
  });
  await safeStep('gotoMMExternalSetupsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMExternalSetupsExportClicked');
  });
  await safeStep('gotoMMExternalSetupsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMExternalSetupsCloseClicked2');
  });

  await safeStep('gotoCommonActions', async () => {
    await systemConfiguration.gotoCommonActions();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCommonActions');
  });

  await safeStep('gotoMMTutorials', async () => {
    await systemConfiguration.gotoMMTutorials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorials');
  });
  await safeStep('gotoMMTutorialsAddClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialsAddClicked');
  });
  await safeStep('gotoMMTutorialsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialsCloseClicked');
  });
  await safeStep('gotoMMTutorialsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialsExportClicked');
  });
  await safeStep('gotoMMTutorialsCloseClicked2', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialsCloseClicked2');
  });

  await safeStep('gotoMMTutorialSteps', async () => {
    await systemConfiguration.gotoMMTutorialSteps();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialSteps');
  });
  await safeStep('gotoMMTutorialStepsExportClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialStepsExportClicked');
  });
  await safeStep('gotoMMTutorialStepsCloseClicked', async () => {
    await systemConfiguration.clickElement(systemConfiguration.Close);
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMMTutorialStepsCloseClicked');
   });
};


// Main visual regression test entry
test('Visual Regression Test - System Configuration: Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});