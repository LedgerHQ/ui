import React from "react";
import { storiesOf } from "../storiesOf";
import { select, boolean, text } from "@storybook/addon-knobs";
import Badge from "../../../src/components/tags/Badge";

export const BadgeSample = () => (
  <Badge
    variant={select("type", ["main", "primary", undefined], undefined)}
    active={boolean("active", false)}
  >
    {text("children", "Label")}
  </Badge>
);

storiesOf((story) => story("Tag", module).add("Badge", BadgeSample));
