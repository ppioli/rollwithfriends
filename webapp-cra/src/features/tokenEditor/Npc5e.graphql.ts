import { readInlineData, useMutation } from "react-relay";
import {
  Npc5eAddMutation,
  Npc5eAddMutation$data,
  NpcAddInput,
} from "features/tokenEditor/__generated__/Npc5eAddMutation.graphql";
import { Npc5e_npc5e$key } from "features/tokenEditor/__generated__/Npc5e_npc5e.graphql";
import { FileUploadDefinition } from "utils/HttpHelpers";

const graphql = require("babel-plugin-relay/macro");

export const Npc5e = graphql`
  fragment Npc5e_npc5e on NonPlayerCharacter5E @inline {
    name
    page
    sourceId
    avatarId
    source {
      shortName
    }
    type {
      label
      tags
    }
    hitPointsFormula
    hitPointsAverage
    armorClasses {
      description
      armorClass
    }
    challangeRating
    alignments
    sizes
    savingThrows {
      key
      value
    }
    skills {
      key
      value
    }
    languages {
      name
    }
    senses {
      description
      range
    }
    passivePerception
    resistances {
      condition
      types
    }
    speeds {
      walk
      fly
      swim
    }
    strength
    dexterity
    constitution
    intelligence
    wisdom
    charisma
  }
`;

export const Npc5eAdd = graphql`
  mutation Npc5eAddMutation($input: Npcs5EAddInput!) {
    npcs5EAdd(input: $input) {
      nonPlayerCharacter5E {
        id
        ...Npc5e_npc5e
      }
    }
  }
`;

export const findImage = (
  fragment: Npc5e_npc5e$key,
  images: File[]
): FileUploadDefinition | null => {
  // non-React function called from React
  const added = readInlineData<Npc5e_npc5e$key>(Npc5e, fragment);
  const file = images.find((i) => i.name.startsWith(added.name));

  if (file == null) {
    return null;
  }

  return {
    file,
    id: added.avatarId,
  };
};

export function useNpc5EAddPromise() {
  const [commit] = useMutation<Npc5eAddMutation>(Npc5eAdd);

  return (sourceId: string, npcs: NpcAddInput[]) =>
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
