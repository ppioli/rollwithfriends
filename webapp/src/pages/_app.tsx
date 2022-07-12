// pages/_app.tsx
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";

const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: (token?: string) =>
    getRelayClientEnvironment(token ?? "asdfff")!,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { session, ...props } = pageProps;

  const relayProps = getRelayProps(props, initialPreloadedQuery);
  console.log("relayProps", relayProps);
  const env = relayProps.preloadedQuery?.environment;
  console.log("env", env);
  const ee = getRelayClientEnvironment(props.token)!;
  console.log("ee", ee);

  return (
    <SessionProvider session={session}>
      <RelayEnvironmentProvider environment={env}>
        <Component {...pageProps} {...relayProps} />
      </RelayEnvironmentProvider>
    </SessionProvider>
  );
}

export default MyApp;
