const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

dotenv.config({ path: path.resolve('tests/src/.env') });

test('Sanity test: select & remove multi-select values (with separate inputs)', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize
  const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await projectManagement.clickProjectManagement();
  await projectManagement.gotoProjectsOverview();
  await projectManagement.gotoProjects();

  await page.locator('#newRecordButton').click();

  // pass selector strings (not Locator) to the helper on the POM/base class
  const multiselect_dropdown_field = '#select2-Modal1_TFClassificationSelection-container';
  const multiselect_dropdown_values = 'ul#select2-Modal1_TFClassificationSelection-results li.select2-results__option span.mm-combobox-item';


  await projectManagement.selectMultiValues(multiselect_dropdown_field, multiselect_dropdown_values, ['Classification 1','Classification 4']);
  await projectManagement.removeMultiValues(['Classification 1']);



  await projectManagement.click_Classification_ActionMenu();
  await projectManagement.click_ShowDataInPopupList();
  await projectManagement.click_RegisterNewInPopupList();

  await projectManagement.fill_Project_classification_name('Classification 4Z');
  await projectManagement.fill_Project_classification_number('Classification 4Z');
  await projectManagement.fill_Project_classification_description('Description for Classification 4Z');
  await projectManagement.click_Save_button();
  
  await projectManagement.verifyErrorPopup();
  //await projectManagement.verifySuccessPopup();

  await page.pause(); // debug if needed
});
