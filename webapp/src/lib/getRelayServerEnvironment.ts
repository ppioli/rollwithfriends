// your-app-name/src/RelayEnvironment.js
import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
} from "relay-runtime";

import { createClient } from "graphql-ws";
import WebSocket from "ws";

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text, variables) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("http://localhost:5289/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params, variables) {
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export default function getRelayServerEnvironment() {
  console.log("Executing on server");
  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
