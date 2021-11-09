import React from "react";

import { StoryTemplate } from "../helpers";
import Tag, { Type, Size, Props } from "./index";
import Text from "../asorted/Text";
import Flex from "../layout/Flex";

const sizes: Size[] = ["large", "medium", "small"];
const types: Type[] = ["plain", "opacity", "outlined", "outlinedOpacity"];
const states = [{}, { disabled: true }];

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
      options: types,
    },
    size: {
      options: sizes,
    },
    children: {
      type: "string",
    },
  },
};

export const AllCombinations = ((): JSX.Element => (
  <Flex flexDirection="column">
    {sizes.map((size) => (
      <Flex flexDirection="column">
        <Text variant="h2">size="{size}"</Text>
        {types.map((type) => (
          <Flex flexDirection="column" ml={10} mb={10}>
            <Text variant="h5">type="{type}"</Text>
            <Flex flexDirection="row" mt="5px" columnGap="16px">
              {states.map((state) =>
                [true, false].map((active: boolean) => (
                  <Tag size={size} type={type} active={active} {...state}>
                    {active ? "Active" : "Inactive"}
                  </Tag>
                )),
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
)).bind({});

const Template: StoryTemplate<Props> = (args: Props): JSX.Element => (
  <Tag {...args}>{args.children}</Tag>
);

const defaultArgs = {
  active: true,
  children: "Label",
  type: "large",
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
export const OutlinedOpacity = Template.bind({});
Outlined.args = {
  ...defaultArgs,
  type: "outlinedOpacity",
};
