import React from "react";
import Box from "./index";
export default {
  title: "Layout/Box",
  component: Box,
  parameters: {
    docs: {
      description: {
        component: `The Box component is a helper component that lets you write these common css properties more succinctly and inline.
      
It include all the style props exported by the color, layout, position, shadow utilities, and some of the flexbox utility, from the [styled-system](https://styled-system.com) library.
      
[See more about styled-system utilities](https://styled-system.com/api)`,
      },
    },
  },
};

const Template = () => (
  <Box width={"200px"} backgroundColor="darkslategray" py={4} mx={4}>
    A plain good ol'box with fixed width, backgroundColor, padding and margin, all by using inline
    props
  </Box>
);

export const Default = Template.bind({});
