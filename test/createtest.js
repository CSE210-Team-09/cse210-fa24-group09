const puppeteer = require('puppeteer');
const path = require("path");

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Navigate to your HTML file (adjust the path as necessary)
    const homePath = path.resolve(__dirname, '../source/html/home.html'); // Adjust 'home.html' if it's in a different folder relative to this script
    await page.goto(`file://${homePath}`);
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
    await page.goto(`file://${homePath}`);
    console.log('Returned to home page.');
    // Verify the new note appears on the home page
    const newnotesListSelector = '#notes-list';
    const notes1 = await page.$$eval(`${newnotesListSelector} li`, notes1 =>
        notes1.map(note => note.textContent.trim())
    );
    console.log('Current Notes:', notes1);

    if (notes1.some(note => note.includes('Test Note Title'))) {
        console.log('New note successfully added and displayed on the home page.');
    } else {
        console.error('New note was not displayed on the home page.');
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

run();
