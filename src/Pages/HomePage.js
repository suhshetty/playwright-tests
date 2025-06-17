// src/Pages/HomePage.js
const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.homeBtn = '#mmHomeButton';
    this.moduleMenuBtn = '#mmModuleMenuButton';
  }

  async gotoHomePage() {
    const homeBtn = this.page.locator(this.homeBtn);
    await homeBtn.waitFor({ state: 'visible' ,timeout: 5000 });
    await homeBtn.click();
  }

  async gotoModuleMenu() {
    const moduleMenuBtn = this.page.locator(this.moduleMenuBtn);
    await moduleMenuBtn.waitFor({ state: 'visible', timeout: 5000 });
    await moduleMenuBtn.click();
  }
}

module.exports = HomePage;
