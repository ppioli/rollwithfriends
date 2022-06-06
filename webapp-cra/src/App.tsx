import React, { Suspense } from "react";
import { useSessionContext } from "components/LoginContext";
import { RouteRenderer } from "yarr";
import { RelayEnvironmentProvider } from "react-relay";
import { Navbar } from "components/navbar/Navbar";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { Login } from "features/login/Login";

export default function App() {
  const { isLoading, isLoggedIn } = useSessionContext();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <div>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
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
