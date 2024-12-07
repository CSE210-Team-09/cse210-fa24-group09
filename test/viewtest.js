const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const homePath = path.resolve(__dirname, '../source/html/home.html');
    await page.goto(`file://${homePath}`, { waitUntil: 'load' });

    await page.waitForSelector('#notes-list');
    const notes = await page.$$('.notes-list li');

    if (notes.length >= 2) {
        await notes[1].click(); // Click the second note
    } else {
        console.log('Less than two notes found');
        await browser.close();
        return;
    }

    // Wait for data to load
    await page.waitForFunction(() => {
        const title = document.querySelector('#title');
        const code = document.querySelector('#code');
        return title?.value && code?.value;
    }, { timeout: 5000 });

    // Extract data
    const title = await page.$eval('#title', el => el.value.trim());
    const tags = await page.$$eval('#tag-container span', els => els.map(el => el.textContent.trim()));
    const code = await page.$eval('#code', el => el.value.trim());
    const comment = await page.$eval('#comment', el => el.value.trim());

    console.log('Extracted Note Details:');
    console.log('Title:', title);
    console.log('Tags:', tags);
    console.log('Code:', code);
    console.log('Comment:', comment);

    // Home button functionality
    console.log('Testing Home button...');
    await page.waitForSelector('#home-button'); // Wait for the Home button
    await page.click('#home-button'); // Click the Home button

    // Verify we are back on the Home Page
    await page.waitForSelector('#notes-list'); // Wait for notes list to load again
    console.log('Home button works correctly.');

    // Refresh the notes list after returning home
    const notesAfterHome = await page.$$('#notes-list li');
    if (notesAfterHome.length < 2) {
        console.error('Error: Note list does not have sufficient items after returning home.');
        await browser.close();
        return;
    }

    // Revisit the second note
    await notesAfterHome[1].click();

    // Delete button functionality
    console.log('Testing Delete button...');
    await page.waitForSelector('#delete-button'); // Wait for the Delete button
    await page.click('#delete-button'); // Click the Delete button

    // Verify we are back on the Home Page
    await page.waitForSelector('#notes-list'); // Wait for notes list to load again

    // Get the updated list of notes
    const updatedNotes = await page.$$eval('#notes-list li', els => els.map(el => el.textContent.trim()));

    // Verify the note is deleted
    if (updatedNotes.length === notesAfterHome.length - 1) {
        console.log('Delete button works correctly: Note was deleted.');
    } else {
        console.error('Delete button failed: Note was not deleted.');
    }

    await browser.close();
}

run();
