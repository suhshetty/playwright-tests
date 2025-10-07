const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../../../src/testSetup');
 
dotenv.config({ path: path.resolve('tests/src/.env') });
 
test('EMM-4235 - Test Different Login Methods', async ({ page, context }) => {
  try {
    const baseUrl = process.env.URL1;
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;
 
    // Get the LoginPage instance from loginAndInitialize
    const { loginPage } = await loginAndInitialize({ page, context, baseUrl });
 
    // Test Method 1: Press Enter on Username
    console.log('\n🚀 Testing Method 1: Press Enter on Username');
    await page.goto(baseUrl);
    await page.waitForTimeout(2000);
   
    await loginPage.PressEnterOnUsername(username, password);
    await page.waitForTimeout(3000);
   
 
    // Reset for next test
    await page.goto(baseUrl);
    await page.waitForTimeout(2000);
    // Test Method 2: Press Enter on Password
    console.log('\n🚀 Testing Method 2: Press Enter on Password');
    await loginPage.PressEnterOnPassword(username, password);
    await page.waitForTimeout(3000);
 
 
    // Reset for next test
    await page.goto(baseUrl);
    await page.waitForTimeout(2000);
    // Test Method 3: Press Enter twice on Password
    console.log('\n🚀 Testing Method 3: Press Enter twice on Password');
    await loginPage.PressEnterTwiceOnPassword(username, password);
    await page.waitForTimeout(3000);
 
 
    // Reset for next test
    await page.goto(baseUrl);
    await page.waitForTimeout(2000);
 
    // Test Method 4: Press Enter only with Username
    console.log('\n🚀 Testing Method 4: Press Enter only with Username');
    await loginPage.EnterOnlyUsername(username);
    await page.waitForTimeout(3000);
   
 
    // Reset for next test
    await page.goto(baseUrl);
    await page.waitForTimeout(2000);
    // Test Method 5: Press Enter only with Password
    console.log('\n🚀 Testing Method 5: Press Enter only with Password');
    await loginPage.EnterOnlyPassword(password);
    await page.waitForTimeout(3000);
 
    console.log('\n🏁 All login methods tested!');
 
 
  } catch (error) {
    console.error(`EMM-4235 Test failed: ${error.message}`);
    await page.screenshot({ path: 'screenshots/EMM-4235-failure.png', fullPage: true });
    throw error;
  }
});