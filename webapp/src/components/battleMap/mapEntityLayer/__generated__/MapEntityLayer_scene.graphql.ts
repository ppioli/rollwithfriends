/**
 * @generated SignedSource<<3e0576608b8dc9065ad5e0a6f2c05394>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntityLayer_scene$data = {
  readonly entities: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"MapEntity_Token">;
  }>;
  readonly " $fragmentType": "MapEntityLayer_scene";
};
export type MapEntityLayer_scene$key = {
  readonly " $data"?: MapEntityLayer_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityLayer_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapEntityLayer_scene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MapEntity",
      "kind": "LinkedField",
      "name": "entities",
      "plural": true,
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
          "name": "MapEntity_Token"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "62fae52ea3d19251146cf3d1206d2114";

export default node;
