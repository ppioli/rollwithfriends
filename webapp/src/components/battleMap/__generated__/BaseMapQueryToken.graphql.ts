/**
 * @generated SignedSource<<261071154870df3af1e90961184cbc1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BaseMapQueryToken$data = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly " $fragmentType": "BaseMapQueryToken";
};
export type BaseMapQueryToken$key = {
  readonly " $data"?: BaseMapQueryToken$data;
  readonly " $fragmentSpreads": FragmentRefs<"BaseMapQueryToken">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BaseMapQueryToken",
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
  "type": "Token",
  "abstractKey": null
};

(node as any).hash = "0c60ff6cdfe22725e85ad7e1dbc342ce";

export default node;
