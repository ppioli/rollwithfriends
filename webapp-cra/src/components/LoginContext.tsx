import React, { ReactNode, useCallback, useContext } from "react";

import { LoginResponse, useRefreshToken } from "lib/useRefreshToken";

interface SessionContextState {
  setResponse: (response: LoginResponse) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const DefaultSessionState: SessionContextState = {
  isLoggedIn: false,
  isLoading: false,
  setResponse: () => console.error("Session not initialized"),
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
  const { isLoggedIn, setResponse, isLoading } = useRefreshToken();

  const logout = useCallback(() => {
    setResponse(null);
    // setLoggedIn(false);
    // tokenRef.current = null;
    // localStorage.removeItem(ACCESS_TOKEN);
  }, [setResponse]);

  const value = {
    isLoading,
    setResponse,
    logout,
    isLoggedIn,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
