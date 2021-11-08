# `@ledgerhq/react-ui`

[![build](https://github.com/LedgerHQ/ui/actions/workflows/react.yml/badge.svg)](https://github.com/LedgerHQ/ui/actions/workflows/react.yml)
[![npm](https://img.shields.io/npm/v/@ledgerhq/react-ui)](https://www.npmjs.com/package/@ledgerhq/react-ui)
[![storybook](https://img.shields.io/badge/Storybook-📚-61DBFB)](https://ledger-live-ui-react.vercel.app)

### Design and interface resources for React

#### This package contains [React](https://reactjs.org/) components and styles built on top of our design system and used internally at [Ledger](https://www.ledger.com/).

## Reference

[📚 The storybook is hosted here.](https://ledger-live-ui-react.vercel.app/)

## Installation

### Package

```sh
npm i @ledgerhq/react-ui
```

_And if the React packages are not installed:_

```sh
npm i react react-dom
```

## Usage

### Provider

Before using the library components, the style provider must be imported and rendered once to provide the components with the right context.

```tsx
import { StyleProvider } from "@ledgerhq/react-ui";

function Root({ children }) {
  // Selected theme palette can be either "dark" or "light".
  return <StyleProvider selectedPalette="light">{children}</StyleProvider>;
}
```

### Components

Import the components from `@ledgerhq/react-ui`.

```tsx
import { Text, Flex, Logos } from "@ledgerhq/react-ui";

function Hello() {
  return (
    <Flex flexDirection="column" alignItems="center" rowGap={12} p={12}>
      <Text color="palette.neutral.c100">
        <Logos.LedgerLiveRegular />
      </Text>
      <Text variant="h1">Hello, world!</Text>
    </Flex>
  );
}
```

### Fonts (optional but recommended)

Ledger fonts can be either imported or added manually to your project.

After picking a method add the `fontsPath` property to the `StyleProvider` component to automatically generate
`@font-face` blocks and register the `Inter` and `Alpha` font families.

```tsx
// Create a global css font style that will import the required fonts based on the fontsPath prefix.
<StyleProvider fontsPath="assets/fonts">
```

#### Import

Using the import requires you to use a bundler to export and save the files to the target folder.

```js
import "@ledgerhq/react-ui/assets/fonts";
```

With webpack 5 the rule below will process the font files and save them in the `src/assets/fonts` folder.

```js
{
  test: /\.woff2/,
  type: "asset/resource",
  generator: {
    filename: "assets/fonts/[name].woff2",
  },
},
```

#### Manually

The `.woff2` font files are located in the `src/assets/fonts` folder.
You can host them yourself, use a CDN (see below) or process them with a bundler by importing them.

The important thing is to register fonts by adding `@font-face` blocks for the `Inter` and `Alpha` font families.

For instance using the `unpkg.com` CDN:

```css
@font-face {
  font-family: "Alpha";
  src: url("https://unpkg.com/@ledgerhq/react-ui/assets/fonts/HMAlphaMono-Medium.woff2") format("woff2");
  font-weight: 100;
  font-style: normal;
}
```

## Minimal Working Example

[🌍 Hosted here.](https://codesandbox.io/s/ledger-live-react-ui-forked-1tvm7?file=/src/App.js)

_Assuming dependencies, webpack and babel (or equivalents) are installed and configured._

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "@ledgerhq/react-ui/assets/fonts"; // all fonts are consumed by the bundler and outputted to /assets
import { StyleProvider, Text, Logos, Flex, Switch } from "@ledgerhq/react-ui";

function Root() {
  const [palette, setPalette] = React.useState("light");
  const isLight = palette === "light";

  return (
    <StyleProvider fontsPath="assets" selectedPalette={palette}>
      <Flex flexDirection="column" alignItems="center" rowGap={12} p={12}>
        <Text color="palette.neutral.c100">
          <Logos.LedgerLiveRegular />
        </Text>
        <Text variant="h1">Hello, world!</Text>
        <Switch
          name="select-theme"
          checked={isLight}
          onChange={() => setPalette(() => (isLight ? "dark" : "light"))}
        />
      </Flex>
    </StyleProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("react-root"));
```

<img width="300" alt="exapmple" src="https://user-images.githubusercontent.com/86958797/137143696-6dffdb16-83fa-4a4e-9bd0-a76fde4f82be.gif" />

### Contributing

Check the [contributing guide here](https://github.com/LedgerHQ/ui/blob/main/packages/react/CONTRIBUTING.md).
