const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../../src/testSetup');

dotenv.config({ path: path.resolve('tests/src/.env') });

test('EMM-4235 - Validate multi-select functionality of "Classification" field', async ({ page, context }) => {
  const baseUrl = process.env.URL1;

  // Login and initialize
  const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

  // Navigate to the page where the field appears
  await homePage.gotoHomePage();
  await homePage.gotoModuleMenu();
  await projectManagement.clickProjectManagement();
  await projectManagement.gotoProjectsOverview();
  await projectManagement.gotoProjects();

  // Click 'Add New' button
  await page.locator('#newRecordButton').click();

  // ✅ Verify whether the new multiselect dropdown  field "Classification" is being displayed
  await projectManagement.verifyFieldVisibility(projectManagement.classification_label_name,
  'Classification field');

  // ✅ Verify whether user is able to select multiple values in "Classification" multiselect dropdown
  await projectManagement.selectMultiValues(
    projectManagement.classification_multiselect_dropdown_field,
    projectManagement.classification_multiselect_dropdown_values,
    ['Classification 1','Classification 4']
  );

  // ✅ Verify whether user is able to remove multiple values in "Classification" multiselect dropdown
  await projectManagement.removeMultiValues(['Classification 1']
  );

  // ✅ Verify whether user is able to add new data in "Classification" multiselect dropdown
  await projectManagement.click_Classification_ActionMenu();
  await projectManagement.click_ShowDataInPopupList();
  await projectManagement.click_RegisterNewInPopupList();
  await projectManagement.fill_Project_classification_name('Classification E221E');
  await projectManagement.fill_Project_classification_number('Classification E221E');
  await projectManagement.fill_Project_classification_description('Description for Classification 1221B');
  await projectManagement.click_Save_button();
  await projectManagement.verifySuccessPopup();
  //await page.pause();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');

  
  // ✅ Verify whether error message is being displayed when user tries to add "Classification" data with same name
  await projectManagement.click_RegisterNewInPopupList();
  await projectManagement.fill_Project_classification_name('Classification 11A');
  await projectManagement.fill_Project_classification_number('Classification 11A');
  await projectManagement.fill_Project_classification_description('Description for Classification 11A');
  await projectManagement.click_Save_button();
  await projectManagement.verifyErrorPopup();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');
  await projectManagement.clickElement(projectManagement.close_popup, 'Close button on popup');


  // ✅ Verify whether error message is being displayed when user tries to add "Classification" data with same name
  await projectManagement.click_RegisterNewInPopupList();
  await projectManagement.fill_Project_classification_name('Classification 11A');
  await projectManagement.fill_Project_classification_number('Classification 11A');
  await projectManagement.fill_Project_classification_description('Description for Classification 11A');
  await projectManagement.click_Save_button();
  await projectManagement.verifyErrorPopup();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');
  await projectManagement.clickElement(projectManagement.close_popup, 'Close button on popup');


  // ✅ Verify whether error message is being displayed when user tries to add "Classification" data with same number
  await projectManagement.click_RegisterNewInPopupList();
  await projectManagement.fill_Project_classification_name('Classification 11A');
  await projectManagement.fill_Project_classification_number('Classification 11A');
  await projectManagement.fill_Project_classification_description('Description for Classification 11A');
  await projectManagement.click_Save_button();
  await projectManagement.verifyErrorPopup();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');
  await projectManagement.clickElement(projectManagement.close_popup, 'Close button on popup');

  // ✅ Verify whether error message is being displayed when user tries to add "Classification" data with same number
  await projectManagement.clickElement(projectManagement.edit_show_data_in_popup_list, 'Edit button for existing Classification data');
  await projectManagement.fill_Project_classification_name('Classification 11A');
  await projectManagement.fill_Project_classification_number('Classification 11A');
  await projectManagement.fill_Project_classification_description('Description for Classification 11A');
  await projectManagement.click_Save_button();
  await projectManagement.verifyErrorPopup();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');
  await projectManagement.clickElement(projectManagement.close_popup, 'Close button on popup');

    // ✅ Verify whether error message is being displayed when user tries to add "Classification" data with same number
  await projectManagement.clickElement(projectManagement.edit_show_data_in_popup_list, 'Edit button for existing Classification data');
  await projectManagement.fill_Project_classification_name('Classification 11A');
  await projectManagement.fill_Project_classification_number('Classification 11A');
  await projectManagement.fill_Project_classification_description('Description for Classification 11A');
  await projectManagement.click_Save_button();
  await projectManagement.verifyErrorPopup();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');
  await projectManagement.clickElement(projectManagement.close_popup, 'Close button on popup');

  // ✅ Verify whether user is able to edit the existing "Classification" data
  await projectManagement.clickElement(projectManagement.edit_show_data_in_popup_list, 'Edit button for existing Classification data');
  await projectManagement.fill_Project_classification_name('Classification 25D');
  await projectManagement.fill_Project_classification_number('Classification 25D');
  await projectManagement.fill_Project_classification_description('Description for Classification 25D');
  await projectManagement.click_Save_button();
  await projectManagement.verifySuccessPopup();
  await projectManagement.clickElement(projectManagement.ok, 'OK button on popup');
  await projectManagement.clickElement(projectManagement.close_popup, 'Close button on popup');

});