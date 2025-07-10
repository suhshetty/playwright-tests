const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class UniversalDesign extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.environmentalManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Universal design']";

    // Sub module locators
    this.GeneralOverview = "div[aria-label='General overview Process step']";
    this.ResponsibleResources = "div[aria-label='Responsible resources Process step']";
    this.TechnicalDocumentation = "div[aria-label='Technical documentation Process step']";
    this.ObjectMarking = "div[aria-label='Object marking Process step']";
    this.Activities = "div[aria-label='Activities Process step']";
    this.RequirementsandGuidelines = "div[aria-label='Requirements and guidelines Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Genral Overview )
    this.GenralInformation = "div[aria-label='General information (Universal Design) Process step item']";

    // Sub Types locators ( Sub module : Responsible Resources )
    this.ServicePartners = "div[aria-label='Service partners Process step item']";
    this.ServicePartnerManagement = "div[aria-label='Service partner management (Universal Design) Process step item']";
    this.PersonPermit = "div[aria-label='Person permit (Universal Design) Process step item']";

    // Sub Types locators ( Sub module : Technical Documentation )
    this.UniversalDesignDocuments = "div[aria-label='Universal Design documents Process step item']";
    this.UniversalDesignDocumentTypes = "div[aria-label='Universal design document tree Process step item']";

    // Sub Types locators ( Sub module : Object Marking )
    this.TechnicalSystem = "div[aria-label='Technical system (Uni=versal Design) Process step item']";
    this.CCSTechnicalSystem = "div[aria-label='CCS Technical system (Universal Design) Process step item']";
    this.ThemeMarking = "div[aria-label='Theme markings Process step item']";

    // Sub Types locators ( Sub module : Activities )
    this.TaskManagementUniversalDesign = "div[aria-label='Task management (Universal Design) Process step item']";
    this.WorkOrderUniversalDesign = "div[aria-label='Work order (Universal Design) Process step item']";
    this.IncidentUniversalDesign = "div[aria-label='Incident (Universal Design) Process step item']";

    // Sub Types locators ( Sub module : Requirements and Guidelines )
    this.LinksToLawsandRegulations = "div[aria-label='Links to laws and regulations Process step item']";
    this.InstructionsandGuidelines = "div[aria-label='Instructions and guidelines Process step item']";
    this.LocalRegulations = "div[aria-label='Local regulations Process step item']";

    // Sub Types locators ( Sub module : Data Setup )
    this.DocumentTypes = "div[aria-label='Document types Process step item']";
    this.ServiceTypes = "div[aria-label='Service types Process step item']";
    this.PermitUniversalDesign = "div[aria-label='Permit (Universal Design) Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";
  }

  async gotoUniversalDesign() {
    await this.page.waitForTimeout(3000);
    const universalDesign = this.page.locator(this.universalDesign).first();
    await universalDesign.waitFor({ state: 'attached', timeout: 10000 });
    await universalDesign.evaluate((node) => node.click());
  }

  // Navigate to sub modules
   async gotoGeneralOverview() {
     await this.page.locator(this.GeneralOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GeneralOverview).click();
   }

   async gotoResponsibleResources() {
     await this.page.locator(this.ResponsibleResources).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ResponsibleResources).click();
   }

    async gotoTechnicalDocumentation() {
      await this.page.locator(this.TechnicalDocumentation).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TechnicalDocumentation).click();
    }

    async gotoObjectMarking() {
      await this.page.locator(this.ObjectMarking).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ObjectMarking).click();
    }

    async gotoActivities() {
      await this.page.locator(this.Activities).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Activities).click();
    }

    async gotoRequirementsandGuidelines() {
      await this.page.locator(this.RequirementsandGuidelines).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.RequirementsandGuidelines).click();
    }

    async gotoDataSetup() {
      await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.DataSetup).click();
    }

    async gotoConfiguration() {
      await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Configuration).click();
    }

    // Navigate to sub types ( Sub module : Genral Overview  )
    async gotoGeneralInformation() {
      await this.page.locator(this.GenralInformation).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.GenralInformation).click();
    }

    // Navigate to sub types ( Sub module : Responsible Resources  )
    async gotoServicePartners() {
      await this.page.locator(this.ServicePartners).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ServicePartners).click();
    }

    async gotoServicePartnerManagement() {
      await this.page.locator(this.ServicePartnerManagement).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ServicePartnerManagement).click();
    }

    async gotoPersonPermit() {
      await this.page.locator(this.PersonPermit).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PersonPermit).click();
    }

    // Navigate to sub types ( Sub module : Technical Documentation  )
    async gotoUniversalDesignDocuments() {
      await this.page.locator(this.UniversalDesignDocuments).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.UniversalDesignDocuments).click();
    }

    async gotoUniversalDesignDocumentTypes() {
      await this.page.locator(this.UniversalDesignDocumentTypes).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.UniversalDesignDocumentTypes).click();
    }

    // Navigate to sub types ( Sub module : Object Marking  )
    async gotoTechnicalSystem() {
      await this.page.locator(this.TechnicalSystem).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TechnicalSystem).click();
    }

    async gotoCCSTechnicalSystem() {
      await this.page.locator(this.CCSTechnicalSystem).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.CCSTechnicalSystem).click();
    }

    async gotoThemeMarking() {
      await this.page.locator(this.ThemeMarking).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ThemeMarking).click();
    }

    // Navigate to sub types ( Sub module : Activities )
    async gotoTaskManagementUniversalDesign() {
      await this.page.locator(this.TaskManagementUniversalDesign).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TaskManagementUniversalDesign).click();
    }

    async gotoWorkOrderUniversalDesign() {
      await this.page.locator(this.WorkOrderUniversalDesign).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkOrderUniversalDesign).click();
    }

    async gotoIncidentUniversalDesign() {
      await this.page.locator(this.IncidentUniversalDesign).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.IncidentUniversalDesign).click();
    }

    // Navigate to sub types ( Sub module : Requirements and Guidelines )
    async gotoLinksToLawsandRegulations() {
      await this.page.locator(this.LinksToLawsandRegulations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.LinksToLawsandRegulations).click();
    }

    async gotoInstructionsandGuidelines() {
      await this.page.locator(this.InstructionsandGuidelines).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.InstructionsandGuidelines).click();
    }  

    async gotoLocalRegulations() {
      await this.page.locator(this.LocalRegulations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.LocalRegulations).click();
    }

    // Navigate to sub types ( Sub module : Data Setup )
    async gotoDocumentTypes() {
      await this.page.locator(this.DocumentTypes).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.DocumentTypes).click();
    }

    async gotoServiceTypes() {
      await this.page.locator(this.ServiceTypes).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ServiceTypes).click();
    }

    async gotoPermitUniversalDesign() {
      await this.page.locator(this.PermitUniversalDesign).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PermitUniversalDesign).click();
    }

    // Navigate to sub types ( Sub module : Configuration )
    async gotoAccessConfigurations() {
      await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AccessConfigurations).click();
    }
}

module.exports = UniversalDesign;










