import React, { InputHTMLAttributes, useContext } from "react";
import styled from "styled-components";
import Text from "../../asorted/Text";
import Flex, { FlexBoxProps } from "../../layout/Flex";
import { RadioContext } from "./index";

const Label = styled(Text)<{ checked: boolean; disabled: boolean | undefined }>`
  color: ${(p) =>
    p.disabled
      ? p.theme.colors.palette.neutral.c50
      : p.checked
      ? p.theme.colors.palette.primary.c90
      : p.theme.colors.palette.neutral.c100};
`;

const Container = styled(Flex)<{ checked: boolean; disabled: boolean | undefined }>`
  cursor: ${(p) => (p.disabled ? "" : "pointer")};
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.checked ? p.theme.colors.palette.primary.c20 : "")};
  border: 1px solid
    ${(p) => (p.checked ? p.theme.colors.palette.primary.c50 : p.theme.colors.palette.neutral.c40)};
  border-radius: ${(p) => `${p.theme.radii[2]}px`};
  padding: ${(p) => p.theme.space[6]}px;

  :hover {
    border-color: ${(p) => (p.disabled || p.checked ? "" : p.theme.colors.palette.primary.c80)};
  }
`;

const Input = styled.input`
  position: relative;
  appearance: none;
`;

const RadioListElement = styled.label.attrs({ tabIndex: -1 })`
  display: inline-flex;
  align-items: center;
`;

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "name">;

export type RadioListElementProps = InputAttributes & {
  /** The string that will be rendered as label of this radio element, styled according to the input state */
  label?: string;
  /** A component to render inside, it will be rendered with these props: { checked:boolean; disabled:boolean } */
  LabelComponent?: React.ComponentType<{ checked: boolean; disabled: boolean | undefined }>;
  /** Flex props to pass to the container */
  containerProps?: FlexBoxProps;
};

const ListElement = ({
  label,
  LabelComponent,
  value,
  disabled,
  containerProps,
  ...props
}: RadioListElementProps): JSX.Element => {
  const context = useContext(RadioContext);
  if (context === undefined) throw new Error("RadioElement must be used within a RadioProvider");

  const isChecked = context.currentValue === value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.onChange(event.target.value);
  };

  return (
    <RadioListElement>
      <Container checked={isChecked} disabled={disabled} {...containerProps}>
        <Input
          type="radio"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          name={context.name}
          {...props}
        />
        {label && (
          <Label checked={isChecked} disabled={disabled} variant="paragraph">
            {label}
          </Label>
        )}
        {LabelComponent ? <LabelComponent checked={isChecked} disabled={disabled} /> : null}
      </Container>
    </RadioListElement>
  );
};

ListElement.displayName = "Radio.ListElement"; // For easy identification in the React devtools & in storybook

export default ListElement;
