import baseStyled, { BaseStyledProps } from "../../styled";

export type FlexBoxProps = BaseStyledProps;

const FlexBox = baseStyled.div.attrs<FlexBoxProps>({ display: "flex" })<FlexBoxProps>``;

export default FlexBox;
