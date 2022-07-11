// pages/_app.tsx
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { SessionProvider, signIn } from "next-auth/react";

const clientEnv = getRelayClientEnvironment();

const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getRelayClientEnvironment()!,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { session, ...props } = pageProps;
  const relayProps = getRelayProps(props, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <SessionProvider session={session}>
      <RelayEnvironmentProvider environment={env}>
        <Component {...pageProps} {...relayProps} />
      </RelayEnvironmentProvider>
    </SessionProvider>
  );
}

export default MyApp;
