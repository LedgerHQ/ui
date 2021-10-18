import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Link, { LinkProps } from "../../../cta/Link";
import {
  ChevronBottomMedium,
  ChevronTopMedium,
} from "../../../../assets/icons";

type AccordionProps = {
  collapsed: boolean;
  children: React.ReactNode;
  title: string;
  onPress: LinkProps["onPress"];
};

const Accordion = ({
  collapsed = false,
  children,
  title,
  onPress,
}: AccordionProps): React.ReactElement => {
  const animationHeight = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(!collapsed);

  const shrinkView = useCallback(() => {
    Animated.timing(animationHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(({ finished }) => finished && setDisplay(false));
  }, [animationHeight]);

  const expandView = useCallback(() => {
    setDisplay(true);
    Animated.timing(animationHeight, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animationHeight]);

  useEffect(() => {
    if (collapsed) {
      shrinkView();
    } else {
      expandView();
    }
  }, [collapsed, expandView, shrinkView]);

  return (
    <View>
      <Link
        onPress={onPress}
        Icon={collapsed ? ChevronBottomMedium : ChevronTopMedium}
      >
        {title}
      </Link>

      <Animated.View
        style={{
          maxHeight: animationHeight.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
          overflow: "hidden",
          display: display ? undefined : "none",
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default Accordion;
