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