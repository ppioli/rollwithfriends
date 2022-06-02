import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { Campaign } from "features/campaign/Campaign";
import { Loading } from "components/Loading";
import { createRelayEnvironment } from "lib/getRelayClientEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { Navbar } from "components/navbar/Navbar";
import { useSessionContext } from "components/LoginContext";

export default function App() {
  const { tokenRef } = useSessionContext();

  return (
    <RelayEnvironmentProvider environment={createRelayEnvironment(tokenRef)}>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaign" element={<CampaignSelect />} />
          <Route path="/campaign/:campaignId" element={<Campaign />} />
        </Routes>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

function Home() {
  return <h2>Welcome. This will be your home</h2>;
}

function Dashboard() {
  return <h2>Hi! This is your dashboard</h2>;
}
