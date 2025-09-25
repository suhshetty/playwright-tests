const { type } = require("node:os");
const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');
const { types } = require("node:util");

class DocumentManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Module locators
    this.documentManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Document management']";

    // Sub module locators
    this.DocumentOverview = "div[aria-label='Documents overview Process step']";
    this.ManualsOverview = "div[aria-label='Manuals overview Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : DocumentOverview)
    this.DocumentSearches = "div[aria-label='Document searches Process step item']";
    this.Pictures = "div[aria-label='Pictures Process step item']";
    this.Drawings = "div[aria-label='Drawings Process step item']";
    this.Documents = "div[aria-label='Documents Process step item']";
    this.DocumentStack = "div[aria-label='Document stack Process step item']";

    // Sub Types locators ( Sub module : ManualsOverview)
    this.ManualChapters = "div[aria-label='Manual chapters Process step item']";
    this.ManualDefinitions = "div[aria-label='Manual definitions Process step item']";
    this.ManualSubscribers = "div[aria-label='Manual subscribers Process step item']";

    // Sub Types locators ( Sub module : Configuration )
    this.AccessConfigurations = "div[aria-label='Access configurations Process step item']";

    //Top bar - Site dropdown
    this.TopSite = "span[aria-label='select2-MainManFilter_TFGroundID-container']";

    // Add Open record locators
    this.OpenDocumentButton = "(//button[@aria-label='Open document'])[1]";

    //Add document form locators
    this.ExtraDocumentSubtypes_Title = "div[id='Modal1_TFDocumentSubtypeSelection_label']";
    this.ExtraDocumentSubtypes_textbox = "ul[id='select2-Modal1_TFDocumentSubtypeSelection-container']";
    this.ExtraDocumentSubtypes_List = "ul[id='select2-Modal1_TFDocumentSubtypeSelection-results']";
    this.DocumentTypeDropdown = "span[id='select2-Modal1_TFTypeID-container']";
    this.DocumentSubtypeDropdown = "span[id='select2-Modal1_TFSubtypeID-container']";
    this.CreateDocumentType_Name = "input[title='Name [Module key: Name]']";
    this.DocumentTypeOpenActionMenu = "//div[starts-with(@title, 'Document type:')]//button[@aria-label='Open action menu' and contains(@onclick, 'Modal1_TFTypeID')]";
    this.CreateDocumentSubType_Name = "input[title='Name [Module key: Name]']";
    this.DocumentSubTypeOpenActionMenu = "//div[starts-with(@title, 'Document subtype:')]//button[@aria-label='Open action menu' and contains(@onclick, 'Modal1_TFSubtypeID')]";
    this.ClickShowDataInPopup ="a[title='Show data in popup list - ShowDataInPopupList']";
    this.documentSave = "button[id='Modal3SaveNav']";
    this.ClickOK = "//button[text()='OK']";
    this.CreateDocumentSubType_Parent="span[id='select2-Modal3_TFSetID-container']";
    this.SubTypeOnDocument = "//a[@href='#SubtypeOnDocument_1']";
    this.table = '#MMListCol-41423594966981';
    this.EditFormButton = "//span[@id='editModalButton']";
    this.DataModelButton = "//button[@id='EditModeDataModelBtn1']";
    this.RequiredExtraDocumentSubtypeIcon = "//i[@id='Modal1_DocumentSubtypeSelection_required_icon']";
    this.MandatoryErrorMessage = "//div[@id='m_form_2_msg']";


    //Filter options
    this.FilterButton = "//button[@title='Filter (alt+f)']";
    this.Filter_ExtraDocumentSubtypesTitle = "div[id='DataFilter_TFDocumentSubtypeSelection_label']";
    this.Filter_ExtraDocumentSubtypesTextBox = "ul[id='select2-DataFilter_TFDocumentSubtypeSelection-container']";
    this.Filter_ExtraDocumentSubtypesList = "ul[id='select2-DataFilter_TFDocumentSubtypeSelection-results']";
    this.CloseFilterButton= "//button[@title='Clear filter']";

    //Export to excel
    this.ExportButton = "//button[@title='This action exports data - ExportData']";
    this.ExecuteButton = "//button[@id='Modal1SaveNav']";




    


    // Register, Add ,Close, Save & Export Operations
    this.RegisterDocumentButton = "button[aria-label='This action registers documents based on selected files - MultiRegisterDocument']";
    this.Add = "#newRecordButton"
    this.Close = "i[title='Close window (alt+x)']";
    //the second pop up form - when two forms are open
    this.Close2 =  "(//i[@title='Close window (alt+x)'])[2]";
    this.Save = "button[id='Modal1SaveNav']";
    this.SaveDropdown = "div[aria-label='Toggle save dropdown']";
    this.SaveAndContinue = "(//a[@title='Apply and continue editing.'])[2]";
    this.Export = "button[aria-label='This action exports data - ExportData']";
  }

  async clickDocumentManagement() {
    await this.page.waitForTimeout(3000);
    const documentManagement = this.page.locator(this.documentManagement).first();
    await documentManagement.waitFor({ state: 'attached', timeout: 10000 });
    await documentManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
  async gotoDocumentOverview() {
    await this.page.locator(this.DocumentOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentOverview).click();
  }

  async gotoManualsOverview() {
    await this.page.locator(this.ManualsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualsOverview).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

  // Navigate to sub types ( Sub module : DocumentsOverview)
  async gotoDocumentSearches() {
    await this.page.locator(this.DocumentSearches).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentSearches).click();
  }

  async gotoPictures() {
    await this.page.locator(this.Pictures).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Pictures).click();
  }

  async gotoDrawings() {
    await this.page.locator(this.Drawings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Drawings).click();
  }

  async gotoDocuments() {
    await this.page.locator(this.Documents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Documents).click();
  }

  async gotoDocumentStack() {
    await this.page.locator(this.DocumentStack).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentStack).click();
  }

  // Navigate to sub types ( Sub module : ManualsOverview)
  async gotoManualChapters() {
    await this.page.locator(this.ManualChapters).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualChapters).click();
  }

  async gotoManualDefinitions() {
    await this.page.locator(this.ManualDefinitions).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualDefinitions).click();
  }

  async gotoManualSubscribers() {
    await this.page.locator(this.ManualSubscribers).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ManualSubscribers).click();
  }

  // Navigate to sub types ( Sub module : Configuration)
  async gotoAccessConfigurations() {
    await this.page.locator(this.AccessConfigurations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AccessConfigurations).click();
  }

  //Select site from Top bar
  async selectSiteFromTopBar(siteOption) {
    await this.page.locator(this.TopSite).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TopSite).click();
    await this.page.waitForTimeout(500);
    
    const option = this.page.locator(`li:has-text("${siteOption}")`).first();
    await option.click();
    await this.page.waitForTimeout(1000);
  }

  //T303 - Verify that the new field "Extra document subtypes" is not displayed under "Documents" during the add process.
  async VerifyExtraDocumentSubtypesNotDisplayed() {
    //Click on Register button
    await this.page.locator(this.RegisterDocumentButton).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterDocumentButton).click();

    const isVisible = await this.page.locator(this.ExtraDocumentSubtypes_Title).isVisible();
    if (!isVisible) {
      console.log('Extra document subtypes field is NOT displayed.');
    } else {
      console.log('Extra document subtypes field is displayed.');
    }
    await this.page.locator(this.Close).click();
  }
  async OpenDocument(){
    await this.page.locator(this.OpenDocumentButton).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.ExtraDocumentSubtypes_Title).waitFor({ state: 'visible' });

  }
