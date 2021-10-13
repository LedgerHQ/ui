import { StoryTemplate } from "@ui/helpers";
import React from "react";
import Tag, { Props } from "./index";

export default {
  title: "Toasts/Tag",
  component: Tag,
  argTypes: {
    active: {
      control: {
        type: "boolean",
      },
    },
    type: {
      options: ["plain", "opacity", "outlined"],
    },
    children: {
      type: "string",
    },
  },
};

const Template: StoryTemplate<Props> = (args: Props): JSX.Element => (
  <Tag {...args}>{args.children}</Tag>
);

const defaultArgs = {
  active: true,
  children: "Label",
  type: "",
};

export const Plain = Template.bind({});
Plain.args = {
  ...defaultArgs,
  type: "plain",
};
export const Opacity = Template.bind({});
Opacity.args = {
  ...defaultArgs,
  type: "opacity",
};
export const Outlined = Template.bind({});
Outlined.args = {
  ...defaultArgs,
  type: "outlined",
};
