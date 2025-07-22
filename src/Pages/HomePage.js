// src/Pages/HomePage.js
const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.homeBtn = '#mmHomeButton';
    this.moduleMenuBtn = '#mmModuleMenuButton';
  }

  async gotoHomePage() {
    try {
      await this.page.locator(this.homeBtn).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.homeBtn).click();
    } catch (error) {
      console.log('Home button not found or not visible, skipping...');
      // If home button is not found, we might already be on home page
    }
  }


  async gotoModuleMenu() {
    try {
      await this.page.locator(this.moduleMenuBtn).waitFor({ state: 'visible', timeout: 5000 });
      await this.page.locator(this.moduleMenuBtn).click();
    } catch (error) {
      console.log('Module menu button not found or not visible');
      throw error;
    }
  }
}

module.exports = HomePage;
