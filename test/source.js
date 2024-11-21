import puppeteer from 'puppeteer';
const { testAddition } = require('./e2e');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });

  // Open a new page
  const page = await browser.newPage();

  // Listen for console messages from the browser context
  page.on('console', (msg) => {
    console.log(`BROWSER LOG: ${msg.text()}`);
  });

  try {
    // Inject and execute the function in the browser context
    await page.evaluate((func) => {
      // Convert the function back to its usable form
      const testAddition = new Function(`return (${func})`)();
      testAddition();
    }, testAddition.toString());

    console.log("Test executed successfully.");
  } catch (error) {
    console.error(`Test failed: ${error.message}`);
  } finally {
    await browser.close();
  }
})();
