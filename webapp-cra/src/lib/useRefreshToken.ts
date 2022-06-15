import { ServerUrl } from "lib/getRelayClientEnvironment";
import { useLocalStorage } from "utils/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CredentialResponse } from "@react-oauth/google";

const CREDENTIAL_GRANT = "credential";
const PASSWORD_GRANT = "password";
const LAST_LOGIN_RESPONSE = "LAST_LOGIN_RESPONSE";
export const ACCESS_TOKEN = "ACCESS_TOKEN";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  expires: number;
}

export function useRefreshToken() {
  const [loginData, setLoginData] =
    useLocalStorage<LoginData>(LAST_LOGIN_RESPONSE);

  const { expires, refresh_token, access_token } = loginData ?? {
    expires: null,
    refresh_token: null,
    access_token: null,
  };

  const nextRefresh: number | null = useMemo(() => {
    if (expires == null) {
      return null;
    } else {
      return Math.max(0, expires - new Date().getTime());
    }
  }, [expires]);

  const isExpired = expires === 0;
  // If the next refresh is now, we need to
  const [isLoading, setIsLoading] = useState(isExpired);

  const setResponse = useCallback(
    (response: LoginResponse | null) => {
      if (response == null) {
        setLoginData(null);
        return;
      }
      setLoginData({
        access_token: response.access_token,
        expires: new Date().getTime() + response.expires_in * 1000,
        refresh_token: response.refresh_token,
      });
    },
    [setLoginData]
  );

  if (access_token && !isExpired) {
    localStorage.setItem(ACCESS_TOKEN, access_token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  useEffect(() => {
    if (nextRefresh !== null && refresh_token) {
      const pid = setTimeout(async () => {
        try {
          console.log("Refreshing");
          setResponse(await refreshAccessToken(refresh_token));
        } catch (error) {
          console.error(
            "An error occurred while trying to refresh the access token"
          );
          setLoginData(null);
        }
        if (isLoading) {
          setIsLoading(false);
        }
      }, nextRefresh);

      return () => clearTimeout(pid);
    }
  }, [
    expires,
    isLoading,
    nextRefresh,
    refresh_token,
    setLoginData,
    setResponse,
  ]);

  return {
    isLoading,
    isLoggedIn: access_token !== null,
    setResponse,
  };
}

async function refreshAccessToken(
  refreshToken: string
): Promise<LoginResponse> {
  const params = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  return fetchAccessToken(params);
}

export async function fetchAccessTokenWithCredential({
  credential,
}: CredentialResponse): Promise<LoginResponse> {
  const params = {
    grant_type: CREDENTIAL_GRANT,
    scope: "offline_access",
    credential,
  };

  const response = await fetchAccessToken(params);

  return response as LoginResponse;
}

export async function fetchAccessTokenWithPassword({
  username,
  password,
}: LoginParams): Promise<LoginResponse> {
  const params = {
    username,
    password,
    grant_type: PASSWORD_GRANT,
    scope: "offline_access",
  };

  const response = await fetchAccessToken(params);

  return response as LoginResponse;
}

async function fetchAccessToken(params: any) {
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
