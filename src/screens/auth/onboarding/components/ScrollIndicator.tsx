import { useTheme } from "@/providers";
import React, { FC } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ScrollIndicatorProps {
  // length of the scenes array
  scenesLength: number;

  // scroll X position of the list items, to be used for interplation
  scrollX: SharedValue<number>;

  // width of each scene
  sceneWidth: number;
}

const DOT_SIZE = 8;

// Dots for showing active scene in list
export const ScrollIndicator: FC<ScrollIndicatorProps> = ({
  scenesLength = 1,
  scrollX,
  sceneWidth,
}) => {
  const { palette } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      {new Array(scenesLength).fill(1).map((_, idx) => {
        const animatedStyles = useAnimatedStyle(() => {
          const scrollXInputRange = [
            (idx - 1) * sceneWidth,
            idx * sceneWidth,
            (idx + 1) * sceneWidth,
          ];
          const animatedWidth = interpolate(
            scrollX.value,
            scrollXInputRange,
            [DOT_SIZE, DOT_SIZE * 3, DOT_SIZE],
            Extrapolation.CLAMP
          );
          return {
            width: animatedWidth,
            height: DOT_SIZE,
            backgroundColor: interpolateColor(
              scrollX.value,
              scrollXInputRange,
              ["#ddd", palette.primary, "#ddd"]
            ),
          };
        });

        return (
          <Animated.View
            style={[{ margin: 4, borderRadius: DOT_SIZE / 2 }, animatedStyles]}
            key={idx}
          />
        );
      })}
    </View>
  );
};
