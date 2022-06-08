import { useCallback, useMemo } from "react";

import { useMutation, useSubscription } from "react-relay";

import {
  MapEntityUpdateMutation,
  MapEntityUpdateMutation$variables,
} from "features/mapEntity/__generated__/MapEntityUpdateMutation.graphql";
import { RecordSourceSelectorProxy } from "relay-runtime";
import {
  MapEntityAddMutation,
  MapEntityAddMutation$variables,
} from "features/mapEntity/__generated__/MapEntityAddMutation.graphql";
import {
  MapEntityChangeSubscription,
  MapEntityChangeSubscription$variables,
} from "features/mapEntity/__generated__/MapEntityChangeSubscription.graphql";
import { ACCESS_TOKEN } from "lib/useRefreshToken";
import jwtDecode from "jwt-decode";

const graphql = require("babel-plugin-relay/macro");

interface Subscription {
  variables: any;
  response: any;
}

// export const collectionUpdater = <TSubscription extends Subscription>() => ({
//   update: () => {},
//   add: (store: RecordSourceSelectorProxy) => {
//     const response = Fields<TSubscription>;
//     console.log(response)
//   },
//   delete: (store: RecordSourceSelectorProxy) => {},
// });

export function useMapEntityUpdateMutation() {
  const [commit, isInFlight] = useMutation<MapEntityUpdateMutation>(graphql`
    mutation MapEntityUpdateMutation($input: MapEntitiesUpdateInput!) {
      mapEntityUpdate(input: $input) {
        mapEntity {
          id
          x
          y
          width
          height
        }
      }
    }
  `);

  return useCallback(
    (variables: MapEntityUpdateMutation$variables) => {
      commit({
        variables,
        optimisticResponse: {
          mapEntityUpdate: { mapEntity: variables.input.entities },
        },
      });
    },
    [commit]
  );
}

export function useMapEntityAddMutation() {
  const [commit] = useMutation<MapEntityAddMutation>(graphql`
    mutation MapEntityAddMutation($input: MapEntitiesAddInput!) {
      mapEntityAdd(input: $input) {
        mapEntity {
          id
          x
          y
          width
          height
        }
      }
    }
  `);

  return useCallback(
    (variables: MapEntityAddMutation$variables) => {
      commit({
        variables: variables,
        updater: (store: RecordSourceSelectorProxy, data) => {
          const payload = store.getRootField("mapEntityAdd")!;
          const added = payload.getLinkedRecords("mapEntity")!;
          const scene = store.get(variables.input.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];
          scene.setLinkedRecords([...existing, ...added], "entities");
        },
      });
    },
    [commit]
  );
}

export function useMapEntitySubscription(
  variables: MapEntityChangeSubscription$variables
) {
  const config = useMemo(
    () => ({
      subscription: graphql`
        subscription MapEntityChangeSubscription($sceneId: ID!) {
          mapEntityChanged(sceneId: $sceneId) {
            type
            userId
            payload {
              id
              x
              y
              width
              height
            }
          }
        }
      `,
      variables: variables,
      onCompleted: () => console.log("Subscription established"),
      onError: (error: any) => {} /* Subscription errored */,
      onNext: (response: any) => {} /* Subscription payload received */,
      updater: (store: RecordSourceSelectorProxy) => {
        const result = store.getRootField("mapEntityChanged")!;
        const type = result.getValue("type");
        const userId = result.getValue("userId");
        const token = localStorage.getItem(ACCESS_TOKEN);
        const decoded = jwtDecode(token!) as any;

        if (userId === decoded?.sub) {
          return;
        }
        if (type === "ADD") {
          debugger;
          const newEntities: any = result.getLinkedRecords("payload");

          const scene = store.get(variables.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];

          scene.setLinkedRecords([...existing, ...newEntities], "entities");
        }

        // if (type === "DELETE") {
        //   debugger;
        //   const newEntities: any = result.getLinkedRecords("payload");
        //
        //   const scene = store.get(variables.sceneId)!;
        //   const existing = scene.getLinkedRecords("entities") || [];
        //
        //   scene.setLinkedRecords([...existing, ...newEntities], "entities");
        // }
      },
    }),
    [variables]
  );

  useSubscription<MapEntityChangeSubscription>(config);
}
