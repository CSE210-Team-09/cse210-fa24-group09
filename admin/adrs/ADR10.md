# Refactoring of JS Files

## Context and Problem Statement
When building our application, each team was responsible for different html/js/css pages. Therefore, the naming of the html elements that should be the same across pages (like id of the title container), should be the same. There is also a high amount of duplicate code, such as similar funciton of loading the note from the data API and populating the containers on the screen.

## Considered Options
We considered refactoring the pages by having each group refactor their own code and talk about similar functionalities. We also considered the option of having a single person refactor the majority of the code based on common functionalities.

## Decision Outcome
We decided to have a single person look through the the js files and list the common functinalities that exist between them. Based on the duplicate functionalities, we decided to create a `util.js` that will contain the common functionalities and have each of the pages refactor their code based on the shared, but now defined set of functionalities.
