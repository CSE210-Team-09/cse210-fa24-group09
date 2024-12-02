# Team Meeting Notes - Sprint 3 Review Meeting

**Date: Saturday 11.30.2024**\
**Time: 12:30 pm - 1:00 pm**\
**Meeting Format: Hybrid (Zoom and CSE Basement)**

## Attendance

- [x] Niyas Attasseri (NA)
- [x] Anna Niu (AN)
- [x] Krishna Ponnaganti (KP)
- [x] Juhak Lee (JL)
- [x] Brandon Olmos (BO)
- [x] Jayanth Gorantla (JG)
- [x] Lucas Lee (LL)

## What was accomplished and what will be done in the future

Lucas:
- Edit.html is majorly done but doesn’t support editing of tags
- Data.js supports tagging for all operations
- Future work: 
    - Allow tags to be edited in edit.html

Jay and Brandon:
- Worked on create page to update functionality
- Save functionality
- Tag functionality
- Minor fixes that popped up
    - Jay: Codacy fixes
    - Brandon: make create redirects to view instead of home
- Future work: 
    - Testing of create functionality

Krishna and Niyas:
- View page functionality
- Added tag functionality to view page
- Made edit button direct to the edit page
- Add delete note functionality
- Future work: 
    - Fix Codacy bug caused by innerHTML in view.js
        - So update it to use text field and text label instead
    - Fix view bug where the code segment box will render HTML snippet code instead of showing the code itself

Niyas and Juhak:
- Integrated github page deployment and JSDocs using new index.html page
- Have documentation inside the deployment
- Future work: 
    - Edit the workflow to make sure the deployment is from a particular branch that has the permission

Anna and Juhak:
- Implement tagging functionality
- Display tag alongside title in home page
- Can now search by tag as well as title
- Future work: 
    - Search by title and multiple tags

Overall Additional Future Work/Issues for Future Sprints:
- Code Formatting → when you paste/type code into the code block, it should look like code
    - Issue 1: Tab to indent
    - Issue 2: View innerHTML bug
- Tagging → tags should be able to be edited
- Testing of application → unit tests and E2E
- User feedback
    - Each person get two people to review/try our application
- User input validation and constraints
- Code refactoring → make it more modular and get rid of code duplication

Issues for next sprint:
- Jay and Brandon: 
    - Code Formatting → when you paste/type code into the code block, it should look like code
        - Try to get it done by wednesday
        - Issue 1: Tab to indent + preserve indentation
        - Issue 2: View innerHTML
    - Starting Wednesday:
        - Testing
        - User feedback (2 people each)
- Anna and Juhak: 
    - Input Validation/Constraints → input text fields that user can type in; remove trailing whitespace / max characters allowed, etc.
        - Try to get it done by wednesday
    - Starting Wednesday:
        - Testing
        - User feedback (2 people each)
- Krishna and Niyas: 
    - Testing: unit tests and end to end
    - Starting Wednesday:
        - User feedback (2 people each)
- Lucas: 
    Refactoring code → the code we wrote, get rid of duplication, etc.
