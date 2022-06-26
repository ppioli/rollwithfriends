/**
 * @generated SignedSource<<c02019449f841ec6a80b13c87766fe55>>
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
    readonly " $fragmentSpreads": FragmentRefs<"SelectionToolbar_scene">;
  } | null;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "SelectionToolbar_scene"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Campaign",
  "abstractKey": null
};
})();

(node as any).hash = "86d1eeae192c94d9874e0f63be9654c9";

export default node;
