import React, { useState } from "react";
import styled from "styled-components";
import TabsComponent, { Props } from "@components/tabs/Tabs";
import Text from "@components/asorted/Text";

export default {
  title: "Tabs/Tabs",
  component: TabsComponent,
  argTypes: {
    initialActiveIndex: {
      control: { type: "number" },
    },
  },
};

const Content = styled.div`
  padding: 10px;
`;

const myTabs = [
  [
    {
      title: "Title 1",
      badge: 2,
      Component: <Content>Have a break, have a KitKat !</Content>,
    },
    {
      title: "Title 2",
      Component: <Content>I'm disabled below, you will never see me... So stay here pls ^^</Content>,
    },
    {
      title: "Title 3",
      badge: "banana",
      Component: <Content>Look mom i'm on tv !</Content>,
    },
  ],
  [
    {
      title: "Title 1",
      disabled: false,
      badge: 2,
      Component: <Content>Pst ! Title 2 is disabled. You can't see it ...</Content>,
    },
    {
      title: "Title 2",
      disabled: true,
      Component: <Content>I'm disabled, you will never see me...</Content>,
    },
    {
      title: "Title 3 a little bit longer",
      disabled: false,
      badge: "banana",
      Component: <Content>Pst ! Title 2 is disabled. You can't see it ...</Content>,
    },
  ],
  [
    {
      title: "One",
      badge: 1,
      Component: <Content>One is the first</Content>
    },
    {
      title: "Two",
      badge: 2,
      Component: <Content>Two is the second</Content>
    }
  ]
];

function Sample(args: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ width: "100%" }}>
        <TabsComponent {...args} onTabChange={setActiveIndex} tabs={args.tabs} />
      </div>
      <Text type="subTitle">Active index: {activeIndex}</Text>
      <hr />
    </div>
  );
}

export const Tabs = (): React.ReactNode[] =>
  myTabs.reduce<React.ReactNode[]>((acc, tabs, index) => {
    return [...acc, <Sample key={index} tabs={tabs} />];
  }, []);