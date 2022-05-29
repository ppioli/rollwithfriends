/**
 * @generated SignedSource<<f709733355285cfe14b05d271d478d07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntity_Token$data = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly " $fragmentType": "MapEntity_Token";
};
export type MapEntity_Token$key = {
  readonly " $data"?: MapEntity_Token$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapEntity_Token">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapEntity_Token",
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

(node as any).hash = "4ca57c5432bc9a921dfd1fb8ae601461";

export default node;
