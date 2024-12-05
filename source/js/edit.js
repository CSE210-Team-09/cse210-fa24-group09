
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
 * Given the note, load the containers with the note's content
 * @param {Object} note
 * @returns {any} this function does not return anything meaningful
 */

function load_containers(note) {
  const codeContainer = document.getElementById('code-input');
  const commentContainer = document.getElementById('comment-input');
  const titleContainer = document.getElementById('title-input');
  const tagContainer = document.getElementById('tag-input');
  const valid_note = note !== null;

  if (!valid_note) {
    titleContainer.value = `Note not found.`;
    codeContainer.value = `Note not found `;
    return;
  }


  // Populate the containers with the note's content
  titleContainer.value = note.title;
  codeContainer.value = note.code;
  commentContainer.value = note.comment;
  tagContainer.value = note.tags.join(', ');
}

function load_listeners(note_id) {
  document.getElementById('save-button').addEventListener('click', () => save_note());
  document.getElementById('cancel-button').addEventListener('click', () => redirect_page('view', note_id));
}

function init_edit() {
  // const id = getQueryParam();

  const note_id = parseInt(getQueryParam(), 10);
  // const note_id = 1; // change from getting the id from the url
  load_listeners(note_id);

  // Fetch notes from local storage
  const note = API.get_journal(note_id);


  load_containers(note);
}

function save_note() {
  console.log('attemping to save');
  let title = document.getElementById('title-input').value.trim();
  const code = document.getElementById('code-input').value;
  const comment = document.getElementById('comment-input').value;
  const tags = document.getElementById('tag-input').value;
  const tagsArr = tags && tags.trim() !== '' ? tags.split(',').map((tag) => tag.trim()) : [];

  // Input validation for the title
  if (title === '') {
    title = 'Untitled'; // Default title
  } else if (title.length > 40) {
    alert('Title cannot exceed 40 characters. Please shorten your title.');
    return; // Stop the save function if the title is too long
  }

  const note_id = parseInt(getQueryParam(), 10);
  API.save_journal(note_id, title, code, comment, tagsArr);
  redirect_page('view', note_id);
}

/**
 * Utility function to redirect to a page
 * @param {string} page (home, create, view, edit)
 * @param {string} note_id  (optional)
 */
function redirect_page(page, note_id = null) {
  let url = `../html/${page}.html`;
  if (note_id !== null) {
    url += `?id=${note_id}`;
  }
  console.log(url);
  window.location.href = url;
}

/**
 * This function enables the Tab key to insert indentation rather than moving to the next text box
 * @param {string} textAreaID - ID of text area
 */
function enableTabIndent(textAreaID) {
  const input = document.getElementById(textAreaID);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const indent = '   ';

      e.target.value = e.target.value.substring(0, start) + indent + e.target.value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + indent.length;
    }
  });
}

enableTabIndent('code-input');
enableTabIndent('comment-input');


init_edit();
