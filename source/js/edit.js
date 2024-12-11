/**
 * Given the note, load the containers with the note's content.
 * @param {Object} note - The current note being edited.
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

/**
 * Enables the save button, cancel button, and use of the tab key to indent text.
 * @param {number} note_id - The ID of the note being edited.
 */
function load_listeners(note_id) {
  document.getElementById('save-button').addEventListener('click', () => save_note_from_edit(note_id));
  document.getElementById('cancel-button').addEventListener('click', () => redirect_page('view', note_id));
  enable_tab_indent('code-input');
  enable_tab_indent('comment-input');
}

/**
 * Initializes the edit page by loading the note for the given ID,
 * attaching event listeners, and populating the UI containers with note data.
 */
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

/**
 * Saves the current edits to the note and redirects to the view page.
 * @param {number} note_id - The ID of the note being edited.
 * @return {void}
 */
function save_note_from_edit(note_id) {
  const successful_save = save_note(note_id);
  if (!successful_save) {
    return;
  }
  redirect_page('view', note_id);
}

document.addEventListener('DOMContentLoaded', (event) => {
  init_edit();
});
