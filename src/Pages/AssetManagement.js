const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class AssetManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.assetManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Asset management']";

    // Sub module locators
    this.EquipmentOverview = "div[aria-label='Equipment overview Process step']";
    this.VehiclesOverview = "div[aria-label='Vehicles overview Process step']";
    this.ArtifactsOverview = "div[aria-label='Artifacts overview Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Equipment Overview)
    this.Equipment = "div[aria-label='Equipment Process step item']";
    this.LocateEquipment = "div[aria-label='Locate equipment Process step item']";
    this.Phones = "div[aria-label='Phones Process step item']";
    this.TechnicalInformation = "div[aria-label='Technical information Process step item']";

    // Sub Types locators ( Sub module : Vehicles Overview)
    this.Vehicles = "div[aria-label='Vehicles Process step item']";

    // Sub Types locators ( Sub module : Artifacts Overview)
    this.Artifacts = "div[aria-label='Artifacts Process step item']";
    this.Artists = "div[aria-label='Artists Process step item']";
    this.LocateArtifacts = "div[aria-label='Locate artifacts Process step item']";

    // Sub Types locators ( Sub module : Data Setup)
    this.EquipmentGroups = "div[aria-label='Equipment groups Process step item']";
    this.EquipmentTypes = "div[aria-label='Equipment types Process step item']";
    this.ProductTypes = "div[aria-label='Product types Process step item']";
    this.ServicePartnersGlobal = "div[aria-label='Service partner globals Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";
  }

  async gotoAssetManagement() {
    await this.page.waitForTimeout(3000);
    const assetManagement = this.page.locator(this.assetManagement).first();
    await assetManagement.waitFor({ state: 'attached', timeout: 10000 });
    await assetManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
  async gotoEquipmentOverview() {
    await this.page.locator(this.EquipmentOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EquipmentOverview).click();
  }

  async gotoVehiclesOverview() {
    await this.page.locator(this.VehiclesOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.VehiclesOverview).click();
  }

  async gotoArtifactsOverview() {
    await this.page.locator(this.ArtifactsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ArtifactsOverview).click();
  } 

  async gotoDataSetup() {
    await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  } 

  // Navigate to sub types ( Sub module : Equipment Overview)
  async gotoEquipment() {
    await this.page.locator(this.Equipment).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Equipment).click();
  }

  async gotoLocateEquipment() {
    await this.page.locator(this.LocateEquipment).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LocateEquipment).click();
  }

  async gotoPhones() {
    await this.page.locator(this.Phones).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Phones).click();
  }

  async gotoTechnicalInformation() {
    await this.page.locator(this.TechnicalInformation).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalInformation).click();
  }

  // Navigate to sub types ( Sub module : Vehicles Overview)
  async gotoVehicles() {
    await this.page.locator(this.Vehicles).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Vehicles).click();
  }

  // Navigate to sub types ( Sub module : Artifacts Overview)
  async gotoArtifacts() {
    await this.page.locator(this.Artifacts).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Artifacts).click();
  }

  async gotoArtists() {
    await this.page.locator(this.Artists).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Artists).click();
  }

  async gotoLocateArtifacts() { 
    await this.page.locator(this.LocateArtifacts).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LocateArtifacts).click();
  }

  // Navigate to sub types ( Sub module : Data Setup)
  async gotoEquipmentGroups() {
    await this.page.locator(this.EquipmentGroups).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EquipmentGroups).click();
  }

  async gotoEquipmentTypes() {
    await this.page.locator(this.EquipmentTypes).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EquipmentTypes).click();
  } 

  async gotoProductTypes() {
    await this.page.locator(this.ProductTypes).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductTypes).click();
  }

  async gotoServicePartnerGlobal() {
    await this.page.locator(this.ServicePartnerGlobal).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ServicePartnerGlobal).click();
  } 

  // Navigate to sub types ( Sub module : Configuration)

  async gotoAccessConfigurations() {
    await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AccessConfigurations).click();
  }

}

module.exports = AssetManagement;


