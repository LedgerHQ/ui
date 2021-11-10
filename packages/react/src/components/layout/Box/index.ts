import styled from "styled-components";
import { sharedStyle, SharedStyleProps } from "../../../styles/system/shared";
const Box = styled.div<SharedStyleProps>`
  ${sharedStyle};
`;

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & SharedStyleProps;

export default Box;
