import React from "react";
import styled from "styled-components/native";
import FlexBox from "@components/Layout/Flex";
import { IconContainer } from "@ui/components/Icon/IconBox";

type Props = {
  Icon: (props: { size?: number }) => React.ReactElement;
  iconBorder?: boolean;
  topLeft?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomRight?: React.ReactNode;
  withMarginBottom?: boolean;
};

const ICON_SIZE = 32;

const IconBoxContainer = styled(IconContainer)`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
`;

export default function Row({
  Icon,
  iconBorder = true,
  topLeft,
  bottomLeft,
  topRight,
  bottomRight,
  withMarginBottom,
}: Props): React.ReactElement {
  return (
    <FlexBox
      flexDirection="row"
      justifyContent="space-between"
      mx={6}
      mb={withMarginBottom ? 6 : 0}
      p={6}
    >
      <FlexBox flexDirection="row" flexShrink={1} alignItems="center">
        {Icon &&
          (iconBorder ? (
            <IconBoxContainer>
              <Icon size={14} />
            </IconBoxContainer>
          ) : (
            <Icon size={32} />
          ))}
        <FlexBox
          pl={4}
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          {topLeft}
          {bottomLeft}
        </FlexBox>
      </FlexBox>
      <FlexBox
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="flex-end"
      >
        {topRight}
        {bottomRight}
      </FlexBox>
    </FlexBox>
  );
}
