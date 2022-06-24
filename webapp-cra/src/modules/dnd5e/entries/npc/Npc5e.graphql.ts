import { commitMutation } from "react-relay";

import { FileUploadDefinition } from "utils/HttpHelpers";
import { Npc5eAddMutation } from "modules/dnd5e/__generated__/Npc5eAddMutation.graphql";
import { CommitMutationFunction } from "utils/mutationPromise";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";

const graphql = require("babel-plugin-relay/macro");

export const entryNpc5eAddMutation: CommitMutationFunction<Npc5eAddMutation> = (
  variables,
  onCompleted
) =>
  commitMutation<Npc5eAddMutation>(RelayEnvironment, {
    mutation: graphql`
      mutation Npc5eAddMutation($input: Npcs5EAddInput!) {
        npcs5EAdd(input: $input) {
          nonPlayerCharacter5E {
            id
            avatarId
            name
          }
        }
      }
    `,
    variables,
    onCompleted,
  });

export const findImage = (
  avatarId: number,
  name: string,
  images: File[]
): FileUploadDefinition | null => {
  const file = images.find((i) => i.name.startsWith(name));

  if (file == null) {
    return null;
  }

  return {
    file,
    id: avatarId,
  };
};
