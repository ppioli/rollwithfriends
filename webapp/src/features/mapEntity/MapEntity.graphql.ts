import { useCallback, useMemo } from "react";

import { commitMutation, useMutation, useSubscription } from "react-relay";
import { RecordSourceSelectorProxy } from "relay-runtime";
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import { CommitMutationFunction } from "utils/mutationPromise";
import { MapEntityPositionUpdateMutation } from "__generated__/MapEntityPositionUpdateMutation.graphql";
import {
  MapEntityDeleteMutation,
  MapEntityDeleteMutation$variables,
} from "__generated__/MapEntityDeleteMutation.graphql";
import {
  MapEntityChangeSubscription,
  MapEntityChangeSubscription$variables,
} from "__generated__/MapEntityChangeSubscription.graphql";

import { graphql } from "relay-runtime";

const CHANGE_EVENT_UPDATE = "UPDATE";
const CHANGE_EVENT_ADD = "ADD";
const CHANGE_EVENT_DELETE = "DELETE";

export const MapEntityPositionFragment = graphql`
  fragment MapEntityPositionFragment on MapEntity {
    x
    y
    width
    height
  }
`;

export const MapEntityFragment = graphql`
  fragment MapEntityFragment on MapEntity {
    id
    x
    y
    width
    height
    name
    content {
      __typename
      ... on ImageContent {
        file {
          id
        }
      }
      ... on Npc5EContent {
        npcId
        size
        ac
        maximumHp
        currentHp
        temporaryHp
      }
    }
  }
`;

export const mapEntityPositionUpdateMutation: CommitMutationFunction<
  MapEntityPositionUpdateMutation
> = (variables, onCompleted) => {
  commitMutation<MapEntityPositionUpdateMutation>(getRelayClientEnvironment(), {
    mutation: graphql`
      mutation MapEntityPositionUpdateMutation(
        $input: MapEntitiesPositionUpdateInput!
      ) @raw_response_type {
        mapEntityPositionUpdate(input: $input) {
          mapEntity {
            id
            ...MapEntityPositionFragment
          }
        }
      }
    `,
    variables,
    onCompleted,
    optimisticResponse: {
      mapEntityPositionUpdate: {
        mapEntity: variables.input.entities,
      },
    },
  });
};

export function useMapEntityDeleteMutation() {
  const [commit] = useMutation<MapEntityDeleteMutation>(graphql`
    mutation MapEntityDeleteMutation($input: MapEntityDeleteInput!) {
      mapEntityDelete(input: $input) {
        id
      }
    }
  `);

  return useCallback(
    (variables: MapEntityDeleteMutation$variables) => {
      commit({
        variables,
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField("mapEntityDelete")!;
          const deletedIds = payload
            .getLinkedRecords("mapEntity")!
            .map((r) => r.getValue("id") as string);
          const scene = store.get(variables.input.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];
          const remaining = existing.filter(
            (e) => !deletedIds.includes(e.getDataID())
          );
          scene.setLinkedRecords(remaining, "entities");
          deletedIds.forEach((id) => store.delete(id));
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
              ...MapEntityFragment
            }
          }
        }
      `,
      variables: variables,
      onCompleted: () => console.log("Subscription established"),
      updater: (store: RecordSourceSelectorProxy) => {
        const result = store.getRootField("mapEntityChanged")!;
        const type = result.getValue("type");
        const userId = result.getValue("userId");
        // const token = localStorage.getItem(ACCESS_TOKEN);
        // const decoded = jwtDecode(token!) as any;
        // TODO Redo
        // if (userId === decoded?.sub) {
        //   return;
        // }

        if (type === CHANGE_EVENT_UPDATE) {
          // Do nothing, since Relay automatically updates anything with an ID
        }
        if (type === CHANGE_EVENT_ADD) {
          const newEntities: any = result.getLinkedRecords("payload");

          const scene = store.get(variables.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];

          scene.setLinkedRecords([...existing, ...newEntities], "entities");
        }

        if (type === CHANGE_EVENT_DELETE) {
          const newEntities: any[] = result.getLinkedRecords("payload")!;

          const deletedIds = newEntities.map((r) => r.getValue("id") as string);
          const scene = store.get(variables.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];
          const remaining = existing.filter(
            (e) => !deletedIds.includes(e.getDataID())
          );
          scene.setLinkedRecords(remaining, "entities");
          deletedIds.forEach((id) => store.delete(id));
        }
      },
    }),
    [variables]
  );

  useSubscription<MapEntityChangeSubscription>(config);
}
