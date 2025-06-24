const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');



class BuildingArchive extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Module locators
    this.buildingArchive = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Building archive']";

    // Sub module locators
    this.groundRegistration = '#GroundRegistration';
    this.locationsoverview = '#RegisterLocationStructure';
    this.propertyValuations = '#PropertyValuation';
    this.buildingSystems = '#ObjectRegistration';
    this.locationsofobjects = "#LocationOfObjects";
    this.InteractiveDrawingImport = "#InteractiveDrawingImport";
    this.BimProcessing = "#BimProcessing";
    this.OMDocuments = "#FDVUDocumentation";
    this.TechnicalData = "#TechnicalData";
    this.ClassificationSystems = "#ClassificationSystems";
    this.Configuration = "#Configuration";

    // Sub Types locators ( Sub module : Site Register)
    this.sitesBtn = '#BuildingArchive-GroundRegistration-Ground';
    this.portfolioManagement = "div[aria-label='Portfolio management Process step item']";
    this.portfolios = "div[aria-label='Portfolios Process step item']";

    // Sub Types locators ( Sub module : Locations Overview)
    this.RegisterLocations = "div[aria-label='Register locations Process step item']";
    this.buildings = '#BuildingArchive-RegisterLocationStructure-Building';
    this.BuildingStairwells = "div[aria-label='Building stairwells Process step item']";
    this.BuildingFloors = "div[aria-label ='Building floors Process step item']";
    this.BuildingSpaces = "div[aria-label='Building spaces Process step item']";
    this.OpenAreas = "div[aria-label='Open areas Process step item']";
    this.OpenAreaParts = "div[aria-label='Open area parts Process step item']";
    this.Housings = "div[aria-label='Housings Process step item']";
    this.Addresses = "div[aria-label='Addresses Process step item']";
    this.GISPolygons = "div[aria-label='GIS polygons Process step item']";

    // Sub Types locators ( Sub module : Property Valuations)
    this.RealProperties = "div[aria-label='Real properties Process step item']";
    this.PropertyValuationsBuildings = "div[aria-label='Property valuation buildings Process step item']";
    this.PropertyValuationParts = "div[aria-label='Property valuation parts Process step item']";

    // Sub Types locators ( Sub module : Building Systems)
    this.RegisterBuildingComponents = "div[aria-label='Register building components Process step item']";
    this.RegisterBuildingComponentsCCS = "div[aria-label='Register building components (CCS) Process step item']";
    this.FunctionalSystemsCCS = "div[aria-label='Functional systems (CCS)  Process step item']";
    this.TechnicalSystemsCCS = "div[aria-label='Technical systems (CCS) Process step item']";
    this.ComponentsCCS = "div[aria-label='Components (CCS) Process step item']";
    this.FunctionalSystems = "div[aria-label='Functional systems Process step item']";
    this.TechnicalSystems = "div[aria-label='Technical systems Process step item']";
    this.Components = "div[aria-label='Components Process step item']";
    this.DocumentationObjects = "div[aria-label='Documentation objects Process step item']";
    this.ProductData = "div[aria-label='Product data Process step item']";
    this.LocationProductData = "div[aria-label='Location product data Process step item']";

    // Sub Types locators ( Sub module : Locations of Objects)
    this.LocateSystems = "div[aria-label='Locate systems Process step item']";
    this.ObjectLocations = "div[aria-label='Object Locations Process step item']";

    // Sub Types locators ( Sub module : Interactive Drawing Import)s
    this.InteractiveDrawingImports = "div[aria-label='Interactive drawing imports Process step item']";
    this.InteractiveDrawings = "div[aria-label='Interactive drawings Process step item']";
    this.Drawings = "div[aria-label='Drawings Process step item']";
    this.ReleaseItems = "div[aria-label='Release items Process step item']";
    this.LocateDrawingIcons = "div[aria-label='Locate drawing icons Process step item']";
    this.DocumentLayouts = "div[aria-label='Document layouts Process step item']";

    // Sub Types locators ( Sub module : Bim Processing)
    this.BimProjects = "div[aria-label='BIM projects Process step item']";
    this.BIMModels = "div[aria-label='BIM models Process step item']";
    this.BIMElements = "div[aria-label='BIM elements Process step item']";
    this.AttributeMapping = "div[aria-label='Attribute mappings Process step item']";
    this.ProcessingOfLocationElements = "div[aria-label='Processing of location elements Process step item']";
    this.ProcessingOfSystemElements = "div[aria-label='Processing of system elements Process step item']";
    this.ProductData = "div[aria-label='Product data Process step item']";
    this.RegisterSystemStructures = "div[aria-label='Register system structures Process step item']";

    // Sub Types locators ( Sub module : Om Documents)
    this.Pictures = "div[aria-label='Pictures Process step item']";
    this.Drawings = "div[aria-label='Drawings Process step item']";
    this.Documents = "div[aria-label='Documents Process step item']";
    this.ObjectDocuments = "div[aria-label='Object documents Process step item']";
    this.StructureWithDocuments = "div[aria-label='Structure with documents Process step item']";

    // Sub Types locators ( Sub module : Technical Data)
    this.QRBarCodes = "div[aria-label='QR/bar codes Process step item']";
    this.ObjectInformation = "div[aria-label='Object Information Process step item']";
    this.TechnicalInformation = "div[aria-label='Technical information Process step item']";
    this.ObjectColors = "div[aria-label='Object colors Process step item']";
    this.ObjectExternalReferences = "div[aria-label='Object external references Process step item']";
    this.Materials = "div[aria-label='Materials Process step item']";

    // Sub Types locators ( Sub module : Classification Systems)
    this.Master = "div[aria-label='Master Process step item']";
    this.StructureTemplateManagement = "div[aria-label='Structure template management Process step item']";
    this.StructureTemplates = "div[aria-label='Structure templates Process step item']";
    this.ObjectTypeThemes = "div[aria-label='Object type themes Process step item']";
    this.CCSStandard = "div[aria-label='CCS standard Process step item']";
    this.SfbStandard = "div[aria-label='SfB standards Process step item']";
    this.ObjectTypes = "div[aria-label='Object types Process step item']";
    this.ObjectSubTypes = "div[aria-label='Object subtypes Process step item']";

   // Add new data locators
    this.newSiteBtn = "//button[@aria-label='Register new site']";
    this.newBuildingBtn = "//button[@aria-label='Register new building']";

   // Add new site locators
    this.siteName_Field = "//input[@id='Modal1_TFNamePart']";
    this.AddSitesSuccessMsg = '#swal2-html-container';
    this.AddSiteSaveBtn = '#Modal1SaveNav';

    // Add new building locators
    this.SelectSiteName_dropdown = "#select2-Modal1_TFGroundID-container";
    this.TypeSitename_Field = ".select2-container--open input.select2-search__field";
    this.waitingForSiteOptions = "ul#select2-Modal1_TFGroundID-results > li.select2-results__option";
    this.BuildingName = "#Modal1_TFNamePart";
    this.AddBuildingSuccessMsg = '#swal2-html-container';
    this.AddBuildingSaveBtn = '#Modal1SaveNav';

    //Common locators
    this.saveBtn = '#Modal1SaveNav';

  }

  async clickBuildingArchive() {
    await this.page.waitForTimeout(3000);
    const buildingArchive = this.page.locator(this.buildingArchive).first();
    await buildingArchive.waitFor({ state: 'attached', timeout: 10000 });
    await buildingArchive.evaluate((node) => node.click());
  }

  // Navigate to sub modules
  async gotoSiteRegistration() {
    await this.page.locator(this.groundRegistration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.groundRegistration).click();
  }
  
  async gotoLocationsOverview() {
    await this.page.locator(this.locationsoverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.locationsoverview).click();
  }

  async gotoPropertyValuation() {
    await this.page.locator(this.propertyValuations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.propertyValuations).click(); 
  }

  async gotoBuildingSystems() {
    await this.page.locator(this.buildingSystems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.buildingSystems).click();    
  }

  async gotoLocationsOfObjects() {
    await this.page.locator(this.locationsofobjects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.locationsofobjects).click();  
  }

  async gotoInteractiveDrawingImport() {
    await this.page.locator(this.InteractiveDrawingImport).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.InteractiveDrawingImport).click(); 
  }

  async gotoBimProcessing() {
    await this.page.locator(this.BimProcessing).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BimProcessing).click();
  }

  async gotoOMdocuments() {
    await this.page.locator(this.OMDocuments).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.OMDocuments).click();    
  }

  async gotoTechnicalData() {
    await this.page.locator(this.TechnicalData).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalData).click();    
  }

  async gotoClassificationSystems() {
    await this.page.locator(this.ClassificationSystems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ClassificationSystems).click();    
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();    
  }

  // Navigate to sub types ( Sub module : Site Register)
  async gotoSites() {
    await this.page.locator(this.sitesBtn).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.sitesBtn).click();
  }

  async gotoPortfolioManagement() {
    await this.page.locator(this.portfolioManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.portfolioManagement).click();
  } 

  async gotoPortfolios(){
    await this.page.locator(this.portfolios).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.portfolios).click();  
  }


  // Navigate to sub types ( Sub module : Locations Overview)
  async gotoRegisterLocations() {
    await this.page.locator(this.RegisterLocations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterLocations).click();  
  }

  async gotoBuildings() {
    await this.page.locator(this.buildings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.buildings).click();
  }

  async gotoBuildingStairwells() {
    await this.page.locator(this.BuildingStairwells).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BuildingStairwells).click();
  }

  async gotoBuildingFloors() {
    await this.page.locator(this.BuildingFloors).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BuildingFloors).click();
  }

  async gotoBuildingSpaces() {
    await this.page.locator(this.BuildingSpaces).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BuildingSpaces).click();
  }

  async gotoOpenAreas() {
    await this.page.locator(this.OpenAreas).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.OpenAreas).click();
  }

  async gotoOpenAreaParts() {
    await this.page.locator(this.OpenAreaParts).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.OpenAreaParts).click();
  }

  async gotoHousings() {
    await this.page.locator(this.Housings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Housings).click();
  }

  async gotoAddresses() {
    await this.page.locator(this.Addresses).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Addresses).click();
  }

  async gotoGISPolygons() {
    await this.page.locator(this.GISPolygons).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.GISPolygons).click();
  }


  // Navigate to sub types ( Sub module : Property Valuation)
  async gotoRealProperties() {
    await this.page.locator(this.RealProperties).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RealProperties).click();
  }

  async gotoPropertyValuationsBuildings() {
    await this.page.locator(this.PropertyValuationsBuildings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PropertyValuationsBuildings).click();
  }

  async gotoPropertyValuationParts() {
    await this.page.locator(this.PropertyValuationParts).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PropertyValuationParts).click();
  }

  // Navigate to sub types ( Sub module : Building Systems)
  async gotoRegisterBuildingComponents() {
    await this.page.locator(this.RegisterBuildingComponents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterBuildingComponents).click();
  }

  async gotoRegisterBuildingComponentsCCS() {
    await this.page.locator(this.RegisterBuildingComponentsCCS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterBuildingComponentsCCS).click();
  }

  async gotoFunctionalSystemsCCS() {
    await this.page.locator(this.FunctionalSystemsCCS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.FunctionalSystemsCCS).click();
  }

  async gotoTechnicalSystemsCCS() {
    await this.page.locator(this.TechnicalSystemsCCS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalSystemsCCS).click();
  }

  async gotoComponentsCCS() {
    await this.page.locator(this.ComponentsCCS).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ComponentsCCS).click();
  }

  async gotoFunctionalSystems() {
    await this.page.locator(this.FunctionalSystems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.FunctionalSystems).click();
  }

  async gotoTechnicalSystems() {
    await this.page.locator(this.TechnicalSystems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalSystems).click();
  }

  async gotoComponents() {
    await this.page.locator(this.Components).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Components).click();
  }

  async gotoDocumentationObjects() {
    await this.page.locator(this.DocumentationObjects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentationObjects).click();
  }

  async gotoProductData() {
    await this.page.locator(this.ProductData).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductData).click();
  }

  async gotoLocationProductData() {
    await this.page.locator(this.LocationProductData).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LocationProductData).click();
  }

  // Navigate to sub types ( Sub module : Locations of Objects)
  async gotoLocateSystems() {
    await this.page.locator(this.LocateSystems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LocateSystems).click();
  }

  async gotoObjectLocations() {
    await this.page.locator(this.ObjectLocations).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectLocations).click();
  }

  // Navigate to sub types ( Sub module : Interactive Drawing Import)
  async gotoInteractiveDrawingImports() {
    await this.page.locator(this.InteractiveDrawingImports).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.InteractiveDrawingImports).click();
  } 

  async gotoInteractiveDrawings() {
    await this.page.locator(this.InteractiveDrawings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.InteractiveDrawings).click();
  }

  async gotoDrawings() {
    await this.page.locator(this.Drawings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Drawings).click();
  }

  async gotoReleaseItems() {
    await this.page.locator(this.ReleaseItems).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ReleaseItems).click();
  }

  async gotoLocateDrawingIcons() {
    await this.page.locator(this.LocateDrawingIcons).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LocateDrawingIcons).click();
  }

  async gotoDocumentLayouts() {
    await this.page.locator(this.DocumentLayouts).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DocumentLayouts).click();
  }

  // Navigate to sub types ( Sub module : Bim Processing)
  async gotoBimProjects() {
    await this.page.locator(this.BimProjects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BimProjects).click();
  }

  async gotoBIMModels() {
    await this.page.locator(this.BIMModels).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BIMModels).click();
  }

  async gotoBIMElements() {
    await this.page.locator(this.BIMElements).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.BIMElements).click();
  }

  async gotoAttributeMapping() {
    await this.page.locator(this.AttributeMapping).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.AttributeMapping).click();
  }

  async gotoProcessingOfLocationElements() {
    await this.page.locator(this.ProcessingOfLocationElements).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProcessingOfLocationElements).click();
  }

  async gotoProcessingOfSystemElements() {
    await this.page.locator(this.ProcessingOfSystemElements).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProcessingOfSystemElements).click();
  }

  async gotoProductDataBIM() {
    await this.page.locator(this.ProductData).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ProductData).click();
  }

  async gotoRegisterSystemStructures() {
    await this.page.locator(this.RegisterSystemStructures).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RegisterSystemStructures).click();
  }

  // Navigate to sub types ( Sub module : Om Documents)
  async gotoPictures() {
    await this.page.locator(this.Pictures).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Pictures).click();
  }

  async gotoDrawingsOm() {
    await this.page.locator(this.Drawings).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Drawings).click();
  }

  async gotoDocuments() {
    await this.page.locator(this.Documents).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Documents).click();
  } 

  async gotoObjectDocuments() {
    await this.page.locator(this.ObjectDocuments).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectDocuments).click();
  }

  async gotoStructureWithDocuments() {
    await this.page.locator(this.StructureWithDocuments).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StructureWithDocuments).click();
  }

  // Navigate to sub types ( Sub module : Technical Data)
  async gotoQRBarCodes() {
    await this.page.locator(this.QRBarCodes).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.QRBarCodes).click();
  }

  async gotoObjectInformation() {
    await this.page.locator(this.ObjectInformation).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectInformation).click();
  }

  async gotoTechnicalInformation() {
    await this.page.locator(this.TechnicalInformation).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.TechnicalInformation).click();
  }

  async gotoObjectColors() {
    await this.page.locator(this.ObjectColors).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectColors).click(); 
  }

  async gotoObjectExternalReferences() {
    await this.page.locator(this.ObjectExternalReferences).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectExternalReferences).click();
  }

  async gotoMaterials() {
    await this.page.locator(this.Materials).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Materials).click();
  }

  // Navigate to sub types ( Sub module : Classification Systems)
  async gotoMaster() {
    await this.page.locator(this.Master).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Master).click();
  }

  async gotoStructureTemplateManagement() {
    await this.page.locator(this.StructureTemplateManagement).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StructureTemplateManagement).click();
  }

  async gotoStructureTemplates() {
    await this.page.locator(this.StructureTemplates).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.StructureTemplates).click();
  }

  async gotoObjectTypeThemes() {
    await this.page.locator(this.ObjectTypeThemes).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectTypeThemes).click();
  }

  async gotoCCSStandard() {
    await this.page.locator(this.CCSStandard).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.CCSStandard).click();
  }

  async gotoSfbStandard() {
    await this.page.locator(this.SfbStandard).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.SfbStandard).click();
  }

  async gotoObjectTypes() {
    await this.page.locator(this.ObjectTypes).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectTypes).click();
  }

  async gotoObjectSubTypes() {
    await this.page.locator(this.ObjectSubTypes).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.ObjectSubTypes).click();
  }

  async registerNewSite(siteName) {
    await this.page.locator(this.newSiteBtn).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.newSiteBtn).click();
    await this.page.locator(this.siteName_Field).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.siteName_Field).fill(siteName);
    await this.page.locator(this.AddSiteSaveBtn).click();
    await this.page.locator(this.AddSitesSuccessMsg).waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.page.locator(this.AddSitesSuccessMsg)).toHaveText("Your work has been saved");
  }

async registerNewBuilding(siteName, buildingName) {
  await this.page.locator(this.newBuildingBtn).waitFor({ state: 'visible', timeout: 5000 });
  await this.page.locator(this.newBuildingBtn).click();

  await this.page.locator(this.SelectSiteName_dropdown).waitFor({ state: 'visible', timeout: 5000 });
  await this.page.locator(this.SelectSiteName_dropdown).click();

  await this.page.locator(this.TypeSitename_Field).fill(siteName);
  await this.page.locator(this.waitingForSiteOptions).first().waitFor({ state: 'visible', timeout: 5000 });
  
  // Uses the method from BasePage to select the site by text
  await this.selectDropdownOptionByText(this.page.locator(this.waitingForSiteOptions), siteName);

  await this.page.locator(this.BuildingName).waitFor({ state: 'visible', timeout: 5000 });
  await this.page.locator(this.BuildingName).fill(buildingName);

  await this.page.locator(this.AddBuildingSaveBtn).click();

  await this.page.locator(this.AddBuildingSuccessMsg).waitFor({ state: 'visible', timeout: 5000 });
  await expect(this.page.locator(this.AddBuildingSuccessMsg)).toHaveText("Your work has been saved");
}

}

module.exports = BuildingArchive;
