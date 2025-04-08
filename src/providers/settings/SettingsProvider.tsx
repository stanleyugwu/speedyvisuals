import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

import { Settings, SettingsData } from "./types";
import { getPersistedSettings, persistSettings } from "./utils";

const initialSettings: SettingsData = {
  colorScheme: "light",
  onboarded: false,
};

const SettingsContext = createContext<Settings>({
  ...initialSettings,
  actions: {
    updateSettings: () => null,
  },
});

export const SettingsProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SettingsData>(() => {
    const settings = getPersistedSettings();
    return {
      ...initialSettings,
      ...settings,
    };
  });

  const updateSetting = (newSettings: Partial<SettingsData>) => {
    const payload = { ...settings, ...newSettings };
    setSettings(payload);
    persistSettings(payload);
  };

  const value = useMemo<Settings>(
    () => ({
      ...settings,
      actions: {
        updateSettings: updateSetting,
      },
    }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
