const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class HealthAndSafetyManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.humanResources = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Health and Safety Management']";

    // Sub module locators
    this.GeneralOverview = "div[aria-label='General overview Process step']";
    this.RepsonsibleResources = "div[aria-label='Responsible resources Process step']";
    this.TechnicalDocumentation = "div[aria-label='Technical documentation Process step']";
    this.ObjectMarking = "div[aria-label='Object marking Process step']";
    this.Activities = "div[aria-label='Activities Process step']";
    this.RequirementAndGuidelines = "div[aria-label='Requirements and guidelines Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : General Overview )
    this.GeneralInformationHSE = "div[aria-label='General overview Process step item']";

    // Sub Types locators ( Sub module : Responsible Resources )
    this.ServicePartners = "div[aria-label='General information (HSE) Process step item']";
    this.ServicePartnersManagementHSE = "div[aria-label='Service partner management (HSE) Process step item']";
    this.PersonPermitHSE = "div[aria-label='Person permit (HSE) Process step item']";

    // Sub Types locators ( Sub module : Technical Documentation)
    this.HSEDocuments = "div[aria-label='HSE documents Process step item']";
    this.HSEDocumentTree = "div[aria-label='HSE document tree Process step item']";
    this.RadonRegistration = "div[aria-label='Radon registrations Process step item']";

    // Sub Types locators ( Sub module : Object Marking )
    this.InsuranceCertificate = "div[aria-label='Insurance certificates Process step item']";

    // Sub Types locators ( Sub module : Activities )
    this.TaskManagementHSE = "div[aria-label='Task management (HSE) Process step item']";
    this.WorkOrderHSE = "div[aria-label='Work order (HSE) Process step item']";
    this.ChecklistsHSE = "div[aria-label='Checklists (HSE) Process step item']";
    this.IncidentHSE = "div[aria-label='Incident (HSE) Process step item']";

    // Sub Types locators ( Sub module : Requirements and Guidelines )
    this.LinksToLawsAndRegulation = "div[aria-label='Links to laws and regulations Process step item']";
    this.InstructionsAndGuidelines = "div[aria-label='Instructions and guidelines Process step item']";
    this.LocalRegulations = "div[aria-label='Local regulations Process step item']";
    
    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

    }

    async clickHealthAndSafetyManagement() {
        await this.page.waitForTimeout(3000);
        const HealthAndSafetyManagement = this.page.locator(this.HealthAndSafetyManagement).first();
        await HealthAndSafetyManagement.waitFor({ state: 'attached', timeout: 10000 });
        await HealthAndSafetyManagement.evaluate((node) => node.click());
    }

    // Navigate to sub modules
    async gotoGeneralOverview() {
        await this.page.locator(this.GeneralOverview).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.GeneralOverview).click();
    }

    async gotoResponsibleResources() {
        await this.page.locator(this.RepsonsibleResources).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.RepsonsibleResources).click();
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

    async gotoRequirementAndGuidelines() {
        await this.page.locator(this.RequirementAndGuidelines).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.RequirementAndGuidelines).click();
    }

    async gotoConfiguration() {
        await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.Configuration).click();
    }

    // Navigate to sub types in General Overview
    async gotoGeneralInformationHSE() {
        await this.page.locator(this.GeneralInformationHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.GeneralInformationHSE).click();
    }

    // Navigate to sub types in Responsible Resources
    async gotoServicePartners() {
        await this.page.locator(this.ServicePartners).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.ServicePartners).click();
    }

    async gotoServicePartnersManagementHSE() {
        await this.page.locator(this.ServicePartnersManagementHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.ServicePartnersManagementHSE).click();
    }

    async gotoPersonPermitHSE() {
        await this.page.locator(this.PersonPermitHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.PersonPermitHSE).click();
    }

    // Navigate to sub types in Technical Documentation
    async gotoHSEDocuments() {
        await this.page.locator(this.HSEDocuments).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.HSEDocuments).click();
    }

    async gotoHSEDocumentTree() {
        await this.page.locator(this.HSEDocumentTree).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.HSEDocumentTree).click();
    }

    async gotoRadonRegistration() {
        await this.page.locator(this.RadonRegistration).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.RadonRegistration).click();
    }

    // Navigate to sub types in Object Marking
    async gotoInsuranceCertificate() {
        await this.page.locator(this.InsuranceCertificate).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.InsuranceCertificate).click();
    }

    // Navigate to sub types in Activities
    async gotoTaskManagementHSE() {
        await this.page.locator(this.TaskManagementHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.TaskManagementHSE).click();
    }   

    async gotoWorkOrderHSE() {
        await this.page.locator(this.WorkOrderHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.WorkOrderHSE).click();
    }   

    async gotoChecklistsHSE() {
        await this.page.locator(this.ChecklistsHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.ChecklistsHSE).click();
    }

    async gotoIncidentHSE() {
        await this.page.locator(this.IncidentHSE).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.IncidentHSE).click();
    }

    // Navigate to sub types in Requirements and Guidelines
    async gotoLinksToLawsAndRegulation() {
        await this.page.locator(this.LinksToLawsAndRegulation).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.LinksToLawsAndRegulation).click();
    }

    async gotoInstructionsAndGuidelines() {
        await this.page.locator(this.InstructionsAndGuidelines).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.InstructionsAndGuidelines).click();
    }

    async gotoLocalRegulations() {
        await this.page.locator(this.LocalRegulations).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.LocalRegulations).click();
    }

    // Navigate to sub  types in Configuration
    async gotoAccessConfiguration() {
        await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.AccessConfiguration).click();
    }

}









    


