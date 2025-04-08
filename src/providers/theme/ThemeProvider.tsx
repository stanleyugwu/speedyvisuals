import { useWindowDimensions } from "react-native";
import React, { PropsWithChildren, useContext, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSettings } from "../settings";
import {
  BASE_COLORS,
  BREAK_POINTS,
  DARK_MODE_COLORS,
  FONTS,
  LIGHT_MODE_COLORS,
} from "./theme";
import { ThemeContextData } from "./types";

const ThemeContext = React.createContext({});

export const ThemeProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const insets = useSafeAreaInsets();
  const dimension = useWindowDimensions();
  const settings = useSettings();

  const isDarkMode = settings.colorScheme === "dark";

  const theme: ThemeContextData = useMemo(
    () => ({
      insets,
      isDarkMode,
      breakpoints: BREAK_POINTS,
      fonts: FONTS,
      layout: { radius: 10, gutter: 16, screen: dimension },
      palette: isDarkMode
        ? { ...DARK_MODE_COLORS, ...BASE_COLORS }
        : { ...LIGHT_MODE_COLORS, ...BASE_COLORS },
      colors: {
        light: LIGHT_MODE_COLORS,
        dark: DARK_MODE_COLORS,
        base: BASE_COLORS,
      },
    }),
    []
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext) as ThemeContextData;
