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
const HelpdeskManagement = require('../../src/Pages/HelpdeskManagement');
const OperationAndMaintenance = require('../../src/Pages/OperationAndMaintenance');
const FireSafetyManagement = require('../../src/Pages/FireSafetyManagement');
const HealthAndSafetyManagement = require('../../src/Pages/HealthAndSafetyManagement');
const HumanResources = require('../../src/Pages/HumanResources');
const ProjectManagement = require('../../src/Pages/ProjectManagement');
const CulturalValueManagement = require('../../src/Pages/CulturalValueManagement');
const SystemConfiguration = require('../../src/Pages/SystemConfiguration');
const UniversalDesign = require('../../src/Pages/UniversalDesign'); 





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
  const helpdeskManagement = new HelpdeskManagement(page);
  const operationAndMaintenance = new OperationAndMaintenance(page);
  const fireSafetyManagement = new FireSafetyManagement(page);
  const healthAndSafetyManagement = new HealthAndSafetyManagement(page);
  const humanResources = new HumanResources(page);
  const projectManagement = new ProjectManagement(page);
  const culturalValueManagement = new CulturalValueManagement(page);
  const universalDesign = new UniversalDesign(page);
  const systemConfiguration = new SystemConfiguration(page);

  // Perform login using dynamic URL
  await loginPage.gotoLoginPage(baseUrl);
  await loginPage.login('suhsh', 'Testing@!123');

  return { loginPage, homePage, buildingArchive, accessManagement, assetManagement, cleaningManagement, documentManagement, energyManagement, environmentalManagement,
    financeManagement, spaceManagement, propertyManagement, conditionAssessmentAndMaintenanceNeeds,
    digitalDelivery, helpdeskManagement, operationAndMaintenance, fireSafetyManagement, healthAndSafetyManagement,
    humanResources, projectManagement, culturalValueManagement, universalDesign, systemConfiguration
  };


}

module.exports = { loginAndInitialize };

