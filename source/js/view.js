// Get the notes containers
const codeContainer = document.getElementById('code-container');
const commentContainer = document.getElementById('comment-container');
const titleContainer = document.getElementById('title-container');
const tagContainer = document.getElementById('tag-container');

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
  const note = API.get_journal(noteId);
  if (!note) {
    titleContainer.textContent = 'Note not found.';
    return;
  }

  // Title (no label)
  const titleTextarea = document.createElement('textarea');
  titleTextarea.id = 'title';
  titleTextarea.value = note.title;
  titleTextarea.rows = 2;
  titleTextarea.readOnly = true;
  titleContainer.appendChild(titleTextarea);

  // Code (with label)
  const codeLabel = document.createElement('label');
  codeLabel.setAttribute('for', 'code');
  codeLabel.textContent = 'Code';
  const codeTextarea = document.createElement('textarea');
  codeTextarea.id = 'code';
  codeTextarea.value = note.code;
  codeTextarea.rows = 10;
  codeTextarea.readOnly = true;
  codeContainer.appendChild(codeLabel);
  codeContainer.appendChild(codeTextarea);

  // Comment (with label)
  const commentLabel = document.createElement('label');
  commentLabel.setAttribute('for', 'comment');
  commentLabel.textContent = 'Comment';
  const commentTextarea = document.createElement('textarea');
  commentTextarea.id = 'comment';
  commentTextarea.value = note.comment;
  commentTextarea.rows = 5;
  commentTextarea.readOnly = true;
  commentContainer.appendChild(commentLabel);
  commentContainer.appendChild(commentTextarea);

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
  window.location.href = `../html/edit.html?id=${id}`;
}

// Delete note
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

// Load the note when the page loads
loadNoteById(id);
