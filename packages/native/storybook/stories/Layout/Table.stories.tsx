import { View } from "react-native";
import { storiesOf } from "../storiesOf";
import { useTheme } from "styled-components/native";
import { radios, text, boolean } from "@storybook/addon-knobs";
import React from "react";
import FlexBox from "../../../src/components/Layout/Flex";
import Row from "../../../src/components/Layout/Table/Row";
import Text from "../../../src/components/Text";
import CircledCheck from "../../../src/assets/icons/CircledCheckRegular";

const Icon = (props: { size?: number }): React.ReactElement => (
  <View
    style={{
      height: props.size,
      width: props.size,
      borderRadius: props.size,
      backgroundColor: "orange",
    }}
  />
);

const TopLeft = () => {
  const {
    colors: {
      palette: { neutral, success },
    },
  } = useTheme();
  return (
    <FlexBox flexDirection="row" flexShrink={1} alignItems="center">
      <Text color={neutral.c100} type="body" fontWeight="semibold" mr={2}>
        {text("topLeftText", "Bitcoin 1", "content")}
      </Text>
      <CircledCheck size={12.5} color={success.c100} />
    </FlexBox>
  );
};
const BottomLeft = () => {
  const { colors } = useTheme();
  return (
    <Text type="body" color={colors.palette.neutral.c70}>
      {text("bottomLeftText", "Native Segwit", "content")}
    </Text>
  );
};

const TopRight = () => {
  const { colors } = useTheme();
  return (
    <Text color={colors.palette.neutral.c100} type="body" fontWeight="semibold">
      {text("topRightText", "1.23456 BTC", "content")}
    </Text>
  );
};

const BottomRight = () => {
  const { colors } = useTheme();
  return (
    <Text
      type="paragraph"
      fontWeight="medium"
      color={colors.palette.neutral.c70}
    >
      {text("bottomRightText", "$74,590.81", "content")}
    </Text>
  );
};

const ARow = () => {
  const [hasTopLeft, hasBottomLeft, hasTopRight, hasBottomRight, hasIcon] = [
    "TopLeft",
    "BottomLeft",
    "TopRight",
    "BottomRight",
    "Icon",
  ].map((item) => radios(item, { [item]: 1, null: null }, 1, "props"));
  return (
    <Row
      Icon={hasIcon && Icon}
      topLeft={hasTopLeft && <TopLeft />}
      bottomLeft={hasBottomLeft && <BottomLeft />}
      topRight={hasTopRight && <TopRight />}
      bottomRight={hasBottomRight && <BottomRight />}
      iconBorder={boolean("iconBorder", false, "props")}
    />
  );
};

storiesOf((story) =>
  story("Layout", module).add("Table/Row", () => (
    <FlexBox flexDirection="column" width={"100%"}>
      <ARow />
    </FlexBox>
  ))
);
