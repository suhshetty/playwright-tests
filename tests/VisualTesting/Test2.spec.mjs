import { test, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  cleanScreenshotsFolder,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.noMasking.mjs';

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
