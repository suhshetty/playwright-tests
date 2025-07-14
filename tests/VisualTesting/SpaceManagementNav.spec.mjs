// File: SpaceManagementNav.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Screens to validate
const labels = [
  'gotoBuildingSpaceOverview', 'gotoLocateOrganisation', 'gotoLocateEquipment',
  'gotoKeyManagement', 'gotoConfiguration', 'gotoTestÞT',
  'gotoBuildingSpaces', 'gotoBuildingSpaceInformation', 'gotoDrawing',
  'gotoLocateOrganisationSubType', 'gotoObjectOwner', 'gotoSpaceManagementScenario',
  'gotoLocateEquipmentSubType', 'gotoKeyToLock', 'gotoAccessConfiguration','gotoWorkOrderHours'
];


// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, spaceManagement } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickSpaceManagement', async () => {
    await spaceManagement.clickSpaceManagement();
  });


  await safeStep('gotoBuildingSpaceOverview', async () => {
    await spaceManagement.gotoBuildingSpaceOverview();
  });


  await safeStep('gotoBuildingSpaces', async () => {
     await spaceManagement.gotoBuildingSpaces();
     await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaces');
  });


    await safeStep('gotoBuildingSpaceInformation', async () => {
     await spaceManagement.gotoBuildingSpaceInformation();
     await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaceInformation');
  });


    await safeStep('gotoDrawing', async () => {
     await spaceManagement.gotoDrawing();
     await waitForProcessingAndTakeScreenshot(page, env, 'gotoDrawing');
  });


    await safeStep('gotoLocateOrganisation', async () => {
    await spaceManagement.gotoLocateOrganisation();
  });


    await safeStep('gotoLocateOrganisationSubType', async () => {
     await spaceManagement.gotoLocateOrganisationSubType();
     await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateOrganisationSubType');
  });


    await safeStep('gotoObjectOwner', async () => {
        await spaceManagement.gotoObjectOwner();
        await waitForProcessingAndTakeScreenshot(page, env, 'gotoObjectOwner');
    });


    await safeStep('gotoSpaceManagementScenario', async () => {
        await spaceManagement.gotoSpaceManagementScenario();
        await waitForProcessingAndTakeScreenshot(page, env, 'gotoSpaceManagementScenario');
    });

    await safeStep('gotoLocateEquipment', async () => {
        await spaceManagement.gotoLocateEquipment();
    });

    await safeStep('gotoLocateEquipmentSubType', async () => {
        await spaceManagement.gotoLocateEquipmentSubType();
        await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateEquipmentSubType');
    });

    await safeStep('gotoKeyManagement', async () => {
        await spaceManagement.gotoKeyManagement();
    });

    await safeStep('gotoKeyToLock', async () => {
        await spaceManagement.gotoKeyToLock();
        await waitForProcessingAndTakeScreenshot(page, env, 'gotoKeyToLock');
    });

    await safeStep('gotoConfiguration', async () => {
        await spaceManagement.gotoConfiguration();
    });

    await safeStep('gotoAccessConfiguration', async () => {
        await spaceManagement.gotoAccessConfiguration();
        await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
    });

    await safeStep('gotoTestÞT', async () => {
        await spaceManagement.gotoTestÞT();
    });

    await safeStep('gotoWorkOrderHours', async () => {
        await spaceManagement.gotoWorkOrderHours();
        await waitForProcessingAndTakeScreenshot(page, env, 'gotoWorkOrderHours');
    });



};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});