// Sample data

API.init(true);

const notes = API.get_all_journals();

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
    noteItem.textContent = `${note.title}`;
    noteItem.onclick = () => viewNoteDetails(note.id);
    notesList.appendChild(noteItem);
  });
}

// Function to filter notes based on the search bar input
function filterNotes() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm),
  );

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

// Placeholder function for creating a new note
function createNewNote() {
  window.location.href = `../html/create.html`;
}

// Initial display
displayNotes();

