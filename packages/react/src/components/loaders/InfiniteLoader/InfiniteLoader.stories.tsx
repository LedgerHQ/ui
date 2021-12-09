import React from "react";
import InfiniteLoader, { Props } from "./index";

export default {
  title: "Loaders/InfiniteLoader",
  component: InfiniteLoader,
  argTypes: {
    size: {
      type: "number",
    },
    color: {
      control: {
        type: "color",
        presetColors: ["coral", "tomato", "orange", "blue", "purple"],
      },
    },
    theme: {
      table: { disable: true },
    },
    as: {
      table: { disable: true },
    },
    forwardedAs: {
      table: { disable: true },
    },
  },
};

export const Default = (args: Props): JSX.Element => {
  return <InfiniteLoader {...args} />;
};
