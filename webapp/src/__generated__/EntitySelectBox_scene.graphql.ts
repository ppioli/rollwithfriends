/**
 * @generated SignedSource<<c7788b1ef56a8669315a74445494a12d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntitySelectBox_scene$data = {
  readonly selected: ReadonlyArray<{
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
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

(node as any).hash = "ed35ec3ad2dd7094ac46861776771136";

export default node;
