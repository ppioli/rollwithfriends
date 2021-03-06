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
import { MutableRefObject } from "react";

export const GoogleClientId =
  "1070519198348-icmnc5qde274jv2nv7kav7non3va1oog.apps.googleusercontent.com";
export const ServerAddress = "localhost:5289";
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
  (tokenRef: MutableRefObject<string | null>): FetchFunction =>
  async (params, variables) => {
    // Fetch data from GitHub's GraphQL API:
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (tokenRef.current !== null) {
      headers["Authorization"] = `Bearer ${tokenRef.current}`;
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
export function createRelayEnvironment(
  tokenRef: MutableRefObject<string | null>
) {
  return new Environment({
    network: Network.create(createFetchGraphQL(tokenRef), createSubscription()),
    store: new Store(new RecordSource()),
    isServer: false,
  });
}
