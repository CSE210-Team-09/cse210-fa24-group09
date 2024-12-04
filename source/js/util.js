// This file contains common functions that the others use
/**
 * This function gets the elements from the page and saves the note given the available infromation in the page
 * @param {number} note_id
 */

function save_note(note_id) {
    const journal = get_journal_elements();
    API.save_journal(note_id, journal.title, journal.code, journal.comment, journal.tags);
};

/**
 * Get Journal journal elements on page and parse
 * @returns {Object} journal object
 */
function get_journal_elements() {
    const title = document.getElementById('text-input').value;
    const code = document.getElementById('code-input').value;
    const comment = document.getElementById('comment-input').value;
    const tags = document.getElementById('tag-input').value;
    const tags_arr = parse_tags(tags);

    return {
        title: title,
        code: code,
        comment: comment,
        tags: tags_arr
    };
};

/**
 * Parse tags from user input string
 * @param {string} tags
 * @returns {Array} tags
 */
function parse_tags(tags) {
    // Remove leading and trailing whitespace
    const tags = tags.trim();

    // If the string isn't empty, split based on comma and remove trailing white spaces for each tag
    if (tags === '') {
        return [];
    }

    return tags.split(',').map((tag) => tag.trim());

};



/**
 * Utility function to redirect to a page
 * @param {string} page (home, create, view, edit)
 * @param {number} note_id  (optional)
 * @returns {string} url of the destination page
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
    base = 10 // decimal system
    if (url.has('id')) {
        return parseInt(url.get('id'), base);
    }

    return null;;
}