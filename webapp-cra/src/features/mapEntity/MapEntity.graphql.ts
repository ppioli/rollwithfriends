import { useCallback } from "react";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { useMutation } from "react-relay";
import { MapEntityAddInput } from "features/mapEntity/__generated__/MapEntityAddMutation.graphql";
import {
  MapEntityUpdateInput,
  MapEntityUpdateMutation,
} from "features/mapEntity/__generated__/MapEntityUpdateMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export function useMapEntityUpdateMutation() {
  const [commit, isInFlight] = useMutation<MapEntityUpdateMutation>(graphql`
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
    (input: MapEntityUpdateInput) => {
      commit({
        variables: {
          input: input,
        },
        optimisticResponse: {
          mapEntityUpdate: { mapEntity: input },
        },
      });
    },
    [commit]
  );
}

export function useMapEntityAddMutation() {
  const [commit] = useMutation(graphql`
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
    (input: MapEntityAddInput) => {
      commit({
        variables: {
          input: { ...input },
        },
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField("mapEntityAdd")!;
          const newEntity = payload.getLinkedRecord("mapEntity");
          const scene = store.get(input.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];
          scene.setLinkedRecords([...existing, newEntity], "entities");
        },
      });
    },
    [commit]
  );
}

export function useMapEntitySubscription(selectedScene: string | null) {
  // const config = useMemo(
  //   () => ({
  //     subscription: graphql`
  //       subscription MapEntitySubscription {
  //         mapEntitySubscription {
  //           type
  //           payload {
  //             mapEntity {
  //               id
  //               ...MapEntity_Token
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     variables: {},
  //     onCompleted: () => console.log("Subscription established"),
  //     onError: (error: any) => {} /* Subscription errored */,
  //     onNext: (response: any) => {} /* Subscription payload received */,
  //     updater: (store: any, ttt: any) => {
  //       console.log(ttt);
  //       const result = store.getRootField("mapEntitySubscription")!;
  //       const type = result.getValue("type");
  //
  //       if (type === "ADDED") {
  //         const payload: any = result.getLinkedRecord("payload");
  //         const newEntity = payload.getLinkedRecord("mapEntity")!;
  //
  //         const scene = store.get(selectedScene)!;
  //         const existing = scene.getLinkedRecords("entities") || [];
  //
  //         scene.setLinkedRecords([...existing, newEntity], "entities");
  //       }
  //     },
  //   }),
  //   [selectedScene]
  // );
  // useSubscription(config);
}
