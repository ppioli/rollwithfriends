import { ServerUrl } from "lib/getRelayClientEnvironment";
import { useLocalStorage } from "utils/hooks";
import { useCallback, useEffect } from "react";

const EXPIRES_IN = "EXPIRES_IN";
const ACCESS_TOKEN = "ACCESS_TOKEN";
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

export function useRefreshToken() {
  const [token, setToken] = useLocalStorage(ACCESS_TOKEN);
  const [refreshToken, setRefreshToken] = useLocalStorage(REFRESH_TOKEN);
  const [expiresIn, setExpiresIn] = useLocalStorage(EXPIRES_IN);

  const login = useCallback(
    async (params: LoginParams) => {
      const response = await fetchAccessToken(params);
      // TODO handle errors
      setToken(response.access_token);
      setRefreshToken(response.refresh_token);
      setExpiresIn(String(response.expires_in));
    },
    [setExpiresIn, setRefreshToken, setToken]
  );

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setExpiresIn(String(null));
  }, [setExpiresIn, setRefreshToken, setToken]);

  useEffect(() => {
    if (expiresIn == null || refreshToken == null) {
      return;
    }
    // const nextRefresh = expiresIn && expiresIn - new Date().getTime() > 0
    const pid = setTimeout(async () => {
      const response = await refreshAccessToken(refreshToken);
      setToken(response.access_token);
      setRefreshToken(response.refresh_token);
      setExpiresIn(String(response.expires_in));
    }, parseInt(expiresIn));

    return () => clearTimeout(pid);
  }, [refreshToken, expiresIn, setToken, setRefreshToken, setExpiresIn]);

  return {
    token,
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
  const response = await fetch(`${ServerUrl}/connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(params).toString(),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw res;
      }
    });

  return response;
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
      throw res;
    }
  });

  return response as LoginResponse;
}
