import React from "react";
import { View } from "react-native";
import { storiesOf } from "../storiesOf";
import { useTheme } from "styled-components/native";
import { action } from "@storybook/addon-actions";

import ScrollContainerHeader from "../../../src/components/Layout/ScrollContainerHeader";
import Text from "../../../src/components/Text";
import Flex from "../../../src/components/Layout/Flex";
import Badge from "../../../src/components/tags/Badge";
import BackIcon from "../../../src/assets/icons/ArrowLeftMedium";
import PlusMedium from "../../../src/assets/icons/PlusMedium";
import CrossIcon from "../../../src/assets/icons/CloseMedium";
import ScrollContainer from "../../../src/components/Layout/ScrollContainer";

const TopRightSection = () => {
  const theme = useTheme();
  return (
    <Flex flexDirection="row">
      <Flex mr={4} onPress={action("plus icon pressed")}>
        <PlusMedium color={theme.colors.palette.neutral.c100} />
      </Flex>
      <Flex onPress={action("cross icon pressed")}>
        <CrossIcon color={theme.colors.palette.neutral.c100} />
      </Flex>
    </Flex>
  );
};

const BottomSection = () => {
  return (
    <ScrollContainer horizontal>
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Flex mr={index !== 11 ? 4 : 0} key={index}>
            <Badge active={index === 0}>Filter</Badge>
          </Flex>
        ))}
    </ScrollContainer>
  );
};

const ScrollContainerHeaderStory = () => {
  const theme = useTheme();

  return (
    <ScrollContainerHeader
      TopLeftSection={<BackIcon color={theme.colors.palette.neutral.c100} />}
      TopRightSection={<TopRightSection />}
      TopMiddleSection={<Text type="paragraph">TITLE</Text>}
      MiddleSection={<Text type="h2">TITLE</Text>}
      BottomSection={<BottomSection />}
    >
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <View
            key={i}
            style={{
              width: "100%",
              height: 100,
              backgroundColor:
                i % 2
                  ? theme.colors.palette.primary.c20
                  : theme.colors.palette.neutral.c20,
            }}
          />
        ))}
    </ScrollContainerHeader>
  );
};

storiesOf((story) =>
  story("Layout", module).add("Header", () => <ScrollContainerHeaderStory />)
);
