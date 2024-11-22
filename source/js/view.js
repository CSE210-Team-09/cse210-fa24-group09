// Get the notes containers
const codeContainer = document.getElementById("code-container");
const commentContainer = document.getElementById("comment-container");
const titleContainer = document.getElementById("title-container");

// Dummy notes array
/**
 * @type {Array<{id: string, title: string, code: string, comment: string}>}
 * Array of dummy notes to simulate stored data.
 */
const dummyNotes = [
    {
        id: 1,
        title: "JavaScript Basics",
        code: `function greet(name) {
    return 'Hello, ' + name + '!';
}`,
        comment: "This code defines a function to greet a user by their name."
    },
    {
        id: 2,
        title: "CSS Flexbox Example",
        code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
}`,
        comment: "This snippet shows how to center elements using CSS Flexbox."
    }
];

// Store the dummy notes in local storage
/**
 * Stores the dummy notes in the browser's local storage under the key "notes".
 */
localStorage.setItem("notes", JSON.stringify(dummyNotes));

// ID of the note to display
/**
 * @type {int}
 * ID of the note to be displayed on the page.
 */
const id = 1;

// Fetch notes from local storage
/**
 * Loads a note from local storage based on its ID and displays it on the page.
 *
 * @param {int} noteId - The ID of the note to load.
 */
function loadNoteById(noteId) {
    // Retrieve all notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    codeContainer.innerHTML = ""; // Clear the container
    commentContainer.innerHTML = ""; // Clear the container
    titleContainer.innerHTML = ""; // Clear the container

    // Find the note with the matching ID
    const note = notes.find(note => note.id === noteId);

    if (!note) {
        // Display an error message if the note is not found
        titleContainer.innerHTML = `<h2>Note not found.</h2>`;
        codeContainer.innerHTML = `<p>Note not found.</p>`;
        return;
    }

    // Populate the containers with the note's content
    titleContainer.innerHTML = `<h2>${note.title}</h2>`;
    codeContainer.innerHTML = `<p>${note.code}</p>`;
    commentContainer.innerHTML = `<p>${note.comment}</p>`;
}

// Go back home
/**
 * Redirects the user to the home page.
 */
function goBackHome() {
    window.location.href = "../html/home.html";
}

// Edit note
/**
 * Redirects the user to the edit page for the note.
 */
function editNote() {
    window.location.href = "../html/edit.html";
}

// Load the note when the page loads
loadNoteById(id);
