const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class DigitalDelivery extends BasePage {
  constructor(page) {
    super(page);

    // Module locator
    this.digitalDelivery = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Digital delivery']";

    // Sub module locators
    this.DigitalDeliverySub = "div[aria-label='Digital delivery Process step']";
    this.BuildingSystems = "div[aria-label='Building systems Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Digital Delivery Sub type
    this.ProductData = "div[aria-label='Product data Process step item']";
    this.ProductDataTask = "div[aria-label='Product data tasks Process step item']";
    this.ProductDataComponent = "div[aria-label='Product data components Process step item']";
    this.ProductDataTechnicalInformation = "div[aria-label='Product data technical informations Process step item']";
    this.EPD = "div[aria-label='EPDs Process step item']";

    // Sub Types locators (Sub module : Building systems)
    this.RegisterBuildingComponents = "div[aria-label='Register building components Process step item']";
    this.RegisterBuildingComponentsCSS = "div[aria-label='Register building components (CCS) Process step item']";
    this.FunctionalSystemCSS = "div[aria-label='Functional systems (CCS)  Process step item']";
    this.TechnicalSystemCSS = "div[aria-label='Technical systems (CCS) Process step item']";
    this.ComponentsCSS = "div[aria-label='Components (CCS) Process step item']";
    this.FunctionalSystem = "div[aria-label='Functional systems Process step item']";
    this.TechnicalSystem = "div[aria-label='Technical systems Process step item']";
    this.Component = "div[aria-label='Components Process step item']";

    // Sub Types locators (Sub module : Configuration)
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";
  }

  async clickDigitalDelivery() {
    await this.page.waitForTimeout(3000);

    try {
      const allElements = this.page.locator(this.digitalDelivery);
      const count = await allElements.count();

      // Try to click a visible element
      for (let i = 0; i < count; i++) {
        const element = allElements.nth(i);
        const isVisible = await element.isVisible();

        if (isVisible) {
          try {
            await element.scrollIntoViewIfNeeded();
            await element.click({ force: true, timeout: 5000 });
            return; // Success, exit method
          } catch (error) {
            // If regular click fails, try JavaScript click
            await element.evaluate((node) => node.click());
            return; // Success, exit method
          }
        }
      }

      // If no visible element found, try first element with JavaScript
      if (count > 0) {
        await allElements.first().evaluate((node) => node.click());
      }

    } catch (error) {
      console.error('Digital Delivery click failed:', error.message);
      throw error;
    }

    await this.page.waitForTimeout(3000);
  }

  async gotoDigitalDeliverySub() {
    await this.page.locator(this.DigitalDeliverySub).scrollIntoViewIfNeeded();
    await this.page.locator(this.DigitalDeliverySub).click();
  }

  async gotoProductData() {
    await this.page.locator(this.ProductData).scrollIntoViewIfNeeded();
    await this.page.locator(this.ProductData).click();
  }

  async gotoProductDataTask() {
    await this.page.locator(this.ProductDataTask).scrollIntoViewIfNeeded();
    await this.page.locator(this.ProductDataTask).click();
  }

  async gotoProductDataComponent() {
    await this.page.locator(this.ProductDataComponent).scrollIntoViewIfNeeded();
    await this.page.locator(this.ProductDataComponent).click();
  }

  async gotoProductDataTechnicalInformation() {
    await this.page.locator(this.ProductDataTechnicalInformation).scrollIntoViewIfNeeded();
    await this.page.locator(this.ProductDataTechnicalInformation).click();
  }

  async gotoEPD() {
    await this.page.locator(this.EPD).scrollIntoViewIfNeeded();
    await this.page.locator(this.EPD).click();
  }

  async gotoBuildingSystems() {
    await this.page.locator(this.BuildingSystems).scrollIntoViewIfNeeded();
    await this.page.locator(this.BuildingSystems).click();
  }

  async gotoRegisterBuildingComponents() {
    await this.page.locator(this.RegisterBuildingComponents).scrollIntoViewIfNeeded();
    await this.page.locator(this.RegisterBuildingComponents).click();
  }

  async gotoRegisterBuildingComponentsCSS() {
    await this.page.locator(this.RegisterBuildingComponentsCSS).scrollIntoViewIfNeeded();
    await this.page.locator(this.RegisterBuildingComponentsCSS).click();
  }

  async gotoFunctionalSystemCSS() {
    await this.page.locator(this.FunctionalSystemCSS).scrollIntoViewIfNeeded();
    await this.page.locator(this.FunctionalSystemCSS).click();
  }

  async gotoTechnicalSystemCSS() {
    await this.page.locator(this.TechnicalSystemCSS).scrollIntoViewIfNeeded();
    await this.page.locator(this.TechnicalSystemCSS).click();
  }

  async gotoComponentsCSS() {
    await this.page.locator(this.ComponentsCSS).scrollIntoViewIfNeeded();
    await this.page.locator(this.ComponentsCSS).click();
  }

  async gotoFunctionalSystem() {
    await this.page.locator(this.FunctionalSystem).scrollIntoViewIfNeeded();
    await this.page.locator(this.FunctionalSystem).click();
  }

  async gotoTechnicalSystem() {
    await this.page.locator(this.TechnicalSystem).scrollIntoViewIfNeeded();
    await this.page.locator(this.TechnicalSystem).click();
  }

  async gotoComponent() {
    await this.page.locator(this.Component).scrollIntoViewIfNeeded();
    await this.page.locator(this.Component).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).scrollIntoViewIfNeeded();
    await this.page.locator(this.Configuration).click();
  }

  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).scrollIntoViewIfNeeded();
    await this.page.locator(this.AccessConfiguration).click();
  }
}

module.exports = DigitalDelivery;