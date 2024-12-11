/**
 * Template for journal entry
 */
const data_template = {
  id: -1,
  title: '',
  code: '',
  comment: '',
  date: '',
  tags: [],
};

const DATA_INDEX = -1;
/**
 * This class contains functionality for tracking and generating unique ID numbers for journals.
 */
class DataIDGenerator {
  static DATA_INDEX_KEY = 'data_index';

  /**
   * This function returns the current index indicating the number of journals in storage.
   * @return {number} The current index for the number of journals in storage.
   */
  static get_data_index() {
    const index = parseInt(localStorage.getItem(this.DATA_INDEX_KEY));
    return index;
  }

  /**
   * This function returns the ID for the new journal entry.
   * @return {number} The ID for the new journal based on the data index.
   */
  static generate_id() {
    const id = this.get_data_index();
    this.increment_data_index();

    return id;
  }

  /**
   * This function increments the data index in the strorage to track the number of journal entries.
   */
  static increment_data_index() {
    let index = this.get_data_index();
    index++;
    localStorage.setItem(this.DATA_INDEX_KEY, index);
  }
}

// journalStorage.js
/**
 * This class contains functionality for creating, editing, saving, and returning journal entries.
 */
class JournalStorage {
  static DATA_ARRAY_KEY = 'journal_entries';

  /**
   * Retrieves all journals.
   * @return {Array} An array of objects containing a journal's id and title.
   */
  static get_all_journals() {
    const ids_titles = localStorage.getItem(this.DATA_ARRAY_KEY);
    return JSON.parse(ids_titles);
  }

  /**
   * Creates a new journal.
   * @param {string} title - The title of the new journal.
   * @param {string} code - The code associated with the new journal.
   * @param {string} comment - A comment for the new journal.
   * @param {Array} tags - An array of strings representing tags for the new journal.
   * @return {number} The ID of the new journal.
   */
  static create_journal(title, code, comment, tags) {
    const id = DataIDGenerator.generate_id();
    const date = Date.now();
    const new_entry = {
      id: id,
      title: title,
      code: code,
      comment: comment,
      date: date,
      tags: tags,
    };

    // save journal to local storage
    localStorage.setItem(new_entry.id, JSON.stringify(new_entry));

    const all_journals = JournalStorage.get_all_journals();
    all_journals.push(
        {
          id: new_entry.id,
          title: new_entry.title,
          tags: new_entry.tags,
        },
    );

    // save journal to arrray of all journal entries
    localStorage.setItem(this.DATA_ARRAY_KEY, JSON.stringify(all_journals));

    return new_entry.id;
  }

  /**
   * Edit and saves an existing journal.
   * @param {number} id - The ID of the journal.
   * @param {string} title - The title of the journal.
   * @param {string} code - The code associated with the journal.
   * @param {string} comment - A comment for the journal.
   * @param {Array} tags - An array of strings representing tags for the journal.
   */
  static edit_journal(id, title, code, comment, tags) {
    const journal = JournalStorage.get_journal(id);
    journal.title = title;
    journal.comment = comment;
    journal.code = code;
    journal.tags = tags;
    console.log('journal', journal);

    localStorage.setItem(id.toString(), JSON.stringify(journal));

    // search for journal id in the list of all journal entries
    const all_journals = JournalStorage.get_all_journals();
    for (let i = 0; i < all_journals.length; i++) {
      if (all_journals[i].id === id) {
        all_journals[i].title = title;
        all_journals[i].comment = comment;
        all_journals[i].code = code;
        all_journals[i].tags = tags;
        break;
      }
    }

    // set the new list of all journal entries
    localStorage.setItem(this.DATA_ARRAY_KEY, JSON.stringify(all_journals));
  }

  /**
   * Retrieves a specific journal by ID.
   * @param {number} id - The ID of the journal to retrieve.
   * @return {Object} The journal object.
   */
  static get_journal(id) {
    const journal = localStorage.getItem(id.toString());
    return JSON.parse(journal);
  }

  /**
   * Deletes a journal by ID.
   * @param {number} id - The ID of the journal to delete.
   */
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
   * @return {Array} An array of objects containing a journal's ID and title.
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
   * @param {Array} tags - An array of strings representing tags for the new journal.
   * @return {number} The ID of the new journal.
   */
  create_journal: (title, code, comment, tags) => JournalStorage.create_journal(title, code, comment, tags),

  /**
   * Saves an existing journal.
   * @param {number} id - The ID of the journal.
   * @param {string} title - The title of the journal.
   * @param {string} code - The code associated with the journal.
   * @param {string} comment - A comment for the journal.
   * @param {Array} tags - An array of strings representing tags for the journal.
   * @return {void}
   */
  save_journal: (id, title, code, comment, tags) => JournalStorage.edit_journal(id, title, code, comment, tags),

  /**
   * Deletes a journal by ID.
   * @param {number} id - The ID of the journal to delete.
   * @return {void}
   */
  delete_journal: (id) => JournalStorage.delete_journal(id),

  /**
   * Initialize the data in the localStorage.
   * @param {bool} dummy - If true will generate dummy data.
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
    API.create_journal('Journal 1', 'Code 1', 'Comment 1', tags = []);
    API.create_journal('Journal 2', 'Code 2', 'Comment 2', tags = ['tag1', 'tag2']);
    API.create_journal('Journal 3', 'Code 3', 'Comment 3', tags = ['tag2', 'tag3']);
  },
};

