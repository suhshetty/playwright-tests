class BasePage {
  constructor(page) {
    this.page = page;

      // Common selectors ( Area : Show data in popup list , Place where we add new data)
      this.show_data_in_popup_list = "//a[@title='Show data in popup list - ShowDataInPopupList']";
      this.register_new_in_popup_list = "div.modal-chapter-content-container button#newRecordButton";
      this.save_button = '#Modal3SaveNav';

      // Common Selctors ( Area : Success or Failed messages in pop up )
      this.error_message = "//h2[contains(text(),'Error')]";
      this.success_message = "//h2[contains(text(),'Success')]";
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
      await this.page.waitForTimeout(1500);
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
        await this.page.waitForTimeout(1500);

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

    // Multiselect Dropdown field ( Select multiple values )
async selectMultiValues(dropdownContainerSelector, optionItemsSelector, values = []) {
  const dropdown = this.page.locator(dropdownContainerSelector);
  for (const value of values) {
    await dropdown.click();
    await this.page.locator(optionItemsSelector).first().waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(`${optionItemsSelector}:text-is("${value}")`).first().click();
    console.log(`✅ Selected: ${value}`);
    await this.page.waitForTimeout(150); // tiny settle
  }
}

 // Multiselect Dropdown field ( Remove multiple values )
async removeMultiValues(values = []) {
  for (const value of values) {
    await this.page.evaluate((text) => {
      const items = Array.from(document.querySelectorAll('li.select2-selection__choice'));
      const match = items.find(it => (it.textContent || '').trim().includes(text));
      match?.querySelector('span.select2-selection__choice__remove')?.click();
    }, value);
    console.log(`❌ Removed: ${value}`);
    await this.page.waitForTimeout(150); // tiny settle
  }
}

// Common Methods ( Area : Show data in popup list , Place where we add new data)
async click_ShowDataInPopupList() {
  await this.page.locator(this.show_data_in_popup_list).click();
}

async click_RegisterNewInPopupList() {
  await this.page.locator(this.register_new_in_popup_list).click();
}

async click_Save_button() {
  await this.page.locator(this.save_button).click();  
}

// Common Methods ( Area : Success or Failed messages in pop up )
async verifyErrorPopup(timeout = 5000) {
  const locator = this.page.locator(this.error_message); // convert selector string -> Locator
  try {
    await locator.waitFor({ state: 'visible', timeout });
    console.log('✅ Error popup is visible');
    return true;
  } catch (e) {
    console.log('❌ Error popup is not visible');
    return false;
  }
}

async verifySuccessPopup(timeout = 5000) {
 const locator = this.page.locator(this.success_message);
  try {
    await locator.waitFor({ state: 'visible', timeout });
    console.log('✅ Success popup is visible');
    return true;
  } catch (e) {
    console.log('❌ Success popup is not visible');
    return false;
  }
}
}

module.exports = BasePage;