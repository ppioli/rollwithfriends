/**
 * @generated SignedSource<<5a5c36726f1a03872d72187b14f5569e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntityLayer_scene$data = {
  readonly entities: ReadonlyArray<{
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly href: string;
  }>;
  readonly " $fragmentType": "MapEntityLayer_scene";
};
export type MapEntityLayer_scene$key = {
  readonly " $data"?: MapEntityLayer_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityLayer_scene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapEntityLayer_scene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MapEntity",
      "kind": "LinkedField",
      "name": "entities",
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
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "0038244177422329e61f8a4a9675a694";

export default node;
