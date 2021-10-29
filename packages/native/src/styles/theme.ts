export const space = [0, 2, 4, 8, 12, 14, 16, 24, 32, 40, 48, 64, 80, 96, 120];

export type TextVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "large"
  | "body"
  | "bodyLineHeight"
  | "paragraph"
  | "paragraphLineHeight"
  | "small"
  | "subtitle"
  | "tiny";

export type ThemeScale<Type, Aliases extends string> = Array<Type> &
  Record<Aliases, Type>;

export const fontSizes = [10, 11, 12, 13, 14, 16, 18, 24, 28] as ThemeScale<
  number,
  TextVariants
>;

[
  fontSizes.tiny,
  fontSizes.subtitle,
  fontSizes.small,
  fontSizes.paragraph,
  fontSizes.body,
  fontSizes.large,
  fontSizes.h3,
  fontSizes.h2,
  fontSizes.h1,
] = fontSizes;
fontSizes.bodyLineHeight = fontSizes.body;
fontSizes.paragraphLineHeight = fontSizes.paragraph;
fontSizes.h4 = fontSizes.h3;

export const radii = [0, 4, 8];
export const zIndexes = [-1, 0, 1, 9, 10, 90, 100, 900, 1000];

// @Rebrand remove this
const colors = {
  transparent: "transparent",
  pearl: "#ff0000",
  alertRed: "#ea2e49",
  warning: "#f57f17",
  black: "#000000",
  dark: "#142533",
  separator: "#aaaaaa",
  fog: "#d8d8d8",
  gold: "#d6ad42",
  graphite: "#767676",
  grey: "#999999",
  identity: "#41ccb4",
  lightFog: "#eeeeee",
  sliderGrey: "#F0EFF1",
  lightGraphite: "#fafafa",
  lightGrey: "#f9f9f9",
  starYellow: "#FFD24A",
  orange: "#ffa726",
  positiveGreen: "rgba(102, 190, 84, 1)",
  greenPill: "#41ccb4",
  smoke: "#666666",
  wallet: "#6490f1",
  blueTransparentBackground: "rgba(100, 144, 241, 0.15)",
  pillActiveBackground: "rgba(100, 144, 241, 0.1)",
  lightGreen: "rgba(102, 190, 84, 0.1)",
  lightRed: "rgba(234, 46, 73, 0.1)",
  lightWarning: "rgba(245, 127, 23, 0.1)",
  white: "#ffffff",
  experimentalBlue: "#165edb",
};

// prettier-ignore
const exportedColors = colors;

export { exportedColors as colors };

export type Theme = {
  sizes: {
    topBarHeight: number;
    sideBarWidth: number;
  };
  radii: number[];
  fontSizes: number[];
  space: number[];
  colors: Record<string, any>;
  zIndexes: number[];
};

const theme: Theme = {
  sizes: {
    topBarHeight: 58,
    sideBarWidth: 230,
  },
  radii,
  fontSizes,
  space,
  colors,
  zIndexes,
};

export default theme;
