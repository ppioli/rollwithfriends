/**
 * @generated SignedSource<<da37ef90ac7b4a09dbe05dfc24d4da8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, FragmentRefs } from "relay-runtime";

export type TextMessagesAddInput = {
  campaignId: string;
  messages: ReadonlyArray<TextMessageAddInput>;
};
export type TextMessageAddInput = {
  content: string;
};
export type MessageAddMutation$variables = {
  input: TextMessagesAddInput;
  connections: ReadonlyArray<string>;
};
export type MessageAddMutation$data = {
  readonly textMessageAdd: {
    readonly message: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MessageBody_message">;
    }> | null;
  };
};
export type MessageAddMutation = {
  variables: MessageAddMutation$variables;
  response: MessageAddMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TextMessageAddPayload",
        "kind": "LinkedField",
        "name": "textMessageAdd",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "message",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MessageAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TextMessageAddPayload",
        "kind": "LinkedField",
        "name": "textMessageAdd",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "message",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
            "name": "message",
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
    "cacheID": "c3e9e48bbec92ff20baa99ade3c45d06",
    "id": null,
    "metadata": {},
    "name": "MessageAddMutation",
    "operationKind": "mutation",
    "text": "mutation MessageAddMutation(\n  $input: TextMessagesAddInput!\n) {\n  textMessageAdd(input: $input) {\n    message {\n      id\n      ...MessageBody_message\n    }\n  }\n}\n\nfragment MessageBody_message on Message {\n  userId\n  createdAt\n  content {\n    __typename\n    ... on RollMessageContent {\n      rolls {\n        count\n        faces\n        result\n      }\n    }\n    ... on TextMessageContent {\n      text\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cb1741290215037ea5308fccedfd4d88";

export default node;
