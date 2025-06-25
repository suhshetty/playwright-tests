const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class HumanResources extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.humanResources = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Human resources']";

    // Sub module locators
    this.Summary = "div[aria-label='Summary Process step']";
    this.OrganisationsOverview = "div[aria-label='Organisations overview Process step']";
    this.OrganisationData = "div[aria-label='Organisation data Process step']";
    this.StakeholderManagement = "div[aria-label='Stakeholder management Process step']";
    this.PermitsandQualifications = "div[aria-label='Permits and qualifications Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Organisations Overview )
    this.BuildOrganisationTrees = "div[aria-label='Build organisation trees Process step item']";
    this.Companies = "div[aria-label='Companies Process step item']";
    this.WorkGroups = "div[aria-label='Work groups Process step item']";
    this.Employees = "div[aria-label='Employees Process step item']";
    this.PersonsUsers = "div[aria-label='Persons/users Process step item']";

    // Sub Types locators ( Sub module : Organisations Data )
    this.OrganisationReminders = "div[aria-label='Organisation reminders Process step item']";
    this.OrganisationsDocuments = "div[aria-label='Organisation documents Process step item']";
    this.OrganisationAbsences = "div[aria-label='Organisation absences Process step item']";
    this.PunchinPunchout = "div[aria-label='Punch In/Outs Process step item']";

    // Sub Types locators ( Sub module : Stakeholder Management )
    this.VendorIssues = "div[aria-label='Vendor issues Process step item']";

    // Sub Types locators ( Sub module : Permits and Qualifications )
    this.OrganisationGroups = "div[aria-label='Person permits Process step item']";
    this.Professions = "div[aria-label='Professions Process step item']";
    this.Permits = "div[aria-label='Permits Process step item']";
    this.EmployeeGroups = "div[aria-label='Employee groups Process step item']";
    this.AvailabilityProfiles = "div[aria-label='Availability profiles Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";
  }

  async clickHumanResources() {
    await this.page.waitForTimeout(3000);
    const humanResources = this.page.locator(this.humanResources).first();
    await humanResources.waitFor({ state: 'attached', timeout: 10000 });
    await humanResources.evaluate((node) => node.click());
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

  async gotoOrganisationData() {
    await this.page.locator(this.OrganisationData).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.OrganisationData).click();
  }

  async gotoStakeholderManagement() {
    await this.page.locator(this.StakeholderManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StakeholderManagement).click();
  }

  async gotoPermitsandQualifications() {
    await this.page.locator(this.PermitsandQualifications).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PermitsandQualifications).click();
  } 

  async gotoDataSetup() {
    await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  } 

    // Navigate to sub types in Organisations Overview

    async gotoBuildOrganisationTrees() {
      await this.page.locator(this.BuildOrganisationTrees).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.BuildOrganisationTrees).click();
    }

    async gotoCompanies() {
      await this.page.locator(this.Companies).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Companies).click();
    }

    async gotoWorkGroups() {
      await this.page.locator(this.WorkGroups).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkGroups).click();
    }

    async gotoEmployees() {
      await this.page.locator(this.Employees).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Employees).click();
    }

    async gotoPersonsUsers() {
      await this.page.locator(this.PersonsUsers).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PersonsUsers).click();
    }

    // Navigate to sub types in Organisations Data

    async gotoOrganisationReminders() {
      await this.page.locator(this.OrganisationReminders).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.OrganisationReminders).click();
    }

    async gotoOrganisationDocuments() {
      await this.page.locator(this.OrganisationDocuments).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.OrganisationDocuments).click();
    }

    async gotoOrganisationAbsences() {
      await this.page.locator(this.OrganisationAbsences).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.OrganisationAbsences).click();
    }

    async gotoPunchinPunchout() {
      await this.page.locator(this.PunchinPunchout).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PunchinPunchout).click();
    }

    // Navigate to sub types in Stakeholder Management
    async gotoVendorIssues() {
      await this.page.locator(this.VendorIssues).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.VendorIssues).click();
    }

    // Navigate to sub types in Permits and Qualifications
    async gotoPersonPermits() {
      await this.page.locator(this.PersonPermits).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PersonPermits).click();
    }

    //Naviagte to sub types in Data Setup
    async gotoOrganisationGroups() {
      await this.page.locator(this.OrganisationGroups).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.OrganisationGroups).click();
    }   

    async gotoProfessions() {
      await this.page.locator(this.Professions).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Professions).click();
    }

    async gotoPermits() {
      await this.page.locator(this.Permits).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Permits).click();
    }

    async gotoEmployeeGroups() {
      await this.page.locator(this.EmployeeGroups).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.EmployeeGroups).click();
    }

    async gotoAvailabilityProfiles() {
      await this.page.locator(this.AvailabilityProfiles).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AvailabilityProfiles).click();
    }   

    // Navigate to sub types in Configuration
    async gotoAccessConfiguration() {
      await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AccessConfiguration).click();
    }


}



