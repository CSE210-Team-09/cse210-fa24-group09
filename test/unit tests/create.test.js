const save = require('../../source/js/create');

describe('save function', () => {
    let mockCreateJournal;
    let mockGetDataIndex;
    let mockAlert;
    let mockWindowLocation;
  
    beforeEach(() => {
      // Mock the elements
      document.body.innerHTML = `
        <input id="text-input" />
        <input id="code-input" />
        <input id="comment-input" />
        <input id="tag-input" />
      `;
  
      // Mock the external functions and properties
      mockCreateJournal = jest.fn();
      mockGetDataIndex = jest.fn();
      mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => {});
      mockWindowLocation = { href: '' };
  
      // Assign mocks to the function calls used in the save function
      global.API = { create_journal: mockCreateJournal };
      global.DataIDGenerator = { get_data_index: mockGetDataIndex };
      global.window.location = mockWindowLocation;
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should use default title if input is empty', () => {
      // Set up the input fields
      document.getElementById('text-input').value = '';
      document.getElementById('code-input').value = 'code';
      document.getElementById('comment-input').value = 'comment';
      document.getElementById('tag-input').value = '';
  
      mockCreateJournal.mockReturnValue(true);
      mockGetDataIndex.mockReturnValue(1); // Mock data index to return 1
  
      // Call the save function
      save();
  
      // Check that the journal is created with default title
      expect(mockCreateJournal).toHaveBeenCalledWith('Untitled', 'code', 'comment', []);
      expect(mockWindowLocation.href).toBe('../html/view.html?id=0');
    });
  
    it('should show alert if title exceeds 40 characters', () => {
      // Set up the input fields
      document.getElementById('text-input').value = 'A very long title that exceeds forty characters';
      document.getElementById('code-input').value = 'code';
      document.getElementById('comment-input').value = 'comment';
      document.getElementById('tag-input').value = '';
  
      // Call the save function
      save();
  
      // Assert that the alert is triggered and save is not called
      expect(mockAlert).toHaveBeenCalledWith('Title cannot exceed 40 characters. Please shorten your title.');
      expect(mockCreateJournal).not.toHaveBeenCalled();
    });
  
    it('should handle tags properly', () => {
      // Set up the input fields
      document.getElementById('text-input').value = 'Valid title';
      document.getElementById('code-input').value = 'code';
      document.getElementById('comment-input').value = 'comment';
      document.getElementById('tag-input').value = 'tag1, tag2, tag1'; // Duplicate and valid tags
  
      mockCreateJournal.mockReturnValue(true);
      mockGetDataIndex.mockReturnValue(1);
  
      // Call the save function
      save();
  
      // Assert that the tags are properly processed (duplicates removed)
      expect(mockCreateJournal).toHaveBeenCalledWith('Valid title', 'code', 'comment', ['tag1', 'tag2']);
    });
  
    it('should show alert if a tag exceeds 15 characters', () => {
      // Set up the input fields
      document.getElementById('text-input').value = 'Valid title';
      document.getElementById('code-input').value = 'code';
      document.getElementById('comment-input').value = 'comment';
      document.getElementById('tag-input').value = 'shorttag, toolongtagtoolong';
  
      // Call the save function
      save();
  
      // Assert that the alert is triggered and save is not called
      expect(mockAlert).toHaveBeenCalledWith('Tag "toolongtagtoolong" exceeds the maximum length of 15 characters. Please shorten it.');
      expect(mockCreateJournal).not.toHaveBeenCalled();
    });
  
    it('should navigate to the view page if the entry is successfully saved', () => {
      // Set up the input fields
      document.getElementById('text-input').value = 'Valid title';
      document.getElementById('code-input').value = 'code';
      document.getElementById('comment-input').value = 'comment';
      document.getElementById('tag-input').value = 'tag1';
  
      mockCreateJournal.mockReturnValue(true);
      mockGetDataIndex.mockReturnValue(1);
  
      // Call the save function
      save();
  
      // Assert that the window location changes to the correct view page
      expect(mockWindowLocation.href).toBe('../html/view.html?id=0');
    });
  });