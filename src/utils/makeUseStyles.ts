import { useMemo } from "react";

import { ThemeContextData } from "@/providers/theme/types";
import { useTheme } from "@/providers";
import { NamedStyles, ScaledSheet } from "react-native-size-matters";

export function makeUseStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  getStyles: (payload: ThemeContextData) => T
) {
  return () => {
    const theme = useTheme();
    const styles = useMemo(() => ScaledSheet.create(getStyles(theme)), [theme]);

    return { ...theme, styles };
  };
}