// async AddExtraDocumentSubtypes(typesToSelect) {
//   console.log(`🔍 Adding Extra Document Subtypes: ${JSON.stringify(typesToSelect)}`);
  
//   await this.page.locator(this.ExtraDocumentSubtypes_Title).waitFor({ state: 'visible', timeout: 10000 });
  
//   for (const types of typesToSelect) {
//     console.log(`🔍 Processing: "${types}"`);
    
//     // Click the textbox to open dropdown (no typing)
//     await this.page.locator(this.ExtraDocumentSubtypes_textbox).click();
//     await this.page.waitForTimeout(1000); // Wait for dropdown to load
    
//     // Wait for the dropdown list to appear
//     await this.page.locator(this.ExtraDocumentSubtypes_List).waitFor({ state: 'visible', timeout: 3000 });
    
//     // Look for the option in the dropdown and click it directly
//     const option = this.page.locator(`${this.ExtraDocumentSubtypes_List} li:has-text("${types}")`).first();
//     if (await option.count() > 0 && await option.isVisible()) {
//       await option.click();
//       console.log(`✅ Found and clicked: "${types}"`);
//     } else {
//       console.log(`❌ Option "${types}" not found in dropdown`);
//     }
    
//     await this.page.waitForTimeout(500);
//   }
async AddExtraDocumentSubtypes(subtypesToSelect) {
  console.log(`🔍 Adding Extra Document Subtypes: ${JSON.stringify(subtypesToSelect)}`);
  
  // Check if title ExtraDocumentSubtypes is visible
  await this.page.locator(this.ExtraDocumentSubtypes_Title).waitFor({ state: 'visible', timeout: 10000 });
  
  // Select each subtype
  for (const subtype of subtypesToSelect) {
    console.log(`🔍 Processing: "${subtype}"`);
    
    // Extract the type part from subtype (e.g., "Type3" from "Type3 - SubType3", "AT" from "AT - Rapport")
    const typeFilter = subtype.split(' - ')[0]; // Gets "Type3" or "AT"
    
    // Click the textbox to open dropdown
    await this.page.locator(this.ExtraDocumentSubtypes_textbox).click();
    await this.page.waitForTimeout(500);
    
    // Type the extracted type to filter the dropdown
    await this.page.keyboard.type(typeFilter);
    await this.page.waitForTimeout(500);
    
    // Wait for the dropdown list to appear and click the option
    const option = this.page.locator(`${this.ExtraDocumentSubtypes_List} li:has-text("${subtype}")`).first();
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
    
    console.log(`✅ Found and clicked: "${subtype}" using filter: "${typeFilter}"`);
    await this.page.waitForTimeout(1000);
  }

  //Hardcoded backspace
  await this.page.locator(this.ExtraDocumentSubtypes_textbox).click();
  await this.page.waitForTimeout(1000);
  await this.page.keyboard.press('Backspace');
  await this.page.waitForTimeout(1000);


  await this.page.locator(this.SaveDropdown).click();
  await this.page.locator(this.SaveAndContinue).click();
  await this.page.locator(this.ClickOK).click();

 // await this.page.locator(this.Close).click();



   await this.page.locator(this.SubTypeOnDocument).click();
  console.log(`🔍 Searching for Document Type: "${type1}" with Subtype: "${subtype1}"`);
  
  try {
    // Find the row containing the document type and check if it has the expected subtype
    const targetRow = this.page.locator(`${this.table} tr:has(td:has-text("${type1}"))`);

    if (await targetRow.count() > 0) {
      const subtypeCell = targetRow.locator('td').filter({ hasText: subtype1 });

      if (await subtypeCell.count() > 0) {
        console.log(`✅ Found Document Type "${type1}" with Subtype "${subtype1}"`);
        return true;
      } else {
        console.log(`❌ Found Document Type "${type1}" but Subtype "${subtype1}" not found`);
        return false;
      }
    } else {
      console.log(`❌ Document Type "${type1}" not found in table`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }

}


async selectDocumentType(documentType) {
  try {
    await this.page.locator(this.DocumentTypeDropdown).click();
    await this.page.waitForTimeout(500);
    
    // Just type directly - the active dropdown will receive the text
    await this.page.keyboard.type(documentType);
    await this.page.waitForTimeout(500);
    
    const option = this.page.locator(`ul[id*="select2-Modal1_TFTypeID-results"] li:has-text("${documentType}")`).first();
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
    
    console.log(`✅ Document Type "${documentType}" selected`);
    return true;
  } catch (error) {
    console.log(`❌ Document Type "${documentType}" not found: ${error.message}`);
    await this.page.keyboard.press('Escape');
    return false;
  }
}

async selectDocumentSubtype(documentSubtype) {
  try {
    await this.page.locator(this.DocumentSubtypeDropdown).click();
    await this.page.waitForTimeout(500);
    
    // Just type directly - the active dropdown will receive the text
    await this.page.keyboard.type(documentSubtype);
    await this.page.waitForTimeout(500);
    
    const option = this.page.locator(`ul[id*="select2-Modal1_TFSubtypeID-results"] li:has-text("${documentSubtype}")`).first();
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
    
    console.log(`✅ Document Subtype "${documentSubtype}" selected`);
    return true;
  } catch (error) {
    console.log(`❌ Document Subtype "${documentSubtype}" not found: ${error.message}`);
    await this.page.keyboard.press('Escape');
    return false;
  }
}

async AddDocumentTypesAndSubtypes(typeSubtypePairs) {

  for (const pair of typeSubtypePairs) {
    const [type, subtype] = pair.split(' - ');
    console.log(`Processing: Type="${type}", Subtype="${subtype}"`);

    const typeSelected = await this.selectDocumentType(type);
    if (!typeSelected) continue;

    await this.page.waitForTimeout(500);
    await this.selectDocumentSubtype(subtype);
    await this.page.waitForTimeout(500);
  }

  await this.page.locator(this.Save).click();
  await this.page.locator(this.Close).click();
}
  
async CreateDocumentType(documentType){
    await this.page.locator(this.DocumentTypeOpenActionMenu).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.DocumentTypeOpenActionMenu).click();
    await this.page.locator(this.ClickShowDataInPopup).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.ClickShowDataInPopup).click();
    await this.page.locator(this.Add).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Add).click();
    await this.page.locator(this.CreateDocumentType_Name).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.CreateDocumentType_Name).fill(documentType);
    await this.page.locator(this.documentSave).click();
    await this.page.locator(this.ClickOK).click();
    await this.page.locator(this.Close2).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Close2).click();
}

