// pages/_app.tsx
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";

const clientEnv = getRelayClientEnvironment();

const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getRelayClientEnvironment()!,
});

function MyApp({ Component, pageProps }: AppProps) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <>
      <RelayEnvironmentProvider environment={env}>
        <Component {...pageProps} {...relayProps} />
      </RelayEnvironmentProvider>
    </>
  );
}

export default MyApp;
