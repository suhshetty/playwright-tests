// tests/DigitalDeliveryNavigation.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

test('Test Navigation Digital Delivery', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize Page Objects with base URL
  const { homePage, digitalDelivery } = await loginAndInitialize({ page, context, baseUrl });

  // === Home and Module Navigation ===
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await digitalDelivery.clickDigitalDelivery();

  // === Digital Delivery - Sub Types ===
  await digitalDelivery.gotoDigitalDeliverySubModule();
  await digitalDelivery.gotoProductData();
  await digitalDelivery.gotoProductDataTask();
  await digitalDelivery.gotoProductDataComponent();
  await digitalDelivery.gotoProductDataTechnicalInformation();
  await digitalDelivery.gotoEPD();

  // === Building Systems ===
  await digitalDelivery.gotoBuildingSystems();
  await digitalDelivery.gotoRegisterBuildingComponents();
  await digitalDelivery.gotoRegisterBuildingComponentsCSS();
  await digitalDelivery.gotoFunctionalSystemCSS();
  await digitalDelivery.gotoTechnicalSystemCSS();
  await digitalDelivery.gotoComponentsCSS();
  await digitalDelivery.gotoFunctionalSystem();
  await digitalDelivery.gotoTechnicalSystem();
  await digitalDelivery.gotoComponent();

  // === Configuration ===
  await digitalDelivery.gotoConfiguration();
  await digitalDelivery.gotoAccessConfiguration();
});