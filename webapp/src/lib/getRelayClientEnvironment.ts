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
const createFetchGql = (token?: string) => async (params, variables) => {
  // Fetch data from GitHub's GraphQL API:
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch("http://localhost:5289/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
};

// Export a singleton instance of Relay Environment configured with our network function:
let clientEnv: Environment | undefined;
export default function getRelayClientEnvironment(token?: string) {
  if (typeof window === "undefined") return null;

  if (clientEnv == null) {
    console.log("Creating client environment", token);
    clientEnv = new Environment({
      network: Network.create(createFetchGql(token), createSubscription()),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    });
  }

  return clientEnv;
}
