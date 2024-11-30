
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
 * @returns
 */

function load_containers(note) {
  const codeContainer = document.getElementById('code-input');
  const commentContainer = document.getElementById('comment-input');
  const titleContainer = document.getElementById('title-input');

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
}

function load_listeners() {
  document.getElementById('save-button').addEventListener('click', save_note);
  document.getElementById('cancel-button').addEventListener('click', () => redirect_page('view', 1));
}

function init_edit() {
  // const id = getQueryParam();

  const note_id = parseInt(getQueryParam(), 10); 
  // const note_id = 1; // change from getting the id from the url
  load_listeners();

  // Fetch notes from local storage
  note = API.get_journal(note_id);


  load_containers(note);
}

function save_note() {
  console.log('attemping to save');
  const title = document.getElementById('title-input').value;
  const code = document.getElementById('code-input').value;
  const comment = document.getElementById('comment-input').value;

  const note_id = parseInt(getQueryParam(), 10); 
  // const note_id = 1;
  API.save_journal(note_id, title, code, comment, note_id.tags);
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


init_edit();
