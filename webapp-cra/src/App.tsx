import React, { Suspense } from "react";
import { useSessionContext } from "components/LoginContext";
import { RouteRenderer } from "yarr";
import { RelayEnvironmentProvider } from "react-relay";
import { Navbar } from "components/navbar/Navbar";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";

export default function App() {
  return (
    <div>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Navbar />
        <Suspense>
          <RouteRenderer
            pendingIndicator={<p>...pending loading </p>}
            routeWrapper={({ Route }) => (
              <div className={"mx-auto container"}>{Route}</div>
            )}
          />
        </Suspense>
      </RelayEnvironmentProvider>
    </div>
  );
}
