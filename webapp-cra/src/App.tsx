import React, { Suspense } from "react";
import { createRelayEnvironment } from "lib/getRelayClientEnvironment";
import { useSessionContext } from "components/LoginContext";
import { RouteRenderer } from "yarr";
import { RelayEnvironmentProvider } from "react-relay";
import { Navbar } from "components/navbar/Navbar";

export default function App() {
  const { tokenRef } = useSessionContext();

  return (
    <div>
      <RelayEnvironmentProvider environment={createRelayEnvironment(tokenRef)}>
        <Navbar />
        <Suspense>
          <RouteRenderer
            pendingIndicator={<p>...pending loading </p>}
            routeWrapper={({ Route }) => Route}
          />
        </Suspense>
      </RelayEnvironmentProvider>
    </div>
  );
}
