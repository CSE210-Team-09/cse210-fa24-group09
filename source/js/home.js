// Sample data

API.init(true);
const notes = API.get_all_journals();

// const notes = [{id: '1', title: '1', tags: ['hey1']}, {id: '1', title: 'hy', tags: ['hey2', 'yo']}, {id: '1', title: 'jh', tags: ['hey2']}];
// Function to display notes on the homepage

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
    noteItem.onclick = () => viewNoteDetails(note.id);
    notesList.appendChild(noteItem);
  });
}

// Function to filter notes based on the search bar input
function filterNotes() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const selectedTags = Array.from(document.querySelectorAll('#dropdown-options input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);

  const filteredNotes = notes.filter((note) => {
    const matchesTitle = note.title.toLowerCase().includes(searchTerm);
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => note.tags.includes(tag));
    return matchesTitle && matchesTags;
  });

  displayNotes(filteredNotes);
}

// Add listener for the Enter key in the search bar
document.getElementById('search-bar').addEventListener('keypress',
    function(event) {
      if (event.key === 'Enter') {
        filterNotes();
      }
    });

function viewNoteDetails(noteId) {
  window.location.href = `../html/view.html?id=${noteId}`;
}

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

// Placeholder function for creating a new note
function createNewNote() {
  window.location.href = `../html/create.html`;
}


// Initial display
populateTagsDropdown(); // Populate the tags dropdown
displayNotes();
