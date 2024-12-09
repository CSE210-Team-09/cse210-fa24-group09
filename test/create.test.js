// Mock the external functions used in save_from_create
jest.mock('../source/js/util.js', () => ({
    get_journal_elements: jest.fn(),
    validate_title: jest.fn(),
    validate_tags: jest.fn(),
    API: {
      create_journal: jest.fn(),
    },
    redirect_page: jest.fn(),
  }));
  
  describe('save_from_create', () => {
    let mockJournal;
  
    beforeEach(() => {
      // Set up the mock data
      mockJournal = {
        title: 'Test Title',
        tags: ['tag1', 'tag2'],
        code: 'code content',
        comment: 'comment content',
      };
  
      // Set up the mock functions to return expected values
      get_journal_elements.mockReturnValue(mockJournal);
      validate_title.mockReturnValue(mockJournal.title);
      validate_tags.mockReturnValue(mockJournal.tags);
      API.create_journal.mockReturnValue('note123'); // Simulate a successful journal creation
    });
  
    it('should save the journal and redirect if all validations pass', () => {
      // Call the function being tested
      save_from_create();
  
      // Verify that get_journal_elements was called
      expect(get_journal_elements).toHaveBeenCalled();
  
      // Verify that validate_title and validate_tags were called with the correct values
      expect(validate_title).toHaveBeenCalledWith(mockJournal.title);
      expect(validate_tags).toHaveBeenCalledWith(mockJournal.tags);
  
      // Verify that API.create_journal was called with the correct parameters
      expect(API.create_journal).toHaveBeenCalledWith(
        mockJournal.title,
        mockJournal.code,
        mockJournal.comment,
        mockJournal.tags
      );
  
      // Verify that redirect_page was called with the correct arguments
      expect(redirect_page).toHaveBeenCalledWith('view', 'note123');
    });
});