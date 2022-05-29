import { MapEntityAddMutation$data } from "components/mapEntity/__generated__/MapEntityAddMutation.graphql";
import { MapEntityUpdateMutation$data } from "components/mapEntity/__generated__/MapEntityUpdateMutation.graphql";
import { MapEntityUpdate } from "components/mapEntity/MapEntity";
import { useCallback } from "react";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { graphql, useMutation } from "react-relay";

export function useMapEntityUpdateMutation(id: string) {
  const [commit, isInFlight] = useMutation(graphql`
    mutation MapEntityUpdateMutation($input: UpdateMapEntityInput!) {
      updateMapEntity(input: $input) {
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
    mutation MapEntityAddMutation($input: AddMapEntityInput!) {
      addMapEntity(input: $input) {
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
