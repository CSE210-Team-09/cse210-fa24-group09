# Code Quality Tool Choice

## Context and Problem Statement

We want to have an easy way of testing for code quality in our CI/CD pipeline. Since there are 7 of us working in a software development team with relatively little experience, we want to uphold the quality of work. There can be many different coding conventions and personal coding styles so using a code quality tool will attempt to limit the variability.

## Considered Options

We considered mainly Codacy and CodeClimate due to their popularity as well as common use in industry. There were pros and cons for both tools that we looked at.

Codacy:
- Easy and intuitive to integrate and maintain with Github repository
- Has automated security checks and coding style enforcement
- Comes with a heavy UI on the website
- Easy to change constraints and leniency for testing

CodeClimate:
- Similar set up complexity to Codacy and integrates well with Github
- Has a well known maintainability index and test coverage tracking
- Has fewer checks than Codacy
- More complicated to set up and use all features will take time to learn

## Decision Outcome

We decided to go forward with Codacy over CodeClimate. This decision was made through our research which showed that getting Codacy integrated with Github and learning the features would be simpler. The capabilities of both tools were similar with Codacy offering a slightly greater range of features.
