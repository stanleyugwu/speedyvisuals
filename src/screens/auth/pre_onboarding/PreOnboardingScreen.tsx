import { ScreenFC } from "@/navigation/types";
import { Button, ScriptedHeading, Text } from "@/components";

import { Image } from "expo-image";
import { Images } from "@/constants";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONTS, useTheme } from "@/providers";
import Animated, { FadeInDown } from "react-native-reanimated";

export const PreOnboardingScreen: ScreenFC<"PreOnboardingScreen"> = ({
  navigation,
}) => {
  const inset = useSafeAreaInsets();
  const { palette, layout } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: inset.top,
          paddingBottom: inset.bottom,
          padding: layout.gutter,
        },
      ]}
    >
      <Image
        contentFit="contain"
        source={Images.landTopView}
        style={styles.imageBg}
      />
      <Animated.View entering={FadeInDown.duration(700)}>
        <ScriptedHeading text="What It Is?" size={48} color={palette.primary} />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Text size={38} font={FONTS.BebasNeue} color={palette.gray + "cc"}>
          Your one-stop{"\n"}Platform for{"\n"}Timely,{"\n"}World-class
          Architectural Visualization
          {"\n"}Services
        </Text>
      </Animated.View>

      <Button
        label="Next"
        onPress={() => navigation.navigate("OnboardingScreen")}
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: inset.bottom,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageBg: {
    position: "absolute",
    right: -500,
    top: 0,
    width: 700,
    height: 700,
    aspectRatio: 1 / 1,
  },
});
