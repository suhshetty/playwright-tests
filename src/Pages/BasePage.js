// src/Pages/BasePage.js


class BasePage {
  constructor(page) {
    this.page = page;
  }

async selectDropdownOptionByText(optionsLocator, targetText) {
  //console.log(`🔁 Waiting for options to load for "${targetText}"`);

  let retries = 10;
  while (retries > 0) {
    const count = await optionsLocator.count();

    for (let i = 0; i < count; i++) {
      const option = optionsLocator.nth(i);
      const text = (await option.textContent())?.trim();
      //console.log(`➡️ Option ${i}: "${text}"`);

      if (text && text !== "Searching…" && text !== "Loading…") 
        if (text === targetText) {
          //console.log(`✅ Found: "${text}" — Clicking`);
          await option.click();
          return;
        }
      }
    }

    //console.log(`⏳ Retrying... (${11 - retries}/10)`);
    await this.page.waitForTimeout(500); // wait before retry
    retries--;
  }

  //throw new Error(`❌ Option with text "${targetText}" not found after retries`);








}

module.exports = BasePage;
