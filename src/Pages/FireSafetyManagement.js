const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class FireSafetyManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.fireSafetyManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Fire safety management']";

    // Sub module locators
    this.GeneralOverview= "div[aria-label='General overview Process step']";
    this.ResponsibleResources = "div[aria-label='Responsible resources Process step']";
    this.TechnicalDocumentation = "div[aria-label='Technical documentation Process step']";
    this.ObjectMarking = "div[aria-label='Object marking Process step']";
    this.Activities = "div[aria-label='Activities Process step']";
    this.ActivitiesLocal = "div[aria-label='Activities (Local) Process step']";
    this.ActivitiesCustomer = "div[aria-label='Activities (Customer) Process step']";
    this.RequirementsAndGuidelines = "div[aria-label='Requirements and guidelines Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators( Sub module : General Overview )
    this.GeneralInformationFireSafety = "div[aria-label='General information (Fire safety) Process step item']";

    // Sub Types locators ( Sub module : Responsible Resources )
    this.ServicePartners = "div[aria-label='Service partners Process step item']";
    this.ServicePartnerManagementFireSafety = "div[aria-label='Service partner management (Fire safety) Process step item']";
    this.PersonPermitFireSafety = "div[aria-label='Person permit (Fire safety) Process step item']";

    // Sub Types locators ( Sub module : Technical Documentation )
    this.FireSafetyDocument = "div[aria-label='Fire safety documents Process step item']";
    this.FireSafetyDocumentTree = "div[aria-label='Fire safety document tree Process step item']";
    this.FlammableAndPressurizedMaterial = "div[aria-label='Flammable and pressurized materials Process step item']";
    this.FireSafetyZone = "div[aria-label='Fire safety zones Process step item']";

    // Sub Types locators ( Sub module : Object Marking )
    this.TechnicalSystemFireSafety = "div[aria-label='Technical system (Fire safety) Process step item']";
    this.CSSTechnicalSystemFireSafety = "div[aria-label='CCS Technical system (Fire safety) Process step item']";
    this.ThemeMarking = "div[aria-label='Theme markings Process step item']";

    // Sub Types locators ( Sub module : Activities )
    this.TaskManagementFireSafety = "div[aria-label='Task management (Fire safety) Process step item']";
    this.WorkOrderFireSafety = "div[aria-label='Work order (Fire safety) Process step item']";
    this.ChecklistsFireSafety = "div[aria-label='Checklists (Fire safety) Process step item']";
    this.IncidentFireSafety = "div[aria-label='Incident (Fire safety) Process step item']";

    // Sub Types locators ( Sub module : Activities Local )
    this.TaskManagementFireSafety_Local = "div[id='FireSafetyManagement-ActivitiesLocal-ThemeProcessItemTaskManagementLocalFireSafety']";
    this.WorkOrderFireSafety_Local = "div[id='FireSafetyManagement-ActivitiesLocal-ThemeProcessItemRequestLocalFireSafety']";
    this.ChecklistsFireSafety_Local = "div[id='FireSafetyManagement-ActivitiesLocal-ThemeProcessItemLocalChecklistLocalFireSafety']";
    this.IncidentFireSafety_Local = "div[id='FireSafetyManagement-ActivitiesLocal-ThemeProcessItemIncidentLocalFireSafety']";  

    // Sub Types locators ( Sub module : Activities Customer )
    this.TaskManagementFireSafety_Customer = "div[id='FireSafetyManagement-ActivitiesCustomer-ThemeProcessItemTaskManagementCustomerFireSafety']";
    this.WorkOrderFireSafety_Customer = "div[id='FireSafetyManagement-ActivitiesCustomer-ThemeProcessItemRequestCustomerFireSafety']";
    this.ChecklistsFireSafety_Customer = "div[id='FireSafetyManagement-ActivitiesCustomer-ThemeProcessItemLocalChecklistCustomerFireSafety']";
    this.IncidentFireSafety_Customer = "div[id='FireSafetyManagement-ActivitiesCustomer-ThemeProcessItemIncidentCustomerFireSafety']";  

    // Sub Types locators ( Sub module : Requirements and Guidelines )
    this.LinksToLawsAndRegulation = "div[aria-label='Links to laws and regulations Process step item']";
    this.InstructionsAndGuidelines = "div[aria-label='Instructions and guidelines Process step item']";
    this.LocalRegulations = "div[aria-label='Local regulations Process step item']";  

    // Sub Types locators ( Sub module : Data Setup )
    this.DocumentTypes = "div[aria-label='Document types Process step item']";
    this.ServiceTypes = "div[aria-label='Service types Process step item']";
    this.MaterialTypes = "div[aria-label='Material types Process step item']";  
    this.PermitFireSafety = "div[aria-label='Permit (Fire safety) Process step item']";  

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

   // Add, Close & Export Operations
    this.Add = "#newRecordButton";
    this.Close = "i[title='Close window (alt+x)']";
    this.Export = "button[aria-label='This action exports data - ExportData']";
  }

   async clickFireSafetyManagement() {
      await this.page.waitForTimeout(3000);
      const fireSafetyManagement = this.page.locator(this.fireSafetyManagement).first();
      await fireSafetyManagement.waitFor({ state: 'attached', timeout: 10000 });
      await fireSafetyManagement.evaluate((node) => node.click());
   }

  //Navigate to Sub modules
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

  async gotoActivitiesLocal() {
     await this.page.locator(this.ActivitiesLocal).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ActivitiesLocal).click();
  }

  async gotoActivitiesCustomer() {
     await this.page.locator(this.ActivitiesCustomer).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ActivitiesCustomer).click();
  }

  async gotoRequirementsAndGuidelines() {
     await this.page.locator(this.RequirementsAndGuidelines).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.RequirementsAndGuidelines).click();
  }

  async gotoDataSetup() {
     await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
     await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Configuration).click();
  }

  //Navigate to Sub Types
  // Navigate to General Overview Sub Types
  async gotoGeneralInformationFireSafety() {
     await this.page.locator(this.GeneralInformationFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GeneralInformationFireSafety).click();
  }

  // Navigate to Responsible Resources Sub Types
  async gotoServicePartners() {
     await this.page.locator(this.ServicePartners).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServicePartners).click();
  }

  async gotoServicePartnerManagementFireSafety() {
     await this.page.locator(this.ServicePartnerManagementFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServicePartnerManagementFireSafety).click();
  }

  async gotoPersonPermitFireSafety() {
     await this.page.locator(this.PersonPermitFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PersonPermitFireSafety).click();
  }

  // Navigate to Technical Documentation Sub Types
  async gotoFireSafetyDocument() {  
     await this.page.locator(this.FireSafetyDocument).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FireSafetyDocument).click();
  }

  async gotoFireSafetyDocumentTree() {
     await this.page.locator(this.FireSafetyDocumentTree).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FireSafetyDocumentTree).click();
  }
  async gotoFlammableAndPressurizedMaterial() {
     await this.page.locator(this.FlammableAndPressurizedMaterial).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FlammableAndPressurizedMaterial).click();
  }
  async gotoFireSafetyZone() {
     await this.page.locator(this.FireSafetyZone).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FireSafetyZone).click();
  }

  // Navigate to Object Marking Sub Types
  async gotoTechnicalSystemFireSafety() {
     await this.page.locator(this.TechnicalSystemFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TechnicalSystemFireSafety).click();
  }
  async gotoCSSTechnicalSystemFireSafety() {
     await this.page.locator(this.CSSTechnicalSystemFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CSSTechnicalSystemFireSafety).click();
  }

  async gotoThemeMarking() {
     await this.page.locator(this.ThemeMarking).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ThemeMarking).click();
  }

  // Navigate to Activities Sub Types
  async gotoTaskManagementFireSafety() {
     await this.page.locator(this.TaskManagementFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TaskManagementFireSafety).click();
  } 

  async gotoWorkOrderFireSafety() {
     await this.page.locator(this.WorkOrderFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WorkOrderFireSafety).click();
  }

  async gotoChecklistsFireSafety() {
     await this.page.locator(this.ChecklistsFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ChecklistsFireSafety).click();
  }

  async gotoIncidentFireSafety() {
     await this.page.locator(this.IncidentFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.IncidentFireSafety).click();
  }

  // Navigate to Activities Local Sub Types
  async gotoTaskManagementFireSafetyLocal() {
      await this.page.locator(this.TaskManagementFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TaskManagementFireSafety_Local).click();
    }

  async gotoWorkOrderFireSafetyLocal() {
      await this.page.locator(this.WorkOrderFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkOrderFireSafety_Local).click();
    }

  async gotoChecklistsFireSafetyLocal() {
      await this.page.locator(this.ChecklistsFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ChecklistsFireSafety_Local).click();
    }

  async gotoIncidentFireSafetyLocal() {
      await this.page.locator(this.IncidentFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.IncidentFireSafety_Local).click();
    }
    
  // Navigate to Activities Customer Sub Types
  async gotoTaskManagementFireSafetyCustomer() {
      await this.page.locator(this.TaskManagementFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TaskManagementFireSafety_Customer).click();
    }
    
  async gotoWorkOrderFireSafetyCustomer() {
      await this.page.locator(this.WorkOrderFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkOrderFireSafety_Customer).click();
    }

  async gotoChecklistsFireSafetyCustomer() {
      await this.page.locator(this.ChecklistsFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ChecklistsFireSafety_Customer).click();
    }

   

  async gotoIncidentFireSafetyCustomer() {
      await this.page.locator(this.IncidentFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.IncidentFireSafety_Customer).click();
    }

  // Navigate to Requirements and Guidelines Sub Types
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

  // Navigate to Data Setup Sub Types
  async gotoDocumentTypes() {
     await this.page.locator(this.DocumentTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DocumentTypes).click();
  }

  async gotoServiceTypes() {
     await this.page.locator(this.ServiceTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServiceTypes).click();
  }

  async gotoMaterialTypes() {
     await this.page.locator(this.MaterialTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MaterialTypes).click();
  }

  async gotoPermitFireSafety() {
     await this.page.locator(this.PermitFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PermitFireSafety).click();
  }

  // Navigate to Configuration Sub Types
  async gotoAccessConfiguration() {
     await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AccessConfiguration).click();
  }
}

module.exports = FireSafetyManagement;


