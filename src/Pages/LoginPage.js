// src/Pages/LoginPage.js
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = '#lgnUserLogin_UserName';
    this.password = '#lgnUserLogin_Password';
    this.loginBtn = '#lgnUserLogin_Login';
  }

  async gotoLoginPage(baseUrl) {
    await this.page.goto(baseUrl); 
  }

  async login(username, password) {
    const usernameField = this.page.locator(this.username);
    await usernameField.waitFor({ state: 'visible', timeout: 5000 });
    await usernameField.fill(username);

    const passwordField = this.page.locator(this.password);
    await passwordField.waitFor({ state: 'visible', timeout: 5000 });
    await passwordField.fill(password);

    const loginBtn = this.page.locator(this.loginBtn);
    await loginBtn.waitFor({ state: 'visible', timeout: 5000 });
    await loginBtn.click();
  }
}

module.exports = LoginPage;
