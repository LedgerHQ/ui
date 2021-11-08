import { SpaceProps, PositionProps, space, position, color, ColorProps } from "styled-system";
import styled from "styled-components";

const Box = styled.div<SpaceProps & PositionProps & ColorProps>(space, position, color);

export default Box;
