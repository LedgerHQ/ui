import gaps from "../styles/system/gaps";
import styled, { StyledInterface, InterpolationFunction } from "styled-components";
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
    position?: string;
    maxHeight?: number;
  };

export const baseStyles: InterpolationFunction<unknown> = compose(
  flexbox,
  space,
  position,
  color,
  layout,
  overflow,
  gaps,
);

const proxyStyled = new Proxy(styled, {
  apply(target: typeof styled, thisArg, argumentsList: Parameters<typeof styled>) {
    return styled(target.apply(thisArg, argumentsList)(baseStyles));
  },
  get(target, property: keyof typeof styled) {
    return styled(target[property].apply(styled, [baseStyles]));
  },
});

export default <StyledInterface>proxyStyled;
