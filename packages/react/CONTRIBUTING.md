# Contributing

First off, thanks for taking some time to contribute! 🎉👍

This file will guide you through the local setup and contains the guidelines you will need
to follow to get your code merged.

## Install

```sh
# Clone the repo
git clone https://github.com/LedgerHQ/ui
# Install dependencies
yarn
```

## Guidelines

### Requirements

In order to get merged, a pull request must:

- Pass the linter (`yarn lint`)
- Pass the typechecker (`yarn typecheck`)

If you are using VSCode, you can use the `eslint` and `prettier` plugins to auto-format your code on save.

A git pre-commit hook is also active and should prevent commits that do not pass these checks.
To bypass the hook, add the `--no-verify` option when using git.

### Code practices

- Export your components and make them consumable from the root.

The components should be importable from `@ledgerhq/react-ui`, so do not forget to add export statements
in the `src/components/index.ts` file.

- Export required typescript types.

Types should also be importable (but not from root because of name conflicts!).

- If you are creating a new component you should write a related [storybook](https://https://storybook.js.org/) story.

- Avoid non-standard imports in the code (`.png`, `.svg`…).

The library is agnostic, it does not make any assumptions on the consumer setup and will not force the use of any kind of non-standard bundler.

- Avoid installing new packages unless necessary.

To keep the dependencies short and the size small.

## Maintenance

For package maintainers only.

### Release process

- Change the version in the package.json
- Make a git tag (and commit).

```sh
# Will build the files in /lib, copy the required files and create a suitable package.json.
yarn prerelease
# Will publish the package.
yarn release
```

## Local development

If you need to use the locally installed version of this package, you will need to perform the following steps.

```sh
## From the root of the monorepo:

# Build the icons. This is only needed once.
yarn icons build
# Build the react package. Run this every time you update the code.
yarn react prerelease
```

```sh
## From the repository that consumes @ledgerhq/react-ui:

# Replace [path/to/ui] with the relative path to the local ui repo.
yarn add [path/to/ui]/packages/react/lib
```
