import { EdgeInsets } from "react-native-safe-area-context";
import { BREAK_POINTS, FONTS } from "./theme";
import { ScaledSize } from "react-native";

export interface ThemeColors {
  card: string;
  border: string;
  text: string;
  gray: string;
  primary: string;
  success: string;
  warning: string;
  background: string;
  destructive: string;
  transparent: string;
}

export interface BaseColors {
  black: string;
}

export interface ThemeContextData {
  insets: EdgeInsets;
  isDarkMode: boolean;
  breakpoints: typeof BREAK_POINTS;
  fonts: typeof FONTS;
  layout: { radius: number; gutter: number; screen: ScaledSize };
  palette: ThemeColors & BaseColors;
  colors: { light: ThemeColors; dark: ThemeColors; base: BaseColors };
}
