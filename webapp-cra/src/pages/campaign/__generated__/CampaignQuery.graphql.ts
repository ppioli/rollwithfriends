/**
 * @generated SignedSource<<1457ab58e2af523b18cb80663ece4fdf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignQuery$variables = {
  id: string;
  selectedScene?: string | null;
};
export type CampaignQuery$data = {
  readonly campaigns: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly selectedScene: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"SelectedScene_scene">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"SceneSelector_campaign">;
  }>;
};
export type CampaignQuery = {
  variables: CampaignQuery$variables;
  response: CampaignQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "selectedScene"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eq",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "sceneId",
    "variableName": "selectedScene"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Campaign",
        "kind": "LinkedField",
        "name": "campaigns",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SceneSelector_campaign"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "selectedScene",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SelectedScene_scene"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Campaign",
        "kind": "LinkedField",
        "name": "campaigns",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "scenes",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "selectedScene",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MapEntity",
                "kind": "LinkedField",
                "name": "entities",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "x",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "y",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "effbf63e91eaea7e91d36fb205bc4f26",
    "id": null,
    "metadata": {},
    "name": "CampaignQuery",
    "operationKind": "query",
    "text": "query CampaignQuery(\n  $id: ID!\n  $selectedScene: ID\n) {\n  campaigns(where: {id: {eq: $id}}) {\n    id\n    name\n    description\n    ...SceneSelector_campaign\n    selectedScene(sceneId: $selectedScene) {\n      id\n      ...SelectedScene_scene\n    }\n  }\n}\n\nfragment MapEntityLayer_scene on Scene {\n  entities {\n    id\n    x\n    y\n    width\n    height\n    href\n  }\n}\n\nfragment SceneSelector_campaign on Campaign {\n  scenes {\n    name\n    id\n  }\n}\n\nfragment SelectedScene_scene on Scene {\n  name\n  ...MapEntityLayer_scene\n}\n"
  }
};
})();

(node as any).hash = "242e99f87bb637e96f1a6698e78de8a5";

export default node;
