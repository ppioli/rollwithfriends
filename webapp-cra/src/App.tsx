import React from "react";
import { useSessionContext } from "components/LoginContext";
import { RouteRenderer } from "yarr";
import { RelayEnvironmentProvider } from "react-relay";
import { Navbar } from "components/navbar/Navbar";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { Login } from "pages/login/Login";

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

        <RouteRenderer routeWrapper={({ Route }) => Route} />
      </RelayEnvironmentProvider>
    </div>
  );
}
