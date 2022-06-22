/**
 * @generated SignedSource<<625a74cd81cd6c60041bd954b06b1945>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MapEntityType = "IMAGE" | "NPC5_E" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Toolbar_scene$data = {
  readonly selected: ReadonlyArray<{
    readonly type: MapEntityType;
    readonly id: string;
    readonly content: {
      readonly npcId?: string;
    };
  }> | null;
  readonly " $fragmentType": "Toolbar_scene";
};
export type Toolbar_scene$key = {
  readonly " $data"?: Toolbar_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"Toolbar_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Toolbar_scene",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MapEntity",
          "kind": "LinkedField",
          "name": "selected",
          "plural": true,
          "selections": [
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
              "kind": "ScalarField",
              "name": "id",
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
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "7f8bf3326ede1b181e32c2d2d2970d2a";

export default node;
