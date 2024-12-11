TITLE_MAX_LENGTH = 40;
TAG_MAX_LENGTH = 15;
TITLE_MAX_LEN_EXCEEDED_MSG = `Title cannot exceed ${TITLE_MAX_LENGTH} characters. Please shorten your title.`;
DEFAULT_TITLE = 'Untitled';


// This file contains common functions that the others use
/**
 * This function gets the elements from the page and saves the note given the available infromation in the page. Will raise an alert if the title is too long.
 * @param {number} note_id
 * @return {boolean} true if the note was saved successfully, false otherwise
 */
function save_note(note_id) {
  const journal = get_journal_elements();
  journal.title = validate_title(journal.title);
  if (journal.title === null) {
    return false;
  }
  journal.tags = validate_tags(journal.tags);
  if (journal.tags === null) {
    return false;
  }
  console.log(note_id);
  console.log(journal);
  API.save_journal(
      id = note_id,
      title = journal.title,
      code = journal.code,
      comment = journal.comment,
      tags = journal.tags,
  );

  return true;
}

/**
 * Validate the title of the journal
 *
 * @param {string} title
 * @param {boolean} [alert=false] alert - whether to show an alert if the title is too long
 * @return {string|null} the title if it is valid, null otherwise
 */
function validate_title(title, alert = true) {
  if (title === '') {
    return DEFAULT_TITLE;
  }

  if (title.length > TITLE_MAX_LENGTH) {
    if (alert) {
      window.alert(TITLE_MAX_LEN_EXCEEDED_MSG);
    }
    return null;
  }

  return title;
}

/**
 * Validates an array of tags.
 *
 * @param {string[]} tags - An array of tag strings.
 * @param {boolean} [alert=true] - Whether to show an alert if a tag is invalid.
 * @return {string[]|null} - Array of tags if they are valid, null otherwise.
 */
function validate_tags(tags, alert = true) {
  if (tags && tags.length !== 0) {
    tags_arr = tags
        .map((tag) => tag.trim()) // Remove leading/trailing spaces
        .filter((tag) => tag !== '') // Remove empty tags
        .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
    tags = tags_arr;
  }
  for (const tag of tags) {
    if (tag.length > TAG_MAX_LENGTH) {
      if (alert) {
        window.alert(`Tag "${tag}" exceeds the maximum length of ${TAG_MAX_LENGTH} characters. Please shorten it.`);
      }
      return null;
    }
  }
  return tags;
}

/**
 * Get Journal journal elements on page and parse
 * @return {Object} journal object
 */
function get_journal_elements() {
  const title = document.getElementById('title-input').value.trim();
  const code = document.getElementById('code-input').value;
  const comment = document.getElementById('comment-input').value;
  const tags = document.getElementById('tag-input').value;
  const tags_arr = parse_tags(tags);

  return {
    title: title,
    code: code,
    comment: comment,
    tags: tags_arr,
  };
}

/**
 * Parse tags from user input string
 * @param {string} tags
 * @return {Array} tags
 */
function parse_tags(tags) {
  // Remove leading and trailing whitespace
  const trimmed_tags = tags.trim();

  // If the string isn't empty, split based on comma and remove trailing white spaces for each tag
  if (trimmed_tags === '') {
    return [];
  }

  return trimmed_tags.split(',').map((tag) => tag.trim());
}

/**
 * Utility function to redirect to a page
 * @param {string} page (home, create, view, edit)
 * @param {number} note_id  (optional)
 * @return {string} url of the destination page
 */
function redirect_page(page, note_id = null) {
  let url = `../html/${page}.html`;
  if (note_id !== null) {
    url += `?id=${note_id}`;
  }
  window.location.href = url;

  return url;
}

/**
 * Retrieves the value of the "id" query parameter from the current URL.
 *
 * @return {number|null} The value of the "id" query parameter as a number, or `null` if not found.
 */
function get_id_from_url() {
  const url = new URLSearchParams(window.location.search);
  base = 10; // decimal system
  if (url.has('id')) {
    return parseInt(url.get('id'), base);
  }

  return null;
}

/**
 * This function enables the Tab key to insert indentation rather than moving to the next text box
 * @param {string} textAreaID - ID of text area
 */
function enable_tab_indent(textAreaID) {
  const input = document.getElementById(textAreaID);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const indent = '    ';

      e.target.value = e.target.value.substring(0, start) + indent + e.target.value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + indent.length;
    }
  });
}

module.exports = {
  validate_title,
  validate_tags,
  parse_tags,
  get_id_from_url,
  enable_tab_indent,
  save_note,
};
