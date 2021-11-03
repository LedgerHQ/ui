import React from "react";
import { storiesOf } from "../storiesOf";
import { color, text } from "@storybook/addon-knobs";
import { useTheme } from "styled-components/native";

import Chart from "../../../src/components/chart";
import Flex from "../../../src/components/Layout/Flex";
import type { Item } from "../../../src/components/chart/types";

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
    <Flex alignItems="flex-start" flexDirection="column">
      <Chart
        color={color("color", theme.colors.palette.primary.c100)}
        tickFormat={text("tickFormat", "MMM")}
        data={generateData()}
      />
    </Flex>
  );
};

storiesOf((story) =>
  story("Chart", module).add("Default", () => <ChartDefault />)
);
