import { View } from "react-native";
import { Text, TextProps } from "./Text";
import { SvgUnderline } from "./SvgUnderline";
import { FONTS, useTheme } from "@/providers";

export interface ScriptedTextProps extends Omit<TextProps, "children"> {
  text: string;
}

export const ScriptedHeading: React.FC<ScriptedTextProps> = ({
  text = "",
  color,
  size,
  style,
  ...otherProps
}) => {
  const strokeLen = (text.length * 30) / (100 / size);
  const { palette } = useTheme();

  return (
    <View>
      <Text
        {...otherProps}
        font={FONTS.JustAnotherHand}
        color={color}
        size={size}
      >
        {text}
      </Text>
      <SvgUnderline
        width={strokeLen}
        // @ts-expect-error
        color={style?.color || color || palette.text}
      />
    </View>
  );
};
