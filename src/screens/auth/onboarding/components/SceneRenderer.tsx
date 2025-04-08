import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";

import { Scene } from "../types";
import { ScriptedHeading, Text } from "@/components";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { FONTS, useTheme } from "@/providers";

const SCENE_IMAGE_WIDTH = 200;

interface SceneRendererProps {
  activeSceneIndex: number;
  item: Scene;
  itemIdx: number;
  sceneWidth: number;
  scrollX: SharedValue<number>;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  activeSceneIndex,
  itemIdx,
  item,
  scrollX,
  sceneWidth,
}) => {
  const animBounceValue = useSharedValue(0);
  const { palette } = useTheme();

  const scrollXInputRange = [
    (itemIdx - 1) * sceneWidth,
    itemIdx * sceneWidth,
    (itemIdx + 1) * sceneWidth,
  ];

  const animatedImageStyles = useAnimatedStyle(() => {
    const _interpolate = (outputRange: number[]) =>
      interpolate(
        scrollX.value,
        scrollXInputRange,
        outputRange,
        Extrapolation.CLAMP
      );

    const animatedTranslateX = _interpolate([-500, 0, 500]);
    const animatedOpacity = _interpolate([0, 1, 0]);
    const animatedScale = _interpolate([0.2, 1, 0.2]);

    return {
      opacity: animatedOpacity,
      transform: [
        {
          translateX: animatedTranslateX,
        },
        { scale: animatedScale },
      ],
    } as DefaultStyle;
  });

  const animatedImgWrapperStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animBounceValue.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => {
    const _interpolate = (outputRange: number[]) =>
      interpolate(
        scrollX.value,
        scrollXInputRange,
        outputRange,
        Extrapolation.CLAMP
      );
    const animatedTranslateY = _interpolate([150, 0, 150]);
    const animatedOpacity = _interpolate([0, 1, 0]);

    return {
      opacity: animatedOpacity,
      transform: [{ translateY: animatedTranslateY }],
    };
  });

  useEffect(() => {
    animBounceValue.value = withRepeat(
      withTiming(20, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      entering={FadeInDown}
      style={[styles.container, { width: sceneWidth }]}
    >
      <Animated.View style={[animatedImgWrapperStyle, styles.sceneImgWrapper]}>
        <Animated.Image source={item.sceneImg} style={[styles.sceneImg]} />
      </Animated.View>
      <Animated.View style={[animatedTextStyle, styles.textBlockWrapper]}>
        <Text size={38} font={FONTS.JustAnotherHand} style={[styles.text]}>
          {item.title}
        </Text>
        <View
          style={[styles.barSeperator, { backgroundColor: palette.primary }]}
        />
        <Text style={styles.text} color={"#000b"}>
          {item.subTitle}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    rowGap: 10,
  },
  barSeperator: {
    width: 50,
    height: 2,
  },
  textBlockWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    rowGap: 15,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
  },
  sceneImgWrapper: {
    marginBottom: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  sceneImg: {
    width: SCENE_IMAGE_WIDTH,
    height: SCENE_IMAGE_WIDTH,
    borderWidth: 1,
    borderColor: "black",
    borderBottomLeftRadius: 80,
    borderTopRightRadius: 80,
    aspectRatio: 2 / 1,
    resizeMode: "cover",
  },
});
