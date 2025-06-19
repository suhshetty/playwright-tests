// tests/EMM-T271.spec.js
const { test } = require('@playwright/test');
const LoginPage = require('../src/Pages/LoginPage');
const HomePage = require('../src/Pages/HomePage');
const BuildingArchive = require('../src/Pages/BuildingArchive');



test.only('Sanity test : EMM-T271.spec.js', async ({ page, context }) => {
  // Clear cookies and cache before login
  await context.clearCookies();
  await context.clearPermissions();

  // Initialize POMs
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const buildingArchive = new BuildingArchive(page);

  // Perform login
  await loginPage.gotoLoginPage();
  await loginPage.login("suhsh", "Testing@!123");

  // Navigate to Home and perform operations
  await homePage.gotoHomePage();
  
  await homePage.gotoModuleMenu();

  await buildingArchive.clickBuildingArchive();

  await buildingArchive.gotolocationsOverview();

  await buildingArchive.gotoBuildings();


await page.locator("//button[@aria-label='Register new building']").waitFor({ state: 'visible', timeout: 5000 });
await page.locator("//button[@aria-label='Register new building']").click();




  await page.locator("#select2-Modal1_TFGroundID-container").waitFor({ state: 'visible', timeout: 5000 });
  await page.locator("#select2-Modal1_TFGroundID-container").click();

const EnterSiteName = page.locator(".select2-container--open input.select2-search__field");
await EnterSiteName.fill("Test Site EMM-T270A");



// Wait for the dropdown to appear with at least one actual selectable item
await page.locator("ul#select2-Modal1_TFGroundID-results > li.select2-results__option").first().waitFor({ state: "visible" ,  timeout: 5000});

// Re-locate all options under the dropdown list
const options = page.locator("ul#select2-Modal1_TFGroundID-results > li.select2-results__option");

// Count and print
const count = await options.count();
console.log(`Total options found: ${count}`);
 




//Use for loop to select a specific option
for (let i = 0; i < count; i++) {
    const optionText = await options.nth(i).textContent();
    if (optionText?.trim() === "Test Site EMM-T270A") {
        await options.nth(i).click();
        break;
    }
}


// Enter data in Building Name field
await page.locator("#Modal1_TFNamePart").waitFor({ state: 'visible', timeout: 5000 });
await page.locator("#Modal1_TFNamePart").fill("Test Building EMM-T270A");

// Click on Save button
await page.locator("#Modal1SaveNav").waitFor({ state: 'visible', timeout: 5000 });  
await page.locator("#Modal1SaveNav").click();

  // Verify success message
  await page.locator("#swal2-html-container").waitFor({ state: 'visible', timeout: 5000 });
  await expect(page.locator("#swal2-html-container")).toHaveText("Your work has been saved");


});
