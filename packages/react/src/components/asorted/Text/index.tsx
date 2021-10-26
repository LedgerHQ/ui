import React from "react";
import styled from "styled-components";
import {
  fontSize,
  fontWeight,
  textAlign,
  color,
  space,
  lineHeight,
  letterSpacing,
  system,
  SpaceProps,
  layout,
  LayoutProps,
} from "styled-system";
import fontFamily from "../../../styles/styled/fontFamily";
import { TextTypes } from "../../../styles/theme";

const uppercase = system({
  uppercase: {
    property: "textTransform",
    transform: (value) => (value ? "uppercase" : "none"),
  },
});

type FontFamilies =
  | "Inter|ExtraLight"
  | "Inter|Light"
  | "Inter|Regular"
  | "Inter|Medium"
  | "Inter|SemiBold"
  | "Inter|Bold"
  | "Inter|ExtraBold"
  | "Alpha|Medium";

export interface TextProps {
  fontFamily?: string;
  ff?: FontFamilies;
  fontSize?: number | string | TextTypes;
  textAlign?: string;
  textTransform?: string;
  color?: string;
  fontWeight?: string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  lineHeight?: string;
  bracket?: boolean;
  children: React.ReactNode;
}

export interface BaseTextProps extends SpaceProps, LayoutProps {
  fontFamily?: string;
  ff?: FontFamilies;
  fontSize?: number | string | TextTypes;
  textAlign?: string;
  color?: string;
  fontWeight?: string;
  lineHeight?: string;
  textTransform?: string;
  textOverflow?: string;
}

const Text = styled.span.attrs<BaseTextProps>((p: BaseTextProps) => ({
  color: p.color || "palette.neutral.c100",
}))<BaseTextProps>`
  ${uppercase};
  ${lineHeight};
  ${fontFamily};
  ${fontSize};
  ${textAlign};
  ${color};
  ${fontWeight};
  ${space};
  ${letterSpacing};
  ${layout}
  ${system({
    textOverflow: true,
  })}
  ${(p) => (p.textTransform ? `text-transform: ${p.textTransform};` : "")}
`;

export default Text;
