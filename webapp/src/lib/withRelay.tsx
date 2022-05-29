import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import getServerEnvironment from "lib/getRelayServerEnvironment";
import { withRelay } from "relay-nextjs";

function Loading() {
  return <div>Loading...</div>;
}

export const enhancer = (Page, Query) =>
  withRelay(Page, Query, {
    // Fallback to render while the page is loading.
    // This property is optional.
    fallback: <Loading />,
    // Create a Relay environment on the client-side.
    // Note: This function must always return the same value.
    createClientEnvironment: () => getRelayClientEnvironment()!,
    // Gets server side props for the page.
    serverSideProps: async (ctx) => {},
    // Server-side props can be accessed as the second argument
    // to this function.
    createServerEnvironment: () => getServerEnvironment(),
  });
