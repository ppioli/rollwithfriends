/**
 * @generated SignedSource<<03a3c2aec927227b706876e3824cce1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectionToolbarQuery$variables = {
  ids: ReadonlyArray<string>;
};
export type SelectionToolbarQuery$data = {
  readonly nodes: ReadonlyArray<{
    readonly __typename: "MapEntity";
    readonly content: {
      readonly __typename: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"Npc5EContentToolbar_mapEntity">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null>;
};
export type SelectionToolbarQuery = {
  variables: SelectionToolbarQuery$variables;
  response: SelectionToolbarQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "ids"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maximumHp",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentHp",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ac",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "temporaryHp",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "npcId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "challangeRating",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePairOfAbility5EAndInt32",
  "kind": "LinkedField",
  "name": "savingThrows",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectionToolbarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "content",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "kind": "InlineDataFragmentSpread",
                "name": "Npc5EContentToolbar_mapEntity",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                          (v2/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "NonPlayerCharacter5E",
                            "kind": "LinkedField",
                            "name": "npc",
                            "plural": false,
                            "selections": [
                              (v11/*: any*/),
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Npc5EContent",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ]
              }
            ],
            "type": "MapEntity",
            "abstractKey": null
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
    "name": "SelectionToolbarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "content",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NonPlayerCharacter5E",
                        "kind": "LinkedField",
                        "name": "npc",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Npc5EContent",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "type": "MapEntity",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1e32ab9a9e500515d0e0a3f86b7b7eea",
    "id": null,
    "metadata": {},
    "name": "SelectionToolbarQuery",
    "operationKind": "query",
    "text": "query SelectionToolbarQuery(\n  $ids: [ID!]!\n) {\n  nodes(ids: $ids) {\n    __typename\n    ... on MapEntity {\n      content {\n        __typename\n      }\n      ...Npc5EContentToolbar_mapEntity\n    }\n    id\n  }\n}\n\nfragment Npc5EContentToolbar_mapEntity on MapEntity {\n  id\n  name\n  content {\n    __typename\n    ... on Npc5EContent {\n      __typename\n      maximumHp\n      currentHp\n      size\n      ac\n      temporaryHp\n      npcId\n      npc {\n        challangeRating\n        savingThrows {\n          key\n          value\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8e84d5c774c29c700f43107301912470";

export default node;
