const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class EnergyManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.projectManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Energy management']";

    // Sub module locators
    this.EnergyZonesOverview = "div[aria-label='Energy zones overview Process step']";
    this.WeatherStationsOverview = "div[aria-label='Weather stations overview Process step']";
    this.EnergyProviders = "div[aria-label='Energy providers Process step']";
    this.GaugesOverview = "div[aria-label='Gauges overview Process step']";
    this.EnergyProjects = "div[aria-label='Energy projects Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Energy Zones Overview )
    this.EnergyZones = "div[aria-label='Energy zones Process step item']";
    this.CreateZones = "div[aria-label='Create zones Process step item']";

    // Sub Types locators ( Sub module : Work Stations Overview )
    this.WeatherStations = "div[aria-label='Weather stations Process step item']";
    this.GlobalWeatherStations = "div[aria-label='Global weather stations Process step item']"; 
    this.WeatherStationsNormalPeriod = "div[aria-label='Weather stations normal period Process step item']";

    // Sub Types locators ( Sub module : Energy Providers )
    this.EnergyProviders = "div[aria-label='Energy providers Process step item']";

    // Sub Types locators ( Sub module : Gauges Overview )
    this.EnergyZones = "div[aria-label='Energy zones Process step item']";
    this.EnergyDistributions = "div[aria-label='Energy distributions Process step item']";
    this.EnergyProcesses = "div[aria-label='Energy processes Process step item']";
    this.Gauges = "div[aria-label='Gauges Process step item']";
    this.GaugesReadings = "div[aria-label='Gauge readings Process step item']";
    this.EnerkeyProfiles = "div[aria-label='EnerKey profiles Process step item']";

    // Sub Types locators ( Sub module : Energy Projects)
    this.AnnualEnergyUsages = "div[aria-label='Annual energy usages Process step item']";
    this.EnergySavingsPotential = "div[aria-label='Energy saving potentials Process step item']";

    // Sub Types locators ( Sub module : Configuration )
     this.AccessConfiguration = "div[aria-label='Access configurations Process step item']";
  }

  async gotoEnergyManagement() {
    await this.page.waitForTimeout(3000);
    const energyManagement = this.page.locator(this.energyManagement).first();
    await energyManagement.waitFor({ state: 'attached', timeout: 10000 });
    await energyManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
     async gotoEnergyZonesOverview() {
     await this.page.locator(this.EnergyZonesOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.EnergyZonesOverview).click();
   }

   async gotoWeatherStationsOverview() {
     await this.page.locator(this.WeatherStationsOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WeatherStationsOverview).click();
   }

   async gotoEnergyProviders() {
     await this.page.locator(this.EnergyProviders).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.EnergyProviders).click();
   }

   async gotoGaugesOverview() { 
     await this.page.locator(this.GaugesOverview).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.GaugesOverview).click();
   }

   async gotoEnergyProjects() {
     await this.page.locator(this.EnergyProjects).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.EnergyProjects).click();
   }

   async gotoConfiguration() {
     await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Configuration).click();
   }

    // Navigate to sub types ( Sub module : Energy Zones Overview   )
    async gotoEnergyZones() {
      await this.page.locator(this.EnergyZones).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.EnergyZones).click();
    }

    async gotoCreateZones() {
      await this.page.locator(this.CreateZones).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.CreateZones).click();
    }

    // Navigate to sub types ( Sub module : Work Stations Overview  )
    async gotoWeatherStations() {
      await this.page.locator(this.WeatherStations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WeatherStations).click();
    }

    async gotoGlobalWeatherStations() {
      await this.page.locator(this.GlobalWeatherStations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.GlobalWeatherStations).click();
    }

    async gotoWeatherStationsNormalPeriod() {
      await this.page.locator(this.WeatherStationsNormalPeriod).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.WeatherStationsNormalPeriod).click();
    }

    // Navigate to sub types ( Sub module : Energy Providers  )
    async gotoEnergyProviders() {
      await this.page.locator(this.EnergyProviders).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.EnergyProviders).click();
    }

    // Navigate to sub types ( Sub module : Gauges Overview  )
    async gotoEnergyZones() {
      await this.page.locator(this.EnergyZones).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.EnergyZones).click();
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

    // Navigate to sub types ( Sub module : Energy Projects )
    async gotoAnnualEnergyUsages() {
      await this.page.locator(this.AnnualEnergyUsages).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AnnualEnergyUsages).click();
    }

    async gotoEnergySavingsPotential() {
      await this.page.locator(this.EnergySavingsPotential).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.EnergySavingsPotential).click();
    }

    // Navigate to sub types ( Sub module : Configuration )
    async gotoAccessConfiguration() {
      await this.page.locator(this.AccessConfiguration).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.AccessConfiguration).click();
    }
}

module.exports = EnergyManagement;











