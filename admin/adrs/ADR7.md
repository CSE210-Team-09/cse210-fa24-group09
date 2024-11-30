# Data Handling

## Context and Problem Statement
Our journaling application requires a persistent storage solution to save user-created journal entries, which include structured data like IDs, titles, comments, code snippets, and timestamps. The storage mechanism should meet the following requirements:


## Considered Options
| Feature/Requirement                 | localStorage                          | IndexedDB           |
| ----------------------------------- | ------------------------------------- | ------------------- |
| **Storage Limit**                   | ~5 to 10 MB (varies between browsers) | Browser-defined     |
| **Ease of Implementation**          | High                                  | Low                 |
| **Performance for Reads**           | Now slow for small data               | Fast for large data |
| **API Complexity**                  | Simple                                | Complex             |
| **Advanced Querying**               | Not supported                         | Fully supported     |
| **Persistence**                     | Across sessions                       | Across sessions     |
| **Suitability for Structured Data** | Can only store strings                | Excellent           |


- Client-Side Persistence: The data should remain accessible across user sessions without requiring a backend service.
- Scalability for Growth: The design should allow for future enhancements, such as implementing search or filtering capabilities, without significant refactoring.
- Modularity: The storage API should be astracted away from the other pages such that
- Given these requirements, we explored several client-side storage technologies, including localStorage, IndexedDB, and Cookies.

## Decision Outcome
We chose localStorage ultimately since for the first release, all we really need is a straightforward CRUD operations for structured data, which can be supported and persisted by localStorage as long as the data object is stringified. IndexedDB's complexity is unnecessary for the current scope, and would likely add in a lot more dependencies. localStorage might seem like it has low amount of storage limit but considering a 100 line .md file only takes up 6KB, 5MB will roughly be 800 notes. This aligns with our purpose for now and we will monitor for any performance, security, or loading issues.

What we will aim to do though is to create a layer of abstraction on the data fetching process so that developers on other pages like home or add don't need to worry about the implementation of the localStorage or data structure. All they need to do is call something like `api.get_note(id)` or `api.create_note(name, content)` and the api will take care of how everything will work. This makes is so that even if we do move to another option like IndexedDB in the future, it gives us an easy pathway into doing so.
