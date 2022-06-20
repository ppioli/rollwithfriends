/**
 * @generated SignedSource<<1170c724ae1a314af534430f917619c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntityPositionFragment$data = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly " $fragmentType": "MapEntityPositionFragment";
};
export type MapEntityPositionFragment$key = {
  readonly " $data"?: MapEntityPositionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntityPositionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapEntityPositionFragment",
  "selections": [
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
  "type": "MapEntity",
  "abstractKey": null
};

(node as any).hash = "0124ee51e225f8112b47021f2da48d6e";

export default node;
