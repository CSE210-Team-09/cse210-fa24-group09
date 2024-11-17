## Current Pipeline

### Linting via automation and local development:
Our current pipeline consists of a linting procedure which is done by eslint named `CI - Linter` on github actions. The procedure is activated by github actions on all branches whenever on `push` and `pull request` to `dev` and `main`. More specifically, we specified eslint with the linter configurations from **both** google and eslint:recommended. A complete set of linting/style checks can be found [here](https://github.com/google/eslint-config-google/blob/master/index.js). There is also a pipeline folder located at the root of the repository which locates the config file of the linting procedure, which overrides several rules. Some of which are jsdocs to warning and unused variable as warnings instead of errors. This is because we forsee that we will have the functions and the jsdocs written out before the body of the javascript file is written out. Jsdocs are also warning because we don't want people be stuck on writing out documentation for every function they use (when they push), in the case that their version of the code isn't used. Linting rules can be revised further during development. For developers, they should run `npx eslint --config ./pipeline/.eslintrc.yml ./source/js` to see warning and errors if they want to see their styling errors. Adding `--fix` tag while running eslint locally will fix most errors.  An example of it working is ![code linting](./linter_example/linter_code_example.png) ![linting output](./linter_example/linter_output_example.png), where we can see that `foo` has various errors, and `hello` fixes all of said errors/warnings. By default, the github action is only looking to take javascript files in ./source/js.


### Code Quality via Tool
Currently, our pipeline checks code quality via the tool Codacy through the `Codacy Analysis CLI` workflow. This workflow is triggered when pushes are made to the `main`, `dev`, and `cicd_codequalitytool` and pull requests are made to `main` and `dev`. Upon activation of the workflow, Codacy checks out the specific branch or commit that triggered the workflow and performs a static code analysis of the files for that specific branch/commit. Depending on the Codacy configuration, Codacy will identify issues in several areas like code style violations, security vulnerabilities, overly complex code, and duplicated code.


### Code Quality via human review
At present we have implemented a ruleset in GitHub that restricts the push and pull requests to main and dev branches. These branches are protected from deletion and require all commits be made to a non-target branch and submitted via a pull request before they can be merged. Also requires two approving reviews before a pull request can be merged.

### Documentation generation via automation:

The "Generate JSDoc Documentation" GitHub Action automates the creation of HTML documentation from JavaScript code annotations using the JSDoc tool. Triggered by events such as pushes to specified branches (currently main, dev, and cicd_documentation) or pull requests to main and dev, this workflow streamlines documentation processes. Upon activation, the action installs Node.js and JSDoc, then generates documentation from JavaScript files located in the test folder, which is planned to be updated to the actual script folder. The generated documentation is placed in an "out" folder and is presently uploaded as an artifact within the GitHub workflow.



### Unit Tests via automation

The “Unit Tests” GitHub Action automates unit tests with Jest as the test framework. It is triggered by pushes to branches (such as main and dev), as well as pull requests to main and dev. Upon activation, this action checks out the branch, installs Jest, and runs a script to run every Jest unit test found in the repository, namely those found in the test/ folder. Once the tests have been completed, the results are displayed in the action page, indicating pass or failure. Currently, Jest interprets code as Common JS instead of ES6, which is currently not consistent with our other CI/CD workflows which assume ES6 formatting. As a result, further discussion must be made to determine which format the project must follow in order to avoid incorrect formatting issues.

### End to End testing via automation

This CI/CD pipeline for E2E testing is implemented using GitHub Actions to automate the validation of application functionality. It is triggered by pushes or pull requests to specific branches (main, dev, and cicd_e2e_testing). The pipeline begins by checking out the repository and setting up a Node.js environment. It then installs project dependencies(puppeteer).The E2E tests are executed using a designated script (node test/source.js). Additionally, a failure annotation is added to notify developers about issues, ensuring swift debugging. This workflow ensures consistent testing, integration with the development process, and clear visibility of test results.

### GithubPages Deployment via automation

Our application is a static web app built with HTML, CSS, and JavaScript. Since it doesn’t require a JavaScript framework like React or VueJS, we needed a simple, reliable, and free platform to host and deploy the app. GitHub Pages allows TAs and our team to easily access, test, and interact with the application. The workflow, defined in .github/workflows/githubpage.yml, automates the deployment process. It triggers on pushes to the main or dev branches or pull requests targeting main. The pipeline consists of two main steps: First, the repository is checked out using actions/checkout@v4, and files are packaged as an artifact using actions/upload-pages-artifact@v3, with the artifact stored in the ./ directory. Then, in the deploy step, the artifact is pulled and deployed to GitHub Pages using actions/deploy-pages@v4. Once deployed, the app is accessible via the configured GitHub Pages URL (https://cse210-team-09.github.io/cse210-fa24-group09/).

## Fixes

Currently only ESlint is present inside the package dependencies and rest of the packages (eg: Jest, JSDoc and Puppeteer) are installed globally in the runner. However, we would want to have the other packages also added into the package dependencies. An Issue has been created to fix this and will be resolved in the upcoming sprint. Basically Github actions work but we didn’t specify locally how to run most packages. 

Another fix that we would want is to configure Codacy based on set rules that we agree upon so that the report we get back is more relevant to us, as currently Codacy analyzes the files based on a default set of rules. We also want to configure Codacy so that it ignores markdown files in the repo, as we want it to analyze the quality of only our code files. 

Originally, we had a file with a single sum function as well as a test file for it to verify that Jest works as expected. This test file was written in Common JS format, instead of ES6 import/export format, because Jest assumes the Common JS format by default. The unit test in the file passes successfully, but pushing it to the dev branch caused issues with Codacy due to the format, expecting ES6 import/export as format. To fix this, we removed the sum file and its corresponding test file, leaving only the “test.js” file currently in the test/ folder, which contains a single unit test that always passes inside of it. Since there is no need of importing modules due to the test being in the same file, Codacy passes as expected.

## Future
### Linting
For linting, we are currently only linting for javascript files in the source/js directory. In the future, we should also look for formatting inconsistencies in css and html files as well. This likely can be done with ESlint with prettier plugin, with a prettierc.yml file in the root of the directory and have all developers use use the prettier vs code extension. Alternatively, we can also use a prettier ESLint plugin.

### Codacy
Currently, Codacy assumes that we are using ES6 syntax rules, when some of our code is written in CommonJS due to Jest. Thus, in the future we want to decide if we are going to use ES6 or CommonJS when writing our application, and configure our tools to follow the appropriate syntax.

### Documentation
For the code documentation using JSDoc tool, currently the documentation website generated is uploaded as an artifact within the GitHub workflow. Future enhancements will shift from artifact uploading to integrating a documentation link directly on a dedicated GitHub Page.

### E2E 
For E2E testing using puppeteer, currently the testing is done on a simple test file to check if the tool is working. It should be implemented on the web pages after writing a working code. The testing must be modified based on the working model to check if it is exactly working as required. The workflow is triggered only for pull and push requests to main and dev, need to enable it for feature branches.

### Github Pages

For deployment using github pages, currently, the workflow is triggered only for pull requests to the main branch, but we plan to enable deployment for pull requests to the dev branch as well. The reason for this is to allow the team to test and validate changes in a staging environment before merging them into main. This means that any potential issues are caught early, and it improves the overall stability of the main branch.
