import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
  SubscribeFunction,
} from "relay-runtime";

import { createClient } from "graphql-ws";

function createSubscription(): SubscribeFunction {
  const wsClient = createClient({
    url: "ws://localhost:5289/graphql",
  });

  return (operation, variables) => {
    return Observable.create((sink: any) => {
      return wsClient.subscribe(
        {
          operationName: operation.name,
          query: operation.text as unknown as any,
          variables,
        },
        sink
      );
    });
  };
}

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text: any, variables: any) {
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
async function fetchRelay(params: any, variables: any) {
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchRelay, createSubscription()),
    store: new Store(new RecordSource()),
    isServer: false,
  });
}
