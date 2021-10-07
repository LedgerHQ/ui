import React from "react";
import styled from "styled-components";

export type Props = React.PropsWithChildren<{
  value: string | number
}>;

const Container = styled('div')`
  padding: 6px;
  border-radius: 12px;
  min-width: 24px;
  width: fit-content;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  font-weight: 700;
  background-color: ${(p) => p.theme.colors.palette.primary.c70};
  color: ${p => p.theme.colors.palette.neutral.c00};
`;

export default function Badge({ value }: Props): JSX.Element {
    return <Container>{value}</Container>
}