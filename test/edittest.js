const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the home page
    const homePath = path.resolve(__dirname, '../source/html/home.html');
    await page.goto(`file://${homePath}`, { waitUntil: 'load' });

    await page.waitForSelector('#notes-list');
    const notes = await page.$$('.notes-list li');

    // Select and click the second note, if available
    if (notes.length >= 2) {
        await notes[1].click(); // Click the second note
    } else {
        console.log('Less than two notes found');
        await browser.close();
        return;
    }

    // Wait for data to load on the view page
    await page.waitForSelector('#title');
    const title = await page.$eval('#title', el => el.value.trim());
    const tags = await page.$$eval('#tag-container span', els => els.map(el => el.textContent.trim()));
    const code = await page.$eval('#code', el => el.value.trim());
    const comment = await page.$eval('#comment', el => el.value.trim());

    console.log('View Page - Extracted Note Details:');
    console.log('Title:', title);
    console.log('Tags:', tags);
    console.log('Code:', code);
    console.log('Comment:', comment);

    // Click the "Edit" button to navigate to the edit page
    await page.waitForSelector('#edit-button');
    await page.click('#edit-button');
    
    // Wait for the title input field to be loaded
    await page.waitForSelector('#title-input');
  
    // Clear existing content in all fields before updating
    await page.evaluate(() => {
        document.querySelector('#title-input').value = ''; // Clear title
        document.querySelector('#tag-input').value = ''; // Clear tags
        document.querySelector('#code-input').value = ''; // Clear code
        document.querySelector('#comment-input').value = ''; // Clear comments
    });

    // Edit the title
    await page.type('#title-input', 'Updated Note Title');

    // Edit the tags
    await page.type('#tag-input', 'javascript, html, puppeteer');

    // Edit the code input
    await page.type('#code-input', 'const a = 10; const b = 20; console.log(a + b);');

    // Edit the comment input
    await page.type('#comment-input', 'This is a test comment for Puppeteer.');

    // Click the Save button
    await page.click('#save-button');
    await page.waitForSelector('#title');

    // Alternatively, verify the saved content in the same page by checking if changes reflect
    const updatedTitle = await page.$eval('#title', (el) => el.value);
    const updatedTags = await page.$$eval('#tag-container span', (els) => els.map(el => el.textContent.trim()));
    const updatedCode = await page.$eval('#code', (el) => el.value);
    const updatedComment = await page.$eval('#comment', (el) => el.value);

    console.log('Updated Title:', updatedTitle);
    console.log('Updated Tags:', updatedTags);
    console.log('Updated Code:', updatedCode);
    console.log('Updated Comment:', updatedComment);

    // Verify that the updated content matches the values entered
    if (updatedTitle === 'Updated Note Title' && updatedTags.join(', ') === 'javascript, html, puppeteer' && updatedCode === 'const a = 10; const b = 20; console.log(a + b);' && updatedComment === 'This is a test comment for Puppeteer.') {
        console.log('Test Passed: The content was updated and saved successfully!');
    } else {
        console.log('Test Failed: The content does not match the expected values.');
    }

    // Click the "Edit" button to navigate to the edit page
    await page.waitForSelector('#edit-button');
    await page.click('#edit-button');
    // Now click the Back button to check if it navigates to the view page
    await page.waitForSelector('#cancel-button');
    await page.click('#cancel-button');

    // Wait for navigation or verify the page content
    const pageUrl = page.url();
    console.log('Current Page URL:', pageUrl);

    if (pageUrl.includes('view.html')) { // Assuming the view page is named `view.html`
        console.log('Test Passed: Successfully navigated back to the view page.');
    } else {
        console.log('Test Failed: Did not navigate back to the view page.');
    }

    // Close the browser
    await browser.close();
}

// Run the test
run().catch(console.error);
