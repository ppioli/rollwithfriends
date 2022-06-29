/**
 * @generated SignedSource<<a1091b33dba32f7102e8727c381ff8c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Ability5E = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Alignment5E = "ANY" | "UNALIGNED" | "CHAOTIC_GOOD" | "NEUTRAL_GOOD" | "LAWFUL_GOOD" | "CHAOTIC_NEUTRAL" | "TRUE_NEUTRAL" | "LAWFUL_NEUTRAL" | "CHAOTIC_EVIL" | "NEUTRAL_EVIL" | "LAWFUL_EVIL" | "%future added value";
export type DamageType5E = "BLUDGEONING" | "PIERCING" | "SLASHING" | "ACID" | "%future added value";
export type Size5E = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
export type Skill = "ACROBATICS" | "ANIMAL_HANDLING" | "ARCANA" | "ATHLETICS" | "DECEPTION" | "HISTORY" | "INSIGHT" | "INTIMIDATION" | "INVESTIGATION" | "MEDICINE" | "NATURE" | "PERCEPTION" | "PERFORMANCE" | "PERSUASION" | "RELIGION" | "SLEIGHT_OF_HAND" | "STEALTH" | "SURVIVAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NpcCard5e_NonPlayerCharacter5E$data = {
  readonly name: string;
  readonly page: number;
  readonly sourceId: number;
  readonly avatarId: number;
  readonly source: {
    readonly shortName: string;
  };
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
  readonly alignments: ReadonlyArray<Alignment5E>;
  readonly sizes: ReadonlyArray<Size5E>;
  readonly savingThrows: ReadonlyArray<{
    readonly key: Ability5E;
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
    readonly types: ReadonlyArray<DamageType5E>;
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
  readonly " $fragmentType": "NpcCard5e_NonPlayerCharacter5E";
};
export type NpcCard5e_NonPlayerCharacter5E$key = {
  readonly " $data"?: NpcCard5e_NonPlayerCharacter5E$data;
  readonly " $fragmentSpreads": FragmentRefs<"NpcCard5e_NonPlayerCharacter5E">;
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
  "name": "NpcCard5e_NonPlayerCharacter5E",
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
      "kind": "ScalarField",
      "name": "avatarId",
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
      "concreteType": "NpcType5E",
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
      "concreteType": "ArmorClassOption5E",
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
      "concreteType": "KeyValuePairOfAbility5EAndInt32",
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
      "concreteType": "Language5E",
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
      "concreteType": "Sense5E",
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
      "concreteType": "Resistance5E",
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
      "concreteType": "Speed5E",
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

(node as any).hash = "8bd93a1234110106609b89f1c67cee57";

export default node;
