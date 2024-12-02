# One HTML Page vs Multiple HTML Pages

## Context and Problem Statement
When building our web application, one of the key decisions we made during implementation after drawing our UI wireframe was deciding whether we would implement multiple separate HTML pages for each page of our application, or have one HTML page that changes dynamically depending on where the user is in the application. 

## Considered Options

Multiple/separate HTML pages:
- One page for Home.html for the home page of the application
- One page for View.html for viewing the note
- One page for Edit.html for editing the note
- One page for Create.html for creating a new note

One HTML page:
- One page that changes dynamically depending on whether the user is at the home page or creating/editing/viewing a note

## Decision Outcome
We decided that it would be simpler and allow us to work more modularly if we created separate pages for each page in our application, rather than having one page that changes dynamically. We ended up creating the following HTML pages: create.html, home.html, view.html, and edit.html.
