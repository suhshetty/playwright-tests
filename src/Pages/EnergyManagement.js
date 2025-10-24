// src/Pages/EnergyManagement.js
const BasePage = require("./BasePage");
const { smartLocator } = require("../utils/smartLocator");

class EnergyManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.energyManagement = "(//span[@class='m-menu__link-text mm-menu-link-text' and text()='Energy management'])[2]";

    // Sub module locators
    this.EnergyZonesOverview = "div[aria-label='Energy zones overview Process step']";
    this.WeatherStationsOverview = "div[aria-label='Weather stations overview Process step']";
    this.EnergyProviders1 = "div[aria-label='Energy providers Process step']";
    this.GaugesOverview = "div[aria-label='Gauges overview Process step']";
    this.EnergyProjects = "div[aria-label='Energy projects Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types (Energy Zones Overview)
    this.EnergyZones = "div[aria-label='Energy zones Process step item']";
    this.CreateZones = "div[aria-label='Create zones Process step item']";

    // Work Stations
    this.WeatherStations = "div[aria-label='Weather stations Process step item']";
    this.GlobalWeatherStations = "div[aria-label='Global weather stations Process step item']";
    this.WeatherStationNormalPeriod = "div[aria-label='Weather station normal periods Process step item']";

    // Energy Providers
    this.EnergyProviders2 = "div[aria-label='Energy providers Process step item']";

    // Gauges Overview sub-types
    this.EnergyZonesGO = "div[aria-label='Energy zones Process step item']";
    this.EnergyDistributions = "div[aria-label='Energy distributions Process step item']";
    this.EnergyProcesses = "div[aria-label='Energy processes Process step item']";
    this.Gauges = "div[aria-label='Gauges Process step item']";
    this.GaugesReadings = "div[aria-label='Gauge readings Process step item']";
    this.EnerkeyProfiles = "div[aria-label='EnerKey profiles Process step item']";

    // Energy Projects
    this.AnnualEnergyUsages = "div[aria-label='Annual energy usages Process step item']";
    this.EnergySavingsPotential = "div[aria-label='Energy saving potentials Process step item']";

    // Configuration sub-types
    this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";

    // Common action selectors
    this.Add = "#newRecordButton";
    this.Export = "button[aria-label='This action exports data - ExportData']";
    this.Close = ["i[title='Close window (alt+x)']", "//i[@title='Close window ()']"];
  }

  /* Module open */
  async gotoEnergyManagement() {
    await this.page.waitForTimeout(3000);
    const el = this.page.locator(this.energyManagement).first();
    await el.waitFor({ state: "attached", timeout: 10000 });
    await el.evaluate(node => node.click());
  }

  /* Sub-module navigations */
  async gotoEnergyZonesOverview() {
    await this.page.locator(this.EnergyZonesOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyZonesOverview).click();
  }

  async gotoEnergyZones() {
    await this.page.locator(this.EnergyZones).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyZones).click();
  }

  async gotoCreateZones() {
    await this.page.locator(this.CreateZones).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CreateZones).click();
  }

  async gotoWeatherStationsOverview() {
    await this.page.locator(this.WeatherStationsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WeatherStationsOverview).click();
  }

  async gotoWeatherStations() {
    await this.page.locator(this.WeatherStations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WeatherStations).click();
  }

  async gotoGlobalWeatherStations() {
    await this.page.locator(this.GlobalWeatherStations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.GlobalWeatherStations).click();
  }

  async gotoWeatherStationNormalPeriod() {
    await this.page.locator(this.WeatherStationNormalPeriod).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.WeatherStationNormalPeriod).click();
  }

  async gotoEnergyProviders() {
    await this.page.locator(this.EnergyProviders1).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyProviders1).click();
  }

  async gotoEnergyProvidersSubType() {
    await this.page.locator(this.EnergyProviders2).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyProviders2).click();
  }

  async gotoGaugesOverview() {
    await this.page.locator(this.GaugesOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.GaugesOverview).click();
  }

  async gotoEnergyZonesGO() {
    await this.page.locator(this.EnergyZonesGO).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyZonesGO).click();
  }

  async gotoEnergyDistributions() {
    await this.page.locator(this.EnergyDistributions).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyDistributions).click();
  }

  async gotoEnergyProcesses() {
    await this.page.locator(this.EnergyProcesses).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyProcesses).click();
  }

  async gotoGauges() {
    await this.page.locator(this.Gauges).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Gauges).click();
  }

  async gotoGaugesReadings() {
    await this.page.locator(this.GaugesReadings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.GaugesReadings).click();
  }

  async gotoEnerkeyProfiles() {
    await this.page.locator(this.EnerkeyProfiles).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnerkeyProfiles).click();
  }

  async gotoEnergyProjects() {
    await this.page.locator(this.EnergyProjects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergyProjects).click();
  }

  async gotoAnnualEnergyUsages() {
    await this.page.locator(this.AnnualEnergyUsages).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AnnualEnergyUsages).click();
  }

  async gotoEnergySavingsPotential() {
    await this.page.locator(this.EnergySavingsPotential).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.EnergySavingsPotential).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

  async gotoAccessConfiguration() {
    await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AccessConfiguration).click();
  }

  /* ----- Actions: register/add (kept for convenience) ----- */
  // These register helpers use Add then rely on clickClose() to close the popup
  async clickRegisterEnergyZones() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterWeatherStations() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterWeatherStationNormalPeriods() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterEnergyProviders() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterEnergyDistributions() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterEnergyProcesses() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterGauges() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterAnnualEnergyUsages() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  async clickRegisterEnergySavingPotentials() {
    await this.clickElement(this.Add);
    //await this.clickClose();
  }

  /* clickElement wrapper (from BasePage clickElement) preserved in BasePage.
     We expose it here for call parity with U1/U2. */
  async clickElement(selector, options = {}) {
    // delegate to BasePage implementation
    return super.clickElement(selector, options);
  }

  /* clickClose - resolve close selector via smartLocator and click it */
  async clickClose(timeout = 5000) {
    const locator = await smartLocator(this.page, this.Close, timeout);
    await locator.waitFor({ state: 'visible', timeout }).catch(() => {}); // best-effort
    await locator.click();
    await this.page.waitForTimeout(300);
  }

  /* clickExport wrapper to keep test code readable if desired */
  async clickExport() {
    return this.clickElement(this.Export);
  }
}

module.exports = EnergyManagement;
