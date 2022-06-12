/**
 * @generated SignedSource<<dd7a30c1b63a240e35cedff69e2bf317>>
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
  readonly content: {
    readonly __typename: "RollMessageContent";
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
  "type": "Message",
  "abstractKey": null
};

(node as any).hash = "852d921635d3b79f562c1cd7684dd0fb";

export default node;
