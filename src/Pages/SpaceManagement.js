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

    //Sub Types locators ( Sub module : Configuration Maintenance incidents)
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

    // Sub Types locators ( Sub module : Test ÞT )
    this.WorkOrderHours = "div[aria-label='Work order hours Process step item']";

    //Add new data locators
    //this.newBuildingSpaceBtn = "//button[@aria-label='Register new building space']";
    // this.SiteDropDown = "//span[@aria-label='select2-MainManFilter_TFGroundID-container']";
    // this.spaceDropDownArrow = "(//span[@class ='select2-selection__arrow'])[3]";
    // this.SiteDropDownTextBox = "//input[@class='select2-search__field' and @placeholder='Nothing selected']";
    //this.newDrawingBtn = "//button[@aria-label='This action registers documents based on selected files - MultiRegisterDocument']";
   // this.newSpaceManagementScenarios = "//button[@aria-label='Register new space management scenario']";
   // this.newKeyToLocks = "//button[@aria-label='Register new key to lock (Standard) - Standard']";
   // this.newWorkOrderHours = "//button[@aria-label='Register my hours - RegisterMyHours']";
    this.Add = "#newRecordButton"
    this.CloseButton = [
      "(//i[@title='Close window (alt+x)'])", 
      "//i[@title='Close window ()']"
    ];
  }

async Close() {
  await this.page.waitForTimeout(1000);
  for (let i = 0; i < this.CloseButton.length; i++) {
    try {
      await this.page.waitForTimeout(1000);

      const closeButton = this.page.locator(this.CloseButton[i]);
      if (await closeButton.isVisible()) {
        //console.log("Found visible close button at index ${i}");
        await closeButton.click();
        await this.page.waitForTimeout(1000);
        return;
      }
    } catch (error) {
      console.log(`⏭️ Close button at index ${i} failed: ${error.message}`);
      continue;
    }
  }
}


  async clickSpaceManagement() {
    await this.page.waitForTimeout(3000);
    const SpaceManagement = this.page.locator(this.spaceManagement).first();
    await SpaceManagement.waitFor({ state: 'attached', timeout: 10000 });
    await SpaceManagement.evaluate((node) => node.click());
  }

  async gotoBuildingSpaceOverview() {
    await this.page.locator(this.BuildingSpaceOverview).click();
  }

  async gotoLocateOrganisation() {
    await this.page.locator(this.LocateOrganisation).click();
  }

  async gotoLocateEquipment() {
    await this.page.locator(this.LocateEquipment).click();
  }

  async gotoKeyManagement() {
    await this.page.locator(this.KeyManagement).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).click();
  }

  async gotoTestÞT() {
    await this.page.locator(this.TestÞT).click();
  }

  async gotoBuildingSpaces() {
    await this.page.locator(this.BuildingSpace).click();
  }

  async gotoBuildingSpaceInformation() {
    await this.page.locator(this.BuildingSpaceInformation).click();
  }

  async gotoDrawing() {
    await this.page.locator(this.Drawing).click();
  }

  async gotoLocateOrganisationSubType() {
    await this.page.locator(this.LocateOrganisationSubType).click();
  }

  async gotoObjectOwner() {
    await this.page.locator(this.ObjectOwner).click();
  }

  async gotoSpaceManagementScenario() {
    await this.page.locator(this.SpaceManagementScenario).click();
  }

  async gotoLocateEquipmentSubType() {
    await this.page.locator(this.LocateEquipmentSubType).click();
  }

  async gotoKeyToLock() {
    await this.page.locator(this.KeyToLock).click();
  }

  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).click();
  }

  async gotoWorkOrderHours() {
    await this.page.locator(this.WorkOrderHours).click();
  }

  async clickRegisterNewBuildingSpace(){
    await this.page.locator(this.Add).click();
await this.Close();
  }

  // async clickRegisterDrawings(){
  //   await this.page.locator(this.SiteDropDown).waitFor({ state: 'visible', timeout: 10000 });
  //   await this.page.locator(this.SiteDropDown).click();
  //   await this.page.waitForTimeout(2000);

  //   await this.selectDropdownOptionByText(
  //     this.page.locator('li[role="treeitem"]'), 
  //     'Activity center'
  //   );
  //   await this.page.waitForTimeout(500);
    
  //   await this.page.locator(this.Add).click();
  // }

  async clickRegisterSpaceManagementScenario(){
    await this.page.locator(this.Add).click();
await this.Close();

  }

  async clickRegisterKeyToLocks(){
    await this.page.locator(this.Add).click();
await this.Close();
  }

  async clickRegisterWorkOrderHours(){
    await this.page.locator(this.Add).click();
await this.Close();
  }


  }



module.exports = SpaceManagement;

