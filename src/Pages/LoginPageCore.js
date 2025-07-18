// src/Pages/LoginPage.js
// src/Pages/LoginPage.js
const BasePage = require("./BasePage");

class LoginPageCore extends BasePage {
  constructor(page) {
    super(page);
    this.username = '#UserName';
    this.password = '#Password';
    this.loginBtn = 'button.btn.blue[type="submit"]';
  }

  async gotoLoginPageCore(baseUrl) {
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

module.exports = LoginPageCore;
