import React from "react";
import BadgeComponent, { Props } from "@components/toasts/Badge";

export default {
  title: "Toasts/Badge",
  component: BadgeComponent,
  argTypes: {
    value: {
      control: { type: "number" },
    },
  },
};

const badges = ["Tomate", 2];

function Sample(args: Props) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <BadgeComponent {...args} />
    </div>
  );
}

export const Badge = (args: Props): React.ReactNode[] =>
  [
    <Sample value={args.value} />,
    ...badges.reduce<React.ReactNode[]>((acc, _, index) => {
      return [...acc, <Sample value={_} key={index} />];
    }, [])
  ];

Badge.args = {
  value: 4,
};
