/**
 * @generated SignedSource<<aafe43fcf83ebe08ec6b75706fd7ea09>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { InlineFragment, ReaderInlineDataFragment } from 'relay-runtime';
export type Ability5E = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Size5E = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Npc5EContentToolbar_mapEntity$data = {
  readonly id: string;
  readonly name: string;
  readonly content: {
    readonly __typename: "Npc5EContent";
    readonly maximumHp: number;
    readonly currentHp: number;
    readonly size: Size5E;
    readonly ac: number;
    readonly temporaryHp: number;
    readonly npcId: string;
    readonly npc: {
      readonly challangeRating: number;
      readonly savingThrows: ReadonlyArray<{
        readonly key: Ability5E;
        readonly value: number;
      }>;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentType": "Npc5EContentToolbar_mapEntity";
};
export type Npc5EContentToolbar_mapEntity$key = {
  readonly " $data"?: Npc5EContentToolbar_mapEntity$data;
  readonly " $fragmentSpreads": FragmentRefs<"Npc5EContentToolbar_mapEntity">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "Npc5EContentToolbar_mapEntity"
};

(node as any).hash = "9e15957cbb952facf0e52cde19712815";

export default node;
