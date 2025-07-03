import { test, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  cleanScreenshotsFolder,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.mjs';

// Clear screenshots before the test run
cleanScreenshotsFolder();

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), 'tests/src/.env') });

async function safeStep(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    console.warn(`Step "${stepName}" failed:`, error.message);
  }
}


// Verify loaded URLs
console.log('URL1:', process.env.URL1);
console.log('URL2:', process.env.URL2);

// Screens to validate
const labels = [
  'gotoSites', 'gotoPortfolioManagement', 'gotoPortfolios', 'gotoRegisterLocations',
  'gotoBuildings', 'gotoBuildingStairwells', 'gotoBuildingFloors', 'gotoBuildingSpaces',
  'gotoOpenAreas', 'gotoOpenAreaParts', 'gotoHousings', 'gotoAddresses', 'gotoGISPolygons',
  'gotoRealProperties', 'gotoPropertyValuationsBuildings', 'gotoPropertyValuationParts',
  'gotoRegisterBuildingComponents', 'gotoRegisterBuildingComponentsCCS', 'gotoFunctionalSystemsCCS',
  'gotoTechnicalSystemsCCS', 'gotoComponentsCCS', 'gotoFunctionalSystems', 'gotoTechnicalSystems',
  'gotoComponents', 'gotoDocumentationObjects', 'gotoProductData', 'gotoLocationProductData',
  'gotoLocateSystems', 'gotoObjectLocations', 'gotoInteractiveDrawingImports', 'gotoInteractiveDrawings',
  'gotoDrawings', 'gotoReleaseItems', 'gotoLocateDrawingIcons', 'gotoDocumentLayouts', 'gotoBimProjects',
  'gotoBIMModels', 'gotoBIMElements', 'gotoAttributeMapping', 'gotoProcessingOfLocationElements',
  'gotoProcessingOfSystemElements', 'gotoProductDataAgain', 'gotoRegisterSystemStructures',
  'gotoPictures', 'gotoDrawingsAgain', 'gotoDocuments', 'gotoObjectDocuments', 'gotoStructureWithDocuments',
  'gotoQRBarCodes', 'gotoObjectInformation', 'gotoTechnicalInformation', 'gotoObjectColors',
  'gotoObjectExternalReferences', 'gotoMaterials', 'gotoMaster', 'gotoStructureTemplateManagement',
  'gotoStructureTemplates', 'gotoObjectTypeThemes', 'gotoCCSStandard', 'gotoSfbStandard',
  'gotoObjectTypes', 'gotoObjectSubTypes', 'gotoConfiguration'
];

