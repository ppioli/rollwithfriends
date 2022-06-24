/**
 * @generated SignedSource<<c4876e25210b8a6483f5111fc87d9de9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageBody_message$data = {
  readonly userId: string;
  readonly createdAt: any;
  readonly source: {
    readonly name: string;
  } | null;
  readonly content: {
    readonly __typename: "RollMessageContent";
    readonly dmRoll: boolean;
    readonly rolls: ReadonlyArray<{
      readonly count: number;
      readonly faces: number;
      readonly result: ReadonlyArray<number> | null;
    }>;
  } | {
    readonly __typename: "TextMessageContent";
    readonly text: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentType": "MessageBody_message";
};
export type MessageBody_message$key = {
  readonly " $data"?: MessageBody_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageBody_message">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageBody_message",
  "selections": [
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
      "concreteType": "MapEntity",
      "kind": "LinkedField",
      "name": "source",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
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
              "name": "dmRoll",
              "storageKey": null
            },
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
  "type": "Message",
  "abstractKey": null
};

(node as any).hash = "3a28c86a773a5c491e52da8822a8826c";

export default node;
