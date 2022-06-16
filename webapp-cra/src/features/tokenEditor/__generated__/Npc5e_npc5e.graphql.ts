/**
 * @generated SignedSource<<5113f7f09b2f09cf4fe2cac15f5199a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { FragmentRefs, ReaderFragment } from "relay-runtime";

export type Ability = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Alignment = "UNALIGNED" | "CHAOTIC_GOOD" | "NEUTRAL_GOOD" | "LAWFUL_GOOD" | "CHAOTIC_NEUTRAL" | "TRUE_NEUTRAL" | "LAWFUL_NEUTRAL" | "CHAOTIC_EVIL" | "NEUTRAL_EVIL" | "LAWFUL_EVIL" | "%future added value";
export type DamageType = "BLUDGEONING" | "PIERCING" | "SLASHING" | "ACID" | "%future added value";
export type Size = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
export type Skill = "ACROBATICS" | "ANIMAL_HANDLING" | "ARCANA" | "ATHLETICS" | "DECEPTION" | "HISTORY" | "INSIGHT" | "INTIMIDATION" | "INVESTIGATION" | "MEDICINE" | "NATURE" | "PERCEPTION" | "PERFORMANCE" | "PERSUASION" | "RELIGION" | "SLEIGHT_OF_HAND" | "STEALTH" | "SURVIVAL" | "%future added value";
export type Npc5e_npc5e$data = {
  readonly name: string;
  readonly page: number;
  readonly sourceId: number;
  readonly source: {
    readonly shortName: string;
  } | null;
  readonly type: {
    readonly label: string;
    readonly tags: ReadonlyArray<string> | null;
  };
  readonly hitPointsFormula: string;
  readonly hitPointsAverage: number;
  readonly armorClasses: ReadonlyArray<{
    readonly description: string;
    readonly armorClass: number;
  }>;
  readonly challangeRating: number;
  readonly alignments: ReadonlyArray<Alignment>;
  readonly sizes: ReadonlyArray<Size>;
  readonly savingThrows: ReadonlyArray<{
    readonly key: Ability;
    readonly value: number;
  }>;
  readonly skills: ReadonlyArray<{
    readonly key: Skill;
    readonly value: number;
  }>;
  readonly languages: ReadonlyArray<{
    readonly name: string;
  }>;
  readonly senses: ReadonlyArray<{
    readonly description: string;
    readonly range: number;
  }>;
  readonly passivePerception: number;
  readonly resistances: ReadonlyArray<{
    readonly condition: string | null;
    readonly types: ReadonlyArray<DamageType>;
  }>;
  readonly speeds: {
    readonly walk: number | null;
    readonly fly: number | null;
    readonly swim: number | null;
  };
  readonly strength: number;
  readonly dexterity: number;
  readonly constitution: number;
  readonly intelligence: number;
  readonly wisdom: number;
  readonly charisma: number;
  readonly " $fragmentType": "Npc5e_npc5e";
};
export type Npc5e_npc5e$key = {
  readonly " $data"?: Npc5e_npc5e$data;
  readonly " $fragmentSpreads": FragmentRefs<"Npc5e_npc5e">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v2 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Npc5e_npc5e",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "page",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sourceId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Source",
      "kind": "LinkedField",
      "name": "source",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortName",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hitPointsFormula",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hitPointsAverage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArmorClassOption",
      "kind": "LinkedField",
      "name": "armorClasses",
      "plural": true,
      "selections": [
        (v1/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "challangeRating",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alignments",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sizes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePairOfAbilityAndInt32",
      "kind": "LinkedField",
      "name": "savingThrows",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePairOfSkillAndInt32",
      "kind": "LinkedField",
      "name": "skills",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Language",
      "kind": "LinkedField",
      "name": "languages",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sense",
      "kind": "LinkedField",
      "name": "senses",
      "plural": true,
      "selections": [
        (v1/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "passivePerception",
      "storageKey": null
    },
    {
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
    {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "strength",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dexterity",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "constitution",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "intelligence",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "wisdom",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "charisma",
      "storageKey": null
    }
  ],
  "type": "NonPlayerCharacter5E",
  "abstractKey": null
};
})();

(node as any).hash = "5c1253b301aec4b46dfbe80dbaaaf8ef";

export default node;
