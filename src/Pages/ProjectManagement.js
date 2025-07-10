const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');


class ProjectManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.projectManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Project management']";

    // Sub module locators
    this.ProjectInitiatives = "div[aria-label='Project initiatives Process step']";
    this.ProjectsOverview = "div[aria-label='Projects overview Process step']";
    this.ProjectDetails = "div[aria-label='Project details Process step']";
    this.ProjectContractsOverview ="div[aria-label='Project contracts overview Process step']";
    this.CostsAndResourceUsage = "div[aria-label='Costs and resource usage Process step']";
    this.ProjectWeb = "div[aria-label='Project web Process step']";
    this.StandarsTasksOverview = "div[aria-label='Standard tasks overview Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Project Initiatives )
    this.PurchaseOrder = "div[aria-label='Purchase order Process step item']";
    this.MaintenanceIncidents = "div[aria-label='Maintenance incidents Process step item']";

    // Sub Types locators ( Sub module : Projects Overview )
    this.Projects = "div[aria-label='Projects Process step item']";
    this.AnnualBudgetForProjects = "div[aria-label='Annual budgets for projects Process step item']";
    this.TaskPlanning = "div[aria-label='Task planning Process step item']";
    this.TaskManagement = "div[aria-label='Task management Process step item']";
    this.ProjectAnnualTaskBudgets = "div[aria-label='Project annual task budgets Process step item']";
    this.WorkOrders = "div[aria-label='Work orders Process step item']";
    this.Inspections = "div[aria-label='Inspections Process step item']";
    this.CheckItems = "div[aria-label='Check items Process step item']";

    // Sub Types locators ( Sub module : Project Details)
    this.ProjectOrganisations = "div[aria-label='Project organisations Process step item']";
    this.ProjectAssessments = "div[aria-label='Project assessments Process step item']";
    this.ProjectChangeManagement = "div[aria-label='Project change management Process step item']";

    // Sub Types locators ( Sub module : Project Contrcats Overview )
    this.ProjectContrcats = "div[aria-label='Project contracts Process step item']";
    this.ProjectContrcatPayments = "div[aria-label='Project contract payments Process step item']";

    // Sub Types locators ( Sub module : Costs and Resource Usage )
    this.ElectronicInvoices = "div[aria-label='Electronic invoices Process step item']";
    this.WorkOrderCosts = "div[aria-label='Work order costs Process step item']";
    this.TimeRegistration = "div[aria-label='Time registration Process step item']";
    this.ProjectWorkOrderMaterials = "div[aria-label='Project work order materials Process step item']";
    this.Transactions = "div[aria-label='Transactions Process step item']";

     // Sub Types locators ( Sub module : Project Web )
     this.ProjectTreeWithDocuments = "div[aria-label='Project tree with documents Process step item']";
     this.ProjectWeb = "div[aria-label='Project web Process step item']";

     // Sub Types locators ( Sub module : Standar Tasks Overview )
     this.ProjectStandardTasks = "div[aria-label='Project standard tasks Process step item']";

     // Sub Types locators ( Sub module : Data Setup )
     this.ProjectGroups = "div[aria-label='Project groups Process step item']";
     this.TasksSets = "div[aria-label='Task sets Process step item']";

     // Sub Types locators ( Sub module : Configuarion )
     this.AccessConfiguraions = "div[aria-label='Access configurations Process step item']";
  }

  async clickProjectManagement() {
    await this.page.waitForTimeout(3000);
    const projectManagement = this.page.locator(this.projectManagement).first();
    await projectManagement.waitFor({ state: 'attached', timeout: 10000 });
    await projectManagement.evaluate((node) => node.click());
  }

   // Navigate to sub modules
   async gotoProjectInitiatives() {
     await this.page.locator(this.ProjectInitiatives).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectInitiatives).click();
  }

   async gotoProjectsOverview() {
     await this.page.locator(this.ProjectsOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectsOverview).click();
  }

   async gotoProjectDetails() {
     await this.page.locator(this.ProjectDetails).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectDetails).click();
  }

   async gotoProjectContractsOverview() {
     await this.page.locator(this.ProjectContractsOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectContractsOverview).click();
  }

   async gotoCostsAndResourceUsage() {
     await this.page.locator(this.CostsAndResourceUsage).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CostsAndResourceUsage).click();
  }

   async gotoProjectWeb() {
     await this.page.locator(this.ProjectWeb).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectWeb).click();
  }

   async gotoStandardsTasksOverview() {
     await this.page.locator(this.StandarsTasksOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.StandarsTasksOverview).click();
  }

   async gotoDataSetup() {
     await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.DataSetup).click();
  }

   async gotoConfiguration() {
     await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Configuration).click();
  }

    // Navigate to sub types ( Sub module : Project Initiatives )

   async gotoPurchaseOrder() {
     await this.page.locator(this.PurchaseOrder).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PurchaseOrder).click();
  }

   async gotoMaintenanceIncidents() {
     await this.page.locator(this.MaintenanceIncidents).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.MaintenanceIncidents).click();
  }

  // Navigate to sub types ( Sub module : Projects Overview )
  async gotoProjects() {
    await this.page.locator(this.Projects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Projects).click();
  }

  async gotoAnnualBudgetForProjects() {
    await this.page.locator(this.AnnualBudgetForProjects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AnnualBudgetForProjects).click();
  }

  async gotoTaskPlanning() {
    await this.page.locator(this.TaskPlanning).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskPlanning).click();
  }

  async gotoTaskManagement() {
    await this.page.locator(this.TaskManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskManagement).click();
  }

  async gotoProjectAnnualTaskBudgets() {
    await this.page.locator(this.ProjectAnnualTaskBudgets).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProjectAnnualTaskBudgets).click();
  }

  async gotoWorkOrders() {
    await this.page.locator(this.WorkOrders).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrders).click();
  }

  async gotoInspections() {
    await this.page.locator(this.Inspections).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Inspections).click();
  }

  async gotoCheckItems() {
    await this.page.locator(this.CheckItems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CheckItems).click();
  }

  // Navigate to sub types ( Sub module : Project Details )
  async gotoProjectOrganisations() {
    await this.page.locator(this.ProjectOrganisations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProjectOrganisations).click();
  }

  async gotoProjectAssessments() {
    await this.page.locator(this.ProjectAssessments).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProjectAssessments).click();
  }

  async gotoProjectChangeManagement() {
    await this.page.locator(this.ProjectChangeManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProjectChangeManagement).click();
  }

  // Navigate to sub types ( Sub module : Project Contrcats Overview  )
  async gotoProjectContrcats() {
    await this.page.locator(this.ProjectContrcats).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProjectContrcats).click();
  }

  async gotoProjectContrcatPayments() {
    await this.page.locator(this.ProjectContrcatPayments).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProjectContrcatPayments).click();
  }

   // Navigate to sub types ( Sub module : Costs and Resource Usage )
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

   async gotoProjectWorkOrderMaterials() {
     await this.page.locator(this.ProjectWorkOrderMaterials).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectWorkOrderMaterials).click();
   }

   async gotoTransactions() {
     await this.page.locator(this.Transactions).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Transactions).click();
   }


   // Navigate to sub types ( Sub module : Project Web  )
   async gotoProjectTreeWithDocuments() {
     await this.page.locator(this.ProjectTreeWithDocuments).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectTreeWithDocuments).click();
   }

   async gotoProjectWeb() {
     await this.page.locator(this.ProjectWeb).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectWeb).click();
   }

   // Navigate to sub types ( Sub module : Standar Tasks Overview )
   async gotoProjectStandardTasks() {
     await this.page.locator(this.ProjectStandardTasks).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectStandardTasks).click();
   }

   // Navigate to sub types ( Sub module : Data Setup  )
   async gotoProjectGroups() {
     await this.page.locator(this.ProjectGroups).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ProjectGroups).click();
   }

   async gotoTasksSets() {
     await this.page.locator(this.TasksSets).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TasksSets).click();
   }

   // Navigate to sub types ( Sub module : Configuarion )
   async gotoAccessConfiguraions() {
     await this.page.locator(this.AccessConfiguraions).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AccessConfiguraions).click();
   }



}

module.exports = ProjectManagement;














