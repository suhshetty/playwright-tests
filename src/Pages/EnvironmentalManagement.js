const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class EnvironmentalManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.environmentalManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Environmental management']";

    // Sub module locators
    this.GeneralOverview = "div[aria-label='General overview Process step']";
    this.ResponsibleResources = "div[aria-label='Responsible resources Process step']";
    this.TechnicalDocumentation = "div[aria-label='Technical documentation Process step']";
    this.ObjectMarking = "div[aria-label='Object marking Process step']";
    this.Activities = "div[aria-label='Activities Process step']";
    this.RequirementandGuidelines = "div[aria-label='Requirements and guidelines Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Genral Overview )
    this.GenralInformation = "div[aria-label='General information (Environment) Process step item']";

    // Sub Types locators ( Sub module : Responsible Resources )
    this.ServicePartners = "div[aria-label='Service partners Process step item']";
    this.ServicePartnerManagement = "div[aria-label='Service partner management (Environment) Process step item']";
    this.PersonPermit = "div[aria-label='Person permit (Environment) Process step item']";

    // Sub Types locators ( Sub module : Technical Documentation )
    this.EnvironmentDocuments = "div[aria-label='Environment documents Process step item']";
    this.EnvironmentDocumentTree = "div[aria-label='Environment document tree Process step item']";
    this.EnvironmentalGoals = "div[aria-label='Environmental goals Process step item']";
    this.RandomRegistrations = "div[aria-label='Radon registrations Process step item']";

    // Sub Types locators ( Sub module : Object Marking )
    this.TechnicalSystem = "div[aria-label='Technical system (Environment) Process step item']";
    this.CCSTechnicalSystem = "div[aria-label='CCS Technical system (Environment) Process step item']";
    this.ThemeMarkings = "div[aria-label='Theme markings Process step item']";

    // Sub Types locators ( Sub module : Activities )
    this.TaskManagement = "div[aria-label='Task management (Environment) Process step item']";
    this.WorkOrder = "div[aria-label='Work order (Environment) Process step item']";
    this.Incident = "div[aria-label='Incident (Environment) Process step item']";

    // Sub Types locators ( Sub module : Requirements and Guidelines )
    this.LinksToLawsRegulations = "div[aria-label='Links to laws and regulations Process step item']";
    this.InstructionsAndGuidelines = "div[aria-label='Instructions and guidelines Process step item']";
    this.LocalRegulations = "div[aria-label='Local regulations Process step item']";

    // Sub Types locators ( Sub module : Data Setup )
    this.DocumentTypes = "div[aria-label='Document types Process step item']";
    this.ServiceTypes = "div[aria-label='Service types Process step item']";
    this.Permit = "div[aria-label='Permit (Environment) Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";
  }

  async gotoEnvironmentalManagement() {
    await this.page.waitForTimeout(3000);
    const environmentalManagement = this.page.locator(this.environmentalManagement).first();
    await environmentalManagement.waitFor({ state: 'attached', timeout: 10000 });
    await environmentalManagement.evaluate((node) => node.click());
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

   async gotoRequirementandGuidelines() {
     await this.page.locator(this.RequirementandGuidelines).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.RequirementandGuidelines).click();
   }

   async gotoDataSetup() {
     await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DataSetup).click();
   }

   async gotoConfiguration() {
     await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Configuration).click();
   }

   // Navigate to sub types ( Sub module : General Overview )
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

   async gotoRequirementandGuidelines() {
     await this.page.locator(this.RequirementandGuidelines).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.RequirementandGuidelines).click();
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

   // Navigate to sub types ( Sub module : Responsible Resources )
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

   // Navigate to sub types ( Sub module : Technical Documentation )

   async gotoEnvironmentDocuments() {
     await this.page.locator(this.EnvironmentDocuments).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.EnvironmentDocuments).click();
   }

   async gotoEnvironmentDocumentTree() {
     await this.page.locator(this.EnvironmentDocumentTree).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.EnvironmentDocumentTree).click();
   }

   async gotoEnvironmentalGoals() {
     await this.page.locator(this.EnvironmentalGoals).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.EnvironmentalGoals).click();
   }

   async gotoRandomRegistrations() {
     await this.page.locator(this.RandomRegistrations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.RandomRegistrations).click();
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

   async gotoThemeMarkings() {
     await this.page.locator(this.ThemeMarkings).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ThemeMarkings).click();
   }

   // Navigate to sub types ( Sub module : Activities  )

   async gotoTaskManagement() {
     await this.page.locator(this.TaskManagement).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TaskManagement).click();
   }

   async gotoWorkOrder() {
     await this.page.locator(this.WorkOrder).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WorkOrder).click();
   }

   async gotoIncident() {
     await this.page.locator(this.Incident).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Incident).click();
   }

   // Navigate to sub types ( Sub module : Requirements and Guidelines )
   async gotoLinksToLawsRegulations() {
     await this.page.locator(this.LinksToLawsRegulations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LinksToLawsRegulations).click();
   }

   async gotoInstructionsAndGuidelines() {
     await this.page.locator(this.InstructionsAndGuidelines).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.InstructionsAndGuidelines).click();
   }

   async gotoLocalRegulations() {
     await this.page.locator(this.LocalRegulations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LocalRegulations).click();
   }

   // Navigate to sub types ( Sub module : Data Setup  )
   async gotoDocumentTypes() {
     await this.page.locator(this.DocumentTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DocumentTypes).click();
   }

   async gotoServiceTypes() {
     await this.page.locator(this.ServiceTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServiceTypes).click();
   }

   async gotoPermit() {
     await this.page.locator(this.Permit).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Permit).click();
   }

   // Navigate to sub types ( Sub module : Configuration )
   async gotoAccessConfigurations() {
     await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AccessConfigurations).click();
   }
}

module.exports = EnvironmentalManagement;

























