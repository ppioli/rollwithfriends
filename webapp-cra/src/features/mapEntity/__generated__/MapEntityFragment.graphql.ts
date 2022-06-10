/**
 * @generated SignedSource<<55c0e8ab714585a265042d2fbb014005>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntityFragment$data = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly href: string;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "MapEntity",
  "abstractKey": null
};

(node as any).hash = "122142348cf96a491905adc8e92f5324";

export default node;
