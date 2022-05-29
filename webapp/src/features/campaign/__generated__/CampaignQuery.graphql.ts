/**
 * @generated SignedSource<<0072b7d5552a0b9427da5cb4d5c4f39d>>
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
};
export type CampaignQuery$data = {
  readonly campaigns: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly scenes: ReadonlyArray<{
      readonly id: string;
    }>;
    readonly selectedScene: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"SelectedScene_scene">;
    } | null;
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
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Scene",
  "kind": "LinkedField",
  "name": "scenes",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
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
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
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
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
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
    "cacheID": "b4fc294cce4195e094bf26739d419902",
    "id": null,
    "metadata": {},
    "name": "CampaignQuery",
    "operationKind": "query",
    "text": "query CampaignQuery(\n  $id: ID!\n) {\n  campaigns(where: {id: {eq: $id}}) {\n    id\n    name\n    description\n    scenes {\n      id\n    }\n    selectedScene {\n      id\n      ...SelectedScene_scene\n    }\n  }\n}\n\nfragment BattleMap_scene on Scene {\n  id\n  ...MapEntityLayer_scene\n}\n\nfragment MapEntityLayer_scene on Scene {\n  entities {\n    id\n    ...MapEntity_Token\n  }\n}\n\nfragment MapEntity_Token on MapEntity {\n  x\n  y\n  width\n  height\n}\n\nfragment SelectedScene_scene on Scene {\n  name\n  ...BattleMap_scene\n}\n"
  }
};
})();

(node as any).hash = "81a5f5efbd00026f02194c15cfbbd04a";

export default node;
