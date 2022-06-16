/**
 * @generated SignedSource<<26819e458c48eab41c350fdc6e7103d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TokenListItem_NonPlayerCharacter5E$data = {
  readonly name: string;
  readonly " $fragmentType": "TokenListItem_NonPlayerCharacter5E";
};
export type TokenListItem_NonPlayerCharacter5E$key = {
  readonly " $data"?: TokenListItem_NonPlayerCharacter5E$data;
  readonly " $fragmentSpreads": FragmentRefs<"TokenListItem_NonPlayerCharacter5E">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TokenListItem_NonPlayerCharacter5E",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "NonPlayerCharacter5E",
  "abstractKey": null
};

(node as any).hash = "630ab53a339679d0afd4124f60fd09e9";

export default node;
