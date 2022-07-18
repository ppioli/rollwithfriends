/**
 * @generated SignedSource<<dd6fb81dd127acd11f4ad0044059e788>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectedScene_scene$data = {
  readonly id: string;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "MapEntityLayer_scene"
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "d388ee15305ce06fac97364ab35aa7e5";

export default node;
