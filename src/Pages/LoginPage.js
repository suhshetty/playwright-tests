// src/Pages/LoginPage.js
const BasePage = require("./BasePage");
const { smartLocator } = require("../utils/smartLocator");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Lists of possible selectors (self-healing options)
    this.usernameSelectors = [
      '#lgnUserLogin_UserName',
      '#UserName'
    ];
    this.passwordSelectors = [
      '#lgnUserLogin_Password',
      '#Password',

    ];
    this.loginBtnSelectors = [
      '#lgnUserLogin_Login',
      'button[type="submit"]'
    ];
  }

  async gotoLoginPage(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async login(username, password) {
    const usernameField = await smartLocator(this.page, this.usernameSelectors);
    await usernameField.fill(username);

    const passwordField = await smartLocator(this.page, this.passwordSelectors);
    await passwordField.fill(password);

    const loginBtn = await smartLocator(this.page, this.loginBtnSelectors);
    await loginBtn.click();
  }
}

module.exports = LoginPage;
