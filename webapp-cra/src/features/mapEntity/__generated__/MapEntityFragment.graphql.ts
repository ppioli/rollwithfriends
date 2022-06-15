/**
 * @generated SignedSource<<b53cfb562e8ea629d9a0457a9e32a0c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { FragmentRefs, ReaderFragment } from "relay-runtime";

export type MapEntityFragment$data = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
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

(node as any).hash = "23fef0fa1304f4093c7d105dac65e495";

export default node;
