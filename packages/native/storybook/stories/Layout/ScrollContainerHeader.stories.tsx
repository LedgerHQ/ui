import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";
import { useTheme } from "styled-components/native";
import { action } from "@storybook/addon-actions";

import ScrollContainerHeader from "@components/Layout/ScrollContainerHeader";
import Text from "@components/Text";
import Flex from "@components/Layout/Flex";
import Badge from "@components/tags/Badge";
import BackIcon from "@ui/assets/icons/ArrowLeftMedium";
import PlusMedium from "@ui/assets/icons/PlusMedium";
import CrossIcon from "@ui/assets/icons/CloseMedium";
import ScrollContainer from "@components/Layout/ScrollContainer";
import CenterView from "../CenterView";

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

storiesOf("Layout", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("Header", () => <ScrollContainerHeaderStory />);
