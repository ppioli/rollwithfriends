import { MapEntityUpdate } from "components/mapEntity/MapEntity";
import { useCallback, useMemo } from "react";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { useMutation, useSubscription } from "react-relay";

const graphql = require("babel-plugin-relay/macro");

export function useMapEntityUpdateMutation(id: string) {
  const [commit, isInFlight] = useMutation(graphql`
    mutation MapEntityUpdateMutation($input: MapEntityUpdateInput!) {
      mapEntityUpdate(input: $input) {
        mapEntity {
          id
          ...MapEntity_Token
        }
      }
    }
  `);

  return useCallback(
    (input: MapEntityUpdate) => {
      commit({
        variables: {
          input: {
            id: id,
            mapEntity: input,
          },
        },
        optimisticResponse: {
          mapEntityUpdate: {
            mapEntity: {
              id: id,
              ...input,
            },
          },
        },
      });
    },
    [id, commit]
  );
}

export function useMapEntityAddMutation(selectedScene: string) {
  const [commit, _] = useMutation(graphql`
    mutation MapEntityAddMutation($input: MapEntityAddInput!) {
      mapEntityAdd(input: $input) {
        mapEntity {
          id
          ...MapEntity_Token
        }
      }
    }
  `);

  return useCallback(
    (input: MapEntityUpdate) => {
      commit({
        variables: {
          input: {
            mapEntity: input,
          },
        },
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField("mapEntityAdd")!;
          const newEntity = payload.getLinkedRecord("mapEntity");
          const scene = store.get(selectedScene)!;
          const existing = scene.getLinkedRecords("entities") || [];
          scene.setLinkedRecords([...existing, newEntity], "entities");
        },
      });
    },
    [commit, selectedScene]
  );
}

export function useMapEntitySubscription(selectedScene: string | null) {
  const config = useMemo(
    () => ({
      subscription: graphql`
        subscription MapEntitySubscription {
          mapEntitySubscription {
            type
            payload {
              mapEntity {
                id
                ...MapEntity_Token
              }
            }
          }
        }
      `,
      variables: {},
      onCompleted: () => console.log("Subscription established"),
      onError: (error: any) => {} /* Subscription errored */,
      onNext: (response: any) => {} /* Subscription payload received */,
      updater: (store: any, ttt: any) => {
        console.log(ttt);
        const result = store.getRootField("mapEntitySubscription")!;
        const type = result.getValue("type");

        if (type === "ADDED") {
          const payload: any = result.getLinkedRecord("payload");
          const newEntity = payload.getLinkedRecord("mapEntity")!;

          const scene = store.get(selectedScene)!;
          const existing = scene.getLinkedRecords("entities") || [];

          scene.setLinkedRecords([...existing, newEntity], "entities");
        }
      },
    }),
    [selectedScene]
  );

  useSubscription(config);
}
