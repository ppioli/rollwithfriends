/**
 * @generated SignedSource<<9d5dfbfd8cd9feb84ccf0d539db0a6a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridSize_scene$data = {
  readonly cellSize: number;
  readonly " $fragmentType": "GridSize_scene";
};
export type GridSize_scene$key = {
  readonly " $data"?: GridSize_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridSize_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridSize_scene",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cellSize",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "0269f34d3ddefcc487ff20769484eb1a";

export default node;
