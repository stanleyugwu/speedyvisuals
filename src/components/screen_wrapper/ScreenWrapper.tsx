import { StatusBar, StatusBarProps } from "expo-status-bar";
import { ScrollView, ScrollViewProps, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { useTheme } from "@/providers";
import { ImageBackground } from "expo-image";
import { Images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";

export interface ScreenWrapperProps extends ScrollViewProps {
  inSafeArea?: boolean;
  inScrollView?: boolean;
  withBg?: boolean;
  statusBarProps?: StatusBarProps;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  inSafeArea = true,
  inScrollView = true,
  statusBarProps,
  withBg,
  children,
  ...otherProps
}) => {
  const { layout, insets } = useTheme();

  const Children = (
    <View
      style={[
        styles.container,
        inSafeArea ? { bottom: insets.bottom, top: insets.top } : null,
      ]}
    >
      {statusBarProps ? <StatusBar {...statusBarProps} /> : null}
      <ScrollView
        style={[styles.container, { padding: layout.gutter }]}
        scrollEnabled={inScrollView}
        {...otherProps}
      >
        {children}
      </ScrollView>
    </View>
  );

  if (withBg)
    return (
      <ImageBackground source={Images.graphPaper} style={styles.container}>
        <LinearGradient style={styles.container} colors={["#fffc", "#fff"]}>
          {Children}
        </LinearGradient>
      </ImageBackground>
    );
  else return Children;
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
