import React from "react";
import styled from "styled-components";
import Box from "./index";
import { Text } from "../../asorted";
import { Link } from "../../cta";
export default {
  title: "Layout/Box",
  component: Box,
};

const Template = () => (
  <div>
    <Text variant={"h3"}>Box</Text>
    <Text as='p' variant={"body"}>
      The Box component is a helper component that lets you write these common css properties more succinctly inline.
    </Text>
    <Text as='p' variant={"body"}>
      It include all the style props exported by the color, layout, position, shadow utilies, and some of the flexbox utility, from the stymed-system library.
    </Text>
    <a href={'https://styled-system.com/api'}>See more about styled-system utilities</a>

    <Box
      width={ "100vw"}
        height={"100vh"}
      backgroundColor="darkslategray"
    >
     A plain good ol'box
    </Box>
  </div>
);

export const Default = Template.bind({});
