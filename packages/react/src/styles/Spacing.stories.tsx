import React from "react";
import styled, { useTheme } from "styled-components";

import Flex from "@ui/components/layout/Flex";
import Text from "@ui/components/asorted/Text";

export default {
  title: "Particles",
};

const SpaceRow = styled(Flex).attrs({
  columnGap: "40px",
  alignItems: "center",
})`
  padding: 4px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: transparent;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.palette.neutral.c40};
  }
`;

export const Spacing = (): JSX.Element => {
  const theme = useTheme();
  const [, ...space] = theme.space;

  const handleClick = (index: number): void => {
    navigator.clipboard.writeText(`space[${index + 1}]`);
  };

  return (
    <Flex flexDirection="column" rowGap="24px">
      {space.map((value, index) => (
        <SpaceRow key={value} onClick={() => handleClick(index)}>
          <Text type="subTitle" style={{ minWidth: "5ch" }}>{`${value}px`}</Text>
          <Flex
            flexGrow={1}
            style={{
              height: value,
              backgroundColor: theme.colors.palette.primary.c20,
            }}
          />
        </SpaceRow>
      ))}
    </Flex>
  );
};