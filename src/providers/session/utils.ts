import * as SecureStore from "expo-secure-store";

import { UserSession } from "./types";

const SESSION_KEY = "__SESSION_KEY__";

export const getPersistedSession = (): UserSession | null => {
  try {
    const session = SecureStore.getItem(SESSION_KEY);
    if (!session) return null;
    return JSON.parse(session) as UserSession;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const persistSession = (session: UserSession): boolean => {
  try {
    SecureStore.setItem(SESSION_KEY, JSON.stringify(session), {
      requireAuthentication: false,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
