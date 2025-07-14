const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class FireSafetyManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.FireSafetyManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Fire safety management']";

    // Sub module locators
    this.GeneralOverview= "div[aria-label='General overview Process step']";
    this.RepsonsibleResources = "div[aria-label='Responsible resources Process step']";
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
    this.ChecklistsFireSafety_Customer = "div[id='FireSafetyManagement-ActivitiesCustomer-ThemeProcessItemCustomerChecklistCustomerFireSafety']";
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
  }

  //Navigate to Sub modules
  async goToGeneralOverview() {
     await this.page.locator(this.GeneralOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GeneralOverview).click();
  }    

  async goToRepsonsibleResources() {
     await this.page.locator(this.RepsonsibleResources).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.RepsonsibleResources).click();
  }

  async goToTechnicalDocumentation() {
     await this.page.locator(this.TechnicalDocumentation).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TechnicalDocumentation).click();
  }

  async goToObjectMarking() {
     await this.page.locator(this.ObjectMarking).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ObjectMarking).click();
  }

  async goToActivities() {
     await this.page.locator(this.Activities).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Activities).click();
  }

  async goToActivitiesLocal() {
     await this.page.locator(this.ActivitiesLocal).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ActivitiesLocal).click();
  }

  async goToActivitiesCustomer() {
     await this.page.locator(this.ActivitiesCustomer).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ActivitiesCustomer).click();
  }

  async goToRequirementsAndGuidelines() {
     await this.page.locator(this.RequirementsAndGuidelines).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.RequirementsAndGuidelines).click();
  }

  async goToDataSetup() {
     await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DataSetup).click();
  }

  async goToConfiguration() {
     await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Configuration).click();
  }

  //Navigate to Sub Types
  // Navigate to General Overview Sub Types
  async goToGeneralInformationFireSafety() {
     await this.page.locator(this.GeneralInformationFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GeneralInformationFireSafety).click();
  }

  // Navigate to Responsible Resources Sub Types
  async goToServicePartners() {
     await this.page.locator(this.ServicePartners).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServicePartners).click();
  }

  async goToServicePartnerManagementFireSafety() {
     await this.page.locator(this.ServicePartnerManagementFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServicePartnerManagementFireSafety).click();
  }

  async goToPersonPermitFireSafety() {
     await this.page.locator(this.PersonPermitFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PersonPermitFireSafety).click();
  }

  // Navigate to Technical Documentation Sub Types
  async goToFireSafetyDocument() {  
     await this.page.locator(this.FireSafetyDocument).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FireSafetyDocument).click();
  }

  async goToFireSafetyDocumentTree() {
     await this.page.locator(this.FireSafetyDocumentTree).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FireSafetyDocumentTree).click();
  }
  async goToFlammableAndPressurizedMaterial() {
     await this.page.locator(this.FlammableAndPressurizedMaterial).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FlammableAndPressurizedMaterial).click();
  }
  async goToFireSafetyZone() {
     await this.page.locator(this.FireSafetyZone).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.FireSafetyZone).click();
  }

  // Navigate to Object Marking Sub Types
  async goToTechnicalSystemFireSafety() {
     await this.page.locator(this.TechnicalSystemFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TechnicalSystemFireSafety).click();
  }
  async goToCSSTechnicalSystemFireSafety() {
     await this.page.locator(this.CSSTechnicalSystemFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CSSTechnicalSystemFireSafety).click();
  }

  async goToThemeMarking() {
     await this.page.locator(this.ThemeMarking).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ThemeMarking).click();
  }

  // Navigate to Activities Sub Types
  async goToTaskManagementFireSafety() {
     await this.page.locator(this.TaskManagementFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TaskManagementFireSafety).click();
  } 

  async goToWorkOrderFireSafety() {
     await this.page.locator(this.WorkOrderFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WorkOrderFireSafety).click();
  }

  async goToChecklistsFireSafety() {
     await this.page.locator(this.ChecklistsFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ChecklistsFireSafety).click();
  }

  async goToIncidentFireSafety() {
     await this.page.locator(this.IncidentFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.IncidentFireSafety).click();
  }

  // Navigate to Activities Local Sub Types
  async goToTaskManagementFireSafety_Local() {
      await this.page.locator(this.TaskManagementFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TaskManagementFireSafety_Local).click();
    }

  async goToWorkOrderFireSafety_Local() {
      await this.page.locator(this.WorkOrderFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkOrderFireSafety_Local).click();
    }

  async goToChecklistsFireSafety_Local() {
      await this.page.locator(this.ChecklistsFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ChecklistsFireSafety_Local).click();
    }

  async goToIncidentFireSafety_Local() {
      await this.page.locator(this.IncidentFireSafety_Local).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.IncidentFireSafety_Local).click();
    }
    
  // Navigate to Activities Customer Sub Types
  async goToTaskManagementFireSafety_Customer() {
      await this.page.locator(this.TaskManagementFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.TaskManagementFireSafety_Customer).click();
    }
    
  async goToWorkOrderFireSafety_Customer() {
      await this.page.locator(this.WorkOrderFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WorkOrderFireSafety_Customer).click();
    }

  async goToChecklistsFireSafety_Customer() {
      await this.page.locator(this.ChecklistsFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.ChecklistsFireSafety_Customer).click();
    }

  async goToIncidentFireSafety_Customer() {
      await this.page.locator(this.IncidentFireSafety_Customer).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.IncidentFireSafety_Customer).click();
    }

  // Navigate to Requirements and Guidelines Sub Types
  async goToLinksToLawsAndRegulation() {
     await this.page.locator(this.LinksToLawsAndRegulation).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LinksToLawsAndRegulation).click();
  }

  async goToInstructionsAndGuidelines() {
     await this.page.locator(this.InstructionsAndGuidelines).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.InstructionsAndGuidelines).click();
  }

  async goToLocalRegulations() {
     await this.page.locator(this.LocalRegulations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LocalRegulations).click();
  }

  // Navigate to Data Setup Sub Types
  async goToDocumentTypes() {
     await this.page.locator(this.DocumentTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DocumentTypes).click();
  }

  async goToServiceTypes() {
     await this.page.locator(this.ServiceTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServiceTypes).click();
  }

  async goToMaterialTypes() {
     await this.page.locator(this.MaterialTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MaterialTypes).click();
  }

  async goToPermitFireSafety() {
     await this.page.locator(this.PermitFireSafety).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PermitFireSafety).click();
  }

  // Navigate to Configuration Sub Types
  async goToAccessConfiguration() {
     await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AccessConfiguration).click();
  }
}
