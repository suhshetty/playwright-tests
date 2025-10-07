const { test } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const { loginAndInitialize } = require('../src/testSetup');

// Load environment variables
dotenv.config({ path: path.resolve('tests/src/.env') });

test('Sanity test: EMM-T271.spec.js', async ({ page, context }) => {
  try {
    const baseUrl = process.env.URL1;

    // Login and initialize Page Objects
    const { homePage, projectManagement } = await loginAndInitialize({ page, context, baseUrl });

    await homePage.gotoHomePage();
    await homePage.gotoModuleMenu();
    await projectManagement.clickProjectManagement();
    await projectManagement.gotoProjectsOverview();
    await projectManagement.gotoProjects();

    // Click "Add new" button
    await page.locator('#newRecordButton').click();

    // Dropdown container and option locators
    const container = page.locator('#select2-Modal1_TFClassificationSelection-container');
    await container.waitFor({ state: 'visible' });

    const dropdownLocator = 'ul#select2-Modal1_TFClassificationSelection-results li.select2-results__option span.mm-combobox-item';

    // Open once to fetch and print values
    await container.click();
    await page.locator(dropdownLocator).first().waitFor({ state: 'visible' });

    const options = await page.locator(dropdownLocator).allTextContents();
    const trimmed = options.map(text => text.trim()).filter(t => t.length > 0);

    console.log("==== Dropdown values found ====");
    trimmed.forEach((val, i) => console.log(`${i + 1}. ${val}`));
    console.log("================================");

    // User inputs (single or multiple values)
    const userInputs = ["Classification 5", "Classification 2"]; // <-- change as needed

    for (const value of userInputs) {
      // Always re-open the dropdown before each selection
      await container.click();
      // Focus the search input inside Select2 (forces dropdown to expand)
      await page.locator('input.select2-search__field').click();

      await page.locator(dropdownLocator).first().waitFor({ state: 'visible' });
      await page.locator(`${dropdownLocator}:text-is("${value}")`).first().click();

      console.log(`✅ Selected: ${value}`);
      await page.waitForTimeout(500); // small delay for UI to update
    }

    await page.pause(); // pause for manual inspection

  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    await page.screenshot({ path: 'screenshots/EMM-T271-failure.png', fullPage: true });
    throw error;
  }
});
