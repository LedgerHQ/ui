import React from "react";
import styled from "styled-components/native";
import FlexBox, { FlexBoxProps } from "@components/Layout/Flex";
import IconBox from "@ui/components/Icon/IconBox";

interface Props extends FlexBoxProps {
  Icon: (props: { size?: number }) => React.ReactElement;
  iconBorder?: boolean;
  topLeft?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomRight?: React.ReactNode;
}

const ICON_SIZE = 32;
const BOX_SIZE = 40;
const SMALL_ICON_SIZE = 14;

export default function Row({
  Icon,
  iconBorder = true,
  topLeft,
  bottomLeft,
  topRight,
  bottomRight,
  ...props
}: Props): React.ReactElement {
  return (
    <FlexBox
      {...props}
      flexDirection="row"
      justifyContent="space-between"
      p={6}
    >
      <FlexBox flexDirection="row" flexShrink={1} alignItems="center">
        {Icon &&
          (iconBorder ? (
            <IconBox
              Icon={Icon}
              iconSize={SMALL_ICON_SIZE}
              boxSize={BOX_SIZE}
            />
          ) : (
            <Icon size={ICON_SIZE} />
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
