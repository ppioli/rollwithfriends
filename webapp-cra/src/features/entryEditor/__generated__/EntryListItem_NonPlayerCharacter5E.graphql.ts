/**
 * @generated SignedSource<<f811c4a84d59a6112fc0996fad6e01ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Size5E = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EntryListItem_NonPlayerCharacter5E$data = {
  readonly id: string;
  readonly name: string;
  readonly armorClasses: ReadonlyArray<{
    readonly description: string;
    readonly armorClass: number;
  }>;
  readonly hitPointsAverage: number;
  readonly hitPointsFormula: string;
  readonly sizes: ReadonlyArray<Size5E>;
  readonly " $fragmentType": "EntryListItem_NonPlayerCharacter5E";
};
export type EntryListItem_NonPlayerCharacter5E$key = {
  readonly " $data"?: EntryListItem_NonPlayerCharacter5E$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryListItem_NonPlayerCharacter5E">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntryListItem_NonPlayerCharacter5E",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArmorClassOption5E",
      "kind": "LinkedField",
      "name": "armorClasses",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
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
      "name": "hitPointsAverage",
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
      "name": "sizes",
      "storageKey": null
    }
  ],
  "type": "NonPlayerCharacter5E",
  "abstractKey": null
};

(node as any).hash = "5f1ece01b23ec470fdcfc19c962404f4";

export default node;
