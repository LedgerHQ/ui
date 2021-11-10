import React from "react";
import Box from "./index";
import { Text } from "../../asorted";
export default {
  title: "Layout/Box",
  component: Box,
};

const Template = () => (
  <div>
    <Text as={"div"} variant={"h3"}>
      Box
    </Text>
    <Text as="p" variant={"paragraph"} mb={3}>
      The Box component is a helper component that lets you write these common css properties more
      succinctly and inline.
    </Text>
    <Text as="p" variant={"paragraph"} mb={3}>
      It include all the style props exported by the color, layout, position, shadow utilities, and
      some of the flexbox utility, from the <a href={"https://styled-system.com"}>styled-system</a>{" "}
      library.
    </Text>
    <a href={"https://styled-system.com/api"}>See more about styled-system utilities</a>

    <Text as={"div"} variant={"h3"} my={3}>
      Exemple:
    </Text>

    <Box width={"200px"} backgroundColor="darkslategray" py={4} mx={4}>
      A plain good ol'box with fixed width, backgroundColor, padding and margin, all by using inline
      props
    </Box>
  </div>
);

export const Default = Template.bind({});
