const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class SpaceManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.spaceManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Space management']";

    // Sub module locators
    this.BuildingSpaceOverview = "div[aria-label='Building space overview Process step']";
    this.LocateOrganisation = "div[aria-label='Locate organisation Process step']";
    this.LocateEquipment = "div[aria-label='Locate equipment Process step']";
    this.KeyManagement = "div[aria-label='Key management Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";
    this.TestÞT = "div[aria-label='Test ÞT Process step']";

    // Sub Types locators ( Sub module : Building Space Overview )
    this.BuildingSpace = "div[aria-label='Building spaces Process step item']";
    this.BuildingSpaceInformation = "div[aria-label='Building space Informations Process step item']";
    this.Drawing = "div[aria-label='Drawings Process step item']";

    // Sub Types locators ( Sub module : Locate Organisation )
    this.LocateOrganisationSubType = "div[aria-label='Locate organisations Process step item']";
    this.ObjectOwner = "div[aria-label='Object owners Process step item']";
    this.SpaceManagementScenario = "div[aria-label='Space management scenarios Process step item']";

    // Sub Types locators ( Sub module : Locate Equipment )
    this.LocateEquipmentSubType = "div[aria-label='Locate equipment Process step item']";

    // Sub Types locators ( Sub module : Key Management )
    this.KeyToLock = "div[aria-label='Key to locks Process step item']";

    //Sub Types locators ( Sub module : Configuration )
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

    // Sub Types locators ( Sub module : Test ÞT )
    this.WorkOrderHours = "div[aria-label='Work order hours Process step item']";
  }
    async clickSpaceManagement() {
        await this.page.waitForTimeout(3000);
        const SpaceManagement = this.page.locator(this.spaceManagement).first();
        await SpaceManagement.waitFor({ state: 'attached', timeout: 10000 });
        await SpaceManagement.evaluate((node) => node.click());
    }

    //Navigate to Sub modules
    async gotoBuildingSpaceOverview() {
        await this.page.locator(this.BuildingSpaceOverview).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.BuildingSpaceOverview).click();
    }
    
    async gotoLocateOrganisation() {
        await this.page.locator(this.LocateOrganisation).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.LocateOrganisation).click();     
    }

    async gotoLocateEquipment() {
        await this.page.locator(this.LocateEquipment).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.LocateEquipment).click();    
    } 

    async gotoKeyManagement() {
        await this.page.locator(this.KeyManagement).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.KeyManagement).click();    
    } 

    async gotoConfiguration() {
        await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.Configuration).click();
    }

    async gotoTestÞT() {
        await this.page.locator(this.TestÞT).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.TestÞT).click(); 
    }


    // Navigate to sub types in Building Space Overview
    async gotoBuildingSpaces() {
        await this.page.locator(this.BuildingSpace).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.BuildingSpace).click();
    }
    
    async gotoBuildingSpaceInformation() {
        await this.page.locator(this.BuildingSpaceInformation).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.BuildingSpaceInformation).click();
    }
    
    async gotoDrawing() {
        await this.page.locator(this.Drawing).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.Drawing).click();
    }

    // Navigate to sub types in Location Organisation
    async gotoLocateOrganisationSubType() {
        await this.page.locator(this.LocateOrganisationSubType).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.LocateOrganisationSubType).click();
    }

    async gotoObjectOwner() {
        await this.page.locator(this.ObjectOwner).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.ObjectOwner).click();
    }

    async gotoSpaceManagementScenario() {
        await this.page.locator(this.SpaceManagementScenario).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.SpaceManagementScenario).click();
    }

    // Navigate to sub types in Locate Equipment
    async gotoLocateEquipmentSubType() {
        await this.page.locator(this.LocateEquipmentSubType).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.LocateEquipmentSubType).click();
    }

    // Navigate to sub types in Key Management
    async gotoKeyToLock() {
        await this.page.locator(this.KeyToLock).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.KeyToLock).click();
    }

    // Navigate to sub types in Configuration
    async gotoAccessConfiguration() {
        await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.AccessConfiguration).click();
    }

    // Navigate to sub types in Test ÞT
    async gotoWorkOrderHours() {
        await this.page.locator(this.WorkOrderHours).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.WorkOrderHours).click();
    }

  }

module.exports = SpaceManagement;

