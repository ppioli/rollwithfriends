/**
 * @generated SignedSource<<5d9b5e7116afb455e5e7299755976f9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { InlineFragment, ReaderInlineDataFragment } from 'relay-runtime';
export type Ability = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Alignment = "UNALIGNED" | "CHAOTIC_GOOD" | "NEUTRAL_GOOD" | "LAWFUL_GOOD" | "CHAOTIC_NEUTRAL" | "TRUE_NEUTRAL" | "LAWFUL_NEUTRAL" | "CHAOTIC_EVIL" | "NEUTRAL_EVIL" | "LAWFUL_EVIL" | "%future added value";
export type DamageType = "BLUDGEONING" | "PIERCING" | "SLASHING" | "ACID" | "%future added value";
export type Size = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
export type Skill = "ACROBATICS" | "ANIMAL_HANDLING" | "ARCANA" | "ATHLETICS" | "DECEPTION" | "HISTORY" | "INSIGHT" | "INTIMIDATION" | "INVESTIGATION" | "MEDICINE" | "NATURE" | "PERCEPTION" | "PERFORMANCE" | "PERSUASION" | "RELIGION" | "SLEIGHT_OF_HAND" | "STEALTH" | "SURVIVAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Npc5e_npc5e$data = {
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

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "Npc5e_npc5e"
};

(node as any).hash = "ba370179804eb9748f260d2641d22504";

export default node;
