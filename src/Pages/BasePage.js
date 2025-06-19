// src/Pages/BasePage.js


class BasePage {
  constructor(page) {
    this.page = page;
  }

async selectDropdownOptionByText(optionsLocator, targetText) {


  let retries = 10;
  while (retries > 0) {
    const count = await optionsLocator.count();

    for (let i = 0; i < count; i++) {
      const option = optionsLocator.nth(i);
      const text = (await option.textContent())?.trim();
      

      if (text && text !== "Searching…" && text !== "Loading…") 
        if (text === targetText) {
          
          await option.click();
          return;
        }
      }
    }

   
    await this.page.waitForTimeout(500); // wait before retry
    retries--;
  }

  







}

module.exports = BasePage;
