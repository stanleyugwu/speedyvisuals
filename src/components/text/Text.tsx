import {
  Text as BaseText,
  TextProps as BaseTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { scale } from "react-native-size-matters";

import { FONTS, useTheme } from "@/providers";

export interface TextProps extends BaseTextProps {
  color?: TextStyle["color"];
  size?: number;
  font?: FONTS;
  style?: StyleProp<TextStyle & { fontFamily?: keyof typeof FONTS }>;
}

export const Text: React.FC<TextProps> = ({
  style,
  color,
  size = 16,
  font = FONTS.InterRegular,
  ...otherProps
}) => {
  size = scale(size);

  const { palette } = useTheme();
  const _color = color || palette.text;

  return (
    <BaseText
      allowFontScaling
      adjustsFontSizeToFit
      minimumFontScale={0.05}
      maxFontSizeMultiplier={0.05}
      style={[
        {
          color: _color,
          fontSize: size,
          fontFamily: font,
          lineHeight: size + (15 / 100) * size, // size + 15%
        },
        style,
      ]}
      {...otherProps}
    />
  );
};
