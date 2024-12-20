const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

// Dynamically determine the absolute path to the home.html file
const homePath = 'https://cse210-team-09.github.io/cse210-fa24-group09/html/home.html';
await page.goto(homePath);


await page.waitForSelector('#notes-list');
const notes = await page.$$('.notes-list li');

// Select and click the second note, if available
if (notes.length >= 2) {
    await notes[1].click(); // Click the second note
} else {
    await showMessage(page, 'Less than two notes found. Stopping test execution.');
    await page.screenshot({ path: 'hometest1.png', fullPage: true });
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
  
const isMac = process.platform === 'darwin'; // Detect macOS

// Wait for all input fields to be available
await page.waitForSelector('#title-input');
await page.waitForSelector('#tag-input');
await page.waitForSelector('#code-input');
await page.waitForSelector('#comment-input');

// Ensure input fields are focused, cleared, and updated correctly
async function clearAndType(selector, newValue) {
    await page.click(selector, { clickCount: 3 }); // Select all content
    
    // Use appropriate key combination for Select All (Ctrl + A on Windows/Linux, Command + A on macOS)
    if (isMac) {
        await page.keyboard.down('Meta'); // Meta is Command key on macOS
    } else {
        await page.keyboard.down('Control'); // Control key on Windows/Linux
    }
    
    await page.keyboard.press('a'); // Select all text
    if (isMac) {
        await page.keyboard.up('Meta');
    } else {
        await page.keyboard.up('Control');
    }
    
    await page.keyboard.press('Backspace'); // Clear content
    await page.type(selector, newValue, { delay: 100 }); // Type new content
}

// Clear and update all fields
await clearAndType('#title-input', 'Updated Note Title');
await clearAndType('#tag-input', 'javascript, html, puppeteer');
await clearAndType('#code-input', 'const a = 10; const b = 20; console.log(a + b);');
await clearAndType('#comment-input', 'This is a test comment for Puppeteer.');

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
    await showMessage(page, 'Test Failed: The content does not match the expected values.');
    await page.screenshot({ path: 'hometest1.png', fullPage: true });
    await browser.close();
    return;
    
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
    await showMessage(page, 'Test Failed: Did not navigate back to the view page.');
    await page.screenshot({ path: 'hometest1.png', fullPage: true });
    await browser.close();
    return;
}

// Close the browser
await browser.close();
}
// Function to show a message in the browser and stop further execution
async function showMessage(page, message) {
    console.log(message);
    await page.evaluate((msg) => {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.backgroundColor = 'red';
        div.style.color = 'white';
        div.style.padding = '20px';
        div.style.zIndex = '10000';
        div.innerText = msg;
        document.body.appendChild(div);
    }, message);
}
// Run the test
run().catch(console.error);