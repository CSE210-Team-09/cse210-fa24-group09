/**
 * Template for journal entry
 */
const data_template = {
    id: -1,
    title: '',
    code: '',
    comment: '',
    date: ''
};

const DATA_INDEX = -1;



// journalStorage.js
class JournalStorage {
    static DATA_ARRAY_KEY = "journal_entries";

    static get_all_journals() {
        const ids_titles = localStorage.getItem(this.DATA_ARRAY_KEY);
        return JSON.parse(ids_titles);
    }

    static create_journal(title, code, comment, date) {
        const id = DATA_INDEX + 1;
        const new_entry = {
            id: id,
            title: title,
            code: code,
            comment: comment,
            date: date
        }
        localStorage.setItem(new_entry.id, JSON.stringify(new_entry));
        const all_journals = JournalStorage.get_all_journals()
        all_journals.push(
            {
                id: new_entry.id,
                title: new_entry.title
            }
        );

        localStorage.setItem(this.DATA_ARRAY_KEY, JSON.stringify(all_journals));
    }

    static save_journal(journal) {
        localStorage.setItem(journal.id.toString(), JSON.stringify(journal));

    }

    static get_journal(id) {
        const journal = localStorage.getItem(id.toString());
        return JSON.parse(journal);
    }

    static delete_journal(id) {
        localStorage.removeItem(id.toString());
    }


}


/**
 * This function is a wrapper for the setItem function of the localStorage.
 * @global
 * @param {string} key The key of the item.
 * @param {any} data The item to save.
 */
function set_data(key, data) {
    window.localStorage.setItem(key, data);
}

/**
 * API object for interacting with JournalStorage.
 */
const API = {
    /**
     * Retrieves all journals.
     * @returns {array} An array of objects containing a journal's id and title
     */
    get_all_journals: () => JournalStorage.get_all_journals(),

    /**
     * Retrieves a specific journal by ID.
     * @param {number|string} id - The ID of the journal to retrieve.
     * @returns {}
     */
    get_journal: id => JournalStorage.get_journal(id),

    /**
     * Creates a new journal.
     * @param {number|string} id - The ID of the new journal.
     * @param {string} title - The title of the new journal.
     * @param {string} code - The code associated with the new journal.
     * @param {string} comment - A comment for the new journal.
     * @param {Date} date - The date of the new journal.
     * @returns {}
     */
    create_journal: (title, code, comment, date) => JournalStorage.create_journal(title, code, comment, date),

    /**
     * Saves an existing journal.
     * @param {number} journal.id - The ID of the journal.
     * @param {string} journal.title - The title of the journal.
     * @param {string} journal.code - The code associated with the journal.
     * @param {string} journal.comment - A comment for the journal.
     * @param {Date} journal.date - The date of the journal.
     * @returns {}
     */
    save_journal: (id, title, code, comment, date) => JournalStorage.save_journal(journal),

    /**
     * Deletes a journal by ID.
     * @param {number} id - The ID of the journal to delete.
     * @returns {bool} - True if the journal was deleted, false otherwise.
     */
    delete_journal: id => JournalStorage.delete_journal(id),
};


console.log('hello world');
window.localStorage.clear();
set_data(JournalStorage.DATA_ARRAY_KEY, JSON.stringify([]));
set_data('1', JSON.stringify(data_template));