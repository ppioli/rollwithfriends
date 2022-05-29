/**
 * @generated SignedSource<<a1dcfde4374caf9d422ccda3b6c3a182>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectedScene_scene$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"BattleMap_scene">;
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
      "name": "BattleMap_scene"
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "e040f828690a2c691a6b1ee0c5e99111";

export default node;
