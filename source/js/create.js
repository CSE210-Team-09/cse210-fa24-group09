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
  let title = document.getElementById('text-input').value.trim();
  const code = document.getElementById('code-input').value;
  const comment = document.getElementById('comment-input').value;

  const tagsInput = document.getElementById('tag-input').value;
  let tagsArr = [];

  // Input validation for the title
  if (title === '') {
    title = 'Untitled'; // Default title
  } else if (title.length > 40) {
    alert('Title cannot exceed 40 characters. Please shorten your title.');
    return; // Stop the save function if the title is too long
  }

  // Input validation for tags
  if (tagsInput && tagsInput.trim() !== '') {
    tagsArr = tagsInput
        .split(',')
        .map((tag) => tag.trim()) // Remove leading/trailing spaces
        .filter((tag) => tag !== '') // Remove empty tags
        .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates

    // Check max character length for each tag
    for (const tag of tagsArr) {
      if (tag.length > 15) {
        alert(`Tag "${tag}" exceeds the maximum length of 15 characters. Please shorten it.`);
        return; // Stop the save function if any tag is too long
      }
    }
  }

  // Need to call create_journal from data.js to pass the information over
  if (API.create_journal(title, code, comment, tagsArr)) {
    const noteId = DataIDGenerator.get_data_index() - 1;
    window.location.href = `../html/view.html?id=${noteId}`;
  }
}
