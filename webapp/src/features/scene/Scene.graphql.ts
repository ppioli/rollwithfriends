import { useMutation } from "react-relay";
import { useCallback } from "react";
import { RecordSourceSelectorProxy } from "relay-runtime";

import { graphql } from "relay-runtime";
import { SceneAddMutation as SceneMutationType } from "__generated__/SceneAddMutation.graphql";

export function useSceneAddMutation(): [(campaignId: string) => void, boolean] {
  const [commit, inFlight] = useMutation<SceneMutationType>(graphql`
    mutation SceneAddMutation($input: SceneAddInput!) {
      sceneAdd(input: $input) {
        scene {
          id
          name
        }
      }
    }
  `);

  const cb = useCallback(
    (campaignId: string) =>
      commit({
        variables: {
          input: { name: "New scene", campaignId: campaignId },
        },
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField("sceneAdd")!;
          const newScene = payload.getLinkedRecord("scene");
          const campaign = store.get(campaignId)!;
          const existing = campaign.getLinkedRecords("scenes") || [];
          campaign.setLinkedRecords([...existing, newScene], "scenes");
        },
      }),
    [commit]
  );

  return [cb, inFlight];
}
