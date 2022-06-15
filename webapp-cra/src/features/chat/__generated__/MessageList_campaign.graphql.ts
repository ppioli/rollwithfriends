/**
 * @generated SignedSource<<661ace5b776c244e58bf1f746443f9fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { FragmentRefs, ReaderFragment } from "relay-runtime";

export type MessageList_campaign$data = {
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MessageBody_message">;
      };
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "MessageList_campaign";
};
export type MessageList_campaign$key = {
  readonly " $data"?: MessageList_campaign$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageList_campaign">;
};

const node: ReaderFragment = (function() {
  var v0 = [
      "messages"
    ],
    v1 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    };
  return {
    "argumentDefinitions": [
      {
        "defaultValue": 10,
        "kind": "LocalArgument",
        "name": "count"
      },
      {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "cursor"
      }
    ],
    "kind": "Fragment",
    "metadata": {
      "connection": [
        {
          "count": "count",
          "cursor": "cursor",
          "direction": "forward",
          "path": (v0/*: any*/)
        }
      ],
      "refetch": {
        "connection": {
          "forward": {
            "count": "count",
            "cursor": "cursor"
          },
          "backward": null,
          "path": (v0/*: any*/)
        },
        "fragmentPathInResult": [
          "node"
        ],
        "operation": require("./MessageListPaginationFragment.graphql"),
        "identifierField": "id"
      }
    },
    "name": "MessageList_campaign",
    "selections": [
      {
        "alias": "messages",
        "args": null,
        "concreteType": "MessagesConnection",
        "kind": "LinkedField",
        "name": "__CampaignFragment_messages_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MessagesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "MessageBody_message"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
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
      (v1/*: any*/)
    ],
    "type": "Campaign",
    "abstractKey": null
  };
})();

(node as any).hash = "380729b6bad4a0fdf20d2095fcd4b150";

export default node;
