/**
 * @generated SignedSource<<028c9a50427b351654c4b5127dde2f7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, FragmentRefs} from 'relay-runtime';

export type TokenListQuery$variables = {
    after?: string | null;
    first?: number | null;
    id: string;
};
export type TokenListQuery$data = {
    readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"TokenLayer_scene">;
    } | null;
};
export type TokenListQuery = {
    variables: TokenListQuery$variables;
    response: TokenListQuery$data;
};

const node: ConcreteRequest = (function () {
    var v0 = [
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "after"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "first"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "id"
            }
        ],
        v1 = [
            {
                "kind": "Variable",
                "name": "id",
                "variableName": "id"
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
        v4 = [
            {
                "kind": "Variable",
                "name": "after",
                "variableName": "after"
            },
            {
                "kind": "Variable",
                "name": "first",
                "variableName": "first"
            }
        ];
    return {
        "fragment": {
            "argumentDefinitions": (v0/*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "TokenListQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1/*: any*/),
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                        {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "TokenLayer_scene"
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
            "name": "TokenListQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1/*: any*/),
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                        (v2/*: any*/),
                        (v3/*: any*/),
                        {
                            "kind": "InlineFragment",
                            "selections": [
                                {
                                    "alias": null,
                                    "args": (v4/*: any*/),
                                    "concreteType": "TokensConnection",
                                    "kind": "LinkedField",
                                    "name": "tokens",
                                    "plural": false,
                                    "selections": [
                                        {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "TokensEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Token",
                                                    "kind": "LinkedField",
                                                    "name": "node",
                                                    "plural": false,
                                                    "selections": [
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
                                                        (v2/*: any*/)
                                                    ],
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "cursor",
                                                    "storageKey": null
                                                }
                                            ],
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "PageInfo",
                                            "kind": "LinkedField",
                                            "name": "pageInfo",
                                            "plural": false,
                                            "selections": [
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "endCursor",
                                                    "storageKey": null
                                                },
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "hasNextPage",
                                                    "storageKey": null
                                                }
                                            ],
                                            "storageKey": null
                                        }
                                    ],
                                    "storageKey": null
                                },
                                {
                                    "alias": null,
                                    "args": (v4/*: any*/),
                                    "filters": null,
                                    "handle": "connection",
                                    "key": "TokenLayer_scene_tokens",
                                    "kind": "LinkedHandle",
                                    "name": "tokens"
                                }
                            ],
                            "type": "Scene",
                            "abstractKey": null
                        }
                    ],
                    "storageKey": null
                }
            ]
        },
        "params": {
            "cacheID": "e40a971cb5ed5d6a50cc0d5462206c10",
            "id": null,
            "metadata": {},
            "name": "TokenListQuery",
            "operationKind": "query",
            "text": "query TokenListQuery(\n  $after: String\n  $first: Int\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...TokenLayer_scene\n    id\n  }\n}\n\nfragment TokenEntity_Token on Token {\n  x\n  y\n  width\n  height\n}\n\nfragment TokenLayer_scene on Scene {\n  tokens(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...TokenEntity_Token\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
        }
    };
})();

(node as any).hash = "f641c00034f216b6ba4eb123149d9973";

export default node;
