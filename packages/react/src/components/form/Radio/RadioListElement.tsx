import React, { InputHTMLAttributes, useContext, useMemo } from "react";
import styled from "styled-components";
import Text from "../../asorted/Text";
import Flex, { FlexBoxProps } from "../../layout/Flex";
import { RadioContext } from "./index";

const Label = styled(Text)<{ checked: boolean }>`
  color: ${(p) =>
    p.checked ? p.theme.colors.palette.primary.c90 : p.theme.colors.palette.neutral.c100};
`;

const Container = styled(Flex)<{ checked: boolean }>`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${(p) =>
    p.checked ? p.theme.colors.palette.primary.c20 : p.theme.colors.palette.neutral.c00};
  border: 1px solid
    ${(p) => (p.checked ? p.theme.colors.palette.primary.c50 : p.theme.colors.palette.neutral.c40)};
  border-radius: ${(p) => `${p.theme.radii[2]}px`};
  padding: ${(p) => p.theme.space[6]}px;

  :hover {
    border-color: ${(p) => p.theme.colors.palette.primary.c80};
  }
`;

const Input = styled.input`
  position: relative;
  appearance: none;
  cursor: pointer;
`;

const RadioListElement = styled.label.attrs({ tabIndex: -1 })`
  display: inline-flex;
  align-items: center;
`;

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "name">;

export type RadioListElementProps = InputAttributes & {
  label?: string;
  LabelComponent?: React.ComponentType<{ checked: boolean; disabled: boolean | undefined }>;
  inputHidden?: boolean;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isChecked = useMemo(() => context.currentValue === value, [context.currentValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.onChange(event.target.value);
  };

  return (
    <RadioListElement>
      <Container checked={isChecked} {...containerProps}>
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
          <Label checked={isChecked} variant="paragraph">
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
