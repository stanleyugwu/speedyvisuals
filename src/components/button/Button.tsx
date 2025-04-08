import { Pressable, PressableProps } from "react-native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { scale, ScaledSheet } from "react-native-size-matters";

import { Text } from "../text";
import { useBounceable } from "@/hooks";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { FONTS, useTheme } from "@/providers";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps extends AnimatedProps<PressableProps> {
  size?: number;
  label: string;
}

export const Button = ({
  size = 140,
  label,
  style,
  ...otherProps
}: ButtonProps) => {
  const { animatedStyle, onPressIn, onPressOut } = useBounceable();
  const { palette } = useTheme();

  // Define your dynamic width and height (these can come from props or state)
  size = scale(size);
  const dynamicWidth = size;
  const dynamicHeight = dynamicWidth / 2;

  // Base offsets
  const startX = 0;
  const topY = 0;

  // Derived values based on the ratios from your original design
  const horizontalInset = 0.06429 * dynamicWidth; // inset for vertical lines
  const verticalMargin = 0.1346 * dynamicHeight;

  // Build the d attribute dynamically
  const d = `
M${startX} ${topY + verticalMargin}h${dynamicWidth}
M${startX} ${topY + dynamicHeight - verticalMargin}h${dynamicWidth}
M${startX + dynamicWidth - horizontalInset} ${topY + dynamicHeight}V${topY}
M${startX + horizontalInset} ${topY + dynamicHeight}V${topY}`;

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[style, animatedStyle, styles.container]}
      {...otherProps}
    >
      <Svg
        style={{ alignSelf: "center" }}
        width={dynamicWidth}
        height={dynamicHeight}
        fill="none"
      >
        <Path stroke="#B78C1F" strokeWidth={3} d={d} />
      </Svg>
      <Text
        size={20}
        font={FONTS.BebasNeue}
        color={palette.primary}
        style={styles.btnLabel}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
  },
  btnLabel: {
    position: "absolute",
    top: "38%",
    alignSelf: "center",
    right: 0,
    left: 0,
    textAlign: "center",
    letterSpacing: 3,
  },
});
