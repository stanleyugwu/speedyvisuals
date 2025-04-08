// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationState,
  Theme,
} from "@react-navigation/native";

import { linking, navigationRef } from "./config";
import { RootNavigator } from "./RootStackNavigator";
import { useTheme } from "@/providers";

export default function Navigation() {
  const { isDarkMode, palette } = useTheme();

  const screenAnalytics = (state?: NavigationState) => {};

  const theme: Theme = {
    dark: isDarkMode,
    colors: {
      background: palette.background,
      border: palette.border,
      card: palette.card,
      notification: "#FF0000",
      primary: palette.primary,
      text: palette.text,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={screenAnalytics}
      linking={linking}
      theme={theme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
