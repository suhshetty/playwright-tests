// tests/setup/testSetup.js
const LoginPage = require('../../src/Pages/LoginPage');
const HomePage = require('../../src/Pages/HomePage');
const BuildingArchive = require('../../src/Pages/BuildingArchive');

async function loginAndInitialize({ page, context, baseUrl }) {
  // Clear cookies and cache before login
  await context.clearCookies();
  await context.clearPermissions();

  // Initialize Page Objects
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const buildingArchive = new BuildingArchive(page);

  // Perform login using dynamic URL
  await loginPage.gotoLoginPage(baseUrl);
  await loginPage.login('suhsh', 'Testing@!123');

  return { loginPage, homePage, buildingArchive };
}

module.exports = { loginAndInitialize };
