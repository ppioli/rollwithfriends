import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "store";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import RelayEnvironment from "../RelayEnvironment";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </Provider>
  );
}

export default MyApp;
