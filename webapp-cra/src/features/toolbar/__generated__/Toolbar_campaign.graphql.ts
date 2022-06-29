/**
 * @generated SignedSource<<fb01aa0dc45746c777fdfa3e6cc5bb4d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Toolbar_campaign$data = {
  readonly id: string;
  readonly selectedScene: {
    readonly id: string;
    readonly selected: ReadonlyArray<{
      readonly id: string;
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SceneSelector_campaign">;
  readonly " $fragmentType": "Toolbar_campaign";
};
export type Toolbar_campaign$key = {
  readonly " $data"?: Toolbar_campaign$data;
  readonly " $fragmentSpreads": FragmentRefs<"Toolbar_campaign">;
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
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "selectedScene"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Toolbar_campaign",
  "selections": [
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SceneSelector_campaign"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "sceneId",
          "variableName": "selectedScene"
        }
      ],
      "concreteType": "Scene",
      "kind": "LinkedField",
      "name": "selectedScene",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
      "storageKey": null
    }
  ],
  "type": "Campaign",
  "abstractKey": null
};
})();

(node as any).hash = "8cbe534de6519475df86721e194600cd";

export default node;
