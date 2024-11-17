## Problem

Our CI/CD pipeline should include unit test automation for branches and pull requests. That way, we can have a suite of unit tests that would run on each git push command, as well as each pull request, in order to ensure our code modules work as expected as we incrementally improve our design.

## Considered Options

We considered a variety of unit test frameworks for our CI/CD pipeline, such as Jest, Ava, and Tape. 

-Jest is relatively lightweight, easy to set up, and compatible with ESLint. It also allows for coverage reporting and snapshot testing, which may be useful when testing changes to elements in a page.

-Ava is minimalistic in its design, maintains an isolated environment for each unit test, and allows parallel testing. It also enforces atomic testing, which is useful in ensuring good practices with our tests.

-Tape also allows parallel testing, is easy to extend, and the setup is straightforward. It does not require test runners, which would make it easier to write unit tests.

## Decision Outcome

After carefully considering each option, we decided to move forward with Jest as our unit test framework of choice. Due to time constraints, we prioritized ease of use and straightforward setup for our project, and one of the selling points for Jest is that it works out of the box. Additionally, its compatibility with ESLint would be highly useful for our needs and, while other testing frameworks may have more features, Jest is more than enough for our testing purpose while remaining relatively lightweight.
