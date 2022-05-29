/**
 * @generated SignedSource<<53f8b8c5240675dd4b167b5385859d61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BattleMap_scene$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityLayer_scene">;
  readonly " $fragmentType": "BattleMap_scene";
};
export type BattleMap_scene$key = {
  readonly " $data"?: BattleMap_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"BattleMap_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BattleMap_scene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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

(node as any).hash = "aa6971be54124c93de6dbe9997cb2d82";

export default node;
