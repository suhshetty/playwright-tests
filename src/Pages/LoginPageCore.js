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
    // Wait for page to load completely
    await this.page.waitForLoadState('networkidle');
    // Add a short wait to ensure all elements are rendered
    await this.page.waitForTimeout(2000);
  }

  async loginCore(username, password) {
    // Try multiple selectors for username field in case of different environments
    const usernameSelectors = ['#UserName', '#userName', '#username', 'input[name="UserName"]', 'input[name="username"]'];
    const passwordSelectors = ['#Password', '#password', 'input[name="Password"]', 'input[name="password"]'];
    const loginBtnSelectors = ['button.btn.blue[type="submit"]', 'input[type="submit"]', 'button[type="submit"]', '.login-btn'];

    let usernameField = null;
    let passwordField = null;
    let loginBtn = null;

    // Try to find username field
    for (const selector of usernameSelectors) {
      try {
        const field = this.page.locator(selector);
        await field.waitFor({ state: 'visible', timeout: 2000 });
        usernameField = field;
        console.log(`Found username field with selector: ${selector}`);
        break;
      } catch (error) {
        console.log(`Username selector ${selector} not found, trying next...`);
        continue;
      }
    }

    if (!usernameField) {
      console.log('Current URL:', await this.page.url());
      console.log('Page title:', await this.page.title());
      await this.page.screenshot({ path: 'debug-login-username-not-found.png', fullPage: true });
      throw new Error('Username field not found with any selector');
    }

    // Try to find password field
    for (const selector of passwordSelectors) {
      try {
        const field = this.page.locator(selector);
        await field.waitFor({ state: 'visible', timeout: 2000 });
        passwordField = field;
        console.log(`Found password field with selector: ${selector}`);
        break;
      } catch (error) {
        console.log(`Password selector ${selector} not found, trying next...`);
        continue;
      }
    }

    if (!passwordField) {
      throw new Error('Password field not found with any selector');
    }

    // Try to find login button
    for (const selector of loginBtnSelectors) {
      try {
        const btn = this.page.locator(selector);
        await btn.waitFor({ state: 'visible', timeout: 2000 });
        loginBtn = btn;
        console.log(`Found login button with selector: ${selector}`);
        break;
      } catch (error) {
        console.log(`Login button selector ${selector} not found, trying next...`);
        continue;
      }
    }

    if (!loginBtn) {
      throw new Error('Login button not found with any selector');
    }

    // Perform login
    await usernameField.fill(username);
    await passwordField.fill(password);
    await loginBtn.click();
    
    // Wait for navigation after login
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
  }

  // Alias method for backward compatibility
  async login(username, password) {
    await this.loginCore(username, password);
  }
}

module.exports = LoginPageCore;
