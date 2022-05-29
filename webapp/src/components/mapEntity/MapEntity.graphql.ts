import { MapEntityUpdate } from "components/mapEntity/MapEntity";
import { useCallback, useMemo } from "react";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { graphql, useMutation, useSubscription } from "react-relay";

export function useMapEntityUpdateMutation(id: string) {
  const [commit, isInFlight] = useMutation(graphql`
    mutation MapEntityUpdateMutation($input: MapEntityUpdateInput!) {
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
    (input: MapEntityUpdate) => {
      commit({
        variables: {
          input: {
            id: id,
            mapEntity: input,
          },
        },
        optimisticResponse: {
          updateMapEntity: {
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
          x
          y
          width
          height
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
          debugger;
          const payload = store.getRootField("addMapEntity");
          const newEntity = payload.getLinkedRecord("mapEntity");
          const scene = store.get(selectedScene);
          const existing = scene.getLinkedRecords("entities") || [];
          scene.setLinkedRecords([...existing, newEntity], "entities");
        },
      });
    },
    [commit, selectedScene]
  );
}

export function useMapEntitySubscription() {
  const config = useMemo(
    () => ({
      subscription: graphql`
        subscription MapEntitySubscription {
          mapEntitySubscription {
            payload {
              mapEntity {
                id
                width
                height
                x
                y
              }
            }
          }
        }
      `,
      variables: {},
      onCompleted: () => console.log("Subscription established"),
      onError: (error) => {} /* Subscription errored */,
      onNext: (response) =>
        console.log("Received", response) /* Subscription payload received */,
    }),
    []
  );

  useSubscription(config);
}
