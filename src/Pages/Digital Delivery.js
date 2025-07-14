const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class DigitalDelivery extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.DigitalDelivery = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Digital delivery']";

    // Sub module locators
    this.DigitalDeliverySubModule = "div[aria-label='Digital delivery Process step']";
    this.BuildingSystems = "div[aria-label='Building systems Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Digital Delivery )
    this.ProductData = "div[aria-label='Product data Process step item']";
    this.ProductDataTask = "div[aria-label='Product data tasks Process step item']";
    this.ProductDataComponent = "div[aria-label='Product data components Process step item']";
    this.ProductDataTechnicalInformation = "div[aria-label='Product data technical informations Process step item']";
    this.EPD = "div[aria-label='EPDs Process step item']";

    // Sub Types locators ( Sub module : Building Systems )
    this.RegisterBuildingComponents = "div[aria-label='Register building components Process step item']";
    this.RegisterBuildingComponentsCSS = "div[aria-label='Register building components (CCS) Process step item']";
    this.FunctionalSystemCSS = "div[aria-label='Functional systems (CCS)  Process step item']";
    this.TechnicalSystemCSS = "div[aria-label='Technical systems (CCS) Process step item']";
    this.ComponentsCSS = "div[aria-label='Components (CCS) Process step item']";
    this.SensorsCSS = "div[aria-label='Sensors (CCS) Process step item']";
    this.FunctionalSystem = "div[aria-label='Functional systems Process step item']";
    this.TechnicalSystem = "div[aria-label='Technical systems Process step item']";
    this.Component = "div[aria-label='Components Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

  }

  async clickDigitalDelivery() {
    await this.page.waitForTimeout(3000);
    const DigitalDelivery = this.page.locator(this.DigitalDelivery).first();
    await DigitalDelivery.waitFor({ state: 'attached', timeout: 10000 });
    await DigitalDelivery.evaluate((node) => node.click());
  }

  // Navigate to sub modules
  async gotoDigitalDeliverySubModule() {
    await this.page.locator(this.DigitalDeliverySubModule).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DigitalDeliverySubModule).click();
  }

  async gotoBuildingSystems() {
    await this.page.locator(this.BuildingSystems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BuildingSystems).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

  // Navi gate to sub types in Digital Delivery 
  async gotoProductData() {
    await this.page.locator(this.ProductData).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductData).click();
  }

  async gotoProductDataTask() {
    await this.page.locator(this.ProductDataTask).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductDataTask).click();
  }

  async gotoProductDataComponent() {
    await this.page.locator(this.ProductDataComponent).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductDataComponent).click();
  }

  async gotoProductDataTechnicalInformation() {
    await this.page.locator(this.ProductDataTechnicalInformation).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductDataTechnicalInformation).click();
  }

  async gotoEPD() {
    await this.page.locator(this.EPD).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EPD).click();
  }

  // Navigate to sub types in Building Systems
  async gotoRegisterBuildingComponents() {
    await this.page.locator(this.RegisterBuildingComponents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterBuildingComponents).click();
  }

  async gotoRegisterBuildingComponentsCSS() {
    await this.page.locator(this.RegisterBuildingComponentsCSS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterBuildingComponentsCSS).click();
  }

  async gotoFunctionalSystemCSS() {
    await this.page.locator(this.FunctionalSystemCSS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.FunctionalSystemCSS).click();
  }

  async gotoTechnicalSystemCSS() {
    await this.page.locator(this.TechnicalSystemCSS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalSystemCSS).click();
  }

  async gotoComponentsCSS() {
    await this.page.locator(this.ComponentsCSS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ComponentsCSS).click();
  }

  async gotoFunctionalSystem() {
    await this.page.locator(this.FunctionalSystem).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.FunctionalSystem).click();
  }

  async gotoTechnicalSystem() {
    await this.page.locator(this.TechnicalSystem).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalSystem).click();
  }

  async gotoComponent() {
    await this.page.locator(this.Component).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Component).click();
  }

  // Navigate to sub types in Configuration
  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AccessConfiguration).click();
  } 
}
