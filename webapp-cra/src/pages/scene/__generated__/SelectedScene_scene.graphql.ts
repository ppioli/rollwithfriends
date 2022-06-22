/**
 * @generated SignedSource<<8178d7e2599b6e46b384615483d141a1>>
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
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityLayer_scene" | "Toolbar_scene">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Toolbar_scene"
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "d02d264428b3469b65815b70444191a5";

export default node;
