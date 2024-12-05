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
  document.getElementById('save-button').addEventListener('click', () => save_note_from_edit(note_id));
  document.getElementById('cancel-button').addEventListener('click', () => redirect_page('view', note_id));
  enable_tab_indent('code-input');
  enable_tab_indent('comment-input');
}

function init_edit() {
  // Get the note ID from the URL
  const note_id = get_id_from_url();
  console.log(note_id, 'from init');

  // Load event listeners
  load_listeners(note_id);

  // Fetch note to display from local storage
  const note = API.get_journal(note_id);

  // Display the content of the notes in the containers
  load_containers(note);
}

function save_note_from_edit(note_id) {
  save_note(note_id);
  redirect_page('view', note_id);
}


document.addEventListener('DOMContentLoaded', (event) => {
  init_edit();
});
