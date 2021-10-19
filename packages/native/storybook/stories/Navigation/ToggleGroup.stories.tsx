import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text, number } from "@storybook/addon-knobs";

import React, { useState } from "react";
import ToggleGroup from "@components/Navigation/ToggleGroup";
import CenterView from "../CenterView";

const ToggleGroupStory = () => {
  const [activeIndex, changeIndex] = useState(1);

  return (
    <ToggleGroup
      activeIndex={activeIndex}
      onChange={changeIndex}
      labels={new Array(6).fill('').map((_, i) => "Label" + i)}
    />
  );
};

storiesOf("Navigation", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("ToggleGroup", () => <ToggleGroupStory />);
