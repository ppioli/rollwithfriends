/**
 * @generated SignedSource<<904bad5669b527a65a31f31a62b89aae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntityLayer_scene$data = {
  readonly selected: ReadonlyArray<{
    readonly id: string;
  }> | null;
  readonly entities: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"EntitySelectBox_scene">;
  readonly " $fragmentType": "MapEntityLayer_scene";
};
export type MapEntityLayer_scene$key = {
  readonly " $data"?: MapEntityLayer_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityLayer_scene">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapEntityLayer_scene",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntitySelectBox_scene"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MapEntity",
      "kind": "LinkedField",
      "name": "entities",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MapEntityFragment"
        }
      ],
      "storageKey": null
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MapEntity",
          "kind": "LinkedField",
          "name": "selected",
          "plural": true,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Scene",
  "abstractKey": null
};
})();

(node as any).hash = "63b6be095b3f6edf198f74181f2db49e";

export default node;
