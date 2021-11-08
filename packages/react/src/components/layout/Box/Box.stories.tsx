import React from "react";
import styled from "styled-components";
import Box from "./index";
export default {
  title: "Layout/Box",
  component: Box,
};

const Square = styled.div<any>`
  width: 25vw;
  height: 25vw;
  padding: 1rem;
  color: white;
  font-weight: 700;
  ${(props) => props};
`;

const Template = () => (
  <Box
    style={{
      width: "100vw",
      height: "100vh",
    }}
  >
    <Square backgroundColor="darkslategray">A plain good ol'box</Square>
  </Box>
);

export const Default = Template.bind({});
