const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');


class HelpdeskManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.projectManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Helpdesk / service management']";

    // Sub module locators
    this.Summary = "div[aria-label='Summary Process step']";
    this.IncidentsOverview = "div[aria-label='Incidents overview Process step']";
    this.WorkOrdersOverview = "div[aria-label='Work orders overview Process step']";
    this.ServiceInformationOverview = "div[aria-label='Service information overview Process step']";
    this.NotificationsandReminders = "div[aria-label='Notifications and reminders Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Summary)
    this.Failures = "div[aria-label='Failures Process step item']";
    this.Issues = "div[aria-label='Issues Process step item']";
    this.ConditionAssessmentType = "div[aria-label='Condition assessment Process step item']";
    this.ReleaseItems = "div[aria-label='Release items Process step item']";
    this.IncidentCategory1s = "div[aria-label='Incident category 1s Process step item']";
    this.IncidentCategory2s = "div[aria-label='Incident category 2s Process step item']";
    this.AllIncidents = "div[aria-label='All incidents Process step item']";

    // Sub Types locators ( Sub module : Work Orders)
    this.WorkOrders = "div[aria-label='Work orders Process step item']";

    // Sub Types locators ( Sub module : Service Information Overview)
    this.ServicePartners = "div[aria-label='Service partners Process step item']";
    this.SLAKPIDemands = "div[aria-label='SLA/KPI demands Process step item']";
    this.SLAKPIDemandIncidentTypes = "div[aria-label='SLA/KPI demand incident types Process step item']";

    // Sub Types locators ( Sub module : Notifications and Reminders)
    this.Reminders = "div[aria-label='Reminders Process step item']";

    // Sub Types locators ( Sub module : Data Setup)
    this.IncidentGroups = "div[aria-label='Incident groups Process step item']";
    this.IncidentTypes = "div[aria-label='Incident types Process step item']";
    this.TaskPriorities = "div[aria-label='Task priorities Process step item']";
    this.Professions = "div[aria-label='Professions Process step item']";

     // Sub Types locators ( Sub module : Configuarion )
     this.AccessConfiguraions = "div[aria-label='Access configurations Process step item']";
  }

  async clickHelpdeskManagement() {
    await this.page.waitForTimeout(3000);
    const helpdeskManagement = this.page.locator(this.helpdeskManagement).first();
    await helpdeskManagement.waitFor({ state: 'attached', timeout: 10000 });
    await helpdeskManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
   async gotoSummary() {
     await this.page.locator(this.Summary).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Summary).click();
  }

  async gotoIncidentsOverview() {
    await this.page.locator(this.IncidentsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.IncidentsOverview).click();
  }

  async gotoWorkOrdersOverview() {
    await this.page.locator(this.WorkOrdersOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WorkOrdersOverview).click();
  }

  async gotoServiceInformationOverview() {
    await this.page.locator(this.ServiceInformationOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServiceInformationOverview).click();
  }

  async gotoNotificationsandReminders() {
    await this.page.locator(this.NotificationsandReminders).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.NotificationsandReminders).click();
  }

  async gotoDataSetup() {
    await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

  // Navigate to sub types ( Sub module : Summary)
  async gotoFailures() {
    await this.page.locator(this.Failures).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Failures).click();
  }

  async gotoIssues() {
    await this.page.locator(this.Issues).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Issues).click();
  }

  async gotoConditionAssessmentType() {
    await this.page.locator(this.ConditionAssessmentType).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ConditionAssessmentType).click();
  }

  async gotoReleaseItems() {
    await this.page.locator(this.ReleaseItems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ReleaseItems).click();
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

   // Navigate to sub types ( Sub module : Work Orders)
   async gotoWorkOrders() {
     await this.page.locator(this.WorkOrders).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WorkOrders).click();
   }

   // Navigate to sub types ( Sub module : Service Information Overview)
   async gotoServicePartners() {
     await this.page.locator(this.ServicePartners).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.ServicePartners).click();
   }

   async gotoSLAKPIDemands() {
     await this.page.locator(this.SLAKPIDemands).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SLAKPIDemands).click();
   }

   async gotoSLAKPIDemandIncidentTypes() {
     await this.page.locator(this.SLAKPIDemandIncidentTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SLAKPIDemandIncidentTypes).click();
   }

    // Navigate to sub types ( Sub module : Notifications and Reminders)

   async gotoReminders() {
     await this.page.locator(this.Reminders).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Reminders).click();
   }

   // Navigate to sub types ( Sub module : Data Setup )
   async gotoIncidentGroups() {
     await this.page.locator(this.IncidentGroups).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.IncidentGroups).click();
   }

   async gotoIncidentTypes() {
     await this.page.locator(this.IncidentTypes).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.IncidentTypes).click();
   }

   async gotoTaskPriorities() {
     await this.page.locator(this.TaskPriorities).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.TaskPriorities).click();
   }

   async gotoProfessions() {
     await this.page.locator(this.Professions).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Professions).click();
   }

   // Navigate to sub types ( Sub module : Configuarion)
   async gotoAccessConfigurations() {
     await this.page.locator(this.AccessConfiguraions).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AccessConfiguraions).click();
   }
}

module.exports = HelpdeskManagement;













