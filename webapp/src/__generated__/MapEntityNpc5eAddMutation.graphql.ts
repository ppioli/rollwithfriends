/**
 * @generated SignedSource<<8da08581ff043c4edd90dacad84d77ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Size5E = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN" | "%future added value";
export type MapEntitiesNpc5EAddInput = {
  sceneId: string;
  entities: ReadonlyArray<MapEntityNpc5EAddInput>;
};
export type MapEntityNpc5EAddInput = {
  npcId: string;
  name: string;
  x: number;
  y: number;
  ac: number;
  maxHp: number;
  size: Size5E;
};
export type MapEntityNpc5eAddMutation$variables = {
  input: MapEntitiesNpc5EAddInput;
};
export type MapEntityNpc5eAddMutation$data = {
  readonly mapEntityNpc5EAdd: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
      readonly content: {
        readonly npcId?: string;
      };
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
    }> | null;
  };
};
export type MapEntityNpc5eAddMutation = {
  variables: MapEntityNpc5eAddMutation$variables;
  response: MapEntityNpc5eAddMutation$data;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "npcId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityNpc5eAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityNpc5EAddPayload",
        "kind": "LinkedField",
        "name": "mapEntityNpc5EAdd",
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
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "type": "Npc5EContent",
                    "abstractKey": null
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
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityNpc5eAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityNpc5EAddPayload",
        "kind": "LinkedField",
        "name": "mapEntityNpc5EAdd",
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
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
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
    "cacheID": "804125277fa7ded4a6830f205df1456e",
    "id": null,
    "metadata": {},
    "name": "MapEntityNpc5eAddMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityNpc5eAddMutation(\n  $input: MapEntitiesNpc5EAddInput!\n) {\n  mapEntityNpc5EAdd(input: $input) {\n    mapEntity {\n      id\n      name\n      ...MapEntityFragment\n      content {\n        __typename\n        ... on Npc5EContent {\n          npcId\n        }\n      }\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  name\n  content {\n    __typename\n    ... on ImageContent {\n      file {\n        id\n      }\n    }\n    ... on Npc5EContent {\n      npcId\n      size\n      ac\n      maximumHp\n      currentHp\n      temporaryHp\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "936a27b6fc735a843a4380af493300ea";

export default node;
