/**
 * @generated SignedSource<<63e7f700e841f7bba1f6aa8d8eb1d63d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Toolbar_scene$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SelectionToolbar_scene">;
  readonly " $fragmentType": "Toolbar_scene";
};
export type Toolbar_scene$key = {
  readonly " $data"?: Toolbar_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"Toolbar_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Toolbar_scene",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectionToolbar_scene"
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "833fc81a895b69e493a60e5ee211b21c";

export default node;
