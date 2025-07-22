const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class DigitalDelivery extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locator
    this.digitalDelivery = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Digital delivery']";

    // Sub module locators
    this.ProductData = "div[aria-label='Product data Process step']";
    this.EPD = "div[aria-label='EPD Process step']";
    this.BuildingSystems = "div[aria-label='Building systems Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators (Sub module : Product data)
    this.ProductDataTask = "div[aria-label='Product data task Process step item']";
    this.ProductDataComponent = "div[aria-label='Product data component Process step item']";
    this.ProductDataTechnicalInformation = "div[aria-label='Product data technical information Process step item']";

    // Sub Types locators (Sub module : Building systems)
    this.RegisterBuildingComponents = "div[aria-label='Register building components Process step item']";
    this.RegisterBuildingComponentsCSS = "div[aria-label='Register building components CSS Process step item']";
    this.FunctionalSystemCSS = "div[aria-label='Functional system CSS Process step item']";
    this.TechnicalSystemCSS = "div[aria-label='Technical system CSS Process step item']";
    this.ComponentsCSS = "div[aria-label='Components CSS Process step item']";
    this.FunctionalSystem = "div[aria-label='Functional system Process step item']";
    this.TechnicalSystem = "div[aria-label='Technical system Process step item']";
    this.Component = "div[aria-label='Component Process step item']";

    // Sub Types locators (Sub module : Configuration)
    this.AccessConfiguration = "div[aria-label='Access configuration Process step item']";
  }

  async clickDigitalDelivery() {
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.digitalDelivery).click();
  }

  async gotoProductData() {
    await this.page.locator(this.ProductData).click();
  }

  async gotoProductDataTask() {
    await this.page.locator(this.ProductDataTask).click();
  }

  async gotoProductDataComponent() {
    await this.page.locator(this.ProductDataComponent).click();
  }

  async gotoProductDataTechnicalInformation() {
    await this.page.locator(this.ProductDataTechnicalInformation).click();
  }

  async gotoEPD() {
    await this.page.locator(this.EPD).click();
  }

  async gotoBuildingSystems() {
    await this.page.locator(this.BuildingSystems).click();
  }

  async gotoRegisterBuildingComponents() {
    await this.page.locator(this.RegisterBuildingComponents).click();
  }

  async gotoRegisterBuildingComponentsCSS() {
    await this.page.locator(this.RegisterBuildingComponentsCSS).click();
  }

  async gotoFunctionalSystemCSS() {
    await this.page.locator(this.FunctionalSystemCSS).click();
  }

  async gotoTechnicalSystemCSS() {
    await this.page.locator(this.TechnicalSystemCSS).click();
  }

  async gotoComponentsCSS() {
    await this.page.locator(this.ComponentsCSS).click();
  }

  async gotoFunctionalSystem() {
    await this.page.locator(this.FunctionalSystem).click();
  }

  async gotoTechnicalSystem() {
    await this.page.locator(this.TechnicalSystem).click();
  }

  async gotoComponent() {
    await this.page.locator(this.Component).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).click();
  }

  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).click();
  }
}

module.exports = DigitalDelivery;