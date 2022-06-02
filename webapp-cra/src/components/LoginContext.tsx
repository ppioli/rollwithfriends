import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { ACCESS_TOKEN } from "lib/useRefreshToken";

interface SessionContextState {
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  tokenRef: MutableRefObject<string | null>;
}

const DefaultSessionState: SessionContextState = {
  isLoggedIn: false,
  tokenRef: null as any,
  login: () => console.error("Session not initialized"),
  logout: () => console.error("Session not initialized"),
};

const SessionContext =
  React.createContext<SessionContextState>(DefaultSessionState);

interface SessionContextProviderProps {
  children: ReactNode;
}

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const tokenRef = useRef<string | null>(localStorage.getItem(ACCESS_TOKEN));
  const [isLoggedIn, setLoggedIn] = useState(tokenRef.current !== null);

  const login = useCallback((token: string) => {
    tokenRef.current = token;
    setLoggedIn(true);
    localStorage.setItem(ACCESS_TOKEN, token);
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    tokenRef.current = null;
    localStorage.removeItem(ACCESS_TOKEN);
  }, []);

  const value = {
    login,
    logout,
    isLoggedIn,
    tokenRef,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
