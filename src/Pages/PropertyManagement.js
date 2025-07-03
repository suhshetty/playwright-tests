const BasePage = require("./BasePage");
const { expect } = require('@playwright/test');

class PropertyManagement extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

        // Module locators
    this.propertyManagement = "//span[@class='m-menu__link-text mm-menu-link-text' and text()='Property management']";

    // Sub module locators
    this.LeaseObjects = "div[aria-label='Lease objects Process step']";
    this.LeaseContractsOverview = "div[aria-label='Lease contracts overview Process step']";
    this.LeaseContractFinance = "div[aria-label='Lease contract finance Process step']";
    this.LeaseModel = "div[aria-label='Lease Model Process step']";
    this.PurchaseContractsOverview = "div[aria-label='Purchase contracts overview Process step']";
    this.LeaseHolders = "div[aria-label='Lease holders Process step']";
    this.HousingBrokerage = "div[aria-label='Housing brokerage Process step']";
    this.MovingInOut = "div[aria-label='Moving In/Out Process step']";
    this.RoomBooking = "div[aria-label='Room booking Process step']";
    this.DataSetup = "div[aria-label='Data setup Process step']";
    this.Configuration = "div[aria-label='Configuration Process step']";

    // Sub Types locators ( Sub module : Lease Objects)
    this.Housings = "div[aria-label='Housings Process step item']";
    this.BuildingSpaces = "div[aria-label='Building spaces Process step item']";
    this.HousingSpaces = "div[aria-label='Housing Spaces Process step item']";
    this.BuildingSpaceInformants = "div[aria-label='Building space Informations Process step item']";
    this.CapacityObjects = "div[aria-label='Capacity objects Process step item']";
    this.LocateCapacityObjects = "div[aria-label='Locate capacity objects Process step item']";
    this.LocationCostDivision = "div[aria-label='Location cost divisions Process step item']";
    this.WorkOrderPayers = "div[aria-label='Work order payers Process step item']";
    this.PublishedPriceLists = "div[aria-label='Published price lists Process step item']";

    // Sub Types locators ( Sub module : Lease Contracts Overview)
    this.HeadLeaseContracts = "div[aria-label='Head lease contracts Process step item']";
    this.LeaseContracts = "div[aria-label='Lease contracts Process step item']";
    this.SubLeaseContracts = "div[aria-label='Sub lease contracts Process step item']";
    this.LeaseContractReminders = "div[aria-label='Lease contract reminders Process step item']";
    this.LeaseContractRenegotiations = "div[aria-label='Lease contract renegotiations Process step item']";
    this.LeaseContractUtilizations = "div[aria-label='Lease contract utilizations Process step item']";
    this.SiteLeases = "div[aria-label='Site leases Process step item']";

    // Sub Types locators ( Sub module : Lease Contract Finance )
    this.LeaseContractPaymentItems = "div[aria-label='Lease contract payment items Process step item']";
    this.LeaseContractPayments = "div[aria-label='Lease contract payments Process step item']";
    this.LeaseContractCustomerRevenues = "div[aria-label='Lease contract customer revenues Process step item']";
    this.CostDistributionAgreements = "div[aria-label='Cost distribution agreements Process step item']";
    this.CostDistributionAgreementGroups = "div[aria-label='Cost distribution agreement groups Process step item']";
    this.Products = "div[aria-label='Products Process step item']";
    this.InvoiceBasis = "div[aria-label='Invoice basis Process step item']";

    // Sub Types locators ( Sub module : Lease Model )
    this.LeaseExaminations = "div[aria-label='Lease Examinations Process step item']";
    this.SiteKeyFigures = "div[aria-label='Site keyfigures Process step item']";
    this.SiteBasicCosts = "div[aria-label='Site Basic Costs Process step item']";
    this.SiteLeases = "div[aria-label='Site leases Process step item']";
    this.Revenues = "div[aria-label='Revenues Process step item']";
    this.CostItems = "div[aria-label='Cost items Process step item']";
    this.Loans = "div[aria-label='Loans Process step item']";
    this.SpaceUsages = "div[aria-label='Space usages Process step item']";
    this.AnnualPercentags = "div[aria-label='Annual Percentages Process step item']";
    this.LeaseHistories = "div[aria-label='Lease Histories Process step item']";

    // Sub Types locators ( Sub module : Purchase Contracts Overview )
    this.PurchaseContracts = "div[aria-label='Purchase contracts Process step item']";
    this.PurchaseContractReminders = "div[aria-label='Purchase contract reminders Process step item']";
    this.PurchaseContractPaymentItems = "div[aria-label='Purchase contract payment items Process step item']";
    this.InvoiceBasis = "div[aria-label='Invoice basis Process step item']";

    // Sub Types locators ( Sub module : Lease Holders )
    this.LeaseHolderOrganisations = "div[aria-label='Lease holder organisations Process step item']";
    this.Residents = "div[aria-label='Residents Process step item']";
    this.OrganicVatDeclarations = "div[aria-label='Organisation VAT declarations Process step item']";
    this.Companies = "div[aria-label='Companies Process step item']";
    this.PersonsUsers = "div[aria-label='Persons/users Process step item']";
    this.Failures = "div[aria-label='Failures Process step item']";

    // Sub Types locators ( Sub module : Housing Brokerage )
    this.LeaseApplications = "div[aria-label='Lease Applications Process step item']";
    this.Opportunities = "div[aria-label='Opportunities Process step item']";
    this.OpportunityComments = "div[aria-label='Opportunity comments Process step item']";

    // Sub Types locators ( Sub module : Moving In & Out )
    this.WorkOrders = "div[aria-label='Work orders Process step item']";
    this.Checklists = "div[aria-label='Checklists Process step item']";
    this.Inspections = "div[aria-label='Inspections Process step item']";
    this.CheckItems = "div[aria-label='Check items Process step item']";
    this.HousingWorkProcessRules = "div[aria-label='Housing work process rules Process step item']";

    // Sub Types locators ( Sub module : Room Booking )
    this.MeetingRoomReservations = "div[aria-label='Meeting room reservations Process step item']";
    this.MeetingRoomCateringOrders = "div[aria-label='Meeting room catering orders Process step item']";
    this.MeetingRoomEquipmentOrders = "div[aria-label='Meeting room equipment orders Process step item']";
    this.InvoiceBasis = "div[aria-label='Invoice basis Process step item']";

    // Sub Types locators ( Sub module : Data Set up )
    this.PriceIndexes = "div[aria-label='Price indexes Process step item']";

    // Sub Types locators ( Sub module : Configurations )
    this.Configuration = "div[aria-label='Access configurations Process step item']";
  }

  async clickpropertyManagement() {
    await this.page.waitForTimeout(3000);
    const propertyManagement = this.page.locator(this.propertyManagement).first();
    await propertyManagement.waitFor({ state: 'attached', timeout: 10000 });
    await propertyManagement.evaluate((node) => node.click());
  }

  // Navigate to sub modules
  async gotoLeaseObjects() {
    await this.page.locator(this.LeaseObjects).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LeaseObjects).click();
  }

  async gotoLeaseContractsOverview() {
    await this.page.locator(this.LeaseContractsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LeaseContractsOverview).click();
  }

  async gotoLeaseContractFinance() {
    await this.page.locator(this.LeaseContractFinance).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LeaseContractFinance).click();
  }

  async gotoLeaseModel() {
    await this.page.locator(this.LeaseModel).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LeaseModel).click();
  }

  async gotoPurchaseContractsOverview() {
    await this.page.locator(this.PurchaseContractsOverview).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.PurchaseContractsOverview).click();
  }

  async gotoLeaseHolders() {
    await this.page.locator(this.LeaseHolders).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.LeaseHolders).click();
  }

  async gotoHousingBrokerage() {
    await this.page.locator(this.HousingBrokerage).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.HousingBrokerage).click();
  }

  async gotoMovingInOut() {
    await this.page.locator(this.MovingInOut).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.MovingInOut).click();
  }

  async gotoRoomBooking() {
    await this.page.locator(this.RoomBooking).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.RoomBooking).click();
  }

  async gotoDataSetup() {
    await this.page.locator(this.DataSetup).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.DataSetup).click();
  }

  async gotoConfiguration() {
    await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.Configuration).click();
  }

   // Navigate to sub types ( Sub module : Lease Objects)
   async gotoHousings() {
     await this.page.locator(this.Housings).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Housings).click();
   }

   async gotoBuildingSpaces() {
     await this.page.locator(this.BuildingSpaces).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.BuildingSpaces).click();
   }

   async gotoHousingSpaces() {
     await this.page.locator(this.HousingSpaces).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.HousingSpaces).click();
   }

   async gotoBuildingSpaceInformants() {
     await this.page.locator(this.BuildingSpaceInformants).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.BuildingSpaceInformants).click();
   }

   async gotoCapacityObjects() {
     await this.page.locator(this.CapacityObjects).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CapacityObjects).click();
   }

   async gotoLocateCapacityObjects() {
     await this.page.locator(this.LocateCapacityObjects).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LocateCapacityObjects).click();
   }

   async gotoLocationCostDivision() {
     await this.page.locator(this.LocationCostDivision).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LocationCostDivision).click();
   }

   async gotoWorkOrderPayers() {
     await this.page.locator(this.WorkOrderPayers).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.WorkOrderPayers).click();
   }

   async gotoPublishedPriceLists() {
     await this.page.locator(this.PublishedPriceLists).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PublishedPriceLists).click();
   }


   // Navigate to sub types ( Sub module : Lease Contracts Overview)
   async gotoHeadLeaseContracts() {
     await this.page.locator(this.HeadLeaseContracts).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.HeadLeaseContracts).click();
   }

   async gotoLeaseContracts() {
     await this.page.locator(this.LeaseContracts).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContracts).click();
   }

   async gotoSubLeaseContracts() {
     await this.page.locator(this.SubLeaseContracts).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SubLeaseContracts).click();
   }

   async gotoLeaseContractReminders() {
     await this.page.locator(this.LeaseContractReminders).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContractReminders).click();
   }

   async gotoLeaseContractRenegotiations() {
     await this.page.locator(this.LeaseContractRenegotiations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContractRenegotiations).click();
   }

   async gotoLeaseContractUtilizations() {
     await this.page.locator(this.LeaseContractUtilizations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContractUtilizations).click();
   }

   async gotoSiteLeases() {
     await this.page.locator(this.SiteLeases).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SiteLeases).click();
   }

   // Navigate to sub types ( Sub module : Lease Contract Finance)

   async gotoLeaseContractPaymentItems() {
     await this.page.locator(this.LeaseContractPaymentItems).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContractPaymentItems).click();
   }

   async gotoLeaseContractPayments() {
     await this.page.locator(this.LeaseContractPayments).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContractPayments).click();
   }

   async gotoLeaseContractCustomerRevenues() {
     await this.page.locator(this.LeaseContractCustomerRevenues).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseContractCustomerRevenues).click();
   }

   async gotoCostDistributionAgreements() {
     await this.page.locator(this.CostDistributionAgreements).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CostDistributionAgreements).click();
   }

   async gotoCostDistributionAgreementGroups() {
     await this.page.locator(this.CostDistributionAgreementGroups).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CostDistributionAgreementGroups).click();
   }

   async gotoProducts() {
     await this.page.locator(this.Products).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Products).click();
   }

   async gotoInvoiceBasis() {
     await this.page.locator(this.InvoiceBasis).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.InvoiceBasis).click();
   }

   // Navigate to sub types ( Sub module : Lease Model)

   async gotoLeaseExaminations() {
     await this.page.locator(this.LeaseExaminations).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseExaminations).click();
   }

   async gotoSiteKeyFigures() {
     await this.page.locator(this.SiteKeyFigures).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SiteKeyFigures).click();
   }

   async gotoSiteBasicCosts() {
     await this.page.locator(this.SiteBasicCosts).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SiteBasicCosts).click();
   }

   async gotoSiteLeases() {
     await this.page.locator(this.SiteLeases).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SiteLeases).click();
   }

   async gotoRevenues() {
     await this.page.locator(this.Revenues).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Revenues).click();
   }

   async gotoCostItems() {
     await this.page.locator(this.CostItems).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.CostItems).click();
   }

   async gotoLoans() {
     await this.page.locator(this.Loans).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.Loans).click();
   }

   async gotoSpaceUsages() {
     await this.page.locator(this.SpaceUsages).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.SpaceUsages).click();
   }

   async gotoAnnualPercentages() {
     await this.page.locator(this.AnnualPercentags).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.AnnualPercentags).click();
   }

   async gotoLeaseHistories() {
     await this.page.locator(this.LeaseHistories).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.LeaseHistories).click();
   }


   // Navigate to sub types ( Sub module : Purchase Contracts Overview)

   async gotoPurchaseContracts() {
     await this.page.locator(this.PurchaseContracts).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PurchaseContracts).click();
   }

   async gotoPurchaseContractReminders() {
     await this.page.locator(this.PurchaseContractReminders).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PurchaseContractReminders).click();
   }

   async gotoPurchaseContractPaymentItems() {
     await this.page.locator(this.PurchaseContractPaymentItems).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.PurchaseContractPaymentItems).click();
   }

   async gotoInvoiceBasis() {
     await this.page.locator(this.InvoiceBasis).waitFor({ state: 'visible', timeout: 5000 });
     await this.page.locator(this.InvoiceBasis).click();
   }

    // Navigate to sub types ( Sub module : Lease Holders )

    async gotoLeaseHolderOrganisations() {
      await this.page.locator(this.LeaseHolderOrganisations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.LeaseHolderOrganisations).click();
    }

    async gotoResidents() {
      await this.page.locator(this.Residents).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Residents).click();
    }

    async gotoOrganicVatDeclarations() {
      await this.page.locator(this.OrganicVatDeclarations).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.OrganicVatDeclarations).click();
    }

    async gotoCompanies() {
      await this.page.locator(this.Companies).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Companies).click();
    }

    async gotoPersonsUsers() {
      await this.page.locator(this.PersonsUsers).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.PersonsUsers).click();
    }

    async gotoFailures() {
      await this.page.locator(this.Failures).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.Failures).click();
    }

     // Navigate to sub types ( Sub module : Housing Brokerage)

     async gotoLeaseApplications() {
       await this.page.locator(this.LeaseApplications).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.LeaseApplications).click();
     }

     async gotoOpportunities() {
       await this.page.locator(this.Opportunities).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.Opportunities).click();
     }

     async gotoOpportunityComments() {
       await this.page.locator(this.OpportunityComments).waitFor({ state: 'visible', timeout: 5000 });
       await this.page.locator(this.OpportunityComments).click();
     }

      // Navigate to sub types ( Sub module : Moving In & Out)

      async gotoWorkOrders() {
        await this.page.locator(this.WorkOrders).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.WorkOrders).click();
      }

      async gotoChecklists() {
        await this.page.locator(this.Checklists).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.Checklists).click();
      }

      async gotoInspections() {
        await this.page.locator(this.Inspections).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.Inspections).click();
      }

      async gotoCheckItems() {
        await this.page.locator(this.CheckItems).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.CheckItems).click();
      }

      async gotoHousingWorkProcessRules() {
        await this.page.locator(this.HousingWorkProcessRules).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.HousingWorkProcessRules).click();
      }

       // Navigate to sub types ( Sub module : Room Booking)

       async gotoMeetingRoomReservations() {
         await this.page.locator(this.MeetingRoomReservations).waitFor({ state: 'visible', timeout: 5000 });
         await this.page.locator(this.MeetingRoomReservations).click();
       }

       async gotoMeetingRoomCateringOrders() {
         await this.page.locator(this.MeetingRoomCateringOrders).waitFor({ state: 'visible', timeout: 5000 });
         await this.page.locator(this.MeetingRoomCateringOrders).click();
       }

       async gotoMeetingRoomEquipmentOrders() {
         await this.page.locator(this.MeetingRoomEquipmentOrders).waitFor({ state: 'visible', timeout: 5000 });
         await this.page.locator(this.MeetingRoomEquipmentOrders).click();
       }

       async gotoInvoiceBasis() {
         await this.page.locator(this.InvoiceBasis).waitFor({ state: 'visible', timeout: 5000 });
         await this.page.locator(this.InvoiceBasis).click();
       }
       
        // Navigate to sub types ( Sub module : Data Set up )

       async gotoPriceIndexes() {
         await this.page.locator(this.PriceIndexes).waitFor({ state: 'visible', timeout: 5000 });
         await this.page.locator(this.PriceIndexes).click();
       }

       // Navigate to sub types ( Sub module : Configurations)

       async gotoConfigurations() {
         await this.page.locator(this.Configuration).waitFor({ state: 'visible', timeout: 5000 });
         await this.page.locator(this.Configuration).click();
       }

}

module.exports = PropertyManagement;




























