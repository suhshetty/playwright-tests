import { test, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  cleanScreenshotsFolder,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.mjs';

// 🧹 Clear screenshots before the test run
cleanScreenshotsFolder();

// 🌐 Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), 'tests/src/.env') });

// ✅ Centralized error-safe step
async function safeStep(stepName, fn) {
  try {
    await fn();
  } catch (error) {
    console.warn(`Step "${stepName}" failed:`, error.message);
  }
}

// ✅ Centralized screenshot capture (toggle masking globally)
async function capture(page, env, label) {
  const shouldMask = true; // 🔁 Set to false to disable masking globally
  const options = shouldMask ? { mask: [page.locator('#m_header')] } : {};
  await waitForProcessingAndTakeScreenshot(page, env, label, options);
}

// Screens to validate
const labels = [
  'gotoHomePage', 'gotoModuleMenu', 'clickBuildingArchive', 'gotoSiteRegistration','gotoSites', 'gotoPortfolioManagement', 'gotoPortfolios', 'gotoRegisterLocations',
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

// ✅ Run test flow per URL
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await capture(page, env, 'gotoHomePage');
  });

await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await capture(page, env, 'gotoModuleMenu');
  });

await safeStep('clickBuildingArchive', async () => {
    await buildingArchive.clickBuildingArchive();
    await capture(page, env, 'clickBuildingArchive');
  });

await safeStep('gotoSiteRegistration', async () => {
    await buildingArchive.gotoSiteRegistration();
    await capture(page, env, 'gotoSiteRegistration');
  });

await safeStep('gotoSites', async () => {
    await buildingArchive.gotoSites();
    await capture(page, env, 'gotoSites');
  });

await safeStep('gotoPortfolioManagement', async () => {
    await buildingArchive.gotoPortfolioManagement();
    await capture(page, env, 'gotoPortfolioManagement');
  });

await safeStep('gotoPortfolios', async () => {
    await buildingArchive.gotoPortfolios();
    await capture(page, env, 'gotoPortfolios');
  })

await safeStep('gotoLocationsOverview', async () => {
  await buildingArchive.gotoLocationsOverview();
  await capture(page, env, 'gotoLocationsOverview');
});

await safeStep('gotoRegisterLocations', async () => {
  await buildingArchive.gotoRegisterLocations();
  await capture(page, env, 'gotoRegisterLocations');
});

await safeStep('gotoBuildings', async () => {
  await buildingArchive.gotoBuildings();
  await capture(page, env, 'gotoBuildings');
});

await safeStep('gotoBuildingStairwells', async () => {
  await buildingArchive.gotoBuildingStairwells();
  await capture(page, env, 'gotoBuildingStairwells');
});

await safeStep('gotoBuildingFloors', async () => {
  await buildingArchive.gotoBuildingFloors();
  await capture(page, env, 'gotoBuildingFloors');
});

await safeStep('gotoBuildingSpaces', async () => {
  await buildingArchive.gotoBuildingSpaces();
  await capture(page, env, 'gotoBuildingSpaces');
});

await safeStep('gotoOpenAreas', async () => {
  await buildingArchive.gotoOpenAreas();
  await capture(page, env, 'gotoOpenAreas');
});

await safeStep('gotoOpenAreaParts', async () => {
  await buildingArchive.gotoOpenAreaParts();
  await capture(page, env, 'gotoOpenAreaParts');
});

await safeStep('gotoHousings', async () => {
  await buildingArchive.gotoHousings();
  await capture(page, env, 'gotoHousings');
});

await safeStep('gotoAddresses', async () => {
  await buildingArchive.gotoAddresses();
  await capture(page, env, 'gotoAddresses');
});

await safeStep('gotoGISPolygons', async () => {
  await buildingArchive.gotoGISPolygons();
  await capture(page, env, 'gotoGISPolygons');
});

await safeStep('gotoPropertyValuation', async () => {
  await buildingArchive.gotoPropertyValuation();
  await capture(page, env, 'gotoPropertyValuation');
});

await safeStep('gotoRealProperties', async () => {
  await buildingArchive.gotoRealProperties();
  await capture(page, env, 'gotoRealProperties');
});

await safeStep('gotoPropertyValuationsBuildings', async () => {
  await buildingArchive.gotoPropertyValuationsBuildings();
  await capture(page, env, 'gotoPropertyValuationsBuildings');
});

await safeStep('gotoPropertyValuationParts', async () => {
  await buildingArchive.gotoPropertyValuationParts();
  await capture(page, env, 'gotoPropertyValuationParts');
});

await safeStep('gotoBuildingSystems', async () => {
  await buildingArchive.gotoBuildingSystems();
  await capture(page, env, 'gotoBuildingSystems');
});

