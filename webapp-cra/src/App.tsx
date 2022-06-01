import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { Campaign } from "features/campaign/Campaign";
import { Loading } from "components/Loading";
import { createRelayEnvironment } from "lib/getRelayClientEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { Login } from "components/Login";
import { CredentialResponse } from "@react-oauth/google";
import { useLocalStorage } from "utils/hooks";
import { ACCESS_TOKEN } from "lib/useRefreshToken";
/**
 * {
 *   "ConnectionStrings": {
 *     "DefaultDatabase": "Host=localhost;Database=rollwithfriends;Username=rollwithfriends;Password=rollwithfriends;Port=5444"
 *   },
 *   "Google": {
 *     "ClientId": "1070519198348-icmnc5qde274jv2nv7kav7non3va1oog.apps.googleusercontent.com",
 *     "ClientSecret": "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"
 *   }
 * }
 */
export default function App() {
  const [token, setToken] = useLocalStorage(ACCESS_TOKEN);
  const tokenRef = useRef<string | null>(null);

  const loggedIn = token != null;

  const login = useCallback(
    (response: CredentialResponse) => {
      console.log(response);
      tokenRef.current = response?.credential ?? null;
      if (response.credential) {
        setToken(response.credential);
      }
    },
    [setToken]
  );

  const logout = useCallback(() => {
    tokenRef.current = null;
    setToken(null);
  }, [setToken]);

  const content = !loggedIn ? (
    <Login onLogin={login} />
  ) : (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/campaign" element={<CampaignSelect />} />
        <Route path="/campaign/:campaignId" element={<Campaign />} />
      </Routes>
    </Suspense>
  );
  return (
    <RelayEnvironmentProvider environment={createRelayEnvironment(tokenRef)}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/campaign">Campaigns</Link>
            </li>
            <li>
              {loggedIn && (
                <button type={"button"} onClick={logout}>
                  Log out
                </button>
              )}
            </li>
            {content}
          </ul>
        </nav>
      </div>
    </RelayEnvironmentProvider>
  );
}

function Home({ token }: any) {
  useEffect(() => {
    fetch("http://localhost:5289/api/claims/userInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status >= 200 || res.status < 300) {
          return res.json();
        }
        return res.text();
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return <h2>Welcome </h2>;
}
