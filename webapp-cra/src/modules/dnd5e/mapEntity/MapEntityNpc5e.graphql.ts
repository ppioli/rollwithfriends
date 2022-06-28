import { commitMutation } from "react-relay";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { MapEntityNpc5eAddMutation$variables } from "modules/dnd5e/mapEntity/__generated__/MapEntityNpc5eAddMutation.graphql";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";

const graphql = require("babel-plugin-relay/macro");

export function mapEntityNpc5eAddMutation(
  variables: MapEntityNpc5eAddMutation$variables
) {
  commitMutation(RelayEnvironment, {
    mutation: graphql`
      mutation MapEntityNpc5eAddMutation($input: MapEntitiesNpcAddInput!) {
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
