// File: DigitalDeliveryNav.spec.js
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
  'gotoHomePage',
  'gotoModuleMenu',
  'clickDigitalDelivery',
  'gotoDigitalDeliverySubModule',
  'gotoProductData',
  'productDataAddClicked',
  'productDataCloseClicked',
  'gotoProductDataTask',
  'productDataTaskAddClicked',
  'productDataTaskCloseClicked',
  'gotoProductDataComponent',
  'ProductDataComponentExportClicked',
  'ProductDataComponentCloseClicked',
  'gotoProductDataTechnicalInformation',
  'productDataTechnicalInfoAddClicked',
  'productDataTechnicalInfoCloseClicked',
  'gotoEPD',
  'epdAddClicked',
  'epdCloseClicked',
  'gotoBuildingSystems',
  'gotoRegisterBuildingComponents',
  'gotoRegisterBuildingComponentsCSS',
  'gotoFunctionalSystemCSS',
  'functionalSystemCSSExportClicked',
  'functionalSystemCSSCloseClicked',
  'gotoTechnicalSystemCSS',
  'technicalSystemCSSAddClicked',
  'technicalSystemCSSCloseClicked',
  'gotoComponentsCSS',
  'componentsCSSAddClicked',
  'componentsCSSCloseClicked',
  'gotoFunctionalSystem',
  'functionalSystemExportClicked',
  'functionalSystemCloseClicked',
  'gotoTechnicalSystem',
  'gotoComponent',
  'gotoConfiguration',
  'gotoAccessConfiguration'
];

// Run the visual test for a given URL environment 
const runTestOnUrl = async (env, baseUrl, page, context) => {
  const { homePage, digitalDelivery } = await loginAndInitialize({ page, context, baseUrl });

  await safeStep('gotoHomePage', async () => {
    await homePage.gotoHomePage();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoHomePage');
  });

  await safeStep('gotoModuleMenu', async () => {
    await homePage.gotoModuleMenu();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoModuleMenu');
  });

  await safeStep('clickDigitalDelivery', async () => {
    await digitalDelivery.clickDigitalDelivery();   
    await waitForProcessingAndTakeScreenshot(page, env, 'clickDigitalDelivery');
  });

  await safeStep('gotoDigitalDeliverySubModule', async () => {
    await digitalDelivery.gotoDigitalDeliverySubModule();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoDigitalDeliverySubModule');
  });

  // Digital Delivery - Sub Types
  await safeStep('gotoProductData', async () => {
    await digitalDelivery.gotoProductData();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductData');
  });

  await safeStep('productDataAddClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'productDataAddClicked');
  });

  await safeStep('productDataCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'productDataCloseClicked');
  });

  await safeStep('gotoProductDataTask', async () => {
    await digitalDelivery.gotoProductDataTask();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductDataTask');
  });

  await safeStep('productDataTaskAddClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'productDataTaskAddClicked');
  });

  await safeStep('productDataTaskCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'productDataTaskCloseClicked');
  });

  await safeStep('gotoProductDataComponent', async () => {
    await digitalDelivery.gotoProductDataComponent();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductDataComponent');
  });

  await safeStep('ProductDataComponentExportClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'ProductDataComponentExportClicked');
  });

  await safeStep('ProductDataComponentCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'ProductDataComponentCloseClicked');
  });

  await safeStep('gotoProductDataTechnicalInformation', async () => {
    await digitalDelivery.gotoProductDataTechnicalInformation();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoProductDataTechnicalInformation');
  });

  await safeStep('productDataTechnicalInfoAddClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'productDataTechnicalInfoAddClicked');
  });

  await safeStep('productDataTechnicalInfoCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'productDataTechnicalInfoCloseClicked');
  });

  await safeStep('gotoEPD', async () => {
    await digitalDelivery.gotoEPD();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoEPD');
  });

  await safeStep('epdAddClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'epdAddClicked');
  });

  await safeStep('epdCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'epdCloseClicked');
  });

  await safeStep('gotoBuildingSystems', async () => {
    await digitalDelivery.gotoBuildingSystems();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoBuildingSystems');
  });

  // Building Systems - Sub Types
  await safeStep('gotoRegisterBuildingComponents', async () => {
    await digitalDelivery.gotoRegisterBuildingComponents();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterBuildingComponents');
  });

  await safeStep('gotoRegisterBuildingComponentsCSS', async () => {
    await digitalDelivery.gotoRegisterBuildingComponentsCSS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoRegisterBuildingComponentsCSS');
  });

  await safeStep('gotoFunctionalSystemCSS', async () => {
    await digitalDelivery.gotoFunctionalSystemCSS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystemCSS');
  });

  await safeStep('functionalSystemCSSExportClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'functionalSystemCSSExportClicked');
  });

  await safeStep('functionalSystemCSSCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'functionalSystemCSSCloseClicked');
  });

  await safeStep('gotoTechnicalSystemCSS', async () => {
    await digitalDelivery.gotoTechnicalSystemCSS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystemCSS');
  });

  await safeStep('technicalSystemCSSAddClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'technicalSystemCSSAddClicked');
  });

  await safeStep('technicalSystemCSSCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'technicalSystemCSSCloseClicked');
  });

  await safeStep('gotoComponentsCSS', async () => {
    await digitalDelivery.gotoComponentsCSS();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoComponentsCSS');
  });

  await safeStep('componentsCSSAddClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Add);
    await waitForProcessingAndTakeScreenshot(page, env, 'componentsCSSAddClicked');
  });

  await safeStep('componentsCSSCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'componentsCSSCloseClicked');
  });

  await safeStep('gotoFunctionalSystem', async () => {
    await digitalDelivery.gotoFunctionalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoFunctionalSystem');
  });

  await safeStep('functionalSystemExportClicked', async () => {
    await digitalDelivery.clickElement(digitalDelivery.Export);
    await waitForProcessingAndTakeScreenshot(page, env, 'functionalSystemExportClicked');
  });

  await safeStep('functionalSystemCloseClicked', async () => {
    await digitalDelivery.clickClose();
    await waitForProcessingAndTakeScreenshot(page, env, 'functionalSystemCloseClicked');
  });

  await safeStep('gotoTechnicalSystem', async () => {
    await digitalDelivery.gotoTechnicalSystem();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoTechnicalSystem');
  });

  await safeStep('gotoComponent', async () => {
    await digitalDelivery.gotoComponent();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoComponent');
  });

  await safeStep('gotoConfiguration', async () => {
    await digitalDelivery.gotoConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoConfiguration');
  });

  // Configuration - Sub Types
  await safeStep('gotoAccessConfiguration', async () => {
    await digitalDelivery.gotoAccessConfiguration();
    await waitForProcessingAndTakeScreenshot(page, env, 'gotoAccessConfiguration');
  });
};

// Main visual regression test entry
test('Visual Regression Test - Compare url1 and url2', async ({ page, context }) => {
  await runTestOnUrl('url1', process.env.URL1, page, context);

  await page.context().clearCookies();
  await page.close();
  const newPage = await context.newPage();

  await runTestOnUrl('url2', process.env.URL2, newPage, context);

  compareAllScreenshots(labels, expect);
});