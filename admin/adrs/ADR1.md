## Problem

Our CI/CD pipeline should include a linting and style checker so that devs can work on the project together

## Considered Options

We considered other options like JSLint because it has a very structured ruleset so we don’t need to necessarily define rulesets and can just follow them. Another option we can choose is prettier which has a lot of customization options and has built in support with editors like vscode to format on save. ESlint is also another option since it has a large amount of plugins that can support how it lints. ESlint has plugins to configure snake_case and more customizable options like prettier plugins. ESlint also has easily configurable rules and preset rules like recommended, google, and airbnb


## Decision Outcome

We ultimately decided to use ESLint because of the simplicity of the setup and out of the box functions. While we are using an older version of ESLint, it allows us to easily extend Google’s rules for javascript code in combination with our own customizations on top of it. Additionally, if we find rules that we find incompatible or need fixes, we can always add them easily through the config files.


