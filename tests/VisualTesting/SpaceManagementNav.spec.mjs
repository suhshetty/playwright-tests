// File: SpaceManagementNav.spec.js
import { test, expect } from '@playwright/test';
import { loginAndInitialize, loginAndInitializeWithCore, loginAndInitializeWithStandard } from '../src/testSetup.js';
import {
  initializeVisualTestEnv,
  safeStep,
  waitForProcessingAndTakeScreenshot,
  compareAllScreenshots
} from '../../src/utils/visualUtils.withMasking.mjs';

// Initialize environment and clear screenshots
initializeVisualTestEnv();

// Helper function for safe screenshot taking with timeout
const safeScreenshot = async (page, env, label) => {
  try {
    // Add a timeout wrapper for the entire screenshot process
    await Promise.race([
      waitForProcessingAndTakeScreenshot(page, env, label),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Screenshot timeout after 60 seconds')), 60000)
      )
    ]);
  } catch (screenshotError) {
    console.warn(`Screenshot failed for ${label} ${env}:`, screenshotError.message);
  }
};

// Helper function for safe steps with timeout
const safeStepWithTimeout = async (stepName, stepFunction, timeoutMs = 45000) => {
  try {
    await Promise.race([
      stepFunction(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Step timeout after ${timeoutMs/1000} seconds`)), timeoutMs)
      )
    ]);
  } catch (error) {
    console.warn(`Step "${stepName}" failed:`, error.message);
    // Don't throw - continue with other steps
  }
};

// Screens to validate
const labels = [
  //'gotoHomePage', 'gotoModuleMenu', 
  //'gotoBuildingSpaceOverview', 'gotoLocateOrganisation', 'gotoLocateEquipment',
 // 'gotoKeyManagement', 'gotoConfiguration', 'gotoTestÞT',
  'gotoBuildingSpaces', 'gotoBuildingSpaceInformation', 'gotoDrawing',
  'gotoLocateOrganisationSubType', 'gotoObjectOwner', 'gotoSpaceManagementScenario',
  'gotoLocateEquipmentSubType', 'gotoKeyToLock', 'gotoAccessConfiguration','gotoWorkOrderHours'
];


// Run the visual test for a given URL environment
const runTestOnUrl = async (env, baseUrl, page, context, loginMethod = 'core') => {
  let initializeFunction;
  
  // Choose the appropriate login method
  if (loginMethod === 'core') {
    initializeFunction = loginAndInitializeWithCore;
  } else {
    initializeFunction = loginAndInitializeWithStandard;
  }
  
  const { homePage, spaceManagement } = await initializeFunction({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');

  });

  await safeStep('gotoModuleMenu', async () => {
    console.log(`Going to module menu for ${env}...`);
    await homePage.gotoModuleMenu();
    
    // Wait for the module menu to be fully loaded
    await page.waitForTimeout(2000);
    
    // Check if Space Management option is available
    const spaceManagementExists = await page.locator("//span[@class='m-menu__link-text mm-menu-link-text' and text()='Space management']").count();
    console.log(`Space Management menu items found for ${env}: ${spaceManagementExists}`);
    
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickSpaceManagement', async () => {
    console.log(`Attempting to click Space Management for ${env}...`);
    try {
      await spaceManagement.clickSpaceManagement();
      console.log(`Successfully clicked Space Management for ${env}`);
    } catch (error) {
      console.error(`Failed to click Space Management for ${env}:`, error.message);
      
      // Take a screenshot for debugging
      await page.screenshot({ path: `debug-${env}-clickSpaceManagement-failed.png`, fullPage: true });
      
      // Try to get page info
      const url = page.url();
      const title = await page.title();
      console.log(`Current URL: ${url}, Title: ${title}`);
      
      throw error;
    }
    //await waitForProcessingAndTakeScreenshot(page, env, 'clickSpaceManagement');
  });


  await safeStep('gotoBuildingSpaceOverview', async () => {
    await spaceManagement.gotoBuildingSpaceOverview();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSpaceOverview');
  });


  await safeStep('gotoBuildingSpaces', async () => {
     await spaceManagement.gotoBuildingSpaces();
     await safeScreenshot(page, env, 'gotoBuildingSpaces');
  });


    await safeStep('gotoBuildingSpaceInformation', async () => {
     await spaceManagement.gotoBuildingSpaceInformation();
     await safeScreenshot(page, env, 'gotoBuildingSpaceInformation');
  });


    await safeStepWithTimeout('gotoDrawing', async () => {
     await spaceManagement.gotoDrawing();
     await safeScreenshot(page, env, 'gotoDrawing');
  });


    await safeStep('gotoLocateOrganisation', async () => {
    await spaceManagement.gotoLocateOrganisation();
    //await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateOrganisation');
  });


    await safeStepWithTimeout('gotoLocateOrganisationSubType', async () => {
     await spaceManagement.gotoLocateOrganisationSubType();
     await safeScreenshot(page, env, 'gotoLocateOrganisationSubType');
  });


    await safeStepWithTimeout('gotoObjectOwner', async () => {
        await spaceManagement.gotoObjectOwner();
        await safeScreenshot(page, env, 'gotoObjectOwner');
    });


    await safeStepWithTimeout('gotoSpaceManagementScenario', async () => {
        await spaceManagement.gotoSpaceManagementScenario();
        await safeScreenshot(page, env, 'gotoSpaceManagementScenario');
    });

    await safeStep('gotoLocateEquipment', async () => {
        await spaceManagement.gotoLocateEquipment();
       // await waitForProcessingAndTakeScreenshot(page, env, 'gotoLocateEquipment');
    });

    await safeStepWithTimeout('gotoLocateEquipmentSubType', async () => {
        await spaceManagement.gotoLocateEquipmentSubType();
        await safeScreenshot(page, env, 'gotoLocateEquipmentSubType');
    });

    await safeStep('gotoKeyManagement', async () => {
        await spaceManagement.gotoKeyManagement();
        //await waitForProcessingAndTakeScreenshot(page, env, 'gotoKeyManagement');
    });

    await safeStepWithTimeout('gotoKeyToLock', async () => {
        await spaceManagement.gotoKeyToLock();
        await safeScreenshot(page, env, 'gotoKeyToLock');
    });

    await safeStep('gotoConfiguration', async () => {
        await spaceManagement.gotoConfiguration();
       // await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
    });

    await safeStepWithTimeout('gotoAccessConfiguration', async () => {
        await spaceManagement.gotoAccessConfiguration();
        await safeScreenshot(page, env, 'gotoAccessConfiguration');
    });

    await safeStep('gotoTestÞT', async () => {
        await spaceManagement.gotoTestÞT();
        //await waitForProcessingAndTakeScreenshot(page, env, 'gotoTestÞT');
    });

    await safeStepWithTimeout('gotoWorkOrderHours', async () => {
        await spaceManagement.gotoWorkOrderHours();
        await safeScreenshot(page, env, 'gotoWorkOrderHours');
    });




};

// 🎯 Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  // Set longer timeout for this specific test
  test.setTimeout(600000); // 10 minutes total
  
  // Run URL1 with LoginPageCore
  await runTestOnUrl('url1', process.env.URL1, page, context, 'core');

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  // Run URL2 with standard LoginPage
  await runTestOnUrl('url2', process.env.URL2, newPage, context, 'standard');

  compareAllScreenshots(labels, expect);
});