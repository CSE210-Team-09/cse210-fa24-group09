# Team Meeting Notes - Sprint 1 Review Meeting

**Date: Sunday 11.17.2024**\
**Time: 1:30 pm - 2:00 pm**\
**Meeting Format: In-Person (CSE Basement)**

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
- What was accomplished:
    - ESLint github action and every dev can run it locally by doing npm install
    - ESLint default rules are based on google and what ESLint recommends
    - Set that we should code in snake case, so that we can differentiate between our functions and Javascript’s functions that are written in camel case
    - Currently, ESLint only runs on Javascript files in /src/js files
- Future work:
    - In the future we want to run ESLint on html and css files as well

Jay:
- What was accomplisehd:
    - Configured Codacy via the desktop website to set some default rules for how we want our code to be analyzed and evaluated

Anna:
- What was accomplished:
    - Codacy integration in the github action workflow that will basically do a static code analysis on the files in the branch/commit that triggered the workflow and it’ll return warnings/errors based on the default rules set
- Future work:
    - In the future we want to tailor the rules better to match our application (deciciding between following CommonJS vs ES6)
    - We also want to make the config file appropriately exclude non-code files from being analyzed (like MD, PDF, etc) so that the workflow takes less time to run
        - Make dev the default branch in Codacy instead of main so that the exclusion list in the config file in the dev branch will be followed

Brandon:
- What was accomplished:
    - Selected Jest out of different testing frameworks looked at
        - Easy to set up and not difficult to use
    - Right now runs for dev and main and feature branches
- Future work:
    - Figure out possible configuration with ES6 because right now by default it runs with CommonJS syntax/configuration
    - We also want to add Jest as one of the dependencies so that it is automatically installed

Juhak:
- What was accomplished:
    - Right now our code is all static HTML, JS, CSS so Github is a good fit for deployment
    - Workflow has two actions: 1. make artifact 2. deploy artifact to github
    - Currently it’s only run on pull request to main
- Future work:
    - We want it to run on pull request to dev as well
    - We also want to deploy the generated JSDocs on the github page as well

Krishna:
- What was accomplished:
    - Simulated E2E testing to test the functionality of Puppetteer using the given test files
- Future work:
    - Once we have development on application features, will implement E2E testing to test these actual features because rn it’s just simulated using the dummy test files
    - Right now the workflow is only on dev and main, in the future also add it to feature branches
    - We also want to add Puppetteer as one of the package dependencies so that it’s automatically installed

Niyas:
- What was accomplished:
    - Documentation generated via JSDocs
    - Makes website based on comments written inside code file
    - Triggered whenever pull request to dev and main
    - Right now the artifcat is uploaded to github workflow
- Future work:
    - We want to link the doc website to the github page
    - We also want to add JSDocs as one of the package dependencies so that it’s automatically installed
