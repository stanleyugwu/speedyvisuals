import { BaseColors, ThemeColors } from "./types";

export enum BREAK_POINTS {
  small_mobile = 425, // 425px
  tablet_viewport = 768, // 768px
  desktop_viewport = 1280, // 1280px
}

// All app colorss
export const LIGHT_MODE_COLORS: ThemeColors = {
  card: "#FFFFFF",
  border: "#666666",
  text: "#222222",
  gray: "#444444",
  primary: "#B78C1F",
  success: "#34C759",
  warning: "#FF9500",
  background: "#F6F7FF",
  destructive: "#FF3B30",
  transparent: "transparent",
};

export const DARK_MODE_COLORS: ThemeColors = {
  card: "#FFFFFF",
  border: "#bbbbbb",
  text: "#222222",
  gray: "#444444",
  primary: "#B78C1F",
  success: "#34C759",
  warning: "#FF9500",
  background: "#F6F7FF",
  destructive: "#FF3B30",
  transparent: "transparent",
};

export const BASE_COLORS: BaseColors = {
  black: "#000000",
};

// All app font sizes
export enum FONTS {
  JustAnotherHand = "JustAnotherHand-Regular",
  BebasNeue = "BebasNeue-Regular",
  InterRegular = "Inter_18pt-Regular",
}
