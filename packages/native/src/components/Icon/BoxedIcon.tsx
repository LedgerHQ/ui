import React from "react";
import styled from "styled-components/native";
import Flex from "../Layout/Flex";

export const DEFAULT_BOX_SIZE = 40;
export const DEFAULT_ICON_SIZE = 16;
export const DEFAULT_BADGE_SIZE = 20;

// const getTopRightSquareClippedPolygon = (
//   boxSize: number,
//   rectangleSize: number
// ) => {
//   // clipping path that hides top right square of size `${rectangleSize}px`
//   const diff = boxSize - rectangleSize;
//   return `polygon(0 0, 0 0, 0 0, ${diff}px 0, ${diff}px ${rectangleSize}px, 100% ${rectangleSize}px, 100% 100%, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 100%)`;
// };

const Container = styled(Flex).attrs((p: { size: number }) => ({
  heigth: p.size,
  width: p.size,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "visible",
}))<{ size: number }>``;

const IconBoxBackground = styled(Flex)<{ size: number; hasBadge: boolean }>`
  position: absolute;
  height: ${(p) => p.size}px;
  width: ${(p) => p.size}px;
  border-radius: ${(p) => p.theme.radii[2]}px;
`;

const BadgeContainer = styled.View<{ badgeSize: number }>`
  position: absolute;
  overflow: visible;
  ${(p) => `
    top: -${p.badgeSize / 2 - 2}px;
    right: -${p.badgeSize / 2 - 2}px;
    height: ${p.badgeSize}px;
    width: ${p.badgeSize}px;`}
`;

export type IconProps = {
  size?: number;
  color?: string;
};

export type IconBoxProps = {
  /**
   * Component that takes `{size?: number; color?: string}` as props. Will be rendered at the top right with the size provided in `badgeSize` or a default size.
   */
  Badge?: React.ComponentType<IconProps>;
  /**
   * Color of the border
   */
  borderColor?: string;
  /**
   * Badge color, will be applied to the component provided in the `Badge` prop
   */
  badgeColor?: string;
  /**
   * Badge size, will be applied to the component provided in the `Badge` prop
   */
  badgeSize?: number;
  children?: JSX.Element;
  /**
   * Box size for preview
   */
  size?: number;
};

export type BoxedIconProps = IconBoxProps & {
  /**
   * Component that takes `{size?: number; color?: string}` as props. Will be rendered at the top right with the size provided in `iconSize` or a default size.
   */
  Icon: React.ComponentType<IconProps> | ((props: IconProps) => JSX.Element);
  /**
   * Icon size, will be applied to the component provided in the `Icon` prop
   */
  iconSize?: number;
  /**
   * Icon color, will be applied to the component provided in the `Icon` prop
   */
  iconColor?: string;
};

export const IconBox = ({
  Badge,
  size = DEFAULT_BOX_SIZE,
  children,
  borderColor = "neutral.c40",
  badgeColor,
  badgeSize = DEFAULT_BADGE_SIZE,
}: IconBoxProps) => {
  const hasBadge = !!Badge;
  return (
    <Container size={size}>
      <IconBoxBackground
        size={size}
        hasBadge={hasBadge}
        border="1px solid"
        borderColor={borderColor}
      />
      {children}
      {hasBadge && (
        <BadgeContainer badgeSize={badgeSize}>
          <Badge size={badgeSize} color={badgeColor} />
        </BadgeContainer>
      )}
    </Container>
  );
};

const BoxedIcon = ({
  Icon,
  iconSize = DEFAULT_ICON_SIZE,
  iconColor,
  ...iconBoxProps
}: BoxedIconProps) => {
  return (
    <IconBox {...iconBoxProps}>
      <Icon size={iconSize || DEFAULT_ICON_SIZE} color={iconColor} />
    </IconBox>
  );
};

export default BoxedIcon;