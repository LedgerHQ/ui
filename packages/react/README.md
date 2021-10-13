# `@ledgerhq/react-ui`

![build](https://github.com/LedgerHQ/ui/actions/workflows/react.yml/badge.svg)

#### Design and interface resources

This package contains [React](https://reactjs.org/) components and styles built on top of our design system and used internally at [Ledger](https://www.ledger.com/).

## Reference

[📚 The storybook is hosted here.](https://ledger-live-ui-react.vercel.app/)

## Installation

### Package

```sh
npm i @ledgerhq/react-ui
```

_If the `react` packages are not installed yet:_

```sh
npm i react react-dom
```

## Usage

### Provider

Before using the library components, the style provider must be imported and rendered once to provide the components with the right context.

```ts
import { StyleProvider } from "@ledgerhq/react-ui";

function Root({ children }) {
  // Selected theme palette can be either "dark" or "light".
  return <StyleProvider selectedPalette="light">{children}</StyleProvider>;
}
```

### Components

Import the components from `@ledgerhq/react-ui`.

```ts
import { Text, Flex, Logos } from "@ledgerhq/react-ui";

function Hello() {
  return (
    <Flex flexDirection="column" alignItems="center" rowGap={12} p={12}>
      <Text color="palette.neutral.c100">
        <Logos.LedgerLiveRegular />
      </Text>
      <Text type="h1" ff="Alpha|Medium">
        Hello, world!
      </Text>
    </Flex>
  );
}
```

### Fonts

Ledger fonts can be either imported or added manually to your project.
After picking a method do not forget to add the `fontsPath` property to the `StyleProvider` component!

```ts
// Create a global css font style that will import the required fonts based on the fontsPath prefix.
<StyleProvider fontsPath="assets/fonts">
```

#### Import

Using the import requires you to use a bundler to export and save the files to the target folder.

```js
import "@ledgerhq/react-ui/assets/fonts";
```

With webpack 5 the rule below will process the font files and save them in the `/assets/fonts` folder.

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

The `.woff2` font files are located in the `assets/fonts` folder.

## Minimal Working Example

```ts
import React from "react";
import ReactDOM from "react-dom";
import "@ledgerhq/react-ui/assets/fonts";
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
        <Text type="h1" ff="Alpha|Medium">
          Hello, world!
        </Text>
        <div>
          <Switch
            name="select-theme"
            checked={isLight}
            onChange={() => setPalette(() => (isLight ? "dark" : "light"))}
          />
        </div>
      </Flex>
    </StyleProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("react-root"));
```
