import { useMutation } from "react-relay";
import {
  Npc5eAddMutation,
  Npc5eAddMutation$data,
  NpcAddInput,
} from "features/tokenEditor/__generated__/Npc5eAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export const Npc5e = graphql`
  fragment Npc5e_npc5e on NonPlayerCharacter5E {
    name
    page
    sourceId
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
      }
    }
  }
`;

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
