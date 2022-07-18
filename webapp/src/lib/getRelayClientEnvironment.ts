import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
} from "relay-runtime";

import { getRelaySerializedState } from "relay-nextjs";
import { createClient } from "graphql-ws";
import { appFetch, ServerUrl } from "lib/appFetch";

const createFetchGql = () => async (params, variables) => {
  return appFetch({
    url: "graphql",
    method: "POST",
    payload: {
      query: params.text,
      variables,
    },
  });
};

function createSubscription() {
  const wsClient = createClient({
    url: `${ServerUrl}/graphql`,
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

// Export a singleton instance of Relay Environment configured with our network function:
let clientEnv: Environment | undefined;
export default function getRelayClientEnvironment() {
  if (typeof window === "undefined") return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: Network.create(createFetchGql(), createSubscription()),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    });
  }

  return clientEnv;
}
