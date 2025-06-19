const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');



class BuildingArchive extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.buildingArchive = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Building archive']";

    // Sub module locators
    this.groundRegistration = '#GroundRegistration';
    this.locationsoverview = '#RegisterLocationStructure';

    // Sub Types locators
    this.sitesBtn = '#BuildingArchive-GroundRegistration-Ground';
    this.buildings = '#BuildingArchive-RegisterLocationStructure-Building';

    // Add new data locators
    this.newSiteBtn = "//button[@aria-label='Register new site']";
    this.newBuildingBtn = "//button[@aria-label='Register new building']";


    // Add new site locators
    this.siteName_Field = "//input[@id='Modal1_TFNamePart']";
    this.AddSitesSuccessMsg = '#swal2-html-container';
    this.AddSiteSaveBtn = '#Modal1SaveNav';

    // Add new building locators
    this.SelectSiteName_dropdown = "#select2-Modal1_TFGroundID-container";
    this.TypeSitename_Field = ".select2-container--open input.select2-search__field";
    this.waitingForSiteOptions = "ul#select2-Modal1_TFGroundID-results > li.select2-results__option";
    this.BuildingName = "#Modal1_TFNamePart";
    this.AddBuildingSuccessMsg = '#swal2-html-container';
    this.AddBuildingSaveBtn = '#Modal1SaveNav';

    //Common locators
    this.saveBtn = '#Modal1SaveNav';

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

  async gotoLocationsOverview() {
    await this.page.locator(this.locationsoverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.locationsoverview).click();
  }

  async gotoSites() {
    await this.page.locator(this.sitesBtn).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.sitesBtn).click();
  }

  async gotoBuildings() {
    await this.page.locator(this.buildings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.buildings).click();
  }

  async registerNewSite(siteName) {
    await this.page.locator(this.newSiteBtn).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.newSiteBtn).click();
    await this.page.locator(this.siteName_Field).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.siteName_Field).fill(siteName);
    await this.page.locator(this.AddSiteSaveBtn).click();
    await this.page.locator(this.AddSitesSuccessMsg).waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.page.locator(this.AddSitesSuccessMsg)).toHaveText("Your work has been saved");
  }

async registerNewBuilding(siteName, buildingName) {
  await this.page.locator(this.newBuildingBtn).waitFor({ state: 'visible', timeout: 5000 });
  await this.page.locator(this.newBuildingBtn).click();

  await this.page.locator(this.SelectSiteName_dropdown).waitFor({ state: 'visible', timeout: 5000 });
  await this.page.locator(this.SelectSiteName_dropdown).click();

  await this.page.locator(this.TypeSitename_Field).fill(siteName);
  await this.page.locator(this.waitingForSiteOptions).first().waitFor({ state: 'visible', timeout: 5000 });

  await this.selectDropdownOptionByText(this.page.locator(this.waitingForSiteOptions), siteName);

  await this.page.locator(this.BuildingName).waitFor({ state: 'visible', timeout: 5000 });
  await this.page.locator(this.BuildingName).fill(buildingName);

  await this.page.locator(this.AddBuildingSaveBtn).click();

  await this.page.locator(this.AddBuildingSuccessMsg).waitFor({ state: 'visible', timeout: 5000 });
  await expect(this.page.locator(this.AddBuildingSuccessMsg)).toHaveText("Your work has been saved");
}

}

module.exports = BuildingArchive;
