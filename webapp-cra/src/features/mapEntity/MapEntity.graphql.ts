import { useCallback, useMemo } from "react";

import { useMutation, useSubscription } from "react-relay";

import {
  MapEntityUpdateMutation,
  MapEntityUpdateMutation$variables,
} from "features/mapEntity/__generated__/MapEntityUpdateMutation.graphql";
import { RecordSourceSelectorProxy } from "relay-runtime";
import {
  MapEntityAddMutation,
  MapEntityAddMutation$data,
  MapEntityAddMutation$variables,
} from "features/mapEntity/__generated__/MapEntityAddMutation.graphql";
import {
  MapEntityChangeSubscription,
  MapEntityChangeSubscription$variables,
} from "features/mapEntity/__generated__/MapEntityChangeSubscription.graphql";
import { ACCESS_TOKEN } from "lib/useRefreshToken";
import jwtDecode from "jwt-decode";
import {
  MapEntityDeleteMutation,
  MapEntityDeleteMutation$variables,
} from "features/mapEntity/__generated__/MapEntityDeleteMutation.graphql";
import {
  MapEntityNpcAddMutation,
  MapEntityNpcAddMutation$variables,
} from "features/mapEntity/__generated__/MapEntityNpcAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

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
    x
    y
    width
    height
    content {
      __typename
      ... on ImageContent {
        fileId
      }
      ... on Npc5EContent {
        npcId
      }
    }
  }
`;

export function useMapEntityUpdateMutation() {
  const [commit] = useMutation<MapEntityUpdateMutation>(graphql`
    mutation MapEntityUpdateMutation($input: MapEntitiesUpdateInput!) {
      mapEntityUpdate(input: $input) {
        mapEntity {
          id
          ...MapEntityPositionFragment
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
  const [_commit] = useMutation<MapEntityAddMutation>(graphql`
    mutation MapEntityAddMutation($input: MapEntitiesAddInput!) {
      mapEntityAdd(input: $input) {
        mapEntity {
          id
          name
          ...MapEntityFragment
          content {
            ... on ImageContent {
              fileId
            }
          }
        }
      }
    }
  `);

  const commit = useCallback(
    (
      variables: MapEntityAddMutation$variables,
      onComplete?: (result: MapEntityAddMutation$data) => void
    ) => {
      _commit({
        variables: variables,
        onCompleted: onComplete,
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField("mapEntityAdd")!;
          const added = payload.getLinkedRecords("mapEntity")!;
          // added.forEach((added, ix) => added.setValue(images[ix].src, "href"));
          const scene = store.get(variables.input.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];
          scene.setLinkedRecords([...existing, ...added], "entities");
        },
      });
    },
    [_commit]
  );

  return commit;
}

export function useMapEntityNpcAddMutation() {
  const [_commit] = useMutation<MapEntityNpcAddMutation>(graphql`
    mutation MapEntityNpcAddMutation($input: MapEntitiesNpcAddInput!) {
      mapEntityNpcAdd(input: $input) {
        mapEntity {
          id
          name
          ...MapEntityFragment
          content {
            ... on Npc5EContent {
              npcId
            }
          }
        }
      }
    }
  `);

  const commit = useCallback(
    (variables: MapEntityNpcAddMutation$variables) =>
      _commit({
        variables: variables,
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField("mapEntityAdd")!;
          const added = payload.getLinkedRecords("mapEntity")!;
          // added.forEach((added, ix) => added.setValue(images[ix].src, "href"));
          const scene = store.get(variables.input.sceneId)!;
          const existing = scene.getLinkedRecords("entities") || [];
          scene.setLinkedRecords([...existing, ...added], "entities");
        },
      }),
    [_commit]
  );
  return commit;
}

export function useMapEntityDeleteMutation() {
  const [commit] = useMutation<MapEntityDeleteMutation>(graphql`
    mutation MapEntityDeleteMutation($input: MapEntityDeleteInput!) {
      mapEntityDelete(input: $input) {
        mapEntity {
          id
        }
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
      // onError: (error: any) => {} /* Subscription errored */,
      // onNext: (response: any) => {} /* Subscription payload received */,
      updater: (store: RecordSourceSelectorProxy) => {
        const result = store.getRootField("mapEntityChanged")!;
        const type = result.getValue("type");
        const userId = result.getValue("userId");
        const token = localStorage.getItem(ACCESS_TOKEN);
        const decoded = jwtDecode(token!) as any;

        if (userId === decoded?.sub) {
          return;
        }

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
