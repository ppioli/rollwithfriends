import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
} from "relay-runtime";

import { getRelaySerializedState } from "relay-nextjs";
import { createClient } from "graphql-ws";

function createSubscription() {
  const wsClient = createClient({
    url: "http://localhost:5289/graphql",
  });

  return (operation, variables) => {
    return Observable.create((sink) => {
      return wsClient.subscribe(
        {
          operationName: operation.name,
          query: operation.text,
          variables,
        },
        sink
      );
    });
  };
}

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
export default function () {
  if (typeof window === "undefined") {
    return null;
  }
  return new Environment({
    network: Network.create(fetchRelay, createSubscription()),
    store: new Store(new RecordSource(getRelaySerializedState()?.records)),
    isServer: false,
  });
}