// Run the test for each environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });


  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickBuildingArchive', async () => {
    await buildingArchive.clickBuildingArchive();
    await waitForProcessingAndTakeScreenshot(page, env, 'clickBuildingArchive');
  });

  await safeStep('gotoSiteRegistration', async () => {
    await buildingArchive.gotoSiteRegistration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteRegistration');
  });

  await safeStep('gotoSites', async () => {
    await buildingArchive.gotoSites();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSites');
  });

  await safeStep('gotoPortfolioManagement', async () => {
    await buildingArchive.gotoPortfolioManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolioManagement');
  });

  await safeStep('gotoPortfolios', async () => {
    await buildingArchive.gotoPortfolios();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolios');
  });

  await safeStep('gotoLocationsOverview', async () => {
    await buildingArchive.gotoLocationsOverview();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationsOverview');
  });

  await safeStep('gotoRegisterLocations', async () => {
    await buildingArchive.gotoRegisterLocations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterLocations');
  });

  await safeStep('gotoBuildings', async () => {
    await buildingArchive.gotoBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildings');
  });

  await safeStep('gotoBuildingStairwells', async () => {
    await buildingArchive.gotoBuildingStairwells();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingStairwells');
  });

  await safeStep('gotoBuildingFloors', async () => {
    await buildingArchive.gotoBuildingFloors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingFloors');
  });

  await safeStep('gotoBuildingSpaces', async () => {
    await buildingArchive.gotoBuildingSpaces();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
  });

  await safeStep('gotoOpenAreas', async () => {
    await buildingArchive.gotoOpenAreas();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpenAreas');
  });

  await safeStep('gotoOpenAreaParts', async () => {
    await buildingArchive.gotoOpenAreaParts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoOpenAreaParts');
  });

  await safeStep('gotoHousings', async () => {
    await buildingArchive.gotoHousings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHousings');
  });

  await safeStep('gotoAddresses', async () => {
    await buildingArchive.gotoAddresses();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAddresses');
  });

  await safeStep('gotoGISPolygons', async () => {
    await buildingArchive.gotoGISPolygons();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoGISPolygons');
  });

  await safeStep('gotoPropertyValuation', async () => {
    await buildingArchive.gotoPropertyValuation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPropertyValuation');
  });

  await safeStep('gotoRealProperties', async () => {
    await buildingArchive.gotoRealProperties();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRealProperties');
  });

  await safeStep('gotoPropertyValuationsBuildings', async () => {
    await buildingArchive.gotoPropertyValuationsBuildings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPropertyValuationsBuildings');
  });

  await safeStep('gotoPropertyValuationParts', async () => {
    await buildingArchive.gotoPropertyValuationParts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPropertyValuationParts');
  });

  await safeStep('gotoBuildingSystems', async () => {
    await buildingArchive.gotoBuildingSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSystems');
  });

  await safeStep('gotoRegisterBuildingComponents', async () => {
    await buildingArchive.gotoRegisterBuildingComponents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterBuildingComponents');
  });

  await safeStep('gotoRegisterBuildingComponentsCCS', async () => {
    await buildingArchive.gotoRegisterBuildingComponentsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterBuildingComponentsCCS');
  });

  await safeStep('gotoFunctionalSystemsCCS', async () => {
    await buildingArchive.gotoFunctionalSystemsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystemsCCS');
  });

  await safeStep('gotoTechnicalSystemsCCS', async () => {
    await buildingArchive.gotoTechnicalSystemsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemsCCS');
  });

  await safeStep('gotoComponentsCCS', async () => {
    await buildingArchive.gotoComponentsCCS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoComponentsCCS');
  });

  await safeStep('gotoFunctionalSystems', async () => {
    await buildingArchive.gotoFunctionalSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystems');
  });

  await safeStep('gotoTechnicalSystems', async () => {
    await buildingArchive.gotoTechnicalSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystems');
  });

  await safeStep('gotoComponents', async () => {
    await buildingArchive.gotoComponents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoComponents');
  });

  await safeStep('gotoDocumentationObjects', async () => {
    await buildingArchive.gotoDocumentationObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentationObjects');
  });

  await safeStep('gotoProductData', async () => {
    await buildingArchive.gotoProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductData');
  });

  await safeStep('gotoLocationProductData', async () => {
    await buildingArchive.gotoLocationProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationProductData');
  });

  await safeStep('gotoLocationsOfObjects', async () => {
    await buildingArchive.gotoLocationsOfObjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocationsOfObjects');
  });

  await safeStep('gotoLocateSystems', async () => {
    await buildingArchive.gotoLocateSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateSystems');
  });

  await safeStep('gotoObjectLocations', async () => {
    await buildingArchive.gotoObjectLocations();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectLocations');
  });

  await safeStep('gotoInteractiveDrawingImport', async () => {
    await buildingArchive.gotoInteractiveDrawingImport();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInteractiveDrawingImport');
  });

  await safeStep('gotoInteractiveDrawingImports', async () => {
    await buildingArchive.gotoInteractiveDrawingImports();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInteractiveDrawingImports');
  });

  await safeStep('gotoInteractiveDrawings', async () => {
    await buildingArchive.gotoInteractiveDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoInteractiveDrawings');
  });

  await safeStep('gotoDrawings', async () => {
    await buildingArchive.gotoDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawings');
  });

  await safeStep('gotoReleaseItems', async () => {
    await buildingArchive.gotoReleaseItems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoReleaseItems');
  });

  await safeStep('gotoLocateDrawingIcons', async () => {
    await buildingArchive.gotoLocateDrawingIcons();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateDrawingIcons');
  });

  await safeStep('gotoDocumentLayouts', async () => {
    await buildingArchive.gotoDocumentLayouts();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocumentLayouts');
  });

  await safeStep('gotoBimProcessing', async () => {
    await buildingArchive.gotoBimProcessing();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBimProcessing');
  });

  await safeStep('gotoBimProjects', async () => {
    await buildingArchive.gotoBimProjects();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBimProjects');
  });

  await safeStep('gotoBIMModels', async () => {
    await buildingArchive.gotoBIMModels();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBIMModels');
  });

  await safeStep('gotoBIMElements', async () => {
    await buildingArchive.gotoBIMElements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBIMElements');
  });

  await safeStep('gotoAttributeMapping', async () => {
    await buildingArchive.gotoAttributeMapping();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAttributeMapping');
  });

  await safeStep('gotoProcessingOfLocationElements', async () => {
    await buildingArchive.gotoProcessingOfLocationElements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProcessingOfLocationElements');
  });

  await safeStep('gotoProcessingOfSystemElements', async () => {
    await buildingArchive.gotoProcessingOfSystemElements();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProcessingOfSystemElements');
  });

  await safeStep('gotoProductData', async () => {
    await buildingArchive.gotoProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductDataAgain');
  });

  await safeStep('gotoRegisterSystemStructures', async () => {
    await buildingArchive.gotoRegisterSystemStructures();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterSystemStructures');
  });

  await safeStep('gotoOMdocuments', async () => {
    await buildingArchive.gotoOMdocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoOMdocuments');
  });

  await safeStep('gotoPictures', async () => {
    await buildingArchive.gotoPictures();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoPictures');
  });

  await safeStep('gotoDrawingsAgain', async () => {
    await buildingArchive.gotoDrawings();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawingsAgain');
  });

  await safeStep('gotoDocuments', async () => {
    await buildingArchive.gotoDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDocuments');
  });

  await safeStep('gotoObjectDocuments', async () => {
    await buildingArchive.gotoObjectDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectDocuments');
  });

  await safeStep('gotoStructureWithDocuments', async () => {
    await buildingArchive.gotoStructureWithDocuments();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStructureWithDocuments');
  });

  await safeStep('gotoTechnicalData', async () => {
    await buildingArchive.gotoTechnicalData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalData');
  });

  await safeStep('gotoQRBarCodes', async () => {
    await buildingArchive.gotoQRBarCodes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoQRBarCodes');
  });

  await safeStep('gotoObjectInformation', async () => {
    await buildingArchive.gotoObjectInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectInformation');
  });

  await safeStep('gotoTechnicalInformation', async () => {
    await buildingArchive.gotoTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalInformation');
  });

  await safeStep('gotoObjectColors', async () => {
    await buildingArchive.gotoObjectColors();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectColors');
  });

  await safeStep('gotoObjectExternalReferences', async () => {
    await buildingArchive.gotoObjectExternalReferences();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectExternalReferences');
  });

  await safeStep('gotoMaterials', async () => {
    await buildingArchive.gotoMaterials();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaterials');
  });

  await safeStep('gotoClassificationSystems', async () => {
    await buildingArchive.gotoClassificationSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoClassificationSystems');
  });

  await safeStep('gotoMaster', async () => {
    await buildingArchive.gotoMaster();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoMaster');
  });

  await safeStep('gotoStructureTemplateManagement', async () => {
    await buildingArchive.gotoStructureTemplateManagement();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStructureTemplateManagement');
  });

  await safeStep('gotoStructureTemplates', async () => {
    await buildingArchive.gotoStructureTemplates();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoStructureTemplates');
  });

  await safeStep('gotoObjectTypeThemes', async () => {
    await buildingArchive.gotoObjectTypeThemes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectTypeThemes');
  });

  await safeStep('gotoCCSStandard', async () => {
    await buildingArchive.gotoCCSStandard();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoCCSStandard');
  });

  await safeStep('gotoSfbStandard', async () => {
    await buildingArchive.gotoSfbStandard();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoSfbStandard');
  });

  await safeStep('gotoObjectTypes', async () => {
    await buildingArchive.gotoObjectTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectTypes');
  });

  await safeStep('gotoObjectSubTypes', async () => {
    await buildingArchive.gotoObjectSubTypes();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectSubTypes');
  });

  await safeStep('gotoConfiguration', async () => {
    await buildingArchive.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });
} 


// Main test entry point
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});
