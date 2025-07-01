import { test, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import { loginAndInitialize } from './src/testSetup.js';
import {
  waitForProcessingAndTakeScreenshot,
  compareScreenshots
} from '../src/utils/visualUtils.mjs';


// Load environment variables
dotenv.config({ path: path.resolve('tests/src/.env') });

// Verify loaded URLs
console.log('URL1:', process.env.URL1);
console.log('URL2:', process.env.URL2);

// Screens to validate
const labels = [
  'gotoSites',
  'gotoPortfolioManagement',
  'gotoPortfolios',
  'gotoRegisterLocations',
  'gotoBuildings'
];

// Run the test for each environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, buildingArchive } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');

  await homePage.gotoModuleMenu();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');

  await buildingArchive.clickBuildingArchive();
  await waitForProcessingAndTakeScreenshot(page, env, 'clickBuildingArchive');

  await buildingArchive.gotoSiteRegistration();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSiteRegistration');

  await buildingArchive.gotoSites();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoSites');

  await buildingArchive.gotoPortfolioManagement();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolioManagement');

  await buildingArchive.gotoPortfolios();
  await waitForProcessingAndTakeScreenshot(page, env, 'gotoPortfolios');
};

// Main test entry point
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  for (const label of labels) {
    compareScreenshots(label, expect); 
  }
});
