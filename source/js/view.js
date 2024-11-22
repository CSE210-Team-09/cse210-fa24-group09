// Get the notes containers
const codeContainer = document.getElementById('code-container');
const commentContainer = document.getElementById('comment-container');
const titleContainer = document.getElementById('title-container');

// Dummy notes array
/**
 * @type {Array<{id: string, title: string, code: string, comment: string}>}
 * Array of dummy notes to simulate stored data.
 */
const dummyNotes = [
  {
    id: 1,
    title: 'JavaScript Basics',
    code: `function greet(name) {
    return 'Hello, ' + name + '!';
}`,
    comment: 'This code defines a function to greet a user by their name.',
  },
  {
    id: 2,
    title: 'CSS Flexbox Example',
    code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
}`,
    comment: 'This snippet shows how to center elements using CSS Flexbox.',
  },
  {
    id: 3,
    title: 'Implementation of Graph in C++',
    code: `// C++ Program to Implement a Graph Using Adjacency Matrix
#include <iostream>
#include <vector>
using namespace std;

class Graph {
    // Adjacency matrix to store graph edges
    vector<vector<int> > adj_matrix;

public:
    // Constructor to initialize the graph with 'n' vertices
    Graph(int n)
    {
        adj_matrix
            = vector<vector<int> >(n, vector<int>(n, 0));
    }

    // Function to add an edge between vertices 'u' and 'v'
    // of the graph
    void add_edge(int u, int v)
    {
        // Set edge from u to v
        adj_matrix[u][v] = 1;
        // Set edge from v to u (for undirected graph)
        adj_matrix[v][u] = 1;
    }

    // Function to print the adjacency matrix representation
    // of the graph
    void print()
    {
        // Get the number of vertices
        cout << "Adjacency Matrix for the Graph: " << endl;
        int n = adj_matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << adj_matrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main()
{
    // Number of vertices
    int n = 4;
    // Create a graph with 4 vertices
    Graph g(n);

    // Adding the specified edges in the graph
    g.add_edge(0, 1);
    g.add_edge(0, 2);
    g.add_edge(1, 3);
    g.add_edge(2, 3);

    // Print the adjacency matrix representation of the
    // graph
    g.print();
    return 0;
}
    class Graph {
    // Adjacency matrix to store graph edges
    vector<vector<int> > adj_matrix;

public:
    // Constructor to initialize the graph with 'n' vertices
    Graph(int n)
    {
        adj_matrix
            = vector<vector<int> >(n, vector<int>(n, 0));
    }

    // Function to add an edge between vertices 'u' and 'v'
    // of the graph
    void add_edge(int u, int v)
    {
        // Set edge from u to v
        adj_matrix[u][v] = 1;
        // Set edge from v to u (for undirected graph)
        adj_matrix[v][u] = 1;
    }

    // Function to print the adjacency matrix representation
    // of the graph
    void print()
    {
        // Get the number of vertices
        cout << "Adjacency Matrix for the Graph: " << endl;
        int n = adj_matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << adj_matrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main()
{
    // Number of vertices
    int n = 4;
    // Create a graph with 4 vertices
    Graph g(n);

    // Adding the specified edges in the graph
    g.add_edge(0, 1);
    g.add_edge(0, 2);
    g.add_edge(1, 3);
    g.add_edge(2, 3);

    // Print the adjacency matrix representation of the
    // graph
    g.print();
    return 0;
}
    `,
    comment: 'This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox. This snippet shows how to center elements using CSS Flexbox.',
  },
];

// Store the dummy notes in local storage
/**
 * Stores the dummy notes in the browser's local storage under the key "notes".
 */
localStorage.setItem('notes', JSON.stringify(dummyNotes));

/**
 * Retrieves the value of the "id" query parameter from the current URL.
 * 
 * @returns {string|null} The value of the "id" query parameter as a string, or `null` if not found.
 */
function getQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log(urlParams.get("id"));
  return urlParams.get("id");
}

/**
 * Parses the "id" query parameter from the URL into an integer.
 * If the query parameter is not present or cannot be parsed as an integer, the value will be `NaN`.
 * 
 * @type {number} The parsed ID from the URL.
 */
const id = parseInt(getQueryParam(), 10); // getQueryParam();
console.log(typeof id);

// Fetch notes from local storage
/**
 * Loads a note from local storage based on its ID and displays it on the page.
 *
 * @param {number} noteId - The ID of the note to load.
 */
function loadNoteById(noteId) {
  // Retrieve all notes from local storage
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  codeContainer.innerHTML = ''; // Clear the container
  commentContainer.innerHTML = ''; // Clear the container
  titleContainer.innerHTML = ''; // Clear the container

  // Find the note with the matching ID
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    // Display an error message if the note is not found
    titleContainer.innerHTML = `<h2>Note not found.</h2>`;
    codeContainer.innerHTML = `<p>Note not found.</p>`;
    return;
  }

  // Populate the containers with the note's content
  titleContainer.innerHTML = `<h2>${note.title}</h2>`;
  codeContainer.innerHTML = `<p>${note.code}</p>`;
  commentContainer.innerHTML = `<p>${note.comment}</p>`;
}

// Go back home
/**
 * Redirects the user to the home page.
 */
function goBackHome() {
  window.location.href = '../html/home.html';
}

// Edit note
/**
 * Redirects the user to the edit page for the note.
 */
function editNote() {
  window.location.href = '../html/edit.html';
}

// Load the note when the page loads
loadNoteById(id);
