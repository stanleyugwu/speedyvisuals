import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

export const useLoadSession = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    SplashScreen.hideAsync();
  }, []);

  return loaded;
};
