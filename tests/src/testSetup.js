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
const SpaceManagement = require('../../src/Pages/SpaceManagement');
const PropertyManagement = require('../../src/Pages/PropertyManagement');
const ConditionAssessmentAndMaintenanceNeeds = require('../../src/Pages/ConditionAssessmentAndMaintenanceNeeds');
const DigitalDelivery = require('../../src/Pages/DigitalDelivery');
<<<<<<< HEAD
const HelpdeskManagement = require('../../src/Pages/HelpdeskManagement');
=======
const OperationAndMaintenance = require('../../src/Pages/OperationAndMaintenance');
const FireSafetyManagement = require('../../src/Pages/FireSafetyManagement');
>>>>>>> 2ed9d4b9edc2eb3cf9aa4c42fb498f814657950a

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
  const spaceManagement = new SpaceManagement(page);
  const propertyManagement = new PropertyManagement(page);
  const conditionAssessmentAndMaintenanceNeeds = new ConditionAssessmentAndMaintenanceNeeds(page);
  const digitalDelivery = new DigitalDelivery(page);
<<<<<<< HEAD
  const helpdeskManagement = new HelpdeskManagement(page);
=======
  const operationAndMaintenance = new OperationAndMaintenance(page);
  const fireSafetyManagement = new FireSafetyManagement(page);
>>>>>>> 2ed9d4b9edc2eb3cf9aa4c42fb498f814657950a

  // Perform login using dynamic URL
  await loginPage.gotoLoginPage(baseUrl);
  await loginPage.login('suhsh', 'Testing@!123');

<<<<<<< HEAD
  return { loginPage, homePage, buildingArchive, accessManagement, assetManagement, cleaningManagement, documentManagement, energyManagement, environmentalManagement, financeManagement, spaceManagement, propertyManagement, conditionAssessmentAndMaintenanceNeeds, digitalDelivery, helpdeskManagement };
=======
  return { loginPage, homePage, buildingArchive, accessManagement, assetManagement, cleaningManagement, documentManagement, energyManagement, environmentalManagement, financeManagement, spaceManagement, propertyManagement, conditionAssessmentAndMaintenanceNeeds, digitalDelivery, operationAndMaintenance, fireSafetyManagement };
>>>>>>> 2ed9d4b9edc2eb3cf9aa4c42fb498f814657950a
}

module.exports = { loginAndInitialize };
