import gaps from "../styles/system/gaps";
// import styled, { StyledInterface, AnyStyledComponent } from "styled-components";
import {
  compose,
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
  position,
  PositionProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  overflow,
  OverflowProps,
} from "styled-system";

/*
function baseStyled(tag: AnyStyledComponent) {
  const func = (t: string | Array<string> = "", ...propFunctions: any) => {
    return styled(tag)(
      compose(flexbox, space, position, color, layout, overflow, gaps),
      Array.isArray(t) && Array.isArray(propFunctions)
        ? (p) =>
            t
              .map(
                (t, i) =>
                  `${t}${
                    typeof propFunctions[i] === "function" ? propFunctions[i](p) : propFunctions[i]
                  }`,
              )
              .join("")
        : t,
    );
  };

  func.attrs =
    (args: any) =>
    (t: string | Array<string> = "", ...propFunctions: any) => {
      return styled(tag).attrs(args)(
        compose(flexbox, space, position, color, layout, overflow, gaps),
        Array.isArray(t) && Array.isArray(propFunctions)
          ? (p) =>
              t
                .map(
                  (t, i) =>
                    `${t}${
                      typeof propFunctions[i] === "function"
                        ? propFunctions[i](p)
                        : propFunctions[i]
                    }`,
                )
                .join("")
          : t,
      );
    };

  return func;
}

Object.keys(styled).forEach((htmlTag: string) => {
  Object.defineProperty(baseStyled, htmlTag, {
    value: baseStyled(<AnyStyledComponent>htmlTag),
  });
});

export default <StyledInterface>baseStyled;

*/

const baseStyles = compose(flexbox, space, position, color, layout, overflow, gaps);

export default baseStyles;

export interface BaseStyleProps
  extends SpaceProps,
    FlexboxProps,
    PositionProps,
    ColorProps,
    LayoutProps,
    OverflowProps {
  columnGap?: string | number;
  rowGap?: string | number;
  color?: string;
  display?: string;
}
