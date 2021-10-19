import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, color, text } from "@storybook/addon-knobs";
import { useTheme } from "styled-components/native";

import Chart from "@components/chart";
import Flex from "@components/Layout/Flex";
import type { Item } from "@components/chart";
import CenterView from "../CenterView";

function getRandomChartDate() {
  const fromTime = new Date("2020-09-01T01:57:45.271Z");
  const toTime = new Date("2021-02-12T01:57:45.271Z");
  return new Date(
    fromTime.getTime() + Math.random() * (toTime.getTime() - fromTime.getTime())
  );
}

function getRandomChartValue() {
  const min = 1000;
  const max = 2500000;
  return Math.floor(Math.random() * (max - min) + min);
}

const generateData = () => {
  return new Array(20)
    .fill({})
    .map(
      () =>
        ({ value: getRandomChartValue(), date: getRandomChartDate() } as Item)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const ChartDefault = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Flex alignItems="flex-start" flexDirection="column" rowGap="1rem">
      <Chart
        color={color("color", theme.colors.palette.primary.c100)}
        tickFormat={text("tickFormat", "MMM")}
        data={generateData()}
      />
    </Flex>
  );
};

storiesOf("Chart", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("Default", () => <ChartDefault />);
