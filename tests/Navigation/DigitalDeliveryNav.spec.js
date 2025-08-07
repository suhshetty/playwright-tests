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
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);
  
  await digitalDelivery.gotoProductDataTask();
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  await digitalDelivery.gotoProductDataComponent();
  await digitalDelivery.clickElement(digitalDelivery.Export);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  await digitalDelivery.gotoProductDataTechnicalInformation();
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  await digitalDelivery.gotoEPD();
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  // === Building Systems ===
  await digitalDelivery.gotoBuildingSystems();
  await digitalDelivery.gotoRegisterBuildingComponents();
  await digitalDelivery.gotoRegisterBuildingComponentsCSS();

  await digitalDelivery.gotoFunctionalSystemCSS();
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);


  await digitalDelivery.gotoTechnicalSystemCSS();
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  await digitalDelivery.gotoComponentsCSS();
  await digitalDelivery.clickElement(digitalDelivery.Add);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  await digitalDelivery.gotoFunctionalSystem();
  await digitalDelivery.clickElement(digitalDelivery.Export);
  await digitalDelivery.clickElement(digitalDelivery.Close);

  await digitalDelivery.gotoTechnicalSystem();
  await digitalDelivery.gotoComponent();

  // === Configuration ===
  await digitalDelivery.gotoConfiguration();
  await digitalDelivery.gotoAccessConfiguration();
});