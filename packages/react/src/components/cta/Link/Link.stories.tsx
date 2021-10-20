import React from "react";
import Link from "./index";
import { PlusMedium } from "../../../assets/icons";
import { Flex } from "../../layout";
export default {
  title: "cta/Link",
  component: Link,
  argTypes: {
    type: {
      options: ["main", "shade", "color"],
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "radio",
      },
    },
    children: {
      type: "text",
    },
    iconPosition: {
      options: ["right", "left"],
      control: {
        type: "radio",
      },
    },
    disabled: {
      type: "boolean",
    },
    reversed: {
      type: "boolean",
    },
  },
};

export const Default = ({ reversed, ...args }: any) => {
  return (
    <Flex
      style={{
        padding: 20,
        backgroundColor: reversed ? "black" : "white",
      }}
    >
      <Link {...args} reversed={reversed} href={"https://www.ledger.com"}>
        Hello world
      </Link>
    </Flex>
  );
};

export const WithIcon = ({ reversed, ...args }: any) => {
  return (
    <Flex
      style={{
        padding: 20,
        backgroundColor: reversed ? "black" : "white",
      }}
    >
      <Link {...args} reversed={reversed} href={"https://www.ledger.com"} Icon={PlusMedium}>
        Hello world
      </Link>
    </Flex>
  );
};
