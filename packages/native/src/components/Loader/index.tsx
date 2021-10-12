import React from "react";
import { Svg, Circle, G } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";

type Props = {
  // float number between 0 and 1
  progress?: number;

  // function triggered when pressing the loader
  onPress?: () => void;

  // Display an Icon
  Icon?: typeof React.Component;
};

const radius = 25;
const strokeWidth = 2;
const normalizedRadius = radius - strokeWidth / 2;
const circumference = normalizedRadius * 2 * Math.PI;
const iconSize = 22;
const iconOffset = radius - iconSize / 2;

const ProgressLoader = ({
  progress = 0,
  onPress,
  Icon,
}: Props): React.ReactElement => {
  const { colors } = useTheme();
  const backgroundColor = colors.palette.primary.c20;
  const progressColor = colors.palette.primary.c160;

  const strokeDashoffset = circumference - progress * circumference;
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Svg width="50" height="50">
        <Circle
          cx={25}
          cy={25}
          r={23}
          fill="transparent"
          stroke={backgroundColor}
          strokeDashoffset={0}
          strokeWidth={strokeWidth}
        />
        <G transform={{ rotation: -90, originX: 25, originY: 25 }}>
          <Circle
            cx={25}
            cy={25}
            r={23}
            fill="transparent"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
        {Icon ? (
          <G transform={`translate(${iconOffset}, ${iconOffset})`}>
            <Icon color={progressColor} size={iconSize} />
          </G>
        ) : null}
      </Svg>
    </TouchableOpacity>
  );
};

export default ProgressLoader;