await safeStep('gotoRegisterBuildingComponents', async () => {
  await buildingArchive.gotoRegisterBuildingComponents();
  await capture(page, env, 'gotoRegisterBuildingComponents');
});

await safeStep('gotoRegisterBuildingComponentsCCS', async () => {
  await buildingArchive.gotoRegisterBuildingComponentsCCS();
  await capture(page, env, 'gotoRegisterBuildingComponentsCCS');
});

await safeStep('gotoFunctionalSystemsCCS', async () => {
  await buildingArchive.gotoFunctionalSystemsCCS();
  await capture(page, env, 'gotoFunctionalSystemsCCS');
});

await safeStep('gotoTechnicalSystemsCCS', async () => {
  await buildingArchive.gotoTechnicalSystemsCCS();
  await capture(page, env, 'gotoTechnicalSystemsCCS');
});

await safeStep('gotoComponentsCCS', async () => {
  await buildingArchive.gotoComponentsCCS();
  await capture(page, env, 'gotoComponentsCCS');
});

await safeStep('gotoFunctionalSystems', async () => {
  await buildingArchive.gotoFunctionalSystems();
  await capture(page, env, 'gotoFunctionalSystems');
});

await safeStep('gotoTechnicalSystems', async () => {
  await buildingArchive.gotoTechnicalSystems();
  await capture(page, env, 'gotoTechnicalSystems');
});

await safeStep('gotoComponents', async () => {
  await buildingArchive.gotoComponents();
  await capture(page, env, 'gotoComponents');
});

await safeStep('gotoDocumentationObjects', async () => {
  await buildingArchive.gotoDocumentationObjects();
  await capture(page, env, 'gotoDocumentationObjects');
});

await safeStep('gotoProductData', async () => {
  await buildingArchive.gotoProductData();
  await capture(page, env, 'gotoProductData');
});

await safeStep('gotoLocationProductData', async () => {
  await buildingArchive.gotoLocationProductData();
  await capture(page, env, 'gotoLocationProductData');
});

await safeStep('gotoLocationsOfObjects', async () => {
  await buildingArchive.gotoLocationsOfObjects();
  await capture(page, env, 'gotoLocationsOfObjects');
});

await safeStep('gotoLocateSystems', async () => {
  await buildingArchive.gotoLocateSystems();
  await capture(page, env, 'gotoLocateSystems');
});

await safeStep('gotoObjectLocations', async () => {
  await buildingArchive.gotoObjectLocations();
  await capture(page, env, 'gotoObjectLocations');
})

await safeStep('gotoInteractiveDrawingImport', async () => {
  await buildingArchive.gotoInteractiveDrawingImport();
  await capture(page, env, 'gotoInteractiveDrawingImport');
});

await safeStep('gotoInteractiveDrawingImports', async () => {
  await buildingArchive.gotoInteractiveDrawingImports();
  await capture(page, env, 'gotoInteractiveDrawingImports');
});

await safeStep('gotoInteractiveDrawings', async () => {
  await buildingArchive.gotoInteractiveDrawings();
  await capture(page, env, 'gotoInteractiveDrawings');
});

await safeStep('gotoDrawings', async () => {
  await buildingArchive.gotoDrawings();
  await capture(page, env, 'gotoDrawings');
});

await safeStep('gotoReleaseItems', async () => {
  await buildingArchive.gotoReleaseItems();
  await capture(page, env, 'gotoReleaseItems');
});

await safeStep('gotoLocateDrawingIcons', async () => {
  await buildingArchive.gotoLocateDrawingIcons();
  await capture(page, env, 'gotoLocateDrawingIcons');
});

await safeStep('gotoDocumentLayouts', async () => {
  await buildingArchive.gotoDocumentLayouts();
  await capture(page, env, 'gotoDocumentLayouts');
});

await safeStep('gotoBimProcessing', async () => {
  await buildingArchive.gotoBimProcessing();
  await capture(page, env, 'gotoBimProcessing');
});

await safeStep('gotoBimProjects', async () => {
  await buildingArchive.gotoBimProjects();
  await capture(page, env, 'gotoBimProjects');
});

await safeStep('gotoBIMModels', async () => {
  await buildingArchive.gotoBIMModels();
  await capture(page, env, 'gotoBIMModels');
});

await safeStep('gotoBIMElements', async () => {
  await buildingArchive.gotoBIMElements();
  await capture(page, env, 'gotoBIMElements');
});

await safeStep('gotoAttributeMapping', async () => {
  await buildingArchive.gotoAttributeMapping();
  await capture(page, env, 'gotoAttributeMapping');
});

