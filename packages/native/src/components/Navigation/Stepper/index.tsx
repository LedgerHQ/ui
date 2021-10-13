import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { space, SpaceProps, color, ColorProps } from "styled-system";

export type StepperProps = {
  steps: Array<{ label: string; disabled?: boolean }>;
  activeIndex: number;
  onIndexChange: (index: number) => void;
};

const ActiveText = styled.Text`
  color: red;
`;

const Container = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Separator = styled.View`
  flex: 1;
  height: 1;
  background-color: black;
`;

const StepSeparator = styled(Separator)`
  margin-top: ${(p) => p.theme.space[5] / 2};
`;

type ItemState = "CURRENT" | "PENDING" | "COMPLETED";

type ItemProps = {
  state: ItemState;
  label: string;
  showLeftSeparator?: boolean;
  showRightSeparator?: boolean;
};

const StepIcon = {
  Container: styled.View<SpaceProps>`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;
    ${space}
  `,
  Background: styled.View<SpaceProps & ColorProps>`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: ${(p) => p.theme.space[5]};
    height: ${(p) => p.theme.space[5]};
    border-radius: ${(p) => p.theme.space[2]};
    background-color: #ddd;
    ${space}
    ${color}
  `,
  Current: styled.View`
    width: ${(p) => p.theme.space[1]};
    height: ${(p) => p.theme.space[1]};
    border-radius: ${(p) => p.theme.space[1]};
    background-color: ${(p) => p.theme.colors.palette.primary.c90};
  `,
};

const StepView = styled.View`
  align-items: center;
`;

function Step({
  state,
  label,
  showLeftSeparator,
  showRightSeparator,
}: ItemProps): React.ReactElement {
  return (
    <StepView>
      <StepIcon.Container mb={2}>
        {showLeftSeparator && <Separator />}
        <StepIcon.Background mx={2}>
          <StepIcon.Current />
        </StepIcon.Background>
        {showRightSeparator && <Separator />}
      </StepIcon.Container>
      {state === "CURRENT" ? (
        <ActiveText>{label}</ActiveText>
      ) : (
        <Text>{label}</Text>
      )}
    </StepView>
  );
}

function Stepper({ steps, activeIndex }: StepperProps): React.ReactElement {
  return (
    <Container>
      {steps.map(({ label }, i) => (
        <>
          <Step
            label={label}
            state={i === activeIndex ? "CURRENT" : "PENDING"}
            showLeftSeparator={i > 0}
            showRightSeparator={i < steps.length - 1}
          />
          {i < steps.length - 1 ? <StepSeparator /> : null}
        </>
      ))}
    </Container>
  );
}

export default Stepper;
