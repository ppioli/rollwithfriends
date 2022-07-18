/**
 * @generated SignedSource<<2da4611dd3c058e5ba04cc9003cf7818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignSelectedScene_campaign$data = {
  readonly selectedScene: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"SelectedScene_scene">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CampaignSelectedScene_campaign";
};
export type CampaignSelectedScene_campaign$key = {
  readonly " $data"?: CampaignSelectedScene_campaign$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignSelectedScene_campaign">;
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
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "selectedSceneId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./SelectedSceneRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "CampaignSelectedScene_campaign",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "sceneId",
          "variableName": "selectedSceneId"
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
          "name": "SelectedScene_scene"
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Campaign",
  "abstractKey": null
};
})();

(node as any).hash = "2488419c5e550ea3b0fb9a4185849fc3";

export default node;
