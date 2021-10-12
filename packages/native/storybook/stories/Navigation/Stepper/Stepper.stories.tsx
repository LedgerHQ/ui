import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import React from "react";
import Stepper from "@components/Navigation/Stepper";
import CenterView from "../../CenterView";

storiesOf("Navigation", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("Stepper", () => (
    <Stepper
      steps={object("steps", [
        { label: "First step", index: 14 },
        { label: "Second step", index: 21 },
        { label: "Disabled step", index: 23, disabled: true },
        { label: "Fourth step", index: 40 },
      ])}
      activeIndex={number("activeIndex", 0, { min: 0, max: 6 })}
      onIndexChange={action("onChange")}
    />
  ));
