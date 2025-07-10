const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class AccessManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.environmentalManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Access management']";

    // Sub module locators
    this.Summary = "div[aria-label='// Sub module locators']";
    this.OrganisationsOverview = "div[aria-label='Organisations overview Process step']";
    this.PortfolioAccess = "div[aria-label='Portfolio access Process step']";
    this.UserRoleAdministration = "div[aria-label='User role administration Process step']";
    this.MainModuleSelection = "div[aria-label='Main module selection Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Navigate to sub types ( Sub module : Organisations Overview )
    this.BuildOrganisationTrees = "div[aria-label='Build organisation trees Process step item']";
    this.Companies = "div[aria-label='Companies Process step item']";
    this.Departments = "div[aria-label='Departments Process step item']";
    this.Divisions = "div[aria-label='Divisions Process step item']";
    this.Branches = "div[aria-label='Branches Process step item']";
    this.BranchSections = "div[aria-label='Branch sections Process step item']";
    this.BranchSubSections = "div[aria-label='Branch subsections Process step item']";
    this.WorkGroups = "div[aria-label='Work groups Process step item']";
    this.Employees = "div[aria-label='Employees Process step item']";
    this.DataAccessAdministration = "div[aria-label='Data access administration Process step item']";
    this.MergeOrganisations = "div[aria-label='Merge organisations Process step item']";

    // Navigate to sub types ( Sub module : Portfolio Access )
    this.PortfolioManagement = "div[aria-label='Portfolio management Process step item']";
    this.MainGroupAccesses = "div[aria-label='Main group accesses Process step item']";
    this.SiteAccesses = "div[aria-label='Site accesses Process step item']";
    this.Portfolios = "div[aria-label='Portfolios Process step item']";

    // Navigate to sub types ( Sub module : User Role Administration )
    this.PersonsUsers = "div[aria-label='Persons/users Process step item']";
    this.PersonandUserRoles = "div[aria-label='Persons and user roles Process step item']";
    this.UserRoles = "div[aria-label='User roles Process step item']";
    this.AppSetups = "div[aria-label='App setups Process step item']";

    // Navigate to sub types ( Sub module : Main module selection )
    this.DataTable = "div[aria-label='Data tables Process step item']";
    this.MainModules = "div[aria-label='Main modules Process step item']";
    this.MainModuleItems = "div[aria-label='Main module items Process step item']";
    this.MainModuleAccesses = "div[aria-label='Main module accesses Process step item']";
    this.MainModuleItemAccesses = "div[aria-label='Main module item accesses Process step item']";
    this.MMProcessIncluded = "div[aria-label='MM process includeds Process step item']";

    // Navigate to sub types ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";
  }

  async gotoAccessManagement() {
    await this.page.waitForTimeout(3000);
    const accessManagement = this.page.locator(this.environmentalManagement).first();
    await accessManagement.waitFor({ state: 'attached', timeout: 10000 });
    await accessManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
   async gotoSummary() {
     await this.page.locator(this.Summary).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Summary).click();
   }

   async gotoOrganisationsOverview() {
     await this.page.locator(this.OrganisationsOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.OrganisationsOverview).click();
    }

    async gotoPortfolioAccess() {
      await this.page.locator(this.PortfolioAccess).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PortfolioAccess).click();
    }

    async gotoUserRoleAdministration() {
      await this.page.locator(this.UserRoleAdministration).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.UserRoleAdministration).click();
    }

    async gotoMainModuleSelection() {
      await this.page.locator(this.MainModuleSelection).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MainModuleSelection).click();
    }

    async gotoConfiguration() {
      await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Configuration).click();
    }

    // Navigate to sub types ( Sub module : Organisations Overview )
    async gotoBuildOrganisationTrees() {
      await this.page.locator(this.BuildOrganisationTrees).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.BuildOrganisationTrees).click();
    }

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

    async gotoBranchSections() {
      await this.page.locator(this.BranchSections).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.BranchSections).click();
    }

    async gotoBranchSubSections() {
      await this.page.locator(this.BranchSubSections).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.BranchSubSections).click();
    }

    async gotoWorkGroups() {
      await this.page.locator(this.WorkGroups).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkGroups).click();
    }

    async gotoEmployees() {
      await this.page.locator(this.Employees).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Employees).click();
    }

    async gotoDataAccessAdministration() {
      await this.page.locator(this.DataAccessAdministration).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.DataAccessAdministration).click();
    }

    async gotoMergeOrganisations() {
      await this.page.locator(this.MergeOrganisations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MergeOrganisations).click();
    }


    // Navigate to sub types ( Sub module : Portfolio Access)
    async gotoPortfolioManagement() {
      await this.page.locator(this.PortfolioManagement).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PortfolioManagement).click();
    }

    async gotoMainGroupAccesses() {
      await this.page.locator(this.MainGroupAccesses).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MainGroupAccesses).click();
    }

    async gotoSiteAccesses() {
      await this.page.locator(this.SiteAccesses).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.SiteAccesses).click();
    }

    async gotoPortfolios() {
      await this.page.locator(this.Portfolios).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Portfolios).click();
    }

    // Navigate to sub types ( Sub module : User Role Administration)
    async gotoPersonsUsers() {
      await this.page.locator(this.PersonsUsers).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PersonsUsers).click();
    }

    async gotoPersonandUserRoles() {
      await this.page.locator(this.PersonandUserRoles).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PersonandUserRoles).click();
    }

    async gotoUserRoles() {
      await this.page.locator(this.UserRoles).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.UserRoles).click();
    }

    async gotoAppSetups() {
      await this.page.locator(this.AppSetups).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AppSetups).click();
    }

    // Navigate to sub types ( Sub module : Main module selection )
    async gotoDataTable() {
      await this.page.locator(this.DataTable).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.DataTable).click();
    }

    async gotoMainModules() {
      await this.page.locator(this.MainModules).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MainModules).click();
    }

    async gotoMainModuleItems() {
      await this.page.locator(this.MainModuleItems).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MainModuleItems).click();
    }

    async gotoMainModuleAccesses() {
      await this.page.locator(this.MainModuleAccesses).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MainModuleAccesses).click();
    }

    async gotoMainModuleItemAccesses() {
      await this.page.locator(this.MainModuleItemAccesses).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MainModuleItemAccesses).click();
    }

    async gotoMMProcessIncluded() {
      await this.page.locator(this.MMProcessIncluded).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.MMProcessIncluded).click();
    }

    // Navigate to sub types ( Sub module : Configuration )
    async gotoAccessConfigurations() {
      await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AccessConfigurations).click();
    }
}

module.exports = AccessManagement;








