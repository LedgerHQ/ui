import React from "react";
import styled from "styled-components";
import baseStyles, { BaseStyleProps } from "../../baseStyled";
import {
  compose,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  system,
} from "styled-system";
import fontFamily from "../../../styles/styled/fontFamily";
import { TextVariants } from "../../../styles/theme";
import { textVariantStyle } from "./styles";

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
  fontSize?: number | string | TextVariants;
  variant?: TextVariants;
  textAlign?: string;
  textTransform?: string;
  color?: string;
  fontWeight?: string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  lineHeight?: string;
  children: React.ReactNode;
}

export interface BaseTextProps extends BaseStyleProps {
  fontFamily?: string;
  ff?: FontFamilies;
  fontSize?: number | string | TextVariants;
  variant?: TextVariants;
  textAlign?: string;
  color?: string;
  fontWeight?: string;
  lineHeight?: string;
  textTransform?: string;
  textOverflow?: string;
}

const Text = styled.span.attrs<BaseTextProps>(
  ({ variant = "body", fontSize, color }: BaseTextProps) => ({
    fontSize: fontSize ? fontSize : variant,
    color: color || "palette.neutral.c100",
  }),
)<BaseTextProps>`
  font-weight: 500;
  ${(p) => textVariantStyle[p.variant || "body"]}
  ${compose(
    baseStyles,
    uppercase,
    lineHeight,
    fontFamily,
    fontSize,
    textAlign,
    fontWeight,
    letterSpacing,
    system({
      textOverflow: true,
    }),
  )}
  ${(p) => (p.textTransform ? `text-transform: ${p.textTransform};` : "")}
`;

export default Text;
