# Application Deployment with GitHub Pages

## Context and Problem Statement

Our project application is a static web app built with HTML, CSS, and JavaScript. Since it doesn’t require a JavaScript framework such as React or VueJS, we needed a simple, reliable, and free platform to host and deploy the app. This platform should allow TAs and our team to easily access, test, and interact with the application. Additionally, the deployment process should be automated as part of our CI/CD pipeline to ensure that changes are published whenever they are pushed to the repository.

## Considered Options

GitHub Pages:
- GitHub Pages provides free hosting for static apps and works well with GitHub
- Simple to set up and deploy
- Automates the deployment process with GitHub Actions, so the app is always updated whenever changes are pushed
- Also offers a public URL, making it easy for TAs and our team to test the app
- However, it only supports static hosting, so it is not desirable for complicated apps.

Netlify:
- Netlify comes with powerful CI/CD tools
- It even shows deploy previews for each commit without having to publish them to production, which is great for teams
- It supports advanced deployment pipelines
- However, it’s a bit more complicated to set up compared to GitHub Pages.

## Decision Outcome

We chose GitHub Pages for deploying our project application because it is simple to use, completely free, and integrates directly with our GitHub repository. Since our project is a static web application built with HTML, CSS, and JavaScript, GitHub Pages meets all our current needs without introducing unnecessary complexity. With GitHub Actions, the deployment process is fully automated. This way, the app is built and deployed every time we push changes to the main branch. The public URL provided by GitHub Pages allows TAs and team members to easily access and test the app.
