let notes;

/**
 * Initializes the homepage by setting up the API, fetching notes, and displaying them.
 */
function init_home() {
  API.init(true);
  notes = API.get_all_journals();
  displayNotes(notes);
}

// Function to display notes on the homepage
/**
 * Displays a list of notes on the homepage.
 * @param {Array} filteredNotes - Array of notes to be displayed. Defaults to all notes.
 * @return {void}
 */
function displayNotes(filteredNotes = notes) {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  if (filteredNotes.length === 0) {
    notesList.innerHTML = '<li>No notes found</li>';
    return;
  }
  filteredNotes.forEach((note) => {
    const noteItem = document.createElement('li');
    const titleDiv = document.createElement('div');
    titleDiv.textContent = note.title;
    noteItem.appendChild(titleDiv);
    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container');
    note.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag;
      tagSpan.classList.add('tag');
      tagsContainer.appendChild(tagSpan);
    });

    // Append tags container to the main container
    noteItem.appendChild(tagsContainer);
    noteItem.onclick = () => redirect_page('view', note.id);
    notesList.appendChild(noteItem);
  });
}

/**
 * Filters notes based on the search bar input and selected tags, and displays the filtered results.
 *
 * @param {Array} [customNotes=notes] - Optional. An array of notes to filter. If not provided, the global `notes` variable is used.
 * @return {Array} Filtered notes after applying the search term and selected tags.
 */
function filterNotes(customNotes = notes) {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const selectedTags = Array.from(document.querySelectorAll('#dropdown-options input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);

  const filteredNotes = customNotes.filter((note) => {
    const matchesTitle = note.title.toLowerCase().includes(searchTerm);
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => note.tags.includes(tag));
    return matchesTitle && matchesTags;
  });

  displayNotes(filteredNotes);
  return filteredNotes;
}

/**
 * Populates the dropdown menu with unique tags from the notes.
 */
function populateTagsDropdown() {
  const dropdownOptions = document.getElementById('dropdown-options');
  const allTags = [...new Set(notes.flatMap((note) => note.tags))]; // Unique tags
  dropdownOptions.innerHTML = ''; // Clear existing options
  allTags.forEach((tag) => {
    const option = document.createElement('label');
    option.innerHTML = `
      <input type="checkbox" value="${tag}" onchange="filterNotes()"> ${tag}
    `;
    dropdownOptions.appendChild(option);
  });
}

/**
 * Loads event listeners for UI interactions such as dropdown toggling, search bar input, and button clicks.
 */
function load_listeners() {
  // Add click event to the dropdown button
  document.getElementById('dropdown-btn').addEventListener('click', (event) => {
    const dropdown = document.querySelector('.multi-select-dropdown');
    dropdown.classList.toggle('open'); // Toggle the dropdown's visibility
    event.stopPropagation(); // Prevent the event from bubbling up
  });

  // Add event listener to close the dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.multi-select-dropdown');
    const dropdownBtn = document.getElementById('dropdown-btn');

    // Close the dropdown if the click is outside the dropdown and the button
    if (!dropdown.contains(event.target) && event.target !== dropdownBtn) {
      dropdown.classList.remove('open');
    }
  });

  // Add listener for the Enter key in the search bar
  document.getElementById('search-bar').addEventListener('keypress',
      function(event) {
        if (event.key === 'Enter') {
          filterNotes();
        }
      });
  document.getElementById('create-button').addEventListener('click', () => redirect_page('create'));
}

// Executes when the DOM content is fully loaded. Initializes the homepage, populates the tags dropdown, and loads event listeners.
document.addEventListener('DOMContentLoaded', (event) => {
  init_home();
  populateTagsDropdown();
  load_listeners();
});

module.exports = filterNotes;
