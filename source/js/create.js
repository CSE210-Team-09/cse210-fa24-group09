/**
 * This function routes back to the home page.
 */
function goHome() {
  window.location.href = '../html/home.html';
}

/**
 * This function saves the note using the JournalStorage API, and sends an
 * alert if the note is saved successfully, or if an error occurred.
 */
function save() {
  const title = document.getElementById('text-input').value;
  const code = document.getElementById('code-input').value;
  const comment = document.getElementById('comment-input').value;

  const tags = document.getElementById('tag-input').value;
  const tagsArr = tags && tags.trim() !== '' ? tags.split(',').map((tag) => tag.trim()) : [];

  // Need to call create_journal from data.js to pass the information over
  if (API.create_journal(title, code, comment, tagsArr)) {
    noteId = DataIDGenerator.get_data_index() - 1;
    window.location.href = `../html/view.html?id=${noteId}`;
  }
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
