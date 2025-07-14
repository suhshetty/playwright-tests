const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class OperationAndMaintenance extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.OperationAndMaintenance = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Operation and maintenance']";

    // Sub module locators
    this.MaintenanceIncidentsOverview= "div[aria-label='Maintenance incidents overview Process step']";
    this.TaskPlanningOverview = "div[aria-label='Task planning overview Process step']";
    this.ApprovedPPM = "div[aria-label='Approved PPM Process step']";
    this.IncidentsOverview = "div[aria-label='Incidents overview Process step']";
    this.WorkOrdersOverview = "div[aria-label='Work orders overview Process step']";
    this.CostsAndResourceUsage = "div[aria-label='Costs and resource usage Process step']";
    this.ServiceContractsOverview = "div[aria-label='Service contracts overview Process step']";
    this.StandardTasksOverview = "div[aria-label='Standard tasks overview Process step']";
    this.DataSetup= "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";    

    // Sub Types locators ( Sub module : Maintenance Incidents Overview )
    this.MaintenanceIncident = "div[aria-label='Maintenance incidents Process step item']";

    // Sub Types locators ( Sub module : Task Planning Overview )
    this.PPMRegistration = "div[aria-label='PPM registration Process step item']";
    this.AnnualTaskBudgets = "div[aria-label='Annual task budgets Process step item']";
    this.PendingStandardTask = "div[aria-label='Pending standard tasks Process step item']";
    this.ObjectsShowingPendingStandardTasks = "div[id='OperationAndMaintenance-TaskPlanning-PendingStandardTaskObjectTree']";
    this.ServicePartners = "div[id='OperationAndMaintenance-TaskPlanning-Service']";
    this.TaskInstance = "div[aria-label='Task instances Process step item']";
    this.TaskChecklist = "div[aria-label='Task checklists Process step item']";
    this.TaskChecklistPoint = "div[aria-label='Task checklist points Process step item']";

    // Sub Types locators ( Sub module : Approved PPM )
    this.ApprovedPPMSubType = "div[aria-label='Approved PPM Process step item']";
    this.AnnualTaskBudget = "div[aria-label='Annual task budgets Process step item']";

    // Sub Types locators ( Sub module : Incidents Overview )
    this.Failure = "div[aria-label='Failures Process step item']";
    this.Issues = "div[aria-label='Issues Process step item']";
    this.CheckItem = "div[aria-label='Check items Process step item']";
    this.CleaningTask = "div[aria-label='Cleaning tasks Process step item']";
    this.IncidentCategory1s = "div[aria-label='Incident category 1s Process step item']";
    this.IncidentCategory2s = "div[aria-label='Incident category 2s Process step item']";
    this.AllIncidents = "div[id='All incidents Process step item']";

    // Sub Types locators ( Sub module : Work Orders Overview )
    this.WorkOrder = "div[aria-label='Work orders Process step item']";
    this.WorkOrderExternal= "div[aria-label='Work orders (External) Process step item']";
    this.WorkOrderAssignedCost = "div[aria-label='Work order assigned costs Process step item']";
    this.TimeRegistration = "div[aria-label='Time registration Process step item']";
    this.Inspections = "div[aria-label='Inspections Process step item']";
    this.ReccuringIncidents = "div[aria-label='Recurring incidents Process step item']";
    this.Checklists = "div[aria-label='Checklists Process step item']";
    this.ChecklistPoints = "div[aria-label='Checklist points Process step item']";
    this.ChecklistIncidents = "div[aria-label='Checklist incidents Process step item']";

    // Sub Types locators ( Sub module : Costs and Resource Usage )
    this.ElectronicInvoices = "div[aria-label='Electronic invoices Process step item']";
    this.WorkOrderAssignedCost = "div[aria-label='Work order assigned costs Process step item']";
    this.TimeRegistration = "div[aria-label='Time registration Process step item']";
    this.WorkOrderMaterial = "div[aria-label='Work order materials Process step item']";
    this.Transaction = "div[aria-label='Transactions Process step item']";

    // Sub Types locators ( Sub module : Service Contracts Overview )
    this.ServiceContract = "div[aria-label='Service contracts Process step item']";
    this.ServiceContractReminder = "div[aria-label='Service contract reminders Process step item']";
    this.ServiceContractPayments = "div[aria-label='Service contract payments Process step item']";
    this.ServiceContractPaymemtItems = "div[aria-label='Service contract payment items Process step item']";
    this.ServiceContractItem = "div[aria-label='Service contract items Process step item']";

    // Sub Types locators ( Sub module : Standard Tasks Overview )
    this.StandardTaskManagement = "div[aria-label='Standard task management Process step item']";
    this.StandardTaskObjectTypeManagement = "div[aria-label='Standard task object type management Process step item']";
    this.StandardTask = "div[aria-label='Standard tasks Process step item']";
    this.StandardChecklistManagement = "div[aria-label='Standard checklist management Process step item']";
    this.StandardCheckpointObjectTypeManagement = "div[aria-label='Standard checkpoint object type management Process step item']";
    this.StandardChecklist = "div[aria-label='Standard checklists Process step item']";
    this.StandardCheckPoint = "div[aria-label='Standard checkpoints Process step item']";
    this.CheckpointGroups = "div[aria-label='Checkpoint groups Process step item']";
    this.PendingStandardTsksOnSite = "div[aria-label='Pending standard tasks on site Process step item']";

    // Sub Types locators ( Sub module : Data Setup )
    this.TargetArea = "div[aria-label='Target areas Process step item']";
    this.ScheduleType = "div[aria-label='Schedule types Process step item']";
    this.TaskCategories = "div[aria-label='Task categories Process step item']";
    this.TaskSubcategories = "div[aria-label='Task subcategories Process step item']";
    this.TaskClassification = "div[aria-label='Task classifications Process step item']";
    this.TaskSet = "div[aria-label='Task sets Process step item']";
    this.IncidentPriorities = "div[aria-label='Incident priorities Process step item']";
    this.TaskClassificationRelation = "div[aria-label='Task classification relations Process step item']";
    this.HealthSafetyAndEnvironmentItems = "div[aria-label='Health, safety and environment items Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

  }
  async clickOperationAndMaintenance() {
    await this.page.waitForTimeout(3000);
    const operationAndMaintenance = this.page.locator(this.OperationAndMaintenance);
    await operationAndMaintenance.waitFor({ state: 'attached', timeout: 10000 });
    await operationAndMaintenance.evaluate((node) => node.click());
  } 

  // Navigate to sub modules
  async gotoMaintenanceIncidentsOverview() {
    await this.page.locator(this.MaintenanceIncidentsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.MaintenanceIncidentsOverview).click();
  }

  async gotoTaskPlanningOverview() {
    await this.page.locator(this.TaskPlanningOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskPlanningOverview).click();
  }

  async gotoApprovedPPM() {
    await this.page.locator(this.ApprovedPPM).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ApprovedPPM).click();
  }

  async gotoIncidentsOverview() {
    await this.page.locator(this.IncidentsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.IncidentsOverview).click();
  }

  async gotoWorkOrdersOverview() {
    await this.page.locator(this.WorkOrdersOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrdersOverview).click();
  }

  async gotoCostsAndResourceUsage() {
    await this.page.locator(this.CostsAndResourceUsage).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CostsAndResourceUsage).click();
  }

  async gotoServiceContractsOverview() {
    await this.page.locator(this.ServiceContractsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceContractsOverview).click();
  }

  async gotoStandardTasksOverview() {
    await this.page.locator(this.StandardTasksOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardTasksOverview).click();
  }

  async gotoDataSetup() {
    await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

  // Navigate to sub types in Maintenance Incidents Overview
  async gotoMaintenanceIncident() {
    await this.page.locator(this.MaintenanceIncident).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.MaintenanceIncident).click();
  }

  // Navigate to sub types in Task Planning Overview
  async gotoPPMRegistration() {
    await this.page.locator(this.PPMRegistration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PPMRegistration).click();
  }

  async gotoAnnualTaskBudgets() {
    await this.page.locator(this.AnnualTaskBudgets).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AnnualTaskBudgets).click();
  }

  async gotoPendingStandardTask() {
    await this.page.locator(this.PendingStandardTask).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PendingStandardTask).click();
  }

  async gotoObjectsShowingPendingStandardTasks() {
    await this.page.locator(this.ObjectsShowingPendingStandardTasks).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectsShowingPendingStandardTasks).click();
  }

  async gotoServicePartners() {
    await this.page.locator(this.ServicePartners).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServicePartners).click();
  }

  async gotoTaskInstance() {
    await this.page.locator(this.TaskInstance).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskInstance).click();
  }

  async gotoTaskChecklist() {
    await this.page.locator(this.TaskChecklist).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskChecklist).click();
  }

  async gotoTaskChecklistPoint() {
    await this.page.locator(this.TaskChecklistPoint).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskChecklistPoint).click();
  }

  // Navigate to sub types in Approved PPM
  async gotoApprovedPPMSubType() {  
    await this.page.locator(this.ApprovedPPMSubType).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ApprovedPPMSubType).click();
  }

  async gotoAnnualTaskBudget() {
    await this.page.locator(this.AnnualTaskBudget).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AnnualTaskBudget).click();
  }

  // Navigate to sub types in Incidents Overview
  async gotoFailure() {
    await this.page.locator(this.Failure).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Failure).click();
  }

  async gotoIssues() {
    await this.page.locator(this.Issues).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Issues).click();
  }

  async gotoCheckItem() {
    await this.page.locator(this.CheckItem).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CheckItem).click();
  }

  async gotoCleaningTask() {
    await this.page.locator(this.CleaningTask).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CleaningTask).click();
  }

  async gotoIncidentCategory1s() {
    await this.page.locator(this.IncidentCategory1s).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.IncidentCategory1s).click();
  }

  async gotoIncidentCategory2s() {
    await this.page.locator(this.IncidentCategory2s).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.IncidentCategory2s).click();
  }

  async gotoAllIncidents() {
    await this.page.locator(this.AllIncidents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AllIncidents).click();
  }

  // Navigate to sub types in Work Orders Overview
  async gotoWorkOrder() {
    await this.page.locator(this.WorkOrder).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrder).click();
  }

  async gotoWorkOrderExternal() {
    await this.page.locator(this.WorkOrderExternal).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrderExternal).click();
  }

  async gotoWorkOrderAssignedCost() {
    await this.page.locator(this.WorkOrderAssignedCost).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrderAssignedCost).click();
  }

  async gotoTimeRegistration() {
    await this.page.locator(this.TimeRegistration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TimeRegistration).click();
  }

  async gotoInspections() {
    await this.page.locator(this.Inspections).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Inspections).click();
  }

  async gotoReccuringIncidents() {
    await this.page.locator(this.ReccuringIncidents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ReccuringIncidents).click();
  } 

  async gotoChecklists() {
    await this.page.locator(this.Checklists).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Checklists).click();
  }

  async gotoChecklistPoints() {
    await this.page.locator(this.ChecklistPoints).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ChecklistPoints).click();
  }

  async gotoChecklistIncidents() {
    await this.page.locator(this.ChecklistIncidents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ChecklistIncidents).click();
  }

  // Navigate to sub types in Costs and Resource Usage
  async gotoElectronicInvoices() {
    await this.page.locator(this.ElectronicInvoices).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ElectronicInvoices).click();
  }

  async gotoWorkOrderMaterial() {
    await this.page.locator(this.WorkOrderMaterial).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrderMaterial).click();
  }

  async gotoTransaction() {
    await this.page.locator(this.Transaction).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Transaction).click();
  }

  // Navigate to sub types in Service Contracts Overview
  async gotoServiceContract() {
    await this.page.locator(this.ServiceContract).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceContract).click();
  }

  async gotoServiceContractReminder() {
    await this.page.locator(this.ServiceContractReminder).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceContractReminder).click();
  }

  async gotoServiceContractPayments() {
    await this.page.locator(this.ServiceContractPayments).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceContractPayments).click();
  }

  async gotoServiceContractPaymemtItems() {
    await this.page.locator(this.ServiceContractPaymemtItems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceContractPaymemtItems).click();
  }

  async gotoServiceContractItem() {
    await this.page.locator(this.ServiceContractItem).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceContractItem).click();
  }

  // Navigate to sub types in Standard Tasks Overview
  async gotoStandardTaskManagement() {
    await this.page.locator(this.StandardTaskManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardTaskManagement).click();
  } 

  async gotoStandardTaskObjectTypeManagement() {
    await this.page.locator(this.StandardTaskObjectTypeManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardTaskObjectTypeManagement).click();
  }

  async gotoStandardTask() {
    await this.page.locator(this.StandardTask).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardTask).click();
  }

  async gotoStandardChecklistManagement() {
    await this.page.locator(this.StandardChecklistManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardChecklistManagement).click();
  }

  async gotoStandardCheckpointObjectTypeManagement() {
    await this.page.locator(this.StandardCheckpointObjectTypeManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardCheckpointObjectTypeManagement).click();
  }

  async gotoStandardChecklist() {
    await this.page.locator(this.StandardChecklist).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardChecklist).click();
  }

  async gotoStandardCheckPoint() {
    await this.page.locator(this.StandardCheckPoint).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StandardCheckPoint).click();
  }

  async gotoCheckpointGroups() {
    await this.page.locator(this.CheckpointGroups).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CheckpointGroups).click();
  }

  async gotoPendingStandardTsksOnSite() {
    await this.page.locator(this.PendingStandardTsksOnSite).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PendingStandardTsksOnSite).click();
  }

  // Navigate to sub types in Data Setup  
  async gotoTargetArea() {
    await this.page.locator(this.TargetArea).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TargetArea).click();
  }

  async gotoScheduleType() {
    await this.page.locator(this.ScheduleType).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ScheduleType).click();
  }

  async gotoTaskCategories() {
    await this.page.locator(this.TaskCategories).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskCategories).click();
  }

  async gotoTaskSubcategories() {
    await this.page.locator(this.TaskSubcategories).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskSubcategories).click();
  }

  async gotoTaskClassification() {
    await this.page.locator(this.TaskClassification).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskClassification).click();
  }

  async gotoTaskSet() {
    await this.page.locator(this.TaskSet).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskSet).click();
  }

  async gotoIncidentPriorities() {
    await this.page.locator(this.IncidentPriorities).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.IncidentPriorities).click();
  }

  async gotoTaskClassificationRelation() {
    await this.page.locator(this.TaskClassificationRelation).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TaskClassificationRelation).click();
  }

  async gotoHealthSafetyAndEnvironmentItems() {
    await this.page.locator(this.HealthSafetyAndEnvironmentItems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.HealthSafetyAndEnvironmentItems).click();
  }

  // Navigate to sub types in Configuration
  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AccessConfiguration).click();
  }

}

