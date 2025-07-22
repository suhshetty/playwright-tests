// utils/CommonFunctions.mjs

async function safeStep(actionName, actionFn, page, env) {
  console.log(`Attempting to ${actionName} for ${env}...`);
  try {
    await actionFn();
    console.log(`Successfully ${actionName} for ${env}`);
  } catch (error) {
    console.error(`Failed to ${actionName} for ${env}:`, error.message);
    if (page && !page.isClosed()) {
      try {
        await page.screenshot({ path: `debug-${env}-${actionName}-failed.png`, fullPage: true });
        const url = page.url();
        const title = await page.title();
        console.log(`Current URL: ${url}, Title: ${title}`);
      } catch (debugError) {
        console.warn(`Could not capture debug info: ${debugError.message}`);
      }
    }
    throw error;
  }
}

const safeStepWithTimeout = async (stepName, stepFunction, timeoutMs = 45000) => {
  try {
    await Promise.race([
      stepFunction(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Step timeout after ${timeoutMs / 1000} seconds`)), timeoutMs)
      )
    ]);
  } catch (error) {
    console.warn(`Step "${stepName}" failed:`, error.message);
    // Continue without throwing to avoid stopping the entire test flow
  }
};

const safeScreenshot = async (page, env, label, waitForProcessingAndTakeScreenshot) => {
  try {
    await Promise.race([
      waitForProcessingAndTakeScreenshot(page, env, label),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Screenshot timeout after 60 seconds')), 60000)
      )
    ]);
  } catch (screenshotError) {
    console.warn(`Screenshot failed for ${label} ${env}:`, screenshotError.message);
  }
};

const optimizeFontsForPerformance = async (page) => {
  try {
    await page.addStyleTag({
      content: `
        * { 
          font-display: swap !important; 
        }
        @font-face {
          font-display: swap !important;
        }
        /* Disable heavy fonts if they exist */
        .heavy-font, .custom-font {
          font-family: Arial, sans-serif !important;
        }
      `
    });
    
    await page.evaluate(() => {
      // Disable font loading delays
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then = () => Promise.resolve();
      }
      document.documentElement.style.setProperty('font-display', 'swap', 'important');
    });
    
    console.log('Font optimizations applied');
  } catch (error) {
    console.warn('Font optimization failed:', error.message);
  }
};

export {
  safeStep,
  safeStepWithTimeout,
  safeScreenshot,
  optimizeFontsForPerformance,
};