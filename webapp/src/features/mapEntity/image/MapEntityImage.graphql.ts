import { commitMutation } from "react-relay";
import { graphql, RecordSourceSelectorProxy } from "relay-runtime";
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import {
  MapEntityImageAddInput,
  MapEntityImageAddMutation,
  MapEntityImageAddMutation$data,
  MapEntityImageAddMutation$variables,
} from "__generated__/MapEntityImageAddMutation.graphql";
import { loadImage } from "utils/imageLoader";
import { FileUploadResult } from "lib/uploadImage";

async function createEntityFromFileUpload(
  upload: FileUploadResult
): Promise<MapEntityImageAddInput> {
  let img = await loadImage(upload.file);
  return {
    x: 10,
    y: 10,
    width: img.width,
    height: img.height,
    name: upload.file.name,
    uploadId: upload.id,
  };
}

export function mutationFromUpload(
  sceneId: string,
  results: FileUploadResult[]
) {
  const promises = results.map((r) => createEntityFromFileUpload(r));

  Promise.all(promises).then((entities) => {
    mapEntityImageAddMutation({
      input: {
        entities,
        sceneId,
      },
    });
  });
}

export function mapEntityImageAddMutation(
  variables: MapEntityImageAddMutation$variables,
  onCompleted?: (result: MapEntityImageAddMutation$data) => void
) {
  commitMutation<MapEntityImageAddMutation>(getRelayClientEnvironment(), {
    mutation: graphql`
      mutation MapEntityImageAddMutation($input: MapEntitiesImageAddInput!) {
        mapEntityImageAdd(input: $input) {
          mapEntity {
            id
            name
            content {
              ... on ImageContent {
                file {
                  id
                }
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
