import { useMutation } from "react-relay";

import { FileUploadDefinition } from "utils/HttpHelpers";
import {
  Npc5EAddInput,
  Npc5eAddMutation,
  Npc5eAddMutation$data,
} from "components/fiveEdition/__generated__/Npc5eAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export const Npc5eAdd = graphql`
  mutation Npc5eAddMutation($input: Npcs5EAddInput!) {
    npcs5EAdd(input: $input) {
      nonPlayerCharacter5E {
        id
        avatarId
        name
      }
    }
  }
`;

export const findImage = (
  avatarId: number,
  name: string,
  images: File[]
): FileUploadDefinition | null => {
  // non-React function called from React
  // const added = readInlineData<NpcCard5e_NonPlayerCharacter5E$key>(
  //   NpcCard5eQuery,
  //   fragment
  // );
  const file = images.find((i) => i.name.startsWith(name));

  if (file == null) {
    return null;
  }

  return {
    file,
    id: avatarId,
  };
};

export function useNpc5EAddPromise() {
  const [commit] = useMutation<Npc5eAddMutation>(Npc5eAdd);

  return (sourceId: string, npcs: Npc5EAddInput[]) =>
    new Promise<Npc5eAddMutation$data>((resolve) =>
      commit({
        variables: {
          input: {
            characters: npcs,
            sourceId: sourceId,
          },
        },
        onCompleted: (response, errors) => resolve(response),
      })
    );
}
