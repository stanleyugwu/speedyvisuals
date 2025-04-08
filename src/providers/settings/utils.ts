import * as SecureStore from "expo-secure-store";

import { SettingsData } from "./types";

const SETTINGS_KEY = "__settings_key__";

export const getPersistedSettings = (): SettingsData | null => {
  try {
    const settings = SecureStore.getItem(SETTINGS_KEY);
    if (!settings) return null;
    return JSON.parse(settings);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const persistSettings = (settings: SettingsData): boolean => {
  try {
    SecureStore.setItem(SETTINGS_KEY, JSON.stringify(settings), {
      requireAuthentication: false,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
