// Get the notes containers
const codeContainer = document.getElementById('code-container');
const commentContainer = document.getElementById('comment-container');
const titleContainer = document.getElementById('title-container');

/**
 * Retrieves the value of the "id" query parameter from the current URL.
 *
 * @return {string|null} The value of the "id" query parameter as a string, or `null` if not found.
 */
function getQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

/**
 * Parses the "id" query parameter from the URL into an integer.
 * If the query parameter is not present or cannot be parsed as an integer, the value will be `NaN`.
 *
 * @type {number} The parsed ID from the URL.
 */
const id = parseInt(getQueryParam(), 10); // getQueryParam();

// Fetch notes from local storage
/**
 * Loads a note from local storage based on its ID and displays it on the page.
 *
 * @param {number} noteId - The ID of the note to load.
 */
function loadNoteById(noteId) {
  // retrieve note from the local data using API
  note = API.get_journal(noteId);
  codeContainer.innerHTML = ''; // Clear the container
  commentContainer.innerHTML = ''; // Clear the container
  titleContainer.innerHTML = ''; // Clear the container

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
  window.location.href = '../html/home.html';
}

// Edit note
/**
 * Redirects the user to the edit page for the note.
 */
function editNote() {
  window.location.href = '../html/edit.html';
}

// Load the note when the page loads
loadNoteById(id);
