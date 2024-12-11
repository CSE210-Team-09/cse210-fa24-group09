# Use of Jest-Environment-JSDom for Jest

## Context and Problem Statement
By default, Jest utilizes Node for their test environment, which is not compatible with browser UI testing. In one of their latest updates, Jest separated their JSDom environment capabilities to ensure the Jest package remained lightweight. In order to utilize Jest for unit testing with UI behavior in a page, the JS environment for Jest is needed.

## Considered Options
Per the Jest documentation, to restore the JSDom environment for Jest, the Jest-Environment_JSDom package must be installed separately.

## Decision Outcome
The Jest-Environment-JSDom package will be installed to ensure Jest can be used for unit testing.