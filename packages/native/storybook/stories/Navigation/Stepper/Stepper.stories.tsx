import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, object, boolean } from "@storybook/addon-knobs";
import React from "react";
import Stepper from "@components/Navigation/Stepper";
import CenterView from "../../CenterView";

storiesOf("Navigation", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("Stepper", () => (
    <Stepper
      steps={object("steps", [
        { label: "First step" },
        { label: "Second step" },
        { label: "Disabled step", disabled: true },
        { label: "Fourth step" },
      ])}
      activeIndex={number("activeIndex", 0, { min: 0, max: 6 })}
      errored={boolean("errored", false)}
    />
  ));
