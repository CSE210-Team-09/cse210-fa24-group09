home:

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Dynamically determine the absolute path to the home.html file
  const homePath = 'https://cse210-team-09.github.io/cse210-fa24-group09/html/home.html';
  await page.goto(homePath);

  // Custom delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to clear the search input
  async function clearSearchField(searchInput) {
    const searchField = await page.$(searchInput);
    if (searchField) {
      await searchField.click({ clickCount: 3 }); // Select all text
      await page.keyboard.press('Backspace'); // Clear the text
    }
    await delay(300); // Wait for the search input to be cleared
  }

  // Function to clear the selected tag
  async function clearTagSelection(dropdownButton, dropdownOptionSelector) {
    // Wait for dropdown options to be visible
    await page.waitForSelector(dropdownOptionSelector, { visible: true });

    // Uncheck all selected tags by clicking again on checked options
    const checkedTags = await page.$$eval(
      `${dropdownOptionSelector}:checked`,
      (tags) => tags.map((tag) => tag.value)
    );

    for (const tag of checkedTags) {
      const tagToDeselect = `${dropdownOptionSelector}[value="${tag}"]`;
      await page.click(tagToDeselect); // Unselect the tag
    }
    await page.click(dropdownButton);
    // Wait for the dropdown to close
    await delay(500);
  }
  // Validate filtering function if notes exist
  const notesListSelector = '#notes-list';
  const initialNotes = await page.$$eval(`${notesListSelector} li`, notes =>
      notes.map(note => note.textContent.trim())
  );
  console.log('Initial Notes:', initialNotes);
  // Test 1: Search Notes by Title
  async function testSearchNotesByTitle() {
    const searchInput = '#search-bar';
    const notesList = '#notes-list';

    // Type in the search bar
    await page.type(searchInput, 'Journal 1');
    // Wait for filtering to complete
    await delay(500);
    // Extract filtered notes
    const filteredNotes = await page.$$eval(`${notesList} li`, (notes) =>
      notes.map((note) => note.textContent)
    );

    console.log('Filtered Notes (Search by Title):', filteredNotes);

    // Assertion: Check if the filtered list matches the expected output
    if (filteredNotes.some(note => note.includes('Journal 1'))) {
      console.log('Search by Title: PASS');
    } else {
      await showMessage(page, 'Search by Title: FAIL');
      await page.screenshot({ path: 'hometest1.png', fullPage: true });
      await browser.close();
      return;
    }
    // Clear the search input after the individual search test
    await clearSearchField(searchInput);
  }

  // Test 2: Filter by Tags
  async function testFilterByTags() {
    const dropdownButton = '#dropdown-btn';
    const dropdownOptionSelector = '.dropdown-options input[type="checkbox"]';
    const notesList = '#notes-list';

    // Open the dropdown
    await page.click(dropdownButton);

    // Wait for dropdown options to be visible
    await page.waitForSelector(dropdownOptionSelector, { visible: true });

    // Select a tag (for example, "tag1")
    const tagToSelect = 'tag1';  // Adjust this to match an actual tag in your notes
    const tagSelector = `${dropdownOptionSelector}[value="${tagToSelect}"]`;
    // Check if the tag exists first, then click
    const tagExists = await page.$(tagSelector) !== null;
    if (tagExists) {
      await page.click(tagSelector);
    } else {
      await showMessage(page, `Tag "${tagToSelect}" not found`);
      await page.screenshot({ path: 'hometest2.png', fullPage: true });
      await browser.close();
      return;
    }

    // Wait for filtering to complete
    await delay(500);
    // Extract filtered notes
    const filteredNotes = await page.$$eval(`${notesList} li`, (notes) =>
      notes.map((note) => note.textContent)
    );

    console.log(`Filtered Notes (Tag: ${tagToSelect}):`, filteredNotes);

    // Assertion: Check if filtered list includes notes with the selected tag
    if (filteredNotes.every(note => note.includes(tagToSelect))) {
      console.log(`Filter by Tag "${tagToSelect}": PASS`);
    } else {
      await showMessage(page, `Filter by Tag "${tagToSelect}": FAIL`);
      await page.screenshot({ path: 'hometest3.png', fullPage: true });
      await browser.close();
      return;
    }
    // Clear the tag selection after the individual tag filter test
    await clearTagSelection(dropdownButton, dropdownOptionSelector);
  }

  // Test 3: Combine Search and Tag Filter
  async function testCombinedFilter() {
    const searchInput = '#search-bar';
    const dropdownButton = '#dropdown-btn';
    const dropdownOptionSelector = '.dropdown-options input[type="checkbox"]';
    const notesList = '#notes-list';
    // Perform a search
    const searchText = 'Journal 3';
    await page.type(searchInput, searchText);
    // Open the dropdown and select a tag
    await page.click(dropdownButton);
    await page.waitForSelector(dropdownOptionSelector, { visible: true });
    const tagToSelect = 'tag3';  // Adjust this to match an actual tag
    const tagSelector = `${dropdownOptionSelector}[value="${tagToSelect}"]`;
    await page.click(tagSelector);
    // Wait for filtering to complete
    await delay(500);
    // Extract filtered notes after both the search and tag filtering
    const filteredNotes = await page.$$eval(`${notesList} li`, (notes) =>
      notes.map((note) => note.textContent)
    );

    console.log(`Filtered Notes (Search: "${searchText}" & Tag: "${tagToSelect}"):`, filteredNotes);

    // Assertion: Check if filtered list matches both criteria
    if (filteredNotes.every(note => note.includes(searchText) && note.includes(tagToSelect))) {
      console.log(`Combined Filter: PASS`);
    } else {
      await showMessage(page, `Combined Filter: FAIL`);
      await page.screenshot({ path: 'hometest4.png', fullPage: true });
      await browser.close();
      return;
    }
    await clearTagSelection(dropdownButton, dropdownOptionSelector);
    await page.click(dropdownButton);
    await clearSearchField(searchInput);
    
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

  // Run individual tests
  await testSearchNotesByTitle();
  await testFilterByTags();
  // Now combine both search and tag filter
  await testCombinedFilter();
  await browser.close();
})();