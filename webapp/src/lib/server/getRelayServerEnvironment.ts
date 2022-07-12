// your-app-name/src/RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from "relay-runtime";

// your-app-name/src/fetchGraphQL.js
const createFetchRelay = (token: string) => async (params, variables) => {
  // Fetch data from GitHub's GraphQL API:
  console.log("Requesting with ", token, params, variables);
  const response = await fetch("http://localhost:5289/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
};

// Export a singleton instance of Relay Environment configured with our network function:
export default function getRelayServerEnvironment(token) {
  return new Environment({
    network: Network.create(createFetchRelay(token)),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
