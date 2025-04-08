import { FONTS } from "@/providers";
import { makeUseStyles } from "@/utils";
import {
  TextInputProps as BaseInputProps,
  TextInput as BaseInput,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export interface TextInputProps extends BaseInputProps {}

export const TextInput: React.FC<TextInputProps> = ({
  style,
  ...otherProps
}) => {
  const { styles, palette } = useStyles();
  return (
    <BaseInput
      placeholderTextColor={palette.text + "88"}
      style={[styles.container, style]}
      {...otherProps}
    />
  );
};

const useStyles = makeUseStyles(({ palette }) => ({
  container: {
    borderWidth: 1,
    padding: "14@s",
    fontSize: "14@s",
    color: palette.text,
    fontFamily: FONTS.InterRegular,
    borderColor: palette.border,
  },
}));
