const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Dynamically determine the absolute path to the home.html file
    const homePath = 'https://cse210-team-09.github.io/cse210-fa24-group09/html/home.html';
    await page.goto(homePath);

    await page.waitForSelector('#notes-list');
    const notes = await page.$$('.notes-list li');

    if (notes.length < 2) {
        await showMessage(page, 'Less than two notes found. Stopping test execution.');
        await page.screenshot({ path: 'extracted-data-screenshot1.png', fullPage: true });
        await browser.close();
        return;
    }

    await notes[1].click(); // Click the second note

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
    await page.waitForSelector('#home-button');
    await page.click('#home-button');

    // Verify we are back on the Home Page
    await page.waitForSelector('#notes-list');
    console.log('Home button works correctly.');

    // Refresh the notes list after returning home
    const notesAfterHome = await page.$$('#notes-list li');
    if (notesAfterHome.length < 2) {
        await showMessage(page, 'Error: Notes list does not have sufficient items after returning home.');
        await page.screenshot({ path: 'extracted-data-screenshot2.png', fullPage: true });
        await browser.close();
        return;
    }

    // Revisit the second note
    await notesAfterHome[1].click();

    // Delete button functionality
    console.log('Testing Delete button...');
    await page.waitForSelector('#delete-button');
    await page.click('#delete-button');

    // Verify we are back on the Home Page
    await page.waitForSelector('#notes-list');

    // Get the updated list of notes
    const updatedNotes = await page.$$eval('#notes-list li', els => els.map(el => el.textContent.trim()));

    // Verify the note is deleted
    if (updatedNotes.length === notesAfterHome.length - 1) {
        console.log('Delete button works correctly: Note was deleted.');
    } else {
        await showMessage(page, 'Delete button failed: Note was not deleted.');
        await page.screenshot({ path: 'extracted-data-screenshot3.png', fullPage: true });
        await browser.close();
        return;
    }

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
