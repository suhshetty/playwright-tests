const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../../src/testSetup');
 
// Load environment variables
dotenv.config({ path: path.resolve('tests/src/.env') });
 
test('EMM-3981.spec.js', async ({ page, context }) => {
  try {
    const baseUrl = process.env.URL1;
 
    // Login and initialize Page Objects
    const { homePage, documentManagement } = await loginAndInitialize({ page, context, baseUrl });
 
    // Navigate to Home and perform operations
    await homePage.gotoHomePage();
    await homePage.gotoModuleMenu();
    await documentManagement.clickDocumentManagement();
    await documentManagement.gotoDocumentOverview();
    await documentManagement.gotoDocuments();
    await documentManagement.selectDropdown('site', 'Activity center');
 
    ///T-314 - Verify that valid data is displayed when “Extra document subtypes” is added as a column in the UI.
    await documentManagement.VerifyExtraDocumentSubtypesColumn();
 
    ///T-303 - Verify that the new field “Extra document subtypes” is not displayed under “Documents” during the add process.
    await documentManagement.VerifyExtraDocumentSubtypesNotDisplayed();
 
    ///T-302 - Verify that the new field “Extra document subtypes” is displayed under “Documents” during the edit process.
       await documentManagement.AddDocumentTypesAndSubtypes([
       'APV - PCV'
       ]);
 
    ///T-305 - Verify that valid data is displayed in “Extra document subtypes” when a new Document type + Document subtype is added.
       await documentManagement.CreateDocumentType('Type4');
       await documentManagement.CreateDocumentSubType('Type4', 'SubType4');
 
 
    ///T-307 - Verify that the user is able to select multiple values in “Extra document subtypes”.
    ///T-308 - Verify that the user is able to add and remove values in “Extra document subtypes”.
    ///T-311 -Verify that the data in “Extra document subtypes” is clearly displayed during the edit process.
    ///T-304 - Verify that the data in “Extra document subtypes” is a combination of Document type + Document subtype.
    await documentManagement.OpenDocument();
    await documentManagement.AddExtraDocumentSubtypes([
         'Type4 - SubType4',
         'AT - Rapport'
    ]);
 
    await documentManagement.Close();
   
 
    ///T-310 - Verify that filtering in the UI works correctly based on Document type + Document subtype.
    await documentManagement.FilterExtraSubTypeDocument('Type4',['Type4 - SubType4']);
 
 
 
    ///T-306 - Verify that updates in Document type and Document subtype are reflected correctly in “Extra document subtypes”.
    await documentManagement.UpdateDocumentTypeAndDocumentSubtype(
      'APV - PCV',
      'AT - Rapport',
      'APV1 - PCV1',
      'APV1',
      'PCV1'
    );
 
 
    ///T-313 - Verify that an appropriate error message is displayed when “Extra document subtypes” is set as mandatory and the user tries to save without entering data.
    await documentManagement.SetMandatory();
 
    ///T-309 - Verify that changes made in “Extra document subtypes” are reflected in “Sub Type of Document” under “Sub Data” after clicking the Save button.
    await documentManagement.VerifyExtraSubtypesInTable(['APV - PCV']);
 
 
    // ///T-312 - Verify that no UI issues occur when the user removes existing data from “Extra document subtypes”
    // await documentManagement.DeleteExtraDocumentSubtype();
 
 
  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    await page.screenshot({ path: 'screenshots/EMM-3981-failure.png', fullPage: true });
    throw error;
  }
}
);
 