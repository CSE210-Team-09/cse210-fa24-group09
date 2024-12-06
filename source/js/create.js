/**
 * This function saves the note using the JournalStorage API, and sends an
 * alert if the note is saved successfully, or if an error occurred.
 */
function save_from_create() {

  // Get the input values
  const journal = get_journal_elements();

  journal.title = validate_title(journal.title);
  if (journal.title === null) {
    return;
  }
  journal.tags = validate_tags(journal.tags);
  if (journal.tags === null) {
    return;
  }

  const note_id = API.create_journal(journal.title, journal.code, journal.comment, journal.tags);

  redirect_page('view', note_id);
}


function init_create() {
  load_create_listeners();
}

function load_create_listeners() {
  document.getElementById('save-button').addEventListener('click', () => save_from_create());
  document.getElementById('cancel-button').addEventListener('click', () => redirect_page('home'));
  enable_tab_indent('code-input');
  enable_tab_indent('comment-input');

}
document.addEventListener('DOMContentLoaded', (event) => {
  init_create();
});

