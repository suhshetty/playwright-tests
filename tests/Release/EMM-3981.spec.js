const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

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
    // await documentManagement.VerifyExtraDocumentSubtypesNotDisplayed();
    await documentManagement.OpenDocument();

    // await documentManagement.OpenDocument();
    // await documentManagement.AddDocumentTypesAndSubtypes([
    //   'Brand - ABA inspektionsrapporter'
    // ]);
    //await documentManagement.OpenDocument();
    // await documentManagement.CreateDocumentType('Type3');
    // await documentManagement.CreateDocumentSubType('Type3', 'SubType3');

    // await documentManagement.AddExtraDocumentSubtypes([
    //     'Type3 - SubType3',
    //     'AT - Rapport'
    // ]);

    //await documentManagement.FilterExtraSubTypeDocument('Type3',['Type3 - SubType3']); 
    await documentManagement.SetMandatory();



  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    await page.screenshot({ path: 'screenshots/EMM-3981-failure.png', fullPage: true });
    throw error;
  }
}
);


