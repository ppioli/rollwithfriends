/**
 * @generated SignedSource<<7eb774b046213ea1ebac2e73cbe5e203>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MapEntityType = "IMAGE" | "NPC5_E" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EntitySelectBox_scene$data = {
  readonly cellSize: number;
  readonly selected: ReadonlyArray<{
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly type: MapEntityType;
  }> | null;
  readonly " $fragmentType": "EntitySelectBox_scene";
};
export type EntitySelectBox_scene$key = {
  readonly " $data"?: EntitySelectBox_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntitySelectBox_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntitySelectBox_scene",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cellSize",
          "storageKey": null
        },
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

(node as any).hash = "f2a038f84f6d2ba446af9fdb12005bf9";

export default node;
