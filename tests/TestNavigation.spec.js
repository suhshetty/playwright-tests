const { test } = require('@playwright/test');
const { loginAndInitialize } = require('./src/testSetup');


test('Test Navigation', async ({ page, context }) => {
  // Login and initialize Page Objects
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context });

  // Navigate to Home and perform operations
  await homePage.gotoHomePage();

  await homePage.gotoModuleMenu();

  await buildingArchive.clickBuildingArchive();

  await buildingArchive.gotoSiteRegistration();

  await buildingArchive.gotoSites();

  await buildingArchive.gotoPortfolioManagement();

  await buildingArchive.gotoPortfolios();

  await buildingArchive.gotoLocationsOverview();

  await buildingArchive.gotoRegisterLocations();

  await buildingArchive.gotoBuildings();

  await buildingArchive.gotoBuildingStairwells();

  await buildingArchive.gotoBuildingFloors();

  await buildingArchive.gotoBuildingSpaces();

  await buildingArchive.gotoOpenAreas();

  await buildingArchive.gotoOpenAreaParts();

  await buildingArchive.gotoHousings();

  await buildingArchive.gotoAddresses();

  await buildingArchive.gotoGISPolygons();

  await buildingArchive.gotoPropertyValuation();

  await buildingArchive.gotoRealProperties();

  await buildingArchive.gotoPropertyValuationsBuildings();

  await buildingArchive.gotoPropertyValuationParts();

  await buildingArchive.gotoBuildingSystems();

  await buildingArchive.gotoRegisterBuildingComponents();

  await buildingArchive.gotoRegisterBuildingComponentsCCS();

  await buildingArchive.gotoFunctionalSystemsCCS();

  await buildingArchive.gotoTechnicalSystemsCCS();

  await buildingArchive.gotoComponentsCCS();

  await buildingArchive.gotoFunctionalSystems();

  await buildingArchive.gotoTechnicalSystems();

  await buildingArchive.gotoComponents();

  await buildingArchive.gotoDocumentationObjects();

  await buildingArchive.gotoProductData();

  await buildingArchive.gotoLocationProductData();

  await buildingArchive.gotoLocationsOfObjects();

  await buildingArchive.gotoLocateSystems();

  await buildingArchive.gotoObjectLocations();

  await buildingArchive.gotoInteractiveDrawingImport();

  await buildingArchive.gotoInteractiveDrawingImports();

  await buildingArchive.gotoInteractiveDrawings();

  await buildingArchive.gotoDrawings();

  await buildingArchive.gotoReleaseItems();

  await buildingArchive.gotoLocateDrawingIcons();

  await buildingArchive.gotoDocumentLayouts();

  await buildingArchive.gotoBimProcessing();

  await buildingArchive.gotoBimProjects();

  await buildingArchive.gotoBIMModels();

  await buildingArchive.gotoBIMElements();

  await buildingArchive.gotoAttributeMapping();

  await buildingArchive.gotoProcessingOfLocationElements();

  await buildingArchive.gotoProcessingOfSystemElements();

  await buildingArchive.gotoProductData();

  await buildingArchive.gotoRegisterSystemStructures();

  await buildingArchive.gotoOMdocuments();

  await buildingArchive.gotoPictures();

  await buildingArchive.gotoDrawings();

  await buildingArchive.gotoDocuments();

  await buildingArchive.gotoObjectDocuments();

  await buildingArchive.gotoStructureWithDocuments();

  await buildingArchive.gotoTechnicalData();

  await buildingArchive.gotoQRBarCodes();

  await buildingArchive.gotoObjectInformation();

  await buildingArchive.gotoTechnicalInformation();

  await buildingArchive.gotoObjectColors();

  await buildingArchive.gotoObjectExternalReferences();

  await buildingArchive.gotoMaterials();

  await buildingArchive.gotoClassificationSystems();

  await buildingArchive.gotoMaster();

  await buildingArchive.gotoStructureTemplateManagement();

  await buildingArchive.gotoStructureTemplates();

  await buildingArchive.gotoObjectTypeThemes();

  await buildingArchive.gotoCCSStandard();

  await buildingArchive.gotoSfbStandard();

  await buildingArchive.gotoObjectTypes();

  await buildingArchive.gotoObjectSubTypes();

  await buildingArchive.gotoConfiguration();

  });















