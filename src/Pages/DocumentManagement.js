const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

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
    this.OpenDocumentButton = "button[aria-label='Open document']";

    //Add document form locators
    this.ExtraDocumentSubtypes_Title = "div[id='Modal1_TFDocumentSubtypeSelection_label']";
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
    


    // Register, Add ,Close, Save & Export Operations
    this.RegisterDocumentButton = "button[aria-label='This action registers documents based on selected files - MultiRegisterDocument']";
    this.Add = "#newRecordButton"
    this.Close = "i[title='Close window (alt+x)']";
    //the second pop up form - when two forms are open
    this.Close2 =  "(//i[@title='Close window (alt+x)'])[2]";
    this.Save = "button[id='Modal1SaveNav']";
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
    await this.page.locator(this.ExtraDocumentSubtypes_Title).waitFor({ state: 'visible' });

  }


  async AddExtraDocumentSubtypes(subtypesToSelect) {


    // Check if title ExtraDocumentSubtypes is visible
    await this.page.locator(this.ExtraDocumentSubtypes_Title).waitFor({ state: 'visible', timeout: 10000 });
    
    // Select each subtype
    for (const subtype of subtypesToSelect) {
      // Click dropdown to open
      await this.page.locator(this.ExtraDocumentSubtypes_List).click();
      await this.page.waitForTimeout(500);
      await this.page.pause();

      
      // Select option
      const option = this.page.locator(`li:has-text("${subtype}")`).first();
      if (await option.count() > 0) {
        await option.click();
        await this.page.waitForTimeout(1000);
      } else {
        console.log(`Subtype "${subtype}" not found.`);
      }
    }

    //Hardcoded backspace
    await this.page.locator(this.ExtraDocumentSubtypes_List).click();
    await this.page.keyboard.press('Backspace');
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.ExtraDocumentSubtypes_List).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.ExtraDocumentSubtypes_List).click();
    await this.page.keyboard.press('Backspace');

    await this.page.locator(this.Close).click();
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
    await this.page.keyboard.type(documentType);
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

// Then simplify AddDocumentTypesAndSubtypes:
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
    await this.page.locator(this.ClickOK).click();
    await this.page.locator(this.Close2).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Close2).click();
    await this.page.locator(this.Close2).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.Close2).click();

}
}



module.exports = DocumentManagement;