import {
  Environment,
  FetchFunction,
  Network,
  Observable,
  RecordSource,
  Store,
  SubscribeFunction,
} from "relay-runtime";

import { createClient } from "graphql-ws";

export const ServerAddress = "192.168.137.252:5289";
export const ServerUrl = `http://${ServerAddress}`;
export const ServerWsUrl = `ws://${ServerAddress}`;

function createSubscription(): SubscribeFunction {
  const wsClient = createClient({
    url: `${ServerWsUrl}/graphql`,
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

const createFetchGraphQL =
  (accessToken: string | null): FetchFunction =>
  async (params, variables) => {
    // Fetch data from GitHub's GraphQL API:
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (accessToken !== null) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(`${ServerUrl}/graphql`, {
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
export function createRelayEnvironment(accessToken: string | null) {
  return new Environment({
    network: Network.create(
      createFetchGraphQL(accessToken),
      createSubscription()
    ),
    store: new Store(new RecordSource()),
    isServer: false,
  });
}
