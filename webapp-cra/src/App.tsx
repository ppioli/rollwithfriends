import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { Campaign } from "features/campaign/Campaign";

export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/campaign">Campaigns</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Suspense fallback={"Loading"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<CampaignSelect />} />
          <Route path="/campaign/:campaignId" element={<Campaign />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Home() {
  return <h2>Welcome</h2>;
}
