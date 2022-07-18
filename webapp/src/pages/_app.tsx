// pages/_app.tsx
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";
import { Layout } from "features/Layout";
import { setToken } from "lib/appFetch";
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";

const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getRelayClientEnvironment()!,
});

function MyApp({ Component, pageProps }: AppProps) {
  const props = pageProps;

  const relayProps = getRelayProps(props, initialPreloadedQuery);
  const env =
    relayProps.preloadedQuery?.environment ?? getRelayClientEnvironment()!;

  console.log(" ------ Props -------", props);
  if (props.session) {
    setToken(props.session.accessToken);
  }

  return (
    <SessionProvider session={props.session}>
      <RelayEnvironmentProvider environment={env}>
        <Layout>
          <Component {...pageProps} {...relayProps} />
        </Layout>
      </RelayEnvironmentProvider>
    </SessionProvider>
  );
}

export default MyApp;