async CreateDocumentSubType(documentType, documentSubType){
    await this.page.locator(this.DocumentSubTypeOpenActionMenu).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.DocumentSubTypeOpenActionMenu).click();
    await this.page.locator(this.ClickShowDataInPopup).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.ClickShowDataInPopup).click();
    await this.page.locator(this.Add).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Add).click();


        // Basic approach - Click dropdown and type
    await this.page.locator(this.CreateDocumentSubType_Parent).click();
    await this.page.waitForTimeout(500);
    
    // Type the document type in the search box
    await this.page.keyboard.type(documentType);
    await this.page.waitForTimeout(1000);
    
    // Click the option from results
    const option = this.page.locator(`ul[id="select2-Modal3_TFSetID-results"] li:has-text("${documentType}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();

    ////await this.page.locator(this.selectSearchableDropdownSimple(this.CreateDocumentSubType_Parent, documentType));

    await this.page.locator(this.CreateDocumentSubType_Name).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.CreateDocumentSubType_Name).fill(documentSubType);

    await this.page.locator(this.documentSave).click();
    await this.page.locator(this.ClickOK).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.ClickOK).click();
    await this.page.locator(this.Close2).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Close2).click();
    await this.page.locator(this.Close2).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Close2).click();

}

async FilterExtraSubTypeDocument(type1, subtypesToSelect){
    await this.page.locator(this.FilterButton).click();
    await this.page.locator(this.Filter_ExtraDocumentSubtypesTitle).waitFor({ state: 'visible', timeout: 10000 });
    
    for (const subtype of subtypesToSelect) {
        console.log(`🔍 Filtering by: "${subtype}"`);
        
        // Click the filter textbox to open the dropdown
        await this.page.locator(this.Filter_ExtraDocumentSubtypesTextBox).click();
        await this.page.waitForTimeout(500);
        
        // Type the subtype to filter the dropdown
        await this.page.keyboard.type(type1);
        await this.page.waitForTimeout(500);
        
        // Wait for the dropdown list to appear and click the option
        const filterOption = this.page.locator(`${this.Filter_ExtraDocumentSubtypesList} li:has-text("${subtype}")`).first();
        await filterOption.waitFor({ state: 'visible', timeout: 3000 });
        await filterOption.click();
        
        console.log(`✅ Selected filter: "${subtype}"`);
        await this.page.waitForTimeout(5000);
    }
    
    await this.page.locator(this.CloseFilterButton).click();
}



// async SelectAndDeleteExtraSubTypeDocument(page, tableSelector, col1Index, data1, col2Index, data2){
//   // Locate the table
//   const table = page.locator(tableSelector);

//   // Get all rows inside the table
//   const rows = table.locator("tr");
//   const rowCount = await rows.count();

//   for (let i = 0; i < rowCount; i++) {
//     const row = rows.nth(i);

//     // Get all columns for the row
//     const cols = row.locator("td");
//     const colCount = await cols.count();

//     if (colCount >= Math.max(col1Index, col2Index)) {
//       const col1Text = (await cols.nth(col1Index - 1).innerText()).trim();
//       const col2Text = (await cols.nth(col2Index - 1).innerText()).trim();

//       if (col1Text === data1 && col2Text === data2) {
//         console.log(`✅ Found matching row ${i + 1} → col${col1Index}="${data1}", col${col2Index}="${data2}"`);
//         return row; // Return the matching row locator
//       }
//     }
//   }

//   console.log(`❌ No row found with col${col1Index}="${data1}" and col${col2Index}="${data2}"`);
//   return null;
// }



async SetMandatory(){
  await this.page.locator(this.OpenDocumentButton).click();
  await this.page.waitForTimeout(2000);
  await this.page.locator(this.EditFormButton).click();
  await this.page.waitForTimeout(2000);
  await this.page.locator(this.DataModelButton).click();
  await this.page.waitForTimeout(2000);
  const isMandatory = await this.page.locator(this.RequiredExtraDocumentSubtypeIcon).isVisible();
  if (isMandatory) {
    console.log('✅ Extra Document Subtype is set to Mandatory.');
  }
  else {
    console.log('❌ Extra Document Subtype is NOT set to Mandatory.');
    await this.page.locator(this.RequiredExtraDocumentSubtypeIcon).click();
  }

  await this.page.locator(this.Close).click();

    await this.page.locator(this.OpenDocumentButton).click();
    await this.page.waitForTimeout(2000);

  // Hardcoded backspace
  await this.page.locator(this.ExtraDocumentSubtypes_textbox).click();
  await this.page.waitForTimeout(1000);
  await this.page.keyboard.press('Backspace');
  await this.page.waitForTimeout(1000);
  await this.page.keyboard.press('Backspace');

  await this.page.waitForTimeout(1000);
  await this.page.locator(this.Save).click();
  await this.page.waitForTimeout(2000);

  const isErrorVisible = await this.page.locator(this.MandatoryErrorMessage).isVisible();
  if (isErrorVisible) {
    const errorMessage = await this.page.locator(this.MandatoryErrorMessage).innerText();
    console.log(`✅ Mandatory error message displayed: "${errorMessage}"`);
  } else {
    console.log('❌ Mandatory error message NOT displayed when expected.');
  }
  await this.page.locator(this.Close).click();

}


async ExportAndVerifyInExcel() {
  console.log('🔍 Exporting data and checking for "Extra document subtypes" column');
  
  try {
    // Start waiting for download before clicking export
    const downloadPromise = this.page.waitForEvent('download');
    
    // Click export button to trigger download
    await this.page.locator(this.ExportButton).click();
    await this.page.locator(this.ExecuteButton).click();
    
    // Wait for the download to complete
    const download = await downloadPromise;
    
    // Get the downloaded file path
    const filePath = await download.path();
    console.log(`📁 Downloaded file path: ${filePath}`);
    
    // Now check the Excel file
    return await this.checkExcelForExtraDocumentSubtypesColumn(filePath);
    
  } catch (error) {
    console.log(`❌ Error in export and verify process: ${error.message}`);
    return { found: false, error: error.message };
  }
}

async checkExcelForExtraDocumentSubtypesColumn(filePath) {
  try {
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    const headerRow = workbook.getWorksheet(1).getRow(1);
    let columnIndex = -1;
    
    headerRow.eachCell((cell, colNumber) => {
      if (cell.value?.toString().toLowerCase().includes('extra document subtypes')) {
        columnIndex = colNumber;
      }
    });
    
    const found = columnIndex !== -1;
    console.log(`${found ? '✅' : '❌'} Extra document subtypes column ${found ? 'found at column ' + columnIndex : 'not found'}`);
    
    return { found, columnIndex };
  } catch (error) {
    console.log(`❌ Error reading Excel: ${error.message}`);
    return { found: false, error: error.message };
  }
}


}




module.exports = DocumentManagement;