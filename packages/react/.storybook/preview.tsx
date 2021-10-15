import React from "react";
import LiveStyleSheetManager from "../src/styles/LiveStyleSheetManager";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../src/styles";
import { palettes, ThemeNames } from "@ledger-hq/ui-shared";

type Props = {
  children: React.ReactNode;
  selectedPalette: ThemeNames;
};

const StyleProvider = ({ children, selectedPalette }: Props) => {
  const theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      palette: palettes[selectedPalette],
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export const decorators = [
  (Story, { globals }) => {
    const backgrounds = globals?.backgrounds ?? {};
    const theme = backgrounds?.value === "#1C1D1F" ? "dark" : "light";
    return (
      <LiveStyleSheetManager>
        <StyleProvider selectedPalette={theme}>
          <Story />
        </StyleProvider>
      </LiveStyleSheetManager>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#FFFFFF",
      },
      {
        name: "dark",
        value: "#1C1D1F",
      },
    ],
  },
};
