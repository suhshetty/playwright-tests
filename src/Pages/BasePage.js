// src/Pages/BasePage.js

class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Select an option from a dropdown by its visible text
  async selectDropdownOptionByText(optionsLocator, targetText) {
    let retries = 10;
    while (retries > 0) {
      const count = await optionsLocator.count();

      for (let i = 0; i < count; i++) {
        const option = optionsLocator.nth(i);
        const text = (await option.textContent())?.trim();

        if (text && text !== "Searching…" && text !== "Loading…") {
          if (text === targetText) {
            await option.click();
            return;
          }
        }
      }

      await this.page.waitForTimeout(500); // wait before retrying
      retries--;
    }

    throw new Error(`Option "${targetText}" not found in dropdown.`);
  }

  // Click an element by selector
  async clickElement(selector, options = {}) {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout: options.timeout || 5000 });
    await element.click();
  }

  // Reusable method for selecting from any searchable dropdown
// In BasePage.js - Add this new function alongside the existing one:
async selectSearchableDropdownSimple(containerSelector, targetText) {
    await this.page.locator(containerSelector).click();
    await this.page.waitForTimeout(300);
    
    // Auto-detect search input - find the visible one
    const searchInputs = this.page.locator('.select2-search__field');
    const count = await searchInputs.count();
    
    for (let i = 0; i < count; i++) {
        const input = searchInputs.nth(i);
        if (await input.isVisible()) {
            await input.fill(targetText);
            break;
        }
    }
    
    await this.page.waitForTimeout(500);
    
    // Auto-detect options - look for visible dropdown results
    const possibleSelectors = [
        `ul[id*="TFTypeID-results"] li:has-text("${targetText}")`,
        `ul[id*="select2-Modal3_TFSetID-results"] li:has-text("${targetText}")`,
        `ul[id*="TFSetID-results"] li:has-text("${targetText}")`,
        `ul[id*="results"] li:has-text("${targetText}")`,
        `li:has-text("${targetText}")`,
        `ul[id="select2-Modal3_TFSetID-results"] li:has-text("${targetText}")`
    ];
    
    for (const selector of possibleSelectors) {
        const option = this.page.locator(selector).first();
        if (await option.count() > 0 && await option.isVisible()) {
            await option.click();
            return;
        }
    }
    
    throw new Error(`Option "${targetText}" not found in any dropdown`);
}

// select from a dropdown with 4 parameters
async selectSearchableDropdown(containerSelector, searchInputSelector, optionsSelector, targetText) {
    await this.page.locator(containerSelector).click();
    await this.page.locator(searchInputSelector).fill(targetText);

    const optionsLocator = this.page.locator(optionsSelector);
    await optionsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    await this.selectDropdownOptionByText(optionsLocator, targetText);
}

async selectDropdown(type, targetText) {
  const searchInputSelector = '.select2-search__field';
  let containerSelector, optionsSelector;

  switch (type.toLowerCase()) {
    case 'region':
      containerSelector = '#select2-MainManFilter_TFRegionID-container';
      optionsSelector = 'ul#select2-MainManFilter_TFRegionID-results > li.select2-results__option';
      break;

    case 'portfolio':
      containerSelector = '#select2-MainManFilter_TFMainGroupID-container';
      optionsSelector = 'ul#select2-MainManFilter_TFMainGroupID-results > li.select2-results__option';
      break;

    case 'site':
      containerSelector = '#select2-MainManFilter_TFGroundID-container';
      optionsSelector = 'ul#select2-MainManFilter_TFGroundID-results > li.select2-results__option';
      break;

    default:
      throw new Error(`Unknown dropdown type: "${type}"`);
  }

  await this.selectSearchableDropdownSimple(containerSelector, targetText);
}



}

module.exports = BasePage;
