import React, { Suspense, useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { Campaign } from "features/campaign/Campaign";
import { Loading } from "components/Loading";
import { createRelayEnvironment } from "lib/getRelayClientEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { useRefreshToken } from "lib/useRefreshToken";
import { Login } from "components/Login";

export default function App() {
  const { token, login, logout } = useRefreshToken();

  const relayEnvironment = useMemo(() => {
    return createRelayEnvironment(token);
  }, [token]);

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
              {token && (
                <button type={"button"} onClick={logout}>
                  Log out
                </button>
              )}
            </li>
          </ul>
        </nav>
        {!token && <Login onLogin={login} />}
        {token && (
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaign" element={<CampaignSelect />} />
              <Route path="/campaign/:campaignId" element={<Campaign />} />
            </Routes>
          </Suspense>
        )}
      </div>
    </RelayEnvironmentProvider>
  );
}

function Home() {
  return <h2>Welcome</h2>;
}
