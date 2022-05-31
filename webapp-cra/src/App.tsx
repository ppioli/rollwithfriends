import React, { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { Campaign } from "features/campaign/Campaign";
import { Loading } from "components/Loading";
import { createRelayEnvironment } from "lib/getRelayClientEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { Login } from "components/Login";
import { CredentialResponse } from "@react-oauth/google";

export default function App() {
  const tokenRef = useRef<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useCallback((response: CredentialResponse) => {
    if (response.credential) {
      setLoggedIn(true);
      tokenRef.current = response.credential;
    }
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    tokenRef.current = null;
  }, []);

  const relayEnvironment = useMemo(() => {
    return createRelayEnvironment(tokenRef);
  }, [tokenRef]);

  const content = !loggedIn ? (
    <Login onLogin={login} />
  ) : (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<CampaignSelect />} />
        <Route path="/campaign/:campaignId" element={<Campaign />} />
      </Routes>
    </Suspense>
  );
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
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

function Home() {
  return <h2>Welcome</h2>;
}
