/**
 * Retrieves the value of the "id" parameter from the current URL.
 * @return {string|null} The value of the "id" query parameter as a string, or `null` if not found.
 */
function getID() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'), 10);
}

/**
 * Creates the text area and attaches it to a container.
 * @param {HTMLElement} container - Existing container element
 * @param {string} id - Text area ID
 * @param {string} label - Label text
 * @param {string} value - The entry in the text area
 * @param {number} rows - Number of rows for the text area
 */
function createTextarea(container, id, label, value, rows) {
  if (label) {
    const lText = document.createElement('label');
    lText.setAttribute('for', id);
    lText.textContent = label;
    container.appendChild(lText);
  }

  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.value = value;
  textarea.rows = rows;
  textarea.readOnly = true;
  container.appendChild(textarea);
}

/**
 * Loads a note from local storage based on its ID and displays it on the page.
 * @param {number} noteId - The ID of the note to load.
 */
function loadNoteById(noteId) {
  const note = API.get_journal(noteId);

  if (!note) {
    titleContainer.textContent = 'Note not found.';
    return;
  }

  // Title (no label)
  createTextarea(titleContainer, 'title', '', note.title, 2);

  // Code (with label)
  createTextarea(codeContainer, 'code', 'Code', note.code, 17);

  // Comment (with label)
  createTextarea(commentContainer, 'comment', 'Comment', note.comment, 8);

  // Tags (as individual patches)
  if (note.tags && note.tags.length > 0) {
    note.tags.forEach((tag) => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tagContainer.appendChild(tagElement);
    });
  } else {
    const noTagsMessage = document.createElement('p');
    noTagsMessage.textContent = 'No tags available.';
    tagContainer.appendChild(noTagsMessage);
  }
}

/**
 * Delete the note and redirects the user to the home page.
 */
function deleteNote() {
  API.delete_journal(id);

  // Call the global function (from home.js) to refresh the notes list on the homepage
  if (typeof window.onNoteDeleted === 'function') {
    window.onNoteDeleted(); // Notify home.js to update the note list
  }

  window.location.href = '../html/home.html';
}

/**
 * Load the listeners and its function for each button.
 */
function load_view_listeners() {
  document.getElementById('home-button').addEventListener('click', () => redirect_page('home'));
  document.getElementById('edit-button').addEventListener('click', () => redirect_page('edit', id));
  document.getElementById('delete-button').addEventListener('click', () => deleteNote());
}

// Get the notes containers
const codeContainer = document.getElementById('code-container');
const commentContainer = document.getElementById('comment-container');
const titleContainer = document.getElementById('title-container');
const tagContainer = document.getElementById('tag-container');
const id = getID();

// Load the note when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
  load_view_listeners();
  loadNoteById(id);
});
