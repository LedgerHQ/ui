import styled from "styled-components";
import baseStyles, { BaseStyleProps } from "../../baseStyled";

export type FlexBoxProps = BaseStyleProps;

const FlexBox = styled.div.attrs({ display: "flex" })<FlexBoxProps>(baseStyles);

export default FlexBox;
