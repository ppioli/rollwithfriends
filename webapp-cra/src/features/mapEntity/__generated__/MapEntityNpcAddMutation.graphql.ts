/**
 * @generated SignedSource<<2366d520baae30ac30cd05663f0c1d4d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntitiesNpcAddInput = {
  sceneId: string;
  entities: ReadonlyArray<MapEntityNpcAddInput>;
};
export type MapEntityNpcAddInput = {
  name: string;
  x: number;
  y: number;
  npcId: string;
};
export type MapEntityNpcAddMutation$variables = {
  input: MapEntitiesNpcAddInput;
};
export type MapEntityNpcAddMutation$data = {
  readonly mapEntityNpcAdd: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
      readonly content: {
        readonly npcId?: number;
      };
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
    }> | null;
  };
};
export type MapEntityNpcAddMutation = {
  variables: MapEntityNpcAddMutation$variables;
  response: MapEntityNpcAddMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "npcId",
      "storageKey": null
    }
  ],
  "type": "Npc5EContent",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityNpcAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityNpcAddPayload",
        "kind": "LinkedField",
        "name": "mapEntityNpcAdd",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MapEntity",
            "kind": "LinkedField",
            "name": "mapEntity",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MapEntityFragment"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "content",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityNpcAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityNpcAddPayload",
        "kind": "LinkedField",
        "name": "mapEntityNpcAdd",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MapEntity",
            "kind": "LinkedField",
            "name": "mapEntity",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "content",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "fileId",
                        "storageKey": null
                      }
                    ],
                    "type": "ImageContent",
                    "abstractKey": null
                  },
                  (v4/*: any*/)
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
    "cacheID": "227806c70d77d38674444db0f8274d4d",
    "id": null,
    "metadata": {},
    "name": "MapEntityNpcAddMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityNpcAddMutation(\n  $input: MapEntitiesNpcAddInput!\n) {\n  mapEntityNpcAdd(input: $input) {\n    mapEntity {\n      id\n      name\n      ...MapEntityFragment\n      content {\n        __typename\n        ... on Npc5EContent {\n          npcId\n        }\n      }\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  type\n  content {\n    __typename\n    ... on ImageContent {\n      fileId\n    }\n    ... on Npc5EContent {\n      npcId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e5be7bb097c94bb62d3abdc900a9bdb";

export default node;