await safeStep('gotoProcessingOfLocationElements', async () => {
  await buildingArchive.gotoProcessingOfLocationElements();
  await capture(page, env, 'gotoProcessingOfLocationElements');
});

await safeStep('gotoProcessingOfSystemElements', async () => {
  await buildingArchive.gotoProcessingOfSystemElements();
  await capture(page, env, 'gotoProcessingOfSystemElements');
});

await safeStep('gotoProductData', async () => {
  await buildingArchive.gotoProductData();
  await capture(page, env, 'gotoProductDataAgain');
});

await safeStep('gotoRegisterSystemStructures', async () => {
  await buildingArchive.gotoRegisterSystemStructures();
  await capture(page, env, 'gotoRegisterSystemStructures');
});

await safeStep('gotoOMdocuments', async () => {
  await buildingArchive.gotoOMdocuments();
  await capture(page, env, 'gotoOMdocuments');
});

await safeStep('gotoPictures', async () => {
  await buildingArchive.gotoPictures();
  await capture(page, env, 'gotoPictures');
});

await safeStep('gotoDrawingsAgain', async () => {
  await buildingArchive.gotoDrawings();
  await capture(page, env, 'gotoDrawingsAgain');
});

await safeStep('gotoDocuments', async () => {
  await buildingArchive.gotoDocuments();
  await capture(page, env, 'gotoDocuments');
});

await safeStep('gotoObjectDocuments', async () => {
  await buildingArchive.gotoObjectDocuments();
  await capture(page, env, 'gotoObjectDocuments');
});

await safeStep('gotoStructureWithDocuments', async () => {
  await buildingArchive.gotoStructureWithDocuments();
  await capture(page, env, 'gotoStructureWithDocuments');
});

await safeStep('gotoTechnicalData', async () => {
  await buildingArchive.gotoTechnicalData();
  await capture(page, env, 'gotoTechnicalData');
});

await safeStep('gotoQRBarCodes', async () => {
  await buildingArchive.gotoQRBarCodes();
  await capture(page, env, 'gotoQRBarCodes');
});

await safeStep('gotoObjectInformation', async () => {
  await buildingArchive.gotoObjectInformation();
  await capture(page, env, 'gotoObjectInformation');
});

await safeStep('gotoTechnicalInformation', async () => {
  await buildingArchive.gotoTechnicalInformation();
  await capture(page, env, 'gotoTechnicalInformation');
});

await safeStep('gotoObjectColors', async () => {
  await buildingArchive.gotoObjectColors();
  await capture(page, env, 'gotoObjectColors');
});

await safeStep('gotoObjectExternalReferences', async () => {
  await buildingArchive.gotoObjectExternalReferences();
  await capture(page, env, 'gotoObjectExternalReferences');
});

await safeStep('gotoMaterials', async () => {
  await buildingArchive.gotoMaterials();
  await capture(page, env, 'gotoMaterials');
});

await safeStep('gotoClassificationSystems', async () => {
  await buildingArchive.gotoClassificationSystems();
  await capture(page, env, 'gotoClassificationSystems');
});

await safeStep('gotoMaster', async () => {
  await buildingArchive.gotoMaster();
  await capture(page, env, 'gotoMaster');
});

await safeStep('gotoStructureTemplateManagement', async () => {
  await buildingArchive.gotoStructureTemplateManagement();
  await capture(page, env, 'gotoStructureTemplateManagement');
});

await safeStep('gotoStructureTemplates', async () => {
  await buildingArchive.gotoStructureTemplates();
  await capture(page, env, 'gotoStructureTemplates');
});

await safeStep('gotoObjectTypeThemes', async () => {
  await buildingArchive.gotoObjectTypeThemes();
  await capture(page, env, 'gotoObjectTypeThemes');
});

await safeStep('gotoCCSStandard', async () => {
  await buildingArchive.gotoCCSStandard();
  await capture(page, env, 'gotoCCSStandard');
});

await safeStep('gotoSfbStandard', async () => {
  await buildingArchive.gotoSfbStandard();
  await capture(page, env, 'gotoSfbStandard');
});

await safeStep('gotoObjectTypes', async () => {
  await buildingArchive.gotoObjectTypes();
  await capture(page, env, 'gotoObjectTypes');
});

await safeStep('gotoObjectSubTypes', async () => {
  await buildingArchive.gotoObjectSubTypes();
  await capture(page, env, 'gotoObjectSubTypes');
});

await safeStep('gotoConfiguration', async () => {
  await buildingArchive.gotoConfiguration();
  await capture(page, env, 'gotoConfiguration');
});

}; 

// ✅ Main test entry point
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  console.log('URL1:', process.env.URL1);
  console.log('URL2:', process.env.URL2);

  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels);
});
