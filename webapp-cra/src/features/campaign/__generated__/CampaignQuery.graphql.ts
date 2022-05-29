/**
 * @generated SignedSource<<1e87ebea314719355db07e56a1ba336f>>
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
      readonly " $fragmentSpreads": FragmentRefs<"SelectedScene_scene">;
    }>;
    readonly selectedScene: {
      readonly id: string;
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
  "name": "selectedScene",
  "plural": false,
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "scenes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SelectedScene_scene"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
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
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e339806481269fad2d56cfabf9a23946",
    "id": null,
    "metadata": {},
    "name": "CampaignQuery",
    "operationKind": "query",
    "text": "query CampaignQuery(\n  $id: ID!\n) {\n  campaigns(where: {id: {eq: $id}}) {\n    id\n    name\n    description\n    scenes {\n      id\n      ...SelectedScene_scene\n    }\n    selectedScene {\n      id\n    }\n  }\n}\n\nfragment BattleMap_scene on Scene {\n  id\n  ...MapEntityLayer_scene\n}\n\nfragment MapEntityLayer_scene on Scene {\n  entities {\n    id\n    ...MapEntity_Token\n  }\n}\n\nfragment MapEntity_Token on MapEntity {\n  x\n  y\n  width\n  height\n}\n\nfragment SelectedScene_scene on Scene {\n  name\n  ...BattleMap_scene\n}\n"
  }
};
})();

(node as any).hash = "64cd29b71b433677fb1bd1f5522c2614";

export default node;
