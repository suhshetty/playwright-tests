// src/Pages/LoginPage.js
const BasePage = require("./BasePage");
const { smartLocator } = require("../utils/smartLocator");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.SnapshotsButton = "//button[@title='Snapshots layouts']";
    this.ErrorMessage = "//div[@id='ErrorContainer']";
    
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


async PressEnterOnUsername(username, password){
  const usernameField = await smartLocator(this.page, this.usernameSelectors);
  await usernameField.fill(username);

  const passwordField = await smartLocator(this.page, this.passwordSelectors);
  await passwordField.fill(password);

  await usernameField.press('Enter');

  const snapshotsButtonExists = await this.page.locator(this.SnapshotsButton).count() > 0;
  
  if (snapshotsButtonExists) {
    console.log('✅ Method 1: SUCCESS - Press Enter on Username worked');
  } else {
    console.log('❌ Method 1: FAILED - Press Enter on Username failed');
  }
}


async PressEnterOnPassword(username, password){
  const usernameField = await smartLocator(this.page, this.usernameSelectors);
  await usernameField.fill(username);

  const passwordField = await smartLocator(this.page, this.passwordSelectors);
  await passwordField.fill(password);

  await passwordField.press('Enter');

  const snapshotsButtonExists = await this.page.locator(this.SnapshotsButton).count() > 0;
  
  if (snapshotsButtonExists) {
      console.log('✅ Method 2: SUCCESS - Press Enter on Password worked');
    } else {
      console.log('❌ Method 2: FAILED - Press Enter on Password failed');
    }
}


async PressEnterTwiceOnPassword(username, password){
  const usernameField = await smartLocator(this.page, this.usernameSelectors);
  await usernameField.fill(username);

  const passwordField = await smartLocator(this.page, this.passwordSelectors);
  await passwordField.fill(password);

  await passwordField.press('Enter');
  await passwordField.press('Enter');

  const snapshotsButtonExists = await this.page.locator(this.SnapshotsButton).count() > 0;
  
  if (snapshotsButtonExists) {
      console.log('✅ Method 3: SUCCESS - Press Enter twice on Password worked');
    } else {
      console.log('❌ Method 3: FAILED - Press Enter twice on Password failed');
    }


}

async EnterOnlyUsername(username){
  const usernameField = await smartLocator(this.page, this.usernameSelectors);
  await usernameField.fill(username);

  await passwordField.press('Enter');

  const snapshotsButtonExists = await this.page.locator(this.SnapshotsButton).count() > 0;
  
  if (snapshotsButtonExists) {
    console.log('✅ Method 4: SUCCESS - Press Enter only with Username worked');
  } else {
    console.log('❌ Method 4: FAILED - Press Enter only with Username failed');
  }

}

async EnterOnlyPassword(password){
  const passwordField = await smartLocator(this.page, this.passwordSelectors);
  await passwordField.fill(password);

  const snapshotsButtonExists = await this.page.locator(this.SnapshotsButton).count() > 0;
  
  if (snapshotsButtonExists) {
      console.log('✅ Method 5: SUCCESS - Press Enter only with Password worked');
      }
  else {
      console.log('❌ Method 5: FAILED - Press Enter only with Password failed');

      }

}
}



module.exports = LoginPage;
