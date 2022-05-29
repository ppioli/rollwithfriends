import "../styles/globals.css";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import RelayEnvironment from "../RelayEnvironment";

function MyApp({ Component, pageProps }) {
  return (

      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
  );
}

export default MyApp;
