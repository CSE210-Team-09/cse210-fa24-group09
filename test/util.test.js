/**
 * @jest-environment jsdom
 */
const {
    validate_title,
    validate_tags,
    parse_tags,
    get_id_from_url,
    enable_tab_indent,
    save_note,
  } = require('../source/js/util'); // Adjust the path to match your file location
  
  describe('validate_title', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test('returns default title if empty', () => {
      expect(validate_title('')).toBe('Untitled');
    });
  
    test('returns title if valid', () => {
      expect(validate_title('Valid Title')).toBe('Valid Title');
    });
  
    test('alerts and returns null if title is too long', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const longTitle = 'A'.repeat(41);
      expect(validate_title(longTitle)).toBeNull();
      expect(window.alert).toHaveBeenCalledWith(
        'Title cannot exceed 40 characters. Please shorten your title.'
      );
    });
  });
  
  describe('validate_tags', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test('returns tags if all are valid', () => {
      expect(validate_tags(['tag1', 'tag2'])).toEqual(['tag1', 'tag2']);
    });
  
    test('alerts and returns null if a tag is too long', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const longTag = 'A'.repeat(16);
      expect(validate_tags(['valid', longTag])).toBeNull();
      expect(window.alert).toHaveBeenCalledWith(
        `Tag "AAAAAAAAAAAAAAAA" exceeds the maximum length of 15 characters. Please shorten it.`
      );
    });
  });
  
  describe('parse_tags', () => {
    test('returns an empty array for an empty string', () => {
      expect(parse_tags('')).toEqual([]);
    });
  
    test('parses tags separated by commas', () => {
      expect(parse_tags('tag1, tag2, tag3')).toEqual(['tag1', 'tag2', 'tag3']);
    });
  
    test('trims whitespace from tags', () => {
      expect(parse_tags(' tag1 , tag2 , tag3 ')).toEqual(['tag1', 'tag2', 'tag3']);
    });
  });
  
  describe('get_id_from_url', () => {
    test('returns null if no ID is in the URL', () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '',
        },
      });
      expect(get_id_from_url()).toBeNull();
    });
  
    test('returns the ID as a number if present', () => {
      let originalLocation = window.location;

      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          ...originalLocation,
        },
      });
      window.location.search = '?id=123'
      expect(get_id_from_url()).toBe(123);
    });
  
    test('returns null for invalid ID values', () => {
      window.location.search = ''
      expect(get_id_from_url()).toBeNull();
    });
  });
  
  describe('enable_tab_indent', () => {
    test('adds indentation when Tab is pressed', () => {
      const textArea = document.createElement('textarea');
      document.body.appendChild(textArea);
      textArea.id = 'test-area';
      enable_tab_indent('test-area');
  
      textArea.value = 'Line 1\nLine 2';
      textArea.selectionStart = 6;
      textArea.selectionEnd = 6;
  
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      textArea.dispatchEvent(tabEvent);
  
      expect(textArea.value).toBe('Line 1    \nLine 2');
      expect(textArea.selectionStart).toBe(10);
      expect(textArea.selectionEnd).toBe(10);
    });
  });