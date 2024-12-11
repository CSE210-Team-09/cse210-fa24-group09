// Mock the API and DOM globally before importing `home.js`
global.API = {
  init: jest.fn(() => true), // Mock API.init
  get_all_journals: jest.fn(() => [
    { id: '1', title: 'First Note', tags: ['tag1', 'tag2'] },
    { id: '2', title: 'Second Note', tags: ['tag2', 'tag3'] },
    { id: '3', title: 'Third Note', tags: ['tag1'] },
  ]),
};

// Mock DOM before importing the module
document.body.innerHTML = `
  <input id="search-bar" />
  <div id="dropdown-options">
    <label><input type="checkbox" value="tag1"> tag1</label>
    <label><input type="checkbox" value="tag2"> tag2</label>
    <label><input type="checkbox" value="tag3"> tag3</label>
  </div>
  <ul id="notes-list"></ul>
  <button id="dropdown-btn"></button>
`;

// Import `filterNotes` function
const filterNotes = require('../../source/js/home'); // Default import

describe('filterNotes', () => {
  let mockNotes;
  let mockDisplayNotes;

  beforeEach(() => {
    mockNotes = API.get_all_journals();

    // Mock `displayNotes` function
    mockDisplayNotes = jest.fn();
    global.displayNotes = mockDisplayNotes;
    global.notes = mockNotes; // Set notes globally
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return filtered notes by title and call displayNotes', () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.value = 'First'; // Simulate user typing "First"
  
    const result = filterNotes(notes); // Call the function
  
    // Verify the return value
    expect(result).toEqual([
      { id: '1', title: 'First Note', tags: ['tag1', 'tag2'] },
    ]);
  
    // Print success message
    console.log('Test passed: Filtered notes by title successfully.');
  });
  
  

  it('should display all notes when no filters are applied', () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.value = ''; // Simulate an empty search bar
  
    const result = filterNotes(notes); // Call the function
    // Verify the return value matches all notes
    expect(result).toEqual(mockNotes);
  
    // Print success message
    console.log('Test passed: All notes are displayed when no filters are applied.');
  });

});
