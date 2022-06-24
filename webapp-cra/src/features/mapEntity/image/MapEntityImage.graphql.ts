import { commitMutation } from "react-relay";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import {
  MapEntityImageAddMutation,
  MapEntityImageAddMutation$data,
  MapEntityImageAddMutation$variables,
} from "features/mapEntity/image/__generated__/MapEntityImageAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export function mapEntityImageAddMutation(
  variables: MapEntityImageAddMutation$variables,
  onCompleted?: (result: MapEntityImageAddMutation$data) => void
) {
  commitMutation<MapEntityImageAddMutation>(RelayEnvironment, {
    mutation: graphql`
      mutation MapEntityImageAddMutation($input: MapEntitiesImageAddInput!) {
        mapEntityImageAdd(input: $input) {
          mapEntity {
            id
            name
            content {
              ... on ImageContent {
                fileId
              }
            }
            ...MapEntityFragment
          }
        }
      }
    `,
    variables,
    onCompleted,
    updater: (store: RecordSourceSelectorProxy) => {
      const payload = store.getRootField("mapEntityImageAdd")!;
      const added = payload.getLinkedRecords("mapEntity")!;
      // added.forEach((added, ix) => added.setValue(images[ix].src, "href"));
      const scene = store.get(variables.input.sceneId)!;
      const existing = scene.getLinkedRecords("entities") || [];
      scene.setLinkedRecords([...existing, ...added], "entities");
    },
  });
}
