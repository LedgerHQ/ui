import React from "react";
import { View, TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";

type CommonProps = TextInputProps & {
  disabled?: boolean;
};

export type InputProps = CommonProps & {
  label: string;
  value?: boolean;
  onChange: () => void;
};

const InputContainer = styled.View<Partial<CommonProps> & { focus?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${(p) => p.theme.colors.palette.neutral.c00};
  height: 48px;
  border: ${(p) => `1px solid ${p.theme.colors.palette.neutral.c40}`};
  border-radius: 24px;
  color: ${(p) => p.theme.colors.palette.neutral.c100};

  ${(p) =>
    p.disabled &&
    css`
      color: ${p.theme.colors.palette.neutral.c60};
      background: ${(p) => p.theme.colors.palette.neutral.c30};
    `};
`;

const Buble = styled.View<CommonProps>``;

const Label = styled.Text<CommonProps>`
  flex: 1;
`;

export default function Input(props: InputProps): JSX.Element {
  const { value, disabled, label } = props;

  return (
    <View style={{ display: "flex", width: "100%" }}>
      <InputContainer disabled={disabled}>
        <Buble value={value} />
        <Label>{label}</Label>
      </InputContainer>
    </View>
  );
}
