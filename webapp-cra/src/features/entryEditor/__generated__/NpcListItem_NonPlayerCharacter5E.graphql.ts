/**
 * @generated SignedSource<<ab366f3d18df6b6959f7631ab9e5a388>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NpcListItem_NonPlayerCharacter5E$data = {
  readonly name: string;
  readonly " $fragmentType": "NpcListItem_NonPlayerCharacter5E";
};
export type NpcListItem_NonPlayerCharacter5E$key = {
  readonly " $data"?: NpcListItem_NonPlayerCharacter5E$data;
  readonly " $fragmentSpreads": FragmentRefs<"NpcListItem_NonPlayerCharacter5E">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NpcListItem_NonPlayerCharacter5E",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "NonPlayerCharacter5E",
  "abstractKey": null
};

(node as any).hash = "c4b07a26ec28602cada7521d352e14e2";

export default node;
