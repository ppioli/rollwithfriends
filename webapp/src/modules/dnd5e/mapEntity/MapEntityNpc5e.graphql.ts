import { commitMutation } from "react-relay";
import { RecordSourceSelectorProxy } from "relay-runtime";
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";

import { graphql } from "relay-runtime";
import { MapEntityNpc5eAddMutation$variables } from "__generated__/MapEntityNpc5eAddMutation.graphql";

export function mapEntityNpc5eAddMutation(
  variables: MapEntityNpc5eAddMutation$variables
) {
  commitMutation(getRelayClientEnvironment(), {
    mutation: graphql`
      mutation MapEntityNpc5eAddMutation($input: MapEntitiesNpc5EAddInput!) {
        mapEntityNpc5EAdd(input: $input) {
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
    `,
    variables,
    updater: (store: RecordSourceSelectorProxy) => {
      const payload = store.getRootField("mapEntityNpc5EAdd")!;
      const added = payload.getLinkedRecords("mapEntity")!;
      // added.forEach((added, ix) => added.setValue(images[ix].src, "href"));
      const scene = store.get(variables.input.sceneId)!;
      const existing = scene.getLinkedRecords("entities") || [];
      scene.setLinkedRecords([...existing, ...added], "entities");
    },
  });
}
