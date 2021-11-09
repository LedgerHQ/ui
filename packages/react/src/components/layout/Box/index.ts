import { SpaceProps, PositionProps, space, position, color, ColorProps, layout, LayoutProps } from "styled-system";
import styled from "styled-components";

const Box = styled.div<SpaceProps & PositionProps & ColorProps & LayoutProps>(space, position, color, layout);

export default Box;
