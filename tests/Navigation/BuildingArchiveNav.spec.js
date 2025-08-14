// tests/BuildingArchiveNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Building Archive', async ({ page, context }) => {
  const baseUrl = process.env.URL1; 

  // Login and initialize Page Objects with base URL
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await buildingArchive.clickBuildingArchive();

  // === Site Registration ===
  await buildingArchive.gotoSiteRegistration();
  await buildingArchive.gotoSites();
  await buildingArchive.clickRegisterSites();

  // === Portfolio Management ===
  await buildingArchive.gotoPortfolioManagement();
  await buildingArchive.gotoPortfolios();
  await buildingArchive.clickRegisterPortfolios();

  // === Locations Overview ===
  await buildingArchive.gotoLocationsOverview();
  await buildingArchive.gotoRegisterLocations();
  await buildingArchive.gotoBuildings();
  await buildingArchive.clickRegisterBuildings();
  await buildingArchive.gotoBuildingStairwells();
  await buildingArchive.clickRegisterBuildingStairwells();
  await buildingArchive.gotoBuildingFloors();
  await buildingArchive.clickRegisterBuildingFloors();
  await buildingArchive.gotoBuildingSpaces();
  await buildingArchive.clickRegisterBuildingSpaces();
  await buildingArchive.gotoOpenAreas();
  await buildingArchive.clickRegisterOpenAreas();
  await buildingArchive.gotoOpenAreaParts();
  await buildingArchive.clickRegisterOpenAreaParts();
  await buildingArchive.gotoHousings();
  await buildingArchive.clickRegisterHousings();
  await buildingArchive.gotoAddresses();
  await buildingArchive.clickRegisterAddresses();
  await buildingArchive.gotoGISPolygons();

  // === Property Valuation ===
  await buildingArchive.gotoPropertyValuation();
  await buildingArchive.gotoRealProperties();
  await buildingArchive.clickRegisterRealProperties();
  await buildingArchive.gotoPropertyValuationsBuildings();
  await buildingArchive.clickRegisterPropertyValuationBuildings();
  await buildingArchive.gotoPropertyValuationParts();

  // === Building Systems ===
  await buildingArchive.gotoBuildingSystems();
  await buildingArchive.gotoRegisterBuildingComponents();
  await buildingArchive.gotoRegisterBuildingComponentsCCS();
  await buildingArchive.gotoFunctionalSystemsCCS();
  await buildingArchive.clickRegisterFunctionalSystemsCCS();
  await buildingArchive.gotoTechnicalSystemsCCS();
  await buildingArchive.clickRegisterTechnicalSystemsCCS();
  await buildingArchive.gotoComponentsCCS();
  await buildingArchive.clickRegisterComponentsCCS();
  await buildingArchive.gotoFunctionalSystems();
  await buildingArchive.gotoTechnicalSystems();
  await buildingArchive.gotoComponents();

  // === Documentation Objects ===
  await buildingArchive.gotoDocumentationObjects();
  await buildingArchive.clickRegisterDocumentationObjects();
  await buildingArchive.gotoProductData();
  await buildingArchive.clickRegisterProductData();
  await buildingArchive.gotoLocationProductData();
  await buildingArchive.gotoLocationsOfObjects();
  await buildingArchive.gotoLocateSystems();
  await buildingArchive.gotoObjectLocations();

  // === Interactive Drawing Import ===
  await buildingArchive.gotoInteractiveDrawingImport();
  await buildingArchive.gotoInteractiveDrawingImports();
  await buildingArchive.gotoInteractiveDrawings();
  await buildingArchive.gotoDrawings();
  await buildingArchive.gotoReleaseItems();
  await buildingArchive.clickRegisterReleaseItems();
  await buildingArchive.gotoLocateDrawingIcons();
  await buildingArchive.gotoDocumentLayouts();
  await buildingArchive.clickRegisterDocumentLayouts();

  // === BIM Processing ===
  await buildingArchive.gotoBimProcessing();
  await buildingArchive.gotoBimProjects();
  await buildingArchive.gotoBIMModels();
  await buildingArchive.gotoBIMElements();
  await buildingArchive.gotoAttributeMapping();
  await buildingArchive.gotoProcessingOfLocationElements();
  await buildingArchive.gotoProcessingOfSystemElements();

  // === Register System Structures ===
  await buildingArchive.gotoRegisterSystemStructures();

  // === Documents ===
  await buildingArchive.gotoOMdocuments();
  await buildingArchive.gotoPictures();
  await buildingArchive.gotoDocuments();
  await buildingArchive.gotoObjectDocuments();
  await buildingArchive.gotoStructureWithDocuments();

  // === Technical Data ===
  await buildingArchive.gotoTechnicalData();
  await buildingArchive.gotoQRBarCodes();
  await buildingArchive.clickRegisterQRBarCodes();
  await buildingArchive.gotoObjectInformation();
  await buildingArchive.clickRegisterObjectInformation();
  await buildingArchive.gotoTechnicalInformation();
  await buildingArchive.clickRegisterTechnicalInformation();
  await buildingArchive.gotoObjectColors();
  await buildingArchive.gotoObjectExternalReferences();
  await buildingArchive.clickRegisterObjectExternalReferences();

  // === Materials ===
  await buildingArchive.gotoMaterials();
  await buildingArchive.clickRegisterMaterials();

  // === Classification Systems ===
  await buildingArchive.gotoClassificationSystems();
  await buildingArchive.gotoMaster();
  await buildingArchive.gotoStructureTemplateManagement();
  await buildingArchive.gotoStructureTemplates();
  await buildingArchive.clickRegisterStructureTemplates();
  await buildingArchive.gotoObjectTypeThemes();
  await buildingArchive.gotoCCSStandard();
  await buildingArchive.gotoSfbStandard();
  await buildingArchive.clickRegisterSfBStandards();
  await buildingArchive.gotoObjectTypes();
  await buildingArchive.gotoObjectSubTypes();

  // === Configuration ===
  await buildingArchive.gotoConfiguration();
});