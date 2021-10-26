import React from "react";
import Text, { TextProps } from "./index";
export default {
  title: "Asorted/Typography/Text",
  component: Text,
  argTypes: {
    fontSize: {
      options: [
        undefined,
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "large",
        "body",
        "bodyLineHeight",
        "paragraph",
        "paragraphLineHeight",
        "small",
        "extraSmall",
        "tiny",
        "micro",
        "subtitle",
      ],
      control: {
        type: "radio",
      },
    },
    ff: {
      options: [
        undefined,
        "Alpha|Medium",
        "Inter|ExtraLight",
        "Inter|Light",
        "Inter|Regular",
        "Inter|Medium",
        "Inter|SemiBold",
        "Inter|Bold",
        "Inter|ExtraBold",
      ],
      control: {
        type: "radio",
      },
    },
    content: {
      type: "text",
    },
  },
};

const Template = (args: TextProps & { content: string }) => <Text {...args}>{args.content}</Text>;

export const Default = Template.bind({});
// @ts-expect-error FIXME
Default.args = {
  type: "h1",
  content: "Lend stablecoins to the Compound protocol...",
};
