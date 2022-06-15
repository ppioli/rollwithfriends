/**
 * @generated SignedSource<<e8f512f8bc618becfbecd51614600e20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { FragmentRefs, ReaderFragment } from "relay-runtime";

export type SelectedScene_scene$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityLayer_scene">;
  readonly " $fragmentType": "SelectedScene_scene";
};
export type SelectedScene_scene$key = {
  readonly " $data"?: SelectedScene_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectedScene_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectedScene_scene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MapEntityLayer_scene"
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "76f1b9c3465d2173106ffa5ae0c1f6fa";

export default node;
