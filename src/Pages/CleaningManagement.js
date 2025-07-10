const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class CleaningManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.projectManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Cleaning management']";

    // Sub module locators
    this.LocationsOverview = "div[aria-label='Locations overview Process step']";
    this.CleaningZones = "div[aria-label='Cleaning zones Process step']";
    this.CleaningPlanning = "div[aria-label='Cleaning planning Process step']";
    this.CleaningPlanningZones = "div[aria-label='Cleaning planning zones Process step']";
    this.Admin = "div[aria-label='Admin Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

     // Sub Types locators ( Sub module : Locations Overview )
     this.Buildings = "div[aria-label='Buildings Process step item']";
     this.BuildingSpaces = "div[aria-label='Building spaces Process step item']";

     // Sub Types locators ( Sub module : Cleaning Zones )
     this.CleaningZones = "div[aria-label='Cleaning zones Process step item']";

     // Sub Types locators ( Sub module : Cleaning Planning )
     this.BuildingSpaces = "div[aria-label='Building spaces Process step item']";
     this.CleaningModels = "div[aria-label='Cleaning models Process step item']";
     this.PPMRegistration = "div[aria-label='PPM registration Process step item']";
     this.ApprovedPPM = "div[aria-label='Approved PPM Process step item']";
     this.WorkOrders = "div[aria-label='Work orders Process step item']";
     this.CleaningQualityInspections = "div[aria-label='Cleaning quality inspections Process step item']";
     this.Insta800Inspections = "div[aria-label='Insta800 inspections Process step item']";
     this.CheckItem = "div[aria-label='Check item (Cleaning quality) Process step item']";
     this.YearlyReports = "div[aria-label='Yearly reports Process step item']";
     this.Calculations = "div[aria-label='Calculations Process step item']";

     // Sub Types locators ( Sub module : Cleaning Planning Zones)
     this.CleaningZones = "div[aria-label='Cleaning zones Process step item']";
     this.CleaningTeams = "div[aria-label='Cleaning teams Process step item']";

     // Sub Types locators ( Sub module : Admin )
     this.Insta800QualityMatrix = "div[aria-label='Insta800 quality matrix Process step item']";
     this.CleaningModels = "div[aria-label='Cleaning models Process step item']";
     this.CleaningFrequencyColors = "div[aria-label='Cleaning frequency colors Process step item']";
     this.CleaningTeams = "div[aria-label='Cleaning teams Process step item']";
     this.SpaceUsages = "div[aria-label='Space usages Process step item']";
     this.SurfaceTypes = "div[aria-label='Surface types Process step item']";
     this.CleaningTeamProfiles = "div[aria-label='Cleaning team profiles Process step item']";

     // Sub Types locators ( Sub module : Configuration )
     this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";
   }

  async gotoCleaningManagement() {
    await this.page.waitForTimeout(3000);
    const cleaningManagement = this.page.locator(this.cleaningManagement).first();
    await cleaningManagement.waitFor({ state: 'attached', timeout: 10000 });
    await cleaningManagement.evaluate((node) => node.click());
   }

     // Navigate to sub modules
   async gotoLocationsOverview() {
     await this.page.locator(this.LocationsOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LocationsOverview).click();
   }

  async gotoCleaningZones() {
     await this.page.locator(this.CleaningZones).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CleaningZones).click();
   }

   async gotoCleaningPlanning() {
     await this.page.locator(this.CleaningPlanning).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CleaningPlanning).click();
   }

   async gotoCleaningPlanningZones() {
     await this.page.locator(this.CleaningPlanningZones).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CleaningPlanningZones).click();
   }

   async gotoAdmin() {
     await this.page.locator(this.Admin).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Admin).click();
   }

   async gotoConfiguration() {
     await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Configuration).click();
   }

    // Navigate to sub types ( Sub module : Locations Overview)
    async gotoBuildings() {
      await this.page.locator(this.Buildings).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Buildings).click();
    }

    async gotoBuildingSpaces() {
      await this.page.locator(this.BuildingSpaces).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.BuildingSpaces).click();
    }

    // Navigate to sub types ( Sub module : Cleaning Zones  )
    async gotoCleaningZonesSubType() {
      await this.page.locator(this.CleaningZones).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.CleaningZones).click();
    }

    // Navigate to sub types ( Sub module : Cleaning Planning )

    async gotoBuildingSpacesPlanning() {
       await this.page.locator(this.BuildingSpaces).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.BuildingSpaces).click();
    }

    async gotoCleaningModelsPlanning() {
       await this.page.locator(this.CleaningModels).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningModels).click();
    }

    async gotoPPMRegistration() {
       await this.page.locator(this.PPMRegistration).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.PPMRegistration).click();
    }
    
    async gotoApprovedPPM() {
       await this.page.locator(this.ApprovedPPM).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.ApprovedPPM).click();
    }

    async gotoWorkOrders() {
       await this.page.locator(this.WorkOrders).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.WorkOrders).click();
    }

    async gotoCleaningQualityInspections() {
       await this.page.locator(this.CleaningQualityInspections).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningQualityInspections).click();
    }

    async gotoInsta800Inspections() {
       await this.page.locator(this.Insta800Inspections).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Insta800Inspections).click();
    }

    async gotoCheckItem() {
       await this.page.locator(this.CheckItem).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CheckItem).click();
    }

    async gotoYearlyReports() {
       await this.page.locator(this.YearlyReports).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.YearlyReports).click();
    }

    async gotoCalculations() {
       await this.page.locator(this.Calculations).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Calculations).click();
    }

    // Navigate to sub types ( Sub module : Cleaning Planning Zones )
    async gotoCleaningZonesPlanningZones() {
       await this.page.locator(this.CleaningZones).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningZones).click();
    }

    async gotoCleaningTeamsPlanningZones() {
       await this.page.locator(this.CleaningTeams).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningTeams).click();
    }

    // Navigate to sub types ( Sub module : Admin )
    async gotoInsta800QualityMatrix() {
       await this.page.locator(this.Insta800QualityMatrix).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Insta800QualityMatrix).click();
    }

    async gotoCleaningModelsAdmin() {
       await this.page.locator(this.CleaningModels).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningModels).click();
    }

    async gotoCleaningFrequencyColors() {
       await this.page.locator(this.CleaningFrequencyColors).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningFrequencyColors).click();
    }

    async gotoCleaningTeamsAdmin() {
       await this.page.locator(this.CleaningTeams).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningTeams).click();
    }

    async gotoSpaceUsages() {
       await this.page.locator(this.SpaceUsages).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.SpaceUsages).click();
    }

    async gotoSurfaceTypes() {
       await this.page.locator(this.SurfaceTypes).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.SurfaceTypes).click();
    }

    async gotoCleaningTeamProfiles() {
       await this.page.locator(this.CleaningTeamProfiles).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.CleaningTeamProfiles).click();
    }

    // Navigate to sub types ( Sub module : Configuration )
    async gotoAccessConfiguration() {
       await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.AccessConfiguration).click();
    }
}

module.exports = CleaningManagement;
















