// tests/setup/testSetup.js
const LoginPage = require('../../src/Pages/LoginPage');
const HomePage = require('../../src/Pages/HomePage');
const BuildingArchive = require('../../src/Pages/BuildingArchive');
const AccessManagement = require('../../src/Pages/AccessManagement');
const AssetManagement = require('../../src/Pages/AssetManagement');
const CleaningManagement = require('../../src/Pages/CleaningManagement');
const DocumentManagement = require('../../src/Pages/DocumentManagement');
const EnergyManagement = require('../../src/Pages/EnergyManagement');
const EnvironmentalManagement = require('../../src/Pages/EnvironmentalManagement');
const FinanceManagement = require('../../src/Pages/FinanceManagement');

async function loginAndInitialize({ page, context, baseUrl }) {
  // Clear cookies and cache before login
  await context.clearCookies();
  await context.clearPermissions();

  // Initialize Page Objects
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const buildingArchive = new BuildingArchive(page);
  const accessManagement = new AccessManagement(page);
  const assetManagement = new AssetManagement(page);
  const cleaningManagement = new CleaningManagement(page);
  const documentManagement = new DocumentManagement(page);
  const energyManagement = new EnergyManagement(page);
  const environmentalManagement = new EnvironmentalManagement(page);
  const financeManagement = new FinanceManagement(page);

  // Perform login using dynamic URL
  await loginPage.gotoLoginPage(baseUrl);
  await loginPage.login('suhsh', 'Testing@!123');

  return { loginPage, homePage, buildingArchive, accessManagement, assetManagement, cleaningManagement, documentManagement, energyManagement, environmentalManagement, financeManagement };
}

module.exports = { loginAndInitialize };
