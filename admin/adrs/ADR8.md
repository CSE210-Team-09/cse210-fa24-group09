# Integrate JSDocs and Github Pages

## Context and Problem Statement
We want to integrate GitHub Pages with JSDoc and enable viewing our application after GitHub Pages is deployed. The issue we encountered was the absence of an `index.html` file, which is required by the GitHub Pages deployment action in the deployment folder.  

## Considered Options  
1. Add an `index.html` file inside the source folder and configure it to redirect to `source/html/home.html` after loading.  
2. Rename `home.html` and move it directly into the source folder.  

## Decision Outcome  
We decided to create an `index.html` file and configure it to redirect to `source/html/home.html`. The primary reason for this decision was our preference to keep all HTML files organized within the `html` folder. Additionally, the new `index.html` file can serve as a landing page, allowing users to be redirected either to the home page or to a create page in the future.
JSDoc creates the documentation in the docs folder inside source folder. And it can be viewed after deployment by using `/docs` at the end of the url link. 
