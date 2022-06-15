/**
 * @generated SignedSource<<0c8e4ab1a99002c5fcebfcb8e5da64d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, FragmentRefs } from "relay-runtime";

export type MessageSubscription$variables = {
  campaignId: string;
  connections: ReadonlyArray<string>;
};
export type MessageSubscription$data = {
  readonly messageSub: {
    readonly messages: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MessageBody_message">;
    }>;
  };
};
export type MessageSubscription = {
  variables: MessageSubscription$variables;
  response: MessageSubscription$data;
};

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "campaignId"
      },
      {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "connections"
      }
    ],
    v1 = [
      {
        "kind": "Variable",
        "name": "campaignId",
        "variableName": "campaignId"
      }
    ],
    v2 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    };
  return {
    "fragment": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Fragment",
      "metadata": null,
      "name": "MessageSubscription",
      "selections": [
        {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "MessageEvent",
          "kind": "LinkedField",
          "name": "messageSub",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "messages",
              "plural": true,
              "selections": [
                (v2/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MessageBody_message"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "Subscription",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Operation",
      "name": "MessageSubscription",
      "selections": [
        {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "MessageEvent",
          "kind": "LinkedField",
          "name": "messageSub",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "messages",
              "plural": true,
              "selections": [
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "userId",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "createdAt",
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
                          "concreteType": "Roll",
                          "kind": "LinkedField",
                          "name": "rolls",
                          "plural": true,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "count",
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "faces",
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "result",
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "type": "RollMessageContent",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "text",
                          "storageKey": null
                        }
                      ],
                      "type": "TextMessageContent",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "filters": null,
              "handle": "prependNode",
              "key": "",
              "kind": "LinkedHandle",
              "name": "messages",
              "handleArgs": [
                {
                  "kind": "Variable",
                  "name": "connections",
                  "variableName": "connections"
                },
                {
                  "kind": "Literal",
                  "name": "edgeTypeName",
                  "value": "MessagesEdge"
                }
              ]
            }
          ],
          "storageKey": null
        }
      ]
    },
    "params": {
      "cacheID": "c5e47638838756322ee2619a29e04ebb",
      "id": null,
      "metadata": {},
      "name": "MessageSubscription",
      "operationKind": "subscription",
      "text": "subscription MessageSubscription(\n  $campaignId: ID!\n) {\n  messageSub(campaignId: $campaignId) {\n    messages {\n      id\n      ...MessageBody_message\n    }\n  }\n}\n\nfragment MessageBody_message on Message {\n  userId\n  createdAt\n  content {\n    __typename\n    ... on RollMessageContent {\n      rolls {\n        count\n        faces\n        result\n      }\n    }\n    ... on TextMessageContent {\n      text\n    }\n  }\n}\n"
    }
  };
})();

(node as any).hash = "eb32523172daea11906e7ece16470b76";

export default node;
