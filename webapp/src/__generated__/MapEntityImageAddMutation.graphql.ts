/**
 * @generated SignedSource<<b815c029fb8458da1cd4744b9bd2cbb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntitiesImageAddInput = {
  sceneId: string;
  entities: ReadonlyArray<MapEntityImageAddInput>;
};
export type MapEntityImageAddInput = {
  name: string;
  x: number;
  y: number;
  uploadId: any;
  width: number;
  height: number;
};
export type MapEntityImageAddMutation$variables = {
  input: MapEntitiesImageAddInput;
};
export type MapEntityImageAddMutation$data = {
  readonly mapEntityImageAdd: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
      readonly content: {
        readonly file?: {
          readonly id: string;
        } | null;
      };
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
    }> | null;
  };
};
export type MapEntityImageAddMutation = {
  variables: MapEntityImageAddMutation$variables;
  response: MapEntityImageAddMutation$data;
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
      "concreteType": "AppFile",
      "kind": "LinkedField",
      "name": "file",
      "plural": false,
      "selections": [
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ImageContent",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityImageAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityImageAddPayload",
        "kind": "LinkedField",
        "name": "mapEntityImageAdd",
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
                "concreteType": null,
                "kind": "LinkedField",
                "name": "content",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MapEntityFragment"
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
    "name": "MapEntityImageAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityImageAddPayload",
        "kind": "LinkedField",
        "name": "mapEntityImageAdd",
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
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "npcId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "size",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "ac",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "maximumHp",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currentHp",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "temporaryHp",
                        "storageKey": null
                      }
                    ],
                    "type": "Npc5EContent",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
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
    ]
  },
  "params": {
    "cacheID": "2c1184fd82f60c770cfd8d0bb30a6672",
    "id": null,
    "metadata": {},
    "name": "MapEntityImageAddMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityImageAddMutation(\n  $input: MapEntitiesImageAddInput!\n) {\n  mapEntityImageAdd(input: $input) {\n    mapEntity {\n      id\n      name\n      content {\n        __typename\n        ... on ImageContent {\n          file {\n            id\n          }\n        }\n      }\n      ...MapEntityFragment\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  name\n  content {\n    __typename\n    ... on ImageContent {\n      file {\n        id\n      }\n    }\n    ... on Npc5EContent {\n      npcId\n      size\n      ac\n      maximumHp\n      currentHp\n      temporaryHp\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "efe292c9936126d18250ed6977c3b168";

export default node;
