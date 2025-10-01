class BasePage {
  constructor(page) {
    this.page = page;
  }

  async selectDropdownOptionByText(optionsLocator, targetText) {
    const count = await optionsLocator.count();
    for (let i = 0; i < count; i++) {
      const text = (await optionsLocator.nth(i).textContent())?.trim();
      if (text === targetText) {
        await optionsLocator.nth(i).click();
        return;
      }
    }
    throw new Error(`Option "${targetText}" not found`);
  }

<<<<<<< Updated upstream
  async clickElement(selector, options = {}) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout: options.timeout || 5000 });
    await this.page.locator(selector).click();
  }

  async selectSearchableDropdownSimple(containerSelector, targetText) {
    await this.page.locator(containerSelector).click();
    await this.page.waitForTimeout(500);
    
    const searchInput = this.page.locator('.select2-search__field').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill(targetText);
      await this.page.waitForTimeout(500);
    }
    
    const selectors = [
      `ul[id*="TFGroundID-results"] li:has-text("${targetText}")`,
      `ul[id*="results"] li:has-text("${targetText}")`,
      `li:has-text("${targetText}")`
    ];
    
    for (const selector of selectors) {
      const option = this.page.locator(selector).first();
      if (await option.count() > 0) {
        await option.click();
        return;
      }
    }
    
    throw new Error(`Option "${targetText}" not found`);
  }

  async selectSearchableDropdown(containerSelector, searchInputSelector, optionsSelector, targetText) {
    await this.page.locator(containerSelector).click();
    await this.page.locator(searchInputSelector).fill(targetText);
    await this.page.locator(optionsSelector).first().waitFor({ state: 'visible', timeout: 5000 });
    await this.selectDropdownOptionByText(this.page.locator(optionsSelector), targetText);
=======


// Click an element by selector (accepts string or array of selectors)
async clickElement(selectors, options = {}) {
  const list = Array.isArray(selectors) ? selectors : [selectors];
  const timeout = options.timeout || 5000;

  for (const sel of list) {
    if (!sel) continue;
    try {
      const loc = this.page.locator(sel).first();
      await loc.waitFor({ state: 'visible', timeout });
      await loc.click();
      console.log(`clickElement: clicked selector "${sel}"`);
      // small settle
      await this.page.waitForTimeout(300);
      return true;
    } catch (err) {
      console.warn(`clickElement: selector failed "${sel}" => ${err.message}`);
      // try next selector
    }
  }

  // evaluate() fallback on first selector
  const first = list[0];
  if (first) {
    try {
      await this.page.evaluate((s) => {
        const el = document.querySelector(s);
        if (el) el.click();
      }, first);
      console.log(`clickElement: evaluate-click fallback used for "${first}"`);
      await this.page.waitForTimeout(300);
      return true;
    } catch (e) {
      console.warn(`clickElement: evaluate fallback failed for "${first}" => ${e.message}`);
    }
  }

  throw new Error(`clickElement: None of the selectors worked: ${JSON.stringify(list)}`);
}




  // Reusable method for selecting from any searchable dropdown
  async selectSearchableDropdown(containerSelector, searchInputSelector, optionsSelector, targetText) {
    await this.page.locator(containerSelector).click();
    await this.page.locator(searchInputSelector).fill(targetText);
    const optionsLocator = this.page.locator(optionsSelector);
    await optionsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    await this.selectDropdownOptionByText(optionsLocator, targetText);
>>>>>>> Stashed changes
  }

  async selectDropdown(type, targetText) {
    const containers = {
      region: '#select2-MainManFilter_TFRegionID-container',
      portfolio: '#select2-MainManFilter_TFMainGroupID-container',
      site: '#select2-MainManFilter_TFGroundID-container'
    };
    
    const containerSelector = containers[type.toLowerCase()];
    if (!containerSelector) throw new Error(`Unknown dropdown type: "${type}"`);
    
    await this.selectSearchableDropdownSimple(containerSelector, targetText);
    await this.page.waitForTimeout(1000);
  }
}

module.exports = BasePage;