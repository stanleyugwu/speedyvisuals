import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { FONTS } from "@/providers";

SplashScreen.preventAutoHideAsync();

export function useLoadedAssets() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync(Ionicons.font);
        await Font.loadAsync({
          [FONTS.JustAnotherHand]: require("../../assets/fonts/just_another_hand/JustAnotherHand-Regular.ttf"),
          [FONTS.BebasNeue]: require("../../assets/fonts/bebas_neue/BebasNeue-Regular.ttf"),
          [FONTS.InterRegular]: require("../../assets/fonts/inter/Inter_18pt-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
