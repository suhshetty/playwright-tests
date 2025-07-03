const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class DocumentManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.documentManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Document management']";

    // Sub module locators
    this.DocumentOverview = "div[aria-label='Documents overview Process step']";
    this.ManualsOverview = "div[aria-label='Manuals overview Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : DocumentOverview)
    this.DocumentSearches = "div[aria-label='Document searches Process step item']";
    this.Pictures = "div[aria-label='Pictures Process step item']";
    this.Drawings = "div[aria-label='Drawings Process step item']";
    this.Documents = "div[aria-label='Documents Process step item']";
    this.DocumentStack = "div[aria-label='Document stack Process step item']";

    // Sub Types locators ( Sub module : ManualsOverview)
    this.ManualChapters = "div[aria-label='Manual chapters Process step item']";
    this.ManualDefinitions = "div[aria-label='Manual definitions Process step item']";
    this.ManualSubscribers = "div[aria-label='Manual subscribers Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";
  }

  async clickDocumentManagement() {
    await this.page.waitForTimeout(3000);
    const documentManagement = this.page.locator(this.documentManagement).first();
    await documentManagement.waitFor({ state: 'attached', timeout: 10000 });
    await documentManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
  async gotoDocumentOverview() {
    await this.page.locator(this.DocumentOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentOverview).click();
  }

  async gotoManualsOverview() {
    await this.page.locator(this.ManualsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualsOverview).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

  // Navigate to sub types ( Sub module : DocumentsOverview)
  async gotoDocumentSearches() {
    await this.page.locator(this.DocumentSearches).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentSearches).click();
  }

  async gotoPictures() {
    await this.page.locator(this.Pictures).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Pictures).click();
  }

  async gotoDrawings() {
    await this.page.locator(this.Drawings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Drawings).click();
  }

  async gotoDocuments() {
    await this.page.locator(this.Documents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Documents).click();
  }

  async gotoDocumentStack() {
    await this.page.locator(this.DocumentStack).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentStack).click();
  }

  // Navigate to sub types ( Sub module : ManualsOverview)
  async gotoManualChapters() {
    await this.page.locator(this.ManualChapters).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualChapters).click();
  }

  async gotoManualDefinitions() {
    await this.page.locator(this.ManualDefinitions).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualDefinitions).click();
  }

  async gotoManualSubscribers() {
    await this.page.locator(this.ManualSubscribers).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualSubscribers).click();
  }

  // Navigate to sub types ( Sub module : Configuration)
  async gotoAccessConfigurations() {
    await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AccessConfigurations).click();
  }

}

module.exports = DocumentManagement;
