import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { UserSession, UserSessionContextData } from "./types";
import { getPersistedSession, persistSession } from "./utils";

const Session = createContext<UserSessionContextData>(
  // @ts-expect-error
  {}
);

export const SessionProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [session, setSession] = useState<UserSession | null>(
    getPersistedSession
  );

  const updateSession = (newSession: Partial<UserSession>) => {
    const payload = { ...session, ...newSession };
    setSession(payload);
    persistSession(payload);
  };

  const value = useMemo<UserSessionContextData>(
    () => ({
      session: session,
      actions: {
        updateSession: updateSession,
      },
    }),
    [session]
  );

  useEffect(() => {
    // verify session expiry
  }, []);

  return <Session.Provider value={value}>{children}</Session.Provider>;
};

export const useSession = () => useContext(Session);
