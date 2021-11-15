import gaps from "../styles/system/gaps";
import styled, {
  StyledInterface,
  AnyStyledComponent,
  CSSObject,
  InterpolationFunction,
  Interpolation,
} from "styled-components";
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

type styledFnArgs = [
  first: CSSObject | InterpolationFunction<any> | TemplateStringsArray,
  ...rest: Interpolation<any>[]
];

function styledFunc(tag: AnyStyledComponent) {
  const func = (...args: any) =>
    styled(tag).apply(styled, <styledFnArgs>(
      (<unknown>[...args, compose(flexbox, space, position, color, layout, overflow, gaps)])
    ));

  func.attrs =
    (attrs: any) =>
    (...args: any) =>
      styled(tag)
        .attrs(attrs)
        .apply(styled, <styledFnArgs>(
          (<unknown>[...args, compose(flexbox, space, position, color, layout, overflow, gaps)])
        ));

  return func;
}

Object.keys(styled).forEach((htmlTag: string) => {
  Object.defineProperty(styledFunc, htmlTag, {
    value: styledFunc(<AnyStyledComponent>htmlTag),
  });
});

const wrappedStyled: unknown = styledFunc;

export default <StyledInterface>wrappedStyled;

export const baseStyles = compose(flexbox, space, position, color, layout, overflow, gaps);

export type BaseStyledProps = SpaceProps &
  FlexboxProps &
  PositionProps &
  ColorProps &
  LayoutProps &
  OverflowProps & {
    columnGap?: string | number;
    rowGap?: string | number;
    color?: string;
    display?: string;
  };
