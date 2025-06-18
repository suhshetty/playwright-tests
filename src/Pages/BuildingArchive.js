// src/Pages/BuildingArchive.js
const BasePage = require("./BasePage");

const { expect } = require('@playwright/test');

class BuildingArchive extends BasePage {
  constructor(page) {
    super(page);
    this.buildingArchive = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Building archive']";

    this.groundRegistration = '#GroundRegistration';
    this.sitesBtn = '#BuildingArchive-GroundRegistration-Ground';
    this.newSiteBtn = "//button[@aria-label='Register new site']";

    this.siteNameField = "//input[@id='Modal1_TFNamePart']";

    this.saveBtn = '#Modal1SaveNav';
    this.successMsg = '#swal2-html-container';
  }

  async clickBuildingArchive() {
    await this.page.waitForTimeout(3000);
    const buildingArchive = this.page.locator(this.buildingArchive).first();
    await buildingArchive.waitFor({ state: 'attached', timeout: 10000 });
    await buildingArchive.evaluate((node) => node.click()); 
  }

  async gotoSiteRegistration() {
    await this.page.locator(this.groundRegistration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.groundRegistration).click();
  }

  async gotoSites() {
    await this.page.locator(this.sitesBtn).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.sitesBtn).click();
  }

  async registerNewSite(sitename) {
    const newSiteBtn = this.page.locator(this.newSiteBtn);
    await newSiteBtn.waitFor({ state: 'visible', timeout: 5000 });
    await newSiteBtn.click();

    // Wait for the input to become editable in new site registration modal
    const input = this.page.locator(this.siteNameField);
    await input.waitFor({ state: 'visible' });
    await input.fill(sitename);

    await this.page.locator(this.saveBtn).click();

    await this.page.locator(this.successMsg).waitFor({ state: 'visible' });
    await expect(this.page.locator(this.successMsg)).toHaveText("Your work has been saved");

  }

}

module.exports = BuildingArchive;