import React from "react";
import * as d3shape from "d3-shape";
import * as d3scale from "d3-scale";
import Svg, { Path } from "react-native-svg";

export type Item = { date: Date; value: number };
export type ChartProps = {
  width: number;
  height: number;
  data?: Array<Item>;
  color: string;
};

const sortData = (itemA: Item, itemB: Item) => {
  if (new Date(itemA.date) > new Date(itemB.value)) return 1;
  if (new Date(itemA.date) < new Date(itemB.value)) return -1;
  return 0;
};

const Graph = ({
  width,
  height,
  data = [],
  color,
}: ChartProps): JSX.Element => {
  const sortedData = data.sort(sortData);
  const { date: minX, value: minY } = sortedData[0];
  const { date: maxX, value: maxY } = sortedData[sortedData.length - 1];

  const xScale = d3scale
    .scaleTime()
    .domain([minX, maxX])
    .range([0, width])
    .nice();
  const yScale = d3scale
    .scaleLinear()
    .domain([minY, maxY])
    .range([0, height])
    .nice();

  const area = d3shape
    .area()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(d3shape.curveBasis)(data);

  const line = d3shape
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(d3shape.curveBasis)(data);

  return (
    <Svg height={height} width={width}>
      <Path d={area} fill="grey" />
      <Path d={line} stroke={color} strokeWidth={2} fill="none" />
    </Svg>
  );
};

export default Graph;
