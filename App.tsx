import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import Navigation from "@/navigation";
import { useLoadedAssets } from "@/hooks";
import { SessionProvider, SettingsProvider, ThemeProvider } from "@/providers";

export default function App() {
  const assetsLoaded = useLoadedAssets();

  if (!assetsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <SessionProvider>
          <SettingsProvider>
            <Navigation />
            <StatusBar />
          </SettingsProvider>
        </SessionProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
