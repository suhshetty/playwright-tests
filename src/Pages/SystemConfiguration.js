const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class SystemConfiguration extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.environmentalManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='System configuration']";

    // Sub module locators
    this.SystemLocalization = "div[aria-label='System localization Process step']";
    this.SystemStatistic = "div[aria-label='System statistic Process step']";
    this.SystemServices = "div[aria-label='System services Process step']";
    this.SystemSettings = "div[aria-label='System settings Process step']";

    // Sub Types locators ( Sub module : System Localization )
    this.MMTranslations = "div[aria-label='MM translations Process step item']";
    this.MMInternalTranslations = "div[aria-label='Internal translations Process step item']";
    this.ExternalHelp = "div[aria-label='External help Process step item']";
    this.TimeZones = "div[aria-label='Time zones Process step item']";

    // Sub Types locators ( Sub module : System Statistic )
    this.MainSummaries = "div[aria-label='Main summaries Process step item']";
    this.ProductConfigurations = "div[aria-label='Portal configurations Process step item']";
    this.ReportTemplates = "div[aria-label='Report templates Process step item']";
    this.Snapshots = "div[aria-label='Snapshots Process step item']";
    this.Templates = "div[aria-label='Templates Process step item']";
    this.MMShortcuts = "div[aria-label='MM shortcuts Process step item']";
    this.DateWarehouseViews = "div[aria-label='Data warehouse views Process step item']";

    // Sub Types locators ( Sub module : System Services )
    this.AutomaticActions = "div[aria-label='Automatic actions Process step item']";
    this.Reminders = "div[aria-label='Reminders Process step item']";
    this.NotificationRules = "div[aria-label='Notification rules Process step item']";
    this.ActionLogs = "div[aria-label='Action logs Process step item']";
    this.HistoryLogs = "div[aria-label='History logs Process step item']";
    this.MMLogs = "div[aria-label='MM logs Process step item']";
    this.WebServiceSettings = "div[aria-label='Web service settings Process step item']";
    this.DocumentEmailImportSetups = "div[aria-label='Document Email import setups Process step item']";
    this.MirrorDefinations = "div[aria-label='Mirror Definitions Process step item']";
    this.MirrorReceivingRules = "div[aria-label='Mirror Receiving Rules Process step item']";
    this.MirrorItems = "div[aria-label='Mirror Items Process step item']";
    this.QueueImports = "div[aria-label='Queue Imports Process step item']";
    this.QueueExports = "div[aria-label='Queue Exports Process step item']";
    this.QueueItems = "div[aria-label='Queue Items Process step item']";

    // Sub Types locators ( Sub module : System Settings )
    this.SystemSettings = "div[aria-label='System settings Process step item']";
    this.GISSettings = "div[aria-label='GIS settings Process step item']";
    this.WMSLayers = "div[aria-label='WMS layers Process step item']";
    this.MMFormTemplates = "div[aria-label='MM form templates Process step item']";
    this.TechnicalInformationTypes = "div[aria-label='Technical information types Process step item']";
    this.MMBoards = "div[aria-label='MM boards Process step item']";
    this.GlobalActionMenus = "div[aria-label='Global action menus Process step item']";
    this.ExternalLinks = "div[aria-label='External Links Process step item']";
    this.AppKeys = "div[aria-label='App keys Process step item']";
    this.MMExternalSetups = "div[aria-label='MM External Setups Process step item']";
    this.CommonActions = "div[aria-label='Common actions Process step item']";
    this.MMTutorials = "div[aria-label='MM Tutorials Process step item']";
    this.MMTutorialSteps = "div[aria-label='MM Tutorial steps Process step item']";
  }

    async gotosystemConfiguration() {
    await this.page.waitForTimeout(3000);
    const systemConfiguration = this.page.locator(this.systemConfiguration).first();
    await systemConfiguration.waitFor({ state: 'attached', timeout: 10000 });
    await systemConfiguration.evaluate((node) => node.click());
  }

    // Navigate to sub modules
    async gotoSystemLocalization() {
     await this.page.locator(this.SystemLocalization).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SystemLocalization).click();
   }

   async gotoSystemStatistic() {
     await this.page.locator(this.SystemStatistic).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SystemStatistic).click();
   }

   async gotoSystemServices() {
     await this.page.locator(this.SystemServices).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SystemServices).click();
   }

   async gotoSystemSettings() {
     await this.page.locator(this.SystemSettings).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SystemSettings).click();
   }

   // Navigate to sub types ( Sub module : System Localization  )
   async gotoMMTranslations() {
     await this.page.locator(this.MMTranslations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMTranslations).click();
   }

   async gotoMMInternalTranslations() {
     await this.page.locator(this.MMInternalTranslations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMInternalTranslations).click();
   }

   async gotoExternalHelp() {
     await this.page.locator(this.ExternalHelp).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ExternalHelp).click();
   }

   async gotoTimeZones() {
     await this.page.locator(this.TimeZones).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TimeZones).click();
   }

   // Navigate to sub types ( Sub module : System Statistic )
   async gotoMainSummaries() {
     await this.page.locator(this.MainSummaries).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MainSummaries).click();
   }

   async gotoProductConfigurations() {
     await this.page.locator(this.ProductConfigurations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProductConfigurations).click();
   }

   async gotoReportTemplates() {
     await this.page.locator(this.ReportTemplates).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ReportTemplates).click();
   }

   async gotoSnapshots() {
     await this.page.locator(this.Snapshots).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Snapshots).click();
   }

   async gotoTemplates() {
     await this.page.locator(this.Templates).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Templates).click();
   }

   async gotoMMShortcuts() {
     await this.page.locator(this.MMShortcuts).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMShortcuts).click();
   }

   async gotoDateWarehouseViews() {
     await this.page.locator(this.DateWarehouseViews).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DateWarehouseViews).click();
   }

   // Navigate to sub types ( Sub module : System Services )
   async gotoAutomaticActions() {
     await this.page.locator(this.AutomaticActions).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AutomaticActions).click();
   }

   async gotoReminders() {
     await this.page.locator(this.Reminders).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Reminders).click();
   }

   async gotoNotificationRules() {
     await this.page.locator(this.NotificationRules).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.NotificationRules).click();
   }

   async gotoActionLogs() {
     await this.page.locator(this.ActionLogs).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ActionLogs).click();
   }

   async gotoHistoryLogs() {
     await this.page.locator(this.HistoryLogs).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.HistoryLogs).click();
   }

   async gotoMMLogs() {
     await this.page.locator(this.MMLogs).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMLogs).click();
   }

   async gotoWebServiceSettings() {
     await this.page.locator(this.WebServiceSettings).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WebServiceSettings).click();
   }

   async gotoDocumentEmailImportSetups() {
     await this.page.locator(this.DocumentEmailImportSetups).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DocumentEmailImportSetups).click();
   }

   async gotoMirrorDefinations() {
     await this.page.locator(this.MirrorDefinations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MirrorDefinations).click();
   }

   async gotoMirrorReceivingRules() {
     await this.page.locator(this.MirrorReceivingRules).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MirrorReceivingRules).click();
   }

   async gotoMirrorItems() {
     await this.page.locator(this.MirrorItems).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MirrorItems).click();
   }

   async gotoQueueImports() {
     await this.page.locator(this.QueueImports).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.QueueImports).click();
   }

   async gotoQueueExports() {
     await this.page.locator(this.QueueExports).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.QueueExports).click();
   }

   async gotoQueueItems() {
     await this.page.locator(this.QueueItems).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.QueueItems).click();
   }

   // Navigate to sub types ( Sub module : System Settings  )
   async gotoSystemSettings() {
     await this.page.locator(this.SystemSettings).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SystemSettings).click();
    }

    async gotoGISSettings() {
     await this.page.locator(this.GISSettings).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GISSettings).click();
   }

   async gotoWMSLayers() {
     await this.page.locator(this.WMSLayers).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WMSLayers).click();
   }

   async gotoMMFormTemplates() {
     await this.page.locator(this.MMFormTemplates).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMFormTemplates).click();
   }

   async gotoTechnicalInformationTypes() {
     await this.page.locator(this.TechnicalInformationTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TechnicalInformationTypes).click();
   }

   async gotoMMBoards() {
     await this.page.locator(this.MMBoards).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMBoards).click();
   }

   async gotoGlobalActionMenus() {
     await this.page.locator(this.GlobalActionMenus).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GlobalActionMenus).click();
   }

   async gotoExternalLinks() {
     await this.page.locator(this.ExternalLinks).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ExternalLinks).click();
   }

   async gotoAppKeys() {
     await this.page.locator(this.AppKeys).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AppKeys).click();
   }

   async gotoMMExternalSetups() {
     await this.page.locator(this.MMExternalSetups).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMExternalSetups).click();
   }

   async gotoCommonActions() {
     await this.page.locator(this.CommonActions).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CommonActions).click();
   }

   async gotoMMTutorials() {
     await this.page.locator(this.MMTutorials).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMTutorials).click();
   }

   async gotoMMTutorialSteps() {
     await this.page.locator(this.MMTutorialSteps).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MMTutorialSteps).click();
   }
}

module.exports = SystemConfiguration;














