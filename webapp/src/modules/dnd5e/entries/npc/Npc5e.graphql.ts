import { commitMutation } from "react-relay";

import { FileUploadResult } from "lib/uploadImage";
import { CommitMutationFunction } from "utils/mutationPromise";
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";

import { graphql } from "relay-runtime";
import { Npc5eAddMutation } from "__generated__/Npc5eAddMutation.graphql";

export const entryNpc5eAddMutation: CommitMutationFunction<Npc5eAddMutation> = (
  variables,
  onCompleted
) =>
  commitMutation<Npc5eAddMutation>(getRelayClientEnvironment(), {
    mutation: graphql`
      mutation Npc5eAddMutation($input: Npcs5EAddInput!) {
        npcs5EAdd(input: $input) {
          npc5E {
            id
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
): FileUploadResult | null => {
  const file = images.find((i) => i.name.startsWith(name));

  if (file == null) {
    return null;
  }

  return {
    file,
    id: avatarId,
  };
};
