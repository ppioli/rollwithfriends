/**
 * @generated SignedSource<<9e2fe97f189788d08f3941c34ec53fab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MapEntityType = "IMAGE" | "NPC5_E" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MapEntityFragment$data = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly type: MapEntityType;
  readonly content: {
    readonly __typename: "ImageContent";
    readonly fileId: number;
  } | {
    readonly __typename: "Npc5EContent";
    readonly npcId: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentType": "MapEntityFragment";
};
export type MapEntityFragment$key = {
  readonly " $data"?: MapEntityFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapEntityFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
        {
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MapEntity",
  "abstractKey": null
};

(node as any).hash = "46a064916597bc51d08905016cd47a78";

export default node;
