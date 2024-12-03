// This file contains common functions that the others use
/**
 * This function savaes the notes given the available infromation in the page
 * @param {number} note_id
 */

function save_note(note_id) {

}

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