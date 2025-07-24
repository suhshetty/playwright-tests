const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class CulturalValueManagement extends BasePage {
  constructor(page) {
    super(page);

    // Module locator
    this.CulturalValueManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Cultural value management']";

    // Sub module locators
    this.GeneralOverview = "div[aria-label='General overview Process step']";
    this.ResponsibleResources = "div[aria-label='Responsible resources Process step']";
    this.TechnicalDocumentation = "div[aria-label='Technical documentation Process step']";
    this.ObjectMarking = "div[aria-label='Object marking Process step']";
    this.Activities = "div[aria-label='Activities Process step']";
    this.RequirementAndGuidelines = "div[aria-label='Requirements and guidelines Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators (Sub module: General Overview)
    this.GeneralInformationCulturalValue = "div[aria-label='General information (cultural value) Process step item']";

    // Sub Types locators (Sub module: Responsible Resources)
    this.ServicePartners = "div[aria-label='Service partners Process step item']";
    this.ServicePartnersManagementCulturalValue = "div[aria-label='Service partner management (cultural value) Process step item']";
    this.PersonPermitCulturalValue = "div[aria-label='Person permit (cultural value) Process step item']";

    // Sub Types locators (Sub module: Technical Documentation)
    this.CulturalValueDocuments = "div[aria-label='Cultural value documents Process step item']";
    this.CulturalValueDocumentTree = "div[aria-label='Cultural value document tree Process step item']";

    // Sub Types locators (Sub module: Object Marking)
    this.TechnicalSystemCulturalValue = "div[aria-label='Technical system (Cultural value) Process step item']";
    this.CCSTechnicalSystemCulturalValue = "div[aria-label='CCS Technical system (cultural value) Process step item']";
    this.ThemeMarking = "div[aria-label='Theme markings Process step item']";

    // Sub Types locators (Sub module: Activities)
    this.TaskManagementCulturalValue = "div[aria-label='Task management (cultural value) Process step item']";
    this.WorkOrderCulturalValue = "div[aria-label='Work order (cultural value) Process step item']";
    this.IncidentCulturalValue = "div[aria-label='Incident (cultural value) Process step item']";

    // Sub Types locators (Sub module: Requirements and Guidelines)
    this.LinksToLawsAndRegulation = "div[aria-label='Links to laws and regulations Process step item']";
    this.InstructionsAndGuidelines = "div[aria-label='Instructions and guidelines Process step item']";
    this.LocalRegulations = "div[aria-label='Local regulations Process step item']";

    // Sub Types locators (Sub module: Data Setup)
    this.DocumentTypes = "div[aria-label='Document types Process step item']";
    this.ServiceTypes = "div[aria-label='Service types Process step item']";
    this.PermitCulturalValue = "div[aria-label='Permit (cultural value) Process step item']";

    // Sub Types locators (Sub module: Configuration)
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";
  }

  async clickCulturalValueManagement() {
    await this.page.waitForTimeout(3000);

    try {
      const allElements = this.page.locator(this.CulturalValueManagement);
      const count = await allElements.count();

      // Try to click a visible element
      for (let i = 0; i < count; i++) {
        const element = allElements.nth(i);
        const isVisible = await element.isVisible();

        if (isVisible) {
          try {
            await element.scrollIntoViewIfNeeded();
            await element.click({ force: true, timeout: 5000 });
            return; // Success, exit method
          } catch (error) {
            // If regular click fails, try JavaScript click
            await element.evaluate((node) => node.click());
            return; // Success, exit method
          }
        }
      }

      // If no visible element found, try first element with JavaScript
      if (count > 0) {
        await allElements.first().evaluate((node) => node.click());
      }

    } catch (error) {
      console.error('Cultural Value Management click failed:', error.message);
      throw error;
    }

    await this.page.waitForTimeout(3000);
  }

  // Navigate to sub modules
  async gotoGeneralOverview() {
    await this.page.locator(this.GeneralOverview).scrollIntoViewIfNeeded();
    await this.page.locator(this.GeneralOverview).click();
  }

  async gotoResponsibleResources() {
    await this.page.locator(this.ResponsibleResources).scrollIntoViewIfNeeded();
    await this.page.locator(this.ResponsibleResources).click();
  }

  async gotoTechnicalDocumentation() {
    await this.page.locator(this.TechnicalDocumentation).scrollIntoViewIfNeeded();
    await this.page.locator(this.TechnicalDocumentation).click();
  }

  async gotoObjectMarking() {
    await this.page.locator(this.ObjectMarking).scrollIntoViewIfNeeded();
    await this.page.locator(this.ObjectMarking).click();
  }

  async gotoActivities() {
    await this.page.locator(this.Activities).scrollIntoViewIfNeeded();
    await this.page.locator(this.Activities).click();
  }

  async gotoRequirementAndGuidelines() {
    await this.page.locator(this.RequirementAndGuidelines).scrollIntoViewIfNeeded();
    await this.page.locator(this.RequirementAndGuidelines).click();
  }

  async gotoDataSetup() {
    await this.page.locator(this.DataSetup).scrollIntoViewIfNeeded();
    await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).scrollIntoViewIfNeeded();
    await this.page.locator(this.Configuration).click();
  }

  // Navigate to sub types in General Overview
  async gotoGeneralInformationCulturalValue() {
    await this.page.locator(this.GeneralInformationCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.GeneralInformationCulturalValue).click();
  }

  // Navigate to sub types in Responsible Resources
  async gotoServicePartners() {
    await this.page.locator(this.ServicePartners).scrollIntoViewIfNeeded();
    await this.page.locator(this.ServicePartners).click();
  }

  async gotoServicePartnersManagementCulturalValue() {
    await this.page.locator(this.ServicePartnersManagementCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.ServicePartnersManagementCulturalValue).click();
  }

  async gotoPersonPermitCulturalValue() {
    await this.page.locator(this.PersonPermitCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.PersonPermitCulturalValue).click();
  }

  // Navigate to sub types in Technical Documentation
  async gotoCulturalValueDocuments() {
    await this.page.locator(this.CulturalValueDocuments).scrollIntoViewIfNeeded();
    await this.page.locator(this.CulturalValueDocuments).click();
  }

  async gotoCulturalValueDocumentTree() {
    await this.page.locator(this.CulturalValueDocumentTree).scrollIntoViewIfNeeded();
    await this.page.locator(this.CulturalValueDocumentTree).click();
  }

  // Navigate to sub types in Object Marking
  async gotoTechnicalSystemCulturalValue() {
    await this.page.locator(this.TechnicalSystemCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.TechnicalSystemCulturalValue).click();
  }

  async gotoCCSTechnicalSystemCulturalValue() {
    await this.page.locator(this.CCSTechnicalSystemCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.CCSTechnicalSystemCulturalValue).click();
  }

  async gotoThemeMarking() {
    await this.page.locator(this.ThemeMarking).scrollIntoViewIfNeeded();
    await this.page.locator(this.ThemeMarking).click();
  }

  // Navigate to sub types in Activities
  async gotoTaskManagementCulturalValue() {
    await this.page.locator(this.TaskManagementCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.TaskManagementCulturalValue).click();
  }

  async gotoWorkOrderCulturalValue() {
    await this.page.locator(this.WorkOrderCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.WorkOrderCulturalValue).click();
  }

  async gotoIncidentCulturalValue() {
    await this.page.locator(this.IncidentCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.IncidentCulturalValue).click();
  }

  // Navigate to sub types in Requirements and Guidelines
  async gotoLinksToLawsAndRegulation() {
    await this.page.locator(this.LinksToLawsAndRegulation).scrollIntoViewIfNeeded();
    await this.page.locator(this.LinksToLawsAndRegulation).click();
  }

  async gotoInstructionsAndGuidelines() {
    await this.page.locator(this.InstructionsAndGuidelines).scrollIntoViewIfNeeded();
    await this.page.locator(this.InstructionsAndGuidelines).click();
  }

  async gotoLocalRegulations() {
    await this.page.locator(this.LocalRegulations).scrollIntoViewIfNeeded();
    await this.page.locator(this.LocalRegulations).click();
  }

  // Navigate to sub types in Data Setup
  async gotoDocumentTypes() {
    await this.page.locator(this.DocumentTypes).scrollIntoViewIfNeeded();
    await this.page.locator(this.DocumentTypes).click();
  }

  async gotoServiceTypes() {
    await this.page.locator(this.ServiceTypes).scrollIntoViewIfNeeded();
    await this.page.locator(this.ServiceTypes).click();
  }

  async gotoPermitCulturalValue() {
    await this.page.locator(this.PermitCulturalValue).scrollIntoViewIfNeeded();
    await this.page.locator(this.PermitCulturalValue).click();
  }

  // Navigate to sub types in Configuration
  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).scrollIntoViewIfNeeded();
    await this.page.locator(this.AccessConfiguration).click();
  }
}

module.exports = CulturalValueManagement;






