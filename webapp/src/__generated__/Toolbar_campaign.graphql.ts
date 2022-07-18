/**
 * @generated SignedSource<<75b5c4a078a1a0bd30d2c43b33cb903a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Toolbar_campaign$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"SceneSelector_campaign">;
  readonly " $fragmentType": "Toolbar_campaign";
};
export type Toolbar_campaign$key = {
  readonly " $data"?: Toolbar_campaign$data;
  readonly " $fragmentSpreads": FragmentRefs<"Toolbar_campaign">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Toolbar_campaign",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SceneSelector_campaign"
    }
  ],
  "type": "Campaign",
  "abstractKey": null
};

(node as any).hash = "6f7f879672a514ed9453f6c57bac7404";

export default node;
