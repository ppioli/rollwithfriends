/**
 * @generated SignedSource<<cfc0e532a2fe7e96c733879152f7a839>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Ability5E = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Alignment5E = "ANY" | "UNALIGNED" | "CHAOTIC_GOOD" | "NEUTRAL_GOOD" | "LAWFUL_GOOD" | "CHAOTIC_NEUTRAL" | "TRUE_NEUTRAL" | "LAWFUL_NEUTRAL" | "CHAOTIC_EVIL" | "NEUTRAL_EVIL" | "LAWFUL_EVIL" | "%future added value";
export type DamageType5E = "BLUDGEONING" | "PIERCING" | "SLASHING" | "ACID" | "%future added value";
export type Size5E = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
export type Skill = "ACROBATICS" | "ANIMAL_HANDLING" | "ARCANA" | "ATHLETICS" | "DECEPTION" | "HISTORY" | "INSIGHT" | "INTIMIDATION" | "INVESTIGATION" | "MEDICINE" | "NATURE" | "PERCEPTION" | "PERFORMANCE" | "PERSUASION" | "RELIGION" | "SLEIGHT_OF_HAND" | "STEALTH" | "SURVIVAL" | "%future added value";
export type Npcs5EAddInput = {
  sourceId: string;
  characters: ReadonlyArray<Npc5EInput>;
};
export type Npc5EInput = {
  id: string;
  sourceId: any;
  ownerId: any;
  avatar: AppFileInput;
  page: number;
  type: NpcType5EInput;
  hitPointsFormula: string;
  hitPointsAverage: number;
  armorClasses: ReadonlyArray<ArmorClassOption5EInput>;
  challangeRating: number;
  alignments: ReadonlyArray<Alignment5E>;
  sizes: ReadonlyArray<Size5E>;
  savingThrows: ReadonlyArray<KeyValuePairOfAbility5EAndInt32Input>;
  skills: ReadonlyArray<KeyValuePairOfSkillAndInt32Input>;
  name: string;
  languages: ReadonlyArray<Language5EInput>;
  senses: ReadonlyArray<Sense5EInput>;
  passivePerception: number;
  resistances: ReadonlyArray<Resistance5EInput>;
  speeds: Speed5EInput;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};
export type AppFileInput = {
  id: string;
  ownerId: string;
};
export type NpcType5EInput = {
  label: string;
  tags?: ReadonlyArray<string> | null;
};
export type ArmorClassOption5EInput = {
  armorClass: number;
  description: string;
};
export type KeyValuePairOfAbility5EAndInt32Input = {
  key: Ability5E;
  value: number;
};
export type KeyValuePairOfSkillAndInt32Input = {
  key: Skill;
  value: number;
};
export type Language5EInput = {
  name: string;
};
export type Sense5EInput = {
  description: string;
  range: number;
};
export type Resistance5EInput = {
  types: ReadonlyArray<DamageType5E>;
  condition?: string | null;
};
export type Speed5EInput = {
  walk?: number | null;
  swim?: number | null;
  fly?: number | null;
};
export type Npc5eAddMutation$variables = {
  input: Npcs5EAddInput;
};
export type Npc5eAddMutation$data = {
  readonly npcs5EAdd: {
    readonly npc5E: ReadonlyArray<{
      readonly id: string;
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
        "concreteType": "Npc5E",
        "kind": "LinkedField",
        "name": "npc5E",
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
    "cacheID": "00b50b2306ce9a534f43aa21a928600a",
    "id": null,
    "metadata": {},
    "name": "Npc5eAddMutation",
    "operationKind": "mutation",
    "text": "mutation Npc5eAddMutation(\n  $input: Npcs5EAddInput!\n) {\n  npcs5EAdd(input: $input) {\n    npc5E {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "feade85765480ba45f8b08272dfd61db";

export default node;
