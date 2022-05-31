import { ServerUrl } from "lib/getRelayClientEnvironment";
import { useLocalStorage } from "utils/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const EXPIRES_IN = "EXPIRES_IN";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

interface UseSessionOpts {
  onRefresh: (refreshToken: string) => Promise<LoginResponse>;
}

function useSession({ onRefresh }: UseSessionOpts) {
  const tokenRef = useRef<string | null>(null);
  const [refreshToken, setRefreshToken] = useLocalStorage(REFRESH_TOKEN);
  const [loginIn, setLoginIn] = useState(refreshToken !== null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const setSession = useCallback(
    (response: LoginResponse) => {
      tokenRef.current = response.access_token;
      console.log(tokenRef.current);
      setRefreshToken(response.refresh_token);
      setExpiresIn(response.expires_in);
      setLoggedIn(true);
    },
    [setRefreshToken]
  );

  const clearSession = useCallback(() => {
    tokenRef.current = null;
    setRefreshToken(null);
    setExpiresIn(null);
    setLoggedIn(false);
  }, [setRefreshToken]);

  const refresh = useCallback(
    (refreshToken: string) => {
      return onRefresh(refreshToken)
        .then((r) => {
          setSession(r);
        })
        .catch((e) => {
          console.error("An error occurred while updating the access token", e);
          clearSession();
        });
    },
    [clearSession, onRefresh, setSession]
  );

  useEffect(() => {
    if (refreshToken == null) {
      return;
    }
    // const nextRefresh = expiresIn && expiresIn - new Date().getTime() > 0
    if (expiresIn == null) {
      console.log("Initial token fetch");
      refresh(refreshToken).then(() => setLoginIn(false));
      return;
    }

    const pid = setTimeout(async () => {
      console.log(`Next refresh in ${expiresIn} seconds`);
      await refresh(refreshToken);
    }, expiresIn * 1000);

    return () => clearTimeout(pid);
  }, [expiresIn, onRefresh, refresh, refreshToken]);

  return {
    loggedIn,
    loginIn,
    tokenRef,
    setSession,
    clearSession,
  };
}

export function useRefreshToken() {
  const { setSession, clearSession, ...rest } = useSession({
    onRefresh: refreshAccessToken,
  });

  const login = useCallback(
    (params: LoginParams) => {
      fetchAccessToken(params).then(setSession);
    },
    [setSession]
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  return {
    ...rest,
    login,
    logout,
  };
}

async function refreshAccessToken(
  refreshToken: string
): Promise<LoginResponse> {
  const params = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  return await fetch(`${ServerUrl}/connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(params).toString(),
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw res.text();
    }
  });
}

async function fetchAccessToken({
  username,
  password,
}: LoginParams): Promise<LoginResponse> {
  const params = {
    username,
    password,
    grant_type: "password",
    scope: "offline_access",
  };

  console.log("Login params", params);
  const response = await fetch(`${ServerUrl}/connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(params).toString(),
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw res.text();
    }
  });

  return response as LoginResponse;
}
