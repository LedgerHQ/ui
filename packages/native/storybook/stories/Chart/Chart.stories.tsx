import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import Chart from "@components/chart";
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

const generateData = (): Array<Item> =>
  new Array(50)
    .fill({})
    .map(
      () =>
        ({ value: getRandomChartValue(), date: getRandomChartDate() } as Item)
    );

storiesOf("Chart", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("default", () => (
    <Chart width={375} height={195} color="red" data={generateData()} />
  ));
