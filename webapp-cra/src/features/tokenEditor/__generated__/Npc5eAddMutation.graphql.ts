/**
 * @generated SignedSource<<9ff6ada19ab7be8e0b7a1e3b1ae853a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"Npc5e_npc5e">;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sourceId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarId",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "NpcType",
  "kind": "LinkedField",
  "name": "type",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tags",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hitPointsFormula",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hitPointsAverage",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "ArmorClassOption",
  "kind": "LinkedField",
  "name": "armorClasses",
  "plural": true,
  "selections": [
    (v11/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "armorClass",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "challangeRating",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alignments",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizes",
  "storageKey": null
},
v16 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "key",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePairOfAbilityAndInt32",
  "kind": "LinkedField",
  "name": "savingThrows",
  "plural": true,
  "selections": (v16/*: any*/),
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePairOfSkillAndInt32",
  "kind": "LinkedField",
  "name": "skills",
  "plural": true,
  "selections": (v16/*: any*/),
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Language",
  "kind": "LinkedField",
  "name": "languages",
  "plural": true,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Sense",
  "kind": "LinkedField",
  "name": "senses",
  "plural": true,
  "selections": [
    (v11/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "range",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "passivePerception",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "Resistance",
  "kind": "LinkedField",
  "name": "resistances",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "condition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "types",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "Speed",
  "kind": "LinkedField",
  "name": "speeds",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "walk",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fly",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "swim",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "strength",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dexterity",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "constitution",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intelligence",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wisdom",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "charisma",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Npc5eAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "kind": "InlineDataFragmentSpread",
                "name": "Npc5e_npc5e",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Source",
                    "kind": "LinkedField",
                    "name": "source",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/)
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Npc5eAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Source",
                "kind": "LinkedField",
                "name": "source",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "81dc3a660ac8879e4fa5db6c28412402",
    "id": null,
    "metadata": {},
    "name": "Npc5eAddMutation",
    "operationKind": "mutation",
    "text": "mutation Npc5eAddMutation(\n  $input: Npcs5EAddInput!\n) {\n  npcs5EAdd(input: $input) {\n    nonPlayerCharacter5E {\n      id\n      ...Npc5e_npc5e\n    }\n  }\n}\n\nfragment Npc5e_npc5e on NonPlayerCharacter5E {\n  name\n  page\n  sourceId\n  avatarId\n  source {\n    shortName\n    id\n  }\n  type {\n    label\n    tags\n  }\n  hitPointsFormula\n  hitPointsAverage\n  armorClasses {\n    description\n    armorClass\n  }\n  challangeRating\n  alignments\n  sizes\n  savingThrows {\n    key\n    value\n  }\n  skills {\n    key\n    value\n  }\n  languages {\n    name\n  }\n  senses {\n    description\n    range\n  }\n  passivePerception\n  resistances {\n    condition\n    types\n  }\n  speeds {\n    walk\n    fly\n    swim\n  }\n  strength\n  dexterity\n  constitution\n  intelligence\n  wisdom\n  charisma\n}\n"
  }
};
})();

(node as any).hash = "06261549d9104be3355ffab79f8a0df6";

export default node;
