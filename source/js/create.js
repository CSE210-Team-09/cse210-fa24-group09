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
function saveAndReturn() {
  const title = document.getElementById('text-input').value;
  const code = document.getElementById('code-input').value;
  const comment = document.getElementById('comment-input').value;

  
  // Need to call create_journal from data.js to pass the information over
  if (API.create_journal(title, code, comment)) {
    alert('Note created successfully!');
    goHome();
  } else {
    alert('Failed to create note.');
  }
}
