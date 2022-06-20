/**
 * @generated SignedSource<<dd1637a53d8848d4e0431201d104a238>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntryListItem_NonPlayerCharacter5E$data = {
  readonly name: string;
  readonly " $fragmentType": "EntryListItem_NonPlayerCharacter5E";
};
export type EntryListItem_NonPlayerCharacter5E$key = {
  readonly " $data"?: EntryListItem_NonPlayerCharacter5E$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryListItem_NonPlayerCharacter5E">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntryListItem_NonPlayerCharacter5E",
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

(node as any).hash = "8ccc2b53d6cda95f4076ee72b39b8c3f";

export default node;
