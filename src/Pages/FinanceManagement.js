const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');



class FinanceManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.financeManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Finance management']";

    // Sub module locators
    this.InvoiceTransactions = "div[aria-label='Invoices and transactions Process step']";
    this.BudgetFramesOverview = "div[aria-label='Budget frames overview Process step']";
    this.MainBudgetFrames = "div[aria-label='Main budget frames Process step']";
    this.FixedAssetsDepreciations = "div[aria-label='Fixed assets and depreciations Process step']";
    this.InternOrganisationsCreditors = "div[aria-label='Intern organisation and creditors Process step']";
    this.FinanceDimensions = "div[aria-label='Finance dimensions Process step']";
    this.FinanceAdministrationSettings = "div[aria-label='Finance administration settings Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Invoice Transactions)
    this.ElectronicInvoices = "div[aria-label='Electronic invoices Process step item']";
    this.WorkOrderCosts = "div[aria-label='Work order costs Process step item']";
    this.TimeRegistration = "div[aria-label='Time registration Process step item']";
    this.WorkOrderMaterials = "div[aria-label='Work order materials Process step item']";
    this.LeaseContractPaymentItems = "div[aria-label='Lease contract payment items Process step item']";
    this.PurchaseContractPaymentItems = "div[aria-label='Purchase contract payment items Process step item']";
    this.ServiceContractPaymentItems = "div[aria-label='Service contract payment items Process step item']";
    this.Transactions = "div[aria-label='Transactions Process step item']";
    this.TransactionCorrections = "div[aria-label='Transaction corrections Process step item']";

    // Sub Types locators ( Sub module : Invoice Transactions)
    this.BudgetFrames = "div[aria-label='Budget frames Process step item']";
    this.BudgetFrameYears = "div[aria-label='Budget frame years Process step item']";
    this.WorkOrders = "div[aria-label='Work orders Process step item']";

    // Sub Types locators ( Sub module : Main Budget Frames)
    this.BudgetForTargetAreas = "div[aria-label='Budget for target areas Process step item']";
    this.BudgetFilloutForTargetAreas = "div[aria-label='Budget Fillout For Target Areas Process step item']";
    this.BudgetForRegions = "div[aria-label='Budget for regions Process step item']";
    this.BudgetFilloutsForRegions = "div[aria-label='Budget fillout for regions Process step item']";
    this.BudgetForPortfolios = "div[aria-label='Budget for portfolios Process step item']";
    this.BudgetFilloutForPortfolios = "div[aria-label='Budget fillout for portfolios Process step item']";
    this.BudgetForObjects = "div[aria-label='Budget for objects Process step item']";
    this.BudgetFilloutForObjects = "div[aria-label='Budget fillout for objects Process step item']";
    this.AnnualMaintenanceBudgets = "div[aria-label='Annual maintenance budgets Process step item']";
    this.Funding = "div[aria-label='Fundings Process step item']";
    this.TargetAreas = "div[aria-label='Target areas Process step item']";

    // Sub Types locators ( Sub module : Fixed Assets and Depreciations)
    this.FixedAssets = "div[aria-label='Fixed assets Process step item']";
    this.FixedAssetGroups = "div[aria-label='Fixed asset groups Process step item']";
    this.FixedAssetSubGroups = "div[aria-label='Fixed asset subgroups Process step item']";

    // Sub Types locators ( Sub module : Intern Organisation and Creditors)
    this.Companies = "div[aria-label='Companies Process step item']";
    this.Departments = "div[aria-label='Departments Process step item']";
    this.Divisions = "div[aria-label='Divisions Process step item']";
    this.Branches = "div[aria-label='Branches Process step item']";

    // Sub Types locators ( Sub module : Finance Dimensions)
    this.Accounts = "div[aria-label='Accounts Process step item']";
    this.AccountSections = "div[aria-label='Account sections Process step item']";
    this.AccountActivities = "div[aria-label='Account activities Process step item']";
    this.AccountKeys = "div[aria-label='Account keys Process step item']";
    this.FinanceSubjects = "div[aria-label='Finance subjects Process step item']";
    this.CostCenters = "div[aria-label='Cost centers Process step item']";
    this.FinanceSections = "div[aria-label='Finance sections Process step item']";
    this.Purposes = "div[aria-label='Purposes Process step item']";
    this.FinanceProjects = "div[aria-label='Finance projects Process step item']";
    this.Products = "div[aria-label='Products Process step item']";
    this.FinanceDataSets = "div[aria-label='Finance data sets Process step item']";

    // Sub Types locators ( Sub module : Finance Administration Settings)
    this.ConfigureFinanceSettings = "div[aria-label='Configure finance settings Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";
  }

    async gotoFinanceManagement() {
      await this.page.waitForTimeout(3000);
      const financeManagement = this.page.locator(this.financeManagement).first();
      await financeManagement.waitFor({ state: 'attached', timeout: 10000 });
      await financeManagement.evaluate((node) => node.click());
    }

      // Navigate to sub modules
    async gotoInvoiceTransactions() {
       await this.page.locator(this.InvoiceTransactions).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.InvoiceTransactions).click();
    }

    async gotoBudgetFramesOverview() {
       await this.page.locator(this.BudgetFramesOverview).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFramesOverview).click();
    }

    async gotoMainBudgetFrames() {
       await this.page.locator(this.MainBudgetFrames).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.MainBudgetFrames).click();
    }

    async gotoFixedAssetsDepreciations() {
       await this.page.locator(this.FixedAssets).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FixedAssets).click();
    }   

    async gotoInternOrganisationAndCreditors() {
       await this.page.locator(this.Companies).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Companies).click();
    }   

    async gotoFinanceDimensions() {
       await this.page.locator(this.Accounts).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Accounts).click();
    }   

    async gotoFinanceAdministrationSettings() {
       await this.page.locator(this.ConfigureFinanceSettings).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.ConfigureFinanceSettings).click();
    }   

    async gotoConfiguration() { 
       await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AccessConfigurations).click();
    }

    // Sub Types locators ( Sub module : Invoice Transactions )
    async gotoElectronicInvoices() {
       await this.page.locator(this.ElectronicInvoices).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.ElectronicInvoices).click();
    }

    async gotoWorkOrderCosts() {
       await this.page.locator(this.WorkOrderCosts).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.WorkOrderCosts).click();
    }

    async gotoTimeRegistration() {
       await this.page.locator(this.TimeRegistration).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.TimeRegistration).click();
    }

    async gotoWorkOrderMaterials() {
       await this.page.locator(this.WorkOrderMaterials).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.WorkOrderMaterials).click();
    }

    async gotoLeaseContractPaymentItems() {
       await this.page.locator(this.LeaseContractPaymentItems).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.LeaseContractPaymentItems).click();
    }

    async gotoPurchaseContractPaymentItems() {
       await this.page.locator(this.PurchaseContractPaymentItems).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.PurchaseContractPaymentItems).click();
    }   

    async gotoServiceContractPaymentItems() {
       await this.page.locator(this.ServiceContractPaymentItems).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.ServiceContractPaymentItems).click();
    }   

    async gotoTransactions() {
       await this.page.locator(this.Transactions).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Transactions).click();
    }

    async gotoTransactionCorrections() {
       await this.page.locator(this.TransactionCorrections).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.TransactionCorrections).click();
    }   

    // Navigate to sub types ( Sub module : Budget Frames Overview)
    async gotoBudgetFrames() {
       await this.page.locator(this.BudgetFrames).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFrames).click();
    }

    async gotoBudgetFrameYears() {
       await this.page.locator(this.BudgetFrameYears).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFrameYears).click();
    }

    async gotoWorkOrders() {
       await this.page.locator(this.WorkOrders).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.WorkOrders).click();
    }

    // Navigate to sub types ( Sub module : Main Budget Frames)
    async gotoBudgetTargetAreas() {
       await this.page.locator(this.BudgetTargetAreas).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetTargetAreas).click();
    }

    async gotoBudgetFilloutTargetAreas() {
       await this.page.locator(this.BudgetFilloutTargetAreas).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFilloutTargetAreas).click();
    }

    async gotoBudgetForRegions() {
       await this.page.locator(this.BudgetForRegions).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetForRegions).click();
    }

    async gotoBudgetFilloutsForRegions() {
       await this.page.locator(this.BudgetFilloutsForRegions).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFilloutsForRegions).click();
    }

    async gotoBudgetForPortfolios() {
       await this.page.locator(this.BudgetForPortfolios).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetForPortfolios).click();
    }

    async gotoBudgetFilloutForPortfolios() {
       await this.page.locator(this.BudgetFilloutForPortfolios).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFilloutForPortfolios).click();
    }

    async gotoBudgetFilloutsForPortfolios() {
       await this.page.locator(this.BudgetFilloutsForPortfolios).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFilloutsForPortfolios).click();
    }

    async gotoBudgetForObjects() {
       await this.page.locator(this.BudgetForObjects).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetForObjects).click();
    }

    async gotoBudgetFilloutForObjects() {
       await this.page.locator(this.BudgetFilloutForObjects).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BudgetFilloutForObjects).click();
    }

    async gotoAnnualMaintenanceBudgets() {
       await this.page.locator(this.AnnualMaintenanceBudgets).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AnnualMaintenanceBudgets).click();
    }

    async gotoFundings() {
       await this.page.locator(this.Funding).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Funding).click();
    }

    async gotoTargetAreas() {
       await this.page.locator(this.TargetAreas).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.TargetAreas).click();
    }

    // Navigate to sub types ( Sub module : Fixed Assets and Depreciations)
    async gotoFixedAssets() {
       await this.page.locator(this.FixedAssets).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FixedAssets).click();
    }

    async gotoFixedAssetGroups() {
       await this.page.locator(this.FixedAssetGroups).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FixedAssetGroups).click();
    }

    async gotoFixedAssetSubGroups() {
       await this.page.locator(this.FixedAssetSubGroups).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FixedAssetSubGroups).click();
    }

    // Navigate to sub types ( Sub module : Intern Organisation and Creditors)
    async gotoCompanies() {
       await this.page.locator(this.Companies).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Companies).click();
    }

    async gotoDepartments() {
       await this.page.locator(this.Departments).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Departments).click();
    }

    async gotoDivisions() {
       await this.page.locator(this.Divisions).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Divisions).click();
    }

    async gotoBranches() {
       await this.page.locator(this.Branches).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Branches).click();
    }

    // Navigate to sub types ( Sub module : Finance Dimensions)
    async gotoAccounts() {
       await this.page.locator(this.Accounts).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Accounts).click();
    }

    async gotoAccountSections() {
       await this.page.locator(this.AccountSections).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AccountSections).click();
    }

    async gotoAccountActivities() {
       await this.page.locator(this.AccountActivities).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AccountActivities).click();
    }

    async gotoAccountKeys() {
       await this.page.locator(this.AccountKeys).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AccountKeys).click();
    }

    async gotoFinanceSubjects() {
       await this.page.locator(this.FinanceSubjects).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FinanceSubjects).click();
    }

    async gotoCostCenters() {
       await this.page.locator(this.CostCenters).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CostCenters).click();
    }

    async gotoFinanceSections() {
       await this.page.locator(this.FinanceSections).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FinanceSections).click();
    }

    async gotoPurposes() {
       await this.page.locator(this.Purposes).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Purposes).click();
    }

    async gotoFinanceProjects() {
       await this.page.locator(this.FinanceProjects).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FinanceProjects).click();
    }

    async gotoProducts() {
       await this.page.locator(this.Products).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Products).click();
    }

    async gotoFinanceDataSets() {
       await this.page.locator(this.FinanceDataSets).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.FinanceDataSets).click();
    }

    // Navigate to sub types ( Sub module : Finance Administration Settings)
    async gotoConfigureFinanceSettings() {
       await this.page.locator(this.ConfigureFinanceSettings).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.ConfigureFinanceSettings).click();
    }

    // Navigate to sub types ( Sub module : Configuration)
    async gotoAccessConfigurations() {
       await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AccessConfigurations).click();
    }
}

module.exports = FinanceManagement;











