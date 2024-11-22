// Sample data
const notes = [
  { id: 1, title: "DSA1" },
  { id: 2, title: "UI Design" },
  { id: 3, title: "JavaScript Basics"},
  { id: 4, title: "DSA" },
  { id: 5, title: "UI Design" },
  { id: 6, title: "JavaScript Basics"},
  { id: 7, title: "DSA" },
  { id: 8, title: "UI Design" },
  { id: 9, title: "JavaScript Basics"},
  { id: 10, title: "DSA" },
  { id: 11, title: "UI Design" },
  { id: 12, title: "JavaScript Basics"},
  { id: 13, title: "DSA" },
  { id: 14, title: "UI Design" },
  { id: 15, title: "JavaScript Basics"},
  { id: 21, title: "DSA" },
  { id: 22, title: "UI Design" },
  { id: 23, title: "JavaScript Basics"},
  { id: 24, title: "DSA" },
  { id: 25, title: "UI Design" },
  { id: 26, title: "JavaScript Basics"},
  { id: 27, title: "DSA" },
  { id: 28, title: "UI Design" },
  { id: 29, title: "JavaScript Basics"},
  { id: 210, title: "DSA" },
  { id: 211, title: "UI Design" },
  { id: 212, title: "JavaScript Basics"},
  { id: 213, title: "DSA" },
  { id: 214, title: "UI Design" },
  { id: 215, title: "JavaScript Basics"},

];

// Function to display notes on the homepage
function displayNotes(filteredNotes = notes) {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  if (filteredNotes.length === 0) {
    notesList.innerHTML = "<li>No notes found</li>";
    return;
  }

  filteredNotes.forEach(note => {
    const noteItem = document.createElement("li");
    noteItem.textContent = `${note.title}`;
    noteItem.onclick = () => viewNoteDetails(note.id);
    notesList.appendChild(noteItem);
  });
}

// Function to filter notes based on the search bar input
function filterNotes() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm)
  );

  displayNotes(filteredNotes);
}

// Add listener for the Enter key in the search bar
document.getElementById("search-bar").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    filterNotes();
  }
});

// Placeholder function for viewing a note
function viewNoteDetails(noteId) {
  //TODO: integrate view note funtionality
  alert(`Viewing details for note ID: ${noteId}`);
}

// Placeholder function for creating a new note
function createNewNote() {
  //TODO: implement create nod
  alert("Redirecting to Create New Note page...");
}

// Initial display
displayNotes();

