// src/Pages/LoginPage.js
const BasePage = require("./BasePage");
const { smartLocator } = require("../utils/smartLocator");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.EGMainManagerLogo = "(//img[contains(@title, 'MainManager')])[1]";
    this.SnapshotsButton = "//button[@title='Snapshots layouts']"; // Added missing SnapshotsButton
    this.ErrorMessage = "//div[@id='ErrorContainer']";
    
    // Lists of possible selectors (self-healing options)
    this.usernameSelectors = [
      '#lgnUserLogin_UserName',
      '#UserName'
    ];
    this.passwordSelectors = [
      '#lgnUserLogin_Password',
      '#Password'
    ];
    this.loginBtnSelectors = [
      '#lgnUserLogin_Login',
      '//button[@type="submit" and normalize-space(text())="Sign in"]'
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
    await this.page.waitForTimeout(4000);

    const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

    if (EGMainManagerLogo) {
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
    await this.page.waitForTimeout(3000); // Added wait time

    const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

    if (EGMainManagerLogo) {
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
    for (let i = 0; i < 2; i++) {
      await this.page.keyboard.press('Enter');
    }
    // await passwordField.press('Enter');
    // await passwordField.press('Enter');
    await this.page.waitForTimeout(5000); // Added wait time

    const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

    if (EGMainManagerLogo) {
      console.log('✅ Method 3: SUCCESS - Press Enter twice on Password worked');
    } else {
      console.log('❌ Method 3: FAILED - Press Enter twice on Password failed');
    }
  }

  async EnterOnlyUsername(username){
    const usernameField = await smartLocator(this.page, this.usernameSelectors);
    await usernameField.fill(username);

    await usernameField.press('Enter');
    await this.page.waitForTimeout(3000); // Added wait time

    // Fixed: Should check for error, not success
    const errorExists = await this.page.locator(this.ErrorMessage).count() > 0;
    
    if (errorExists) {
      console.log('✅ Method 4: SUCCESS - Error shown as expected for username only');
    } else {
      console.log('❌ Method 4: FAILED - No error shown for username only');
    }
  }

  async EnterOnlyPassword(password){
    const passwordField = await smartLocator(this.page, this.passwordSelectors);
    await passwordField.fill(password);

    await passwordField.press('Enter');
    await this.page.waitForTimeout(3000); // Added wait time

    // Fixed: Should check for error, not success
    const errorExists = await this.page.locator(this.ErrorMessage).count() > 0;
    
    if (errorExists) {
      console.log('✅ Method 5: SUCCESS - Error shown as expected for password only');
    } else {
      console.log('❌ Method 5: FAILED - No error shown for password only');
    }
  }

  // async CopyPasteUsername(username, password) {
  //   const usernameField = await smartLocator(this.page, this.usernameSelectors);
  //   await usernameField.fill(username);

  //   // Copy and cut the username
  //   await this.page.keyboard.press("Control+A");
  //   await this.page.waitForTimeout(500);
  //   await this.page.keyboard.press("Control+X");
  //   await this.page.waitForTimeout(500);
    
  //   // Paste the username from clipboard
  //   await this.page.keyboard.press("Control+V");
  //   await this.page.waitForTimeout(1000);

  //   const passwordField = await smartLocator(this.page, this.passwordSelectors);
  //   await passwordField.fill(password);

  //   // Copy and cut the password
  //   await this.page.keyboard.press("Control+A");
  //   await this.page.waitForTimeout(700);
  //   await this.page.keyboard.press("Control+X");
  //   await this.page.waitForTimeout(700);

  //   // Fixed: Typo - "pres" to "press"
  //   await this.page.keyboard.press("Control+V");
  //   await this.page.waitForTimeout(500);
  //   await passwordField.press('Enter');
  //   await this.page.waitForTimeout(3000); 
  //   const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

  //   if (EGMainManagerLogo) {
  //     console.log('✅ Method 6: SUCCESS - Copy/Paste credentials worked');
  //   } else {
  //     console.log('❌ Method 6: FAILED - Copy/Paste credentials failed');
  //   }
  // }

  async EnterTabTwice(username, password){
    const usernameField = await smartLocator(this.page, this.usernameSelectors);
    await usernameField.fill(username);

    const passwordField = await smartLocator(this.page, this.passwordSelectors);
    await passwordField.fill(password);

    for (let i = 0; i < 2; i++) {
      await this.page.keyboard.press('Tab');
    }

    await passwordField.press('Enter');

    await this.page.waitForTimeout(10000); // Added wait time
    const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

    if (EGMainManagerLogo) {
      console.log('✅ Method 6: SUCCESS - Press Tab twice worked');
    } else {
      console.log('❌ Method 6: FAILED - Press Tab twice failed');
    }
  }

  async EnterTabWithCapsOn(username, password){
    const usernameField = await smartLocator(this.page, this.usernameSelectors);
    await usernameField.fill(username);

    const passwordField = await smartLocator(this.page, this.passwordSelectors);
    await passwordField.fill(password);

    await this.page.keyboard.press("CapsLock");
    await passwordField.press('Enter');
    await this.page.waitForTimeout(3000); // Added wait time
    const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

    if (EGMainManagerLogo) {
      console.log('✅ Method 7: SUCCESS - Enter with Caps On worked');
    } else {
      console.log('❌ Method 7: FAILED - Enter with Caps On failed');
    }
  }

  async EnterExtraSpaces(username, password){
    const usernameField = await smartLocator(this.page, this.usernameSelectors);
    await usernameField.fill(username + "   ");

    const passwordField = await smartLocator(this.page, this.passwordSelectors);
    await passwordField.fill(password + "   ");

    await passwordField.press('Enter');
    await this.page.waitForTimeout(3000); // Added wait time
    const EGMainManagerLogo = await this.page.locator(this.EGMainManagerLogo).count() > 0;

    if (EGMainManagerLogo) { 
      console.log('❌ Method 8: FAILED - Enter with Extra Spaces worked');
    } else {
      console.log('✅ Method 8: SUCCESS - Enter with Extra Spaces failed');
    }
  }


  async EnterWrongCredentials(){
    const usernameField = await smartLocator(this.page, this.usernameSelectors);
    await usernameField.fill("wrongusername");

    const passwordField = await smartLocator(this.page, this.passwordSelectors);
    await passwordField.fill("wrongpassword");

    await passwordField.press('Enter');
    await this.page.waitForTimeout(3000); // Added wait time

    // Fixed: Should check for error, not success
    const errorExists = await this.page.locator(this.ErrorMessage).count() > 0;

    if (errorExists) {
      console.log('✅ Method 9: SUCCESS - Error shown as expected for wrong credentials');
    } else {
      console.log('❌ Method 9: FAILED - No error shown for wrong credentials');
    }
  }
}

module.exports = LoginPage;