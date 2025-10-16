// src/Pages/HomePage.js
const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.homeBtn = '#mmHomeButton';
    this.moduleMenuBtn = '#mmModuleMenuButton';
  }

  async gotoHomePage() {
    await this.page.locator(this.homeBtn).waitFor({ state: 'visible', timeout: 20000 });
    await this.page.locator(this.homeBtn).click();
  }


  async gotoModuleMenu() {
    await this.page.locator(this.moduleMenuBtn).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(this.moduleMenuBtn).click(); 
  }

      async clickClose(timeout = 5000) {
      const locator = await smartLocator(this.page, this.Close, timeout);
      await locator.click();
  }
}

module.exports = HomePage;
