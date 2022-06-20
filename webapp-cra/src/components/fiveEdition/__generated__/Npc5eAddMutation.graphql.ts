/**
 * @generated SignedSource<<4943137601ad93d6f39192ec88173d59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Ability = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Alignment = "UNALIGNED" | "CHAOTIC_GOOD" | "NEUTRAL_GOOD" | "LAWFUL_GOOD" | "CHAOTIC_NEUTRAL" | "TRUE_NEUTRAL" | "LAWFUL_NEUTRAL" | "CHAOTIC_EVIL" | "NEUTRAL_EVIL" | "LAWFUL_EVIL" | "%future added value";
export type DamageType = "BLUDGEONING" | "PIERCING" | "SLASHING" | "ACID" | "%future added value";
export type Size = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
export type Skill = "ACROBATICS" | "ANIMAL_HANDLING" | "ARCANA" | "ATHLETICS" | "DECEPTION" | "HISTORY" | "INSIGHT" | "INTIMIDATION" | "INVESTIGATION" | "MEDICINE" | "NATURE" | "PERCEPTION" | "PERFORMANCE" | "PERSUASION" | "RELIGION" | "SLEIGHT_OF_HAND" | "STEALTH" | "SURVIVAL" | "%future added value";
export type Npcs5EAddInput = {
  sourceId: string;
  characters: ReadonlyArray<NpcAddInput>;
};
export type NpcAddInput = {
  page: number;
  type: NpcTypeInput;
  hitPointsFormula: string;
  hitPointsAverage: number;
  armorClasses: ReadonlyArray<ArmorClassOptionInput>;
  challangeRating: number;
  alignments: ReadonlyArray<Alignment>;
  sizes: ReadonlyArray<Size>;
  savingThrows: ReadonlyArray<KeyValuePairOfAbilityAndInt32Input>;
  skills: ReadonlyArray<KeyValuePairOfSkillAndInt32Input>;
  name: string;
  languages: ReadonlyArray<LanguageInput>;
  senses: ReadonlyArray<SenseInput>;
  passivePerception: number;
  resistances: ReadonlyArray<ResistanceInput>;
  speeds: SpeedInput;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};
export type NpcTypeInput = {
  label: string;
  tags?: ReadonlyArray<string> | null;
};
export type ArmorClassOptionInput = {
  armorClass: number;
  description: string;
};
export type KeyValuePairOfAbilityAndInt32Input = {
  key: Ability;
  value: number;
};
export type KeyValuePairOfSkillAndInt32Input = {
  key: Skill;
  value: number;
};
export type LanguageInput = {
  name: string;
};
export type SenseInput = {
  description: string;
  range: number;
};
export type ResistanceInput = {
  types: ReadonlyArray<DamageType>;
  condition?: string | null;
};
export type SpeedInput = {
  walk?: number | null;
  swim?: number | null;
  fly?: number | null;
};
export type Npc5eAddMutation$variables = {
  input: Npcs5EAddInput;
};
export type Npc5eAddMutation$data = {
  readonly npcs5EAdd: {
    readonly nonPlayerCharacter5E: ReadonlyArray<{
      readonly id: string;
      readonly avatarId: number;
      readonly name: string;
    }> | null;
  };
};
export type Npc5eAddMutation = {
  variables: Npc5eAddMutation$variables;
  response: Npc5eAddMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Npcs5EAddPayload",
    "kind": "LinkedField",
    "name": "npcs5EAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NonPlayerCharacter5E",
        "kind": "LinkedField",
        "name": "nonPlayerCharacter5E",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Npc5eAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Npc5eAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "676b076a02e4279923fa66e41d091478",
    "id": null,
    "metadata": {},
    "name": "Npc5eAddMutation",
    "operationKind": "mutation",
    "text": "mutation Npc5eAddMutation(\n  $input: Npcs5EAddInput!\n) {\n  npcs5EAdd(input: $input) {\n    nonPlayerCharacter5E {\n      id\n      avatarId\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b4000926aecf44e00179efd884f07790";

export default node;
