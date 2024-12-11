const puppeteer = require('puppeteer');
const path = require('path'); // Required for saving screenshots in the test folder

async function run() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Dynamically determine the absolute path to the home.html file
    const homePath = 'https://cse210-team-09.github.io/cse210-fa24-group09/html/home.html';
    await page.goto(homePath);

    // Test: New Note Button functionality
    const newNoteButtonSelector = '.header button:nth-child(2)';  // Selects the "+ New Note" button specifically
    await page.waitForSelector(newNoteButtonSelector);
    await page.click(newNoteButtonSelector);
    console.log('Clicked + New Note button.');

    // Wait for the create.html page to load
    await page.waitForSelector('#title-input');
    console.log('Navigated to create note page.');

    // Fill in the form for creating a new note
    await page.type('#title-input', 'Test Note Title');
    await page.type('#tag-input', 'tag1, tag2');
    await page.type('#code-input', 'console.log("Hello World");');
    await page.type('#comment-input', 'This is a test comment.');
    console.log('Filled in note details.');

    // Click the Save button
    const saveButtonSelector = '#save-button';
    await page.click(saveButtonSelector);
    console.log('Clicked Save button.');

    // After saving, go back to the home page
    await page.goto(homePath);
    console.log('Returned to home page.');

    // Verify the new note appears on the home page
    const newnotesListSelector = '#notes-list';
    const notes1 = await page.$$eval(`${newnotesListSelector} li`, notes =>
        notes.map(note => note.textContent.trim())
    );
    console.log('Current Notes:', notes1);

    if (notes1.some(note => note.includes('Test Note Title'))) {
        console.log('New note successfully added and displayed on the home page.');
    } else {
        await showMessage(page, 'New note was not displayed on the home page.');
        await page.screenshot({ path: 'hometest1.png', fullPage: true });
        await browser.close();
        return;
    }

    // Test: Clicking "New Note" button navigates to create.html again
    await page.waitForSelector(newNoteButtonSelector);  // Wait for the button again after returning
    await page.click(newNoteButtonSelector);
    console.log('Clicked + New Note button again.');

    // Wait for the create.html page to load again
    await page.waitForSelector('#title-input');
    console.log('Navigated to create note page again.');

    // Click the Cancel button
    const cancelButtonSelector = '#cancel-button';
    await page.click(cancelButtonSelector);
    console.log('Clicked Cancel button.');

    // Wait for navigation back to home.html (assuming the Cancel button performs this action)
    await page.waitForSelector('#notes-list');
    console.log('Returned to home page.');

    // Verify that the user is back on home page by checking for notes list
    const notesListSelector2 = '#notes-list';
    const notes = await page.$$eval(`${notesListSelector2} li`, notes =>
        notes.map(note => note.textContent.trim())
    );
    console.log('Current Notes:', notes);

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

run();
