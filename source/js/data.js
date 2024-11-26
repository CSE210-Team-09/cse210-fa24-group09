/**
 * Template for journal entry
 */
const data_template = {
  id: -1,
  title: '',
  code: '',
  comment: '',
  date: '',
};

const DATA_INDEX = -1;

class DataIDGenerator {
  static DATA_INDEX_KEY = 'data_index';

  static get_data_index() {
    const index = parseInt(localStorage.getItem(this.DATA_INDEX_KEY));
    return index;
  }

  static generate_id() {
    const id = this.get_data_index();
    this.increment_data_index();

    return id;
  }

  static increment_data_index() {
    let index = this.get_data_index();
    index++;
    localStorage.setItem(this.DATA_INDEX_KEY, index);
  }
}

// journalStorage.js
class JournalStorage {
  static DATA_ARRAY_KEY = 'journal_entries';

  static get_all_journals() {
    const ids_titles = localStorage.getItem(this.DATA_ARRAY_KEY);
    return JSON.parse(ids_titles);
  }

  static create_journal(title, code, comment) {
    const id = DataIDGenerator.generate_id();
    const date = Date.now();
    const new_entry = {
      id: id,
      title: title,
      code: code,
      comment: comment,
      date: date,
    };

    // save journal to local storage
    localStorage.setItem(new_entry.id, JSON.stringify(new_entry));

    const all_journals = JournalStorage.get_all_journals();
    all_journals.push(
        {
          id: new_entry.id,
          title: new_entry.title,
        },
    );

    // save journal to arrray of all journal entries
    localStorage.setItem(this.DATA_ARRAY_KEY, JSON.stringify(all_journals));

    return true;
  }

  static edit_journal(id, title, comment, code) {
    const journal = JournalStorage.get_journal(id);
    journal.title = title;
    journal.comment = comment;
    journal.code = code;

    localStorage.setItem(id.toString(), JSON.stringify(journal));

    // TODO: update journal in list of all journal entries
  }

  static get_journal(id) {
    const journal = localStorage.getItem(id.toString());
    return JSON.parse(journal);
  }
  // TODO this needs to return true or false
  static delete_journal(id) {
    // remove journal entry from local storage
    localStorage.removeItem(id.toString());

    // remove journal entry from list of all journal entries in local storage
    const all_journals = JournalStorage.get_all_journals();
    for (let i = 0; i < all_journals.length; i++) {
      if (all_journals[i].id === id) {
        all_journals.splice(i, 1);
        break;
      }
    }
    // set the new list of all journal entries
    localStorage.setItem(this.DATA_ARRAY_KEY, JSON.stringify(all_journals));
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
         * @return {Array} An array of objects containing a journal's id and title.
         */
  get_all_journals: () => JournalStorage.get_all_journals(),

  /**
         * Retrieves a specific journal by ID.
         * @param {number} id - The ID of the journal to retrieve.
         * @return {Object} The journal object.
         */
  get_journal: (id) => JournalStorage.get_journal(id),

  /**
         * Creates a new journal.
         * @param {string} title - The title of the new journal.
         * @param {string} code - The code associated with the new journal.
         * @param {string} comment - A comment for the new journal.
         * @return {boolean} True if the journal was created successfully.
         */
  create_journal: (title, code, comment) => JournalStorage.create_journal(title, code, comment),

  /**
         * Saves an existing journal.
         * @param {number} id - The ID of the journal.
         * @param {string} title - The title of the journal.
         * @param {string} code - The code associated with the journal.
         * @param {string} comment - A comment for the journal.
         * @return {boolean} True if the journal was saved successfully.
         */
  save_journal: (id, title, code, comment) => JournalStorage.edit_journal(id, title, code, comment),

  /**
         * Deletes a journal by ID.
         * @param {number} id - The ID of the journal to delete.
         * @return {boolean} True if the journal was deleted, false otherwise.
         */
  delete_journal: (id) => JournalStorage.delete_journal(id),

  /**
     * Initialize the data in the localStorage.
     * @param {bool} dummy - if true will generate dummy data
     */

  init: (dummy) => {
    const existingData = window.localStorage.getItem(JournalStorage.DATA_ARRAY_KEY);
    if (existingData) {
      return;
    }
    
    set_data(JournalStorage.DATA_ARRAY_KEY, JSON.stringify([]));
    set_data(DataIDGenerator.DATA_INDEX_KEY, -1);
    if (dummy) {
      API.generate_dummy_data();
    }
  },

  generate_dummy_data: () => {
    API.create_journal('Journal 1', 'Code 1', 'Comment 1');
    API.create_journal('Journal 2', 'Code 2', 'Comment 2');
    API.create_journal('Journal 3', 'Code 3', 'Comment 3');
  },


};

