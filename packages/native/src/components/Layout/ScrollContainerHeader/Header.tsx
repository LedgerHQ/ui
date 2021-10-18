import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import Flex from "@components/Layout/Flex";

export type HeaderProps = {
  TopLeftSection?: JSX.Element;
  TopMiddleSection?: JSX.Element;
  TopRightSection?: JSX.Element;
  MiddleSection?: JSX.Element;
  BottomSection?: JSX.Element;
  currentPositionY: Animated.SharedValue<number>;
};

const Container = styled(Flex).attrs({
  paddingHorizontal: 16,
})`
  background-color: ${(p) => p.theme.colors.palette.background.main};
  width: 100%;
`;

const Section = styled(Flex).attrs({
  paddingVertical: 12,
})``;

const SCROLL_BREAKPOINT = 80;

const Header = ({
  TopLeftSection,
  TopMiddleSection,
  TopRightSection,
  MiddleSection,
  BottomSection,
  currentPositionY,
}: HeaderProps): JSX.Element => {
  const { width } = useWindowDimensions();

  const topMiddleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentPositionY.value,
      [0, 40, 100],
      [0, 0, 1]
    );
    return { opacity };
  });

  const MiddleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentPositionY.value,
      [0, SCROLL_BREAKPOINT / 2],
      [1, 0]
    );
    const scale = interpolate(
      currentPositionY.value,
      [0, SCROLL_BREAKPOINT],
      [1, 0.7]
    );
    const translateY = interpolate(
      currentPositionY.value,
      [0, SCROLL_BREAKPOINT],
      [0, SCROLL_BREAKPOINT / -2],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      currentPositionY.value,
      [0, SCROLL_BREAKPOINT],
      [0, width / 2],
      Extrapolate.CLAMP
    );
    const maxHeight = interpolate(
      currentPositionY.value,
      [0, 20, 100],
      [70, 50, 0]
    );

    return {
      maxHeight,
      opacity,
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  return (
    <Animated.View>
      <Container>
        <Section
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {TopLeftSection}
          <Animated.View style={topMiddleStyle}>
            {TopMiddleSection}
          </Animated.View>
          {TopRightSection}
        </Section>
        <Animated.View style={MiddleStyle}>{MiddleSection}</Animated.View>
        {BottomSection ? <Section>{BottomSection}</Section> : null}
      </Container>
    </Animated.View>
  );
};

export default Header;
