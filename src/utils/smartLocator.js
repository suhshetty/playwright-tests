// src/utils/smartLocator.js

async function smartLocator(page, selectors, timeout = 5000) {
  for (const selector of selectors) {
    const locator = page.locator(selector);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`✅ smartLocator found: ${selector}`);
      return locator;
    } catch (err) {
      // continue trying next
    }
  }
  throw new Error(`❌ smartLocator: No selector matched from: ${selectors.join(', ')}`);
}

module.exports = { smartLocator };
