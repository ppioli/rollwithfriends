/**
 * @generated SignedSource<<ae1b1c6b874ecfe4ef49c13ae7f17bf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SceneSelector_campaign$data = {
  readonly scenes: ReadonlyArray<{
    readonly name: string;
    readonly id: string;
  }>;
  readonly " $fragmentType": "SceneSelector_campaign";
};
export type SceneSelector_campaign$key = {
  readonly " $data"?: SceneSelector_campaign$data;
  readonly " $fragmentSpreads": FragmentRefs<"SceneSelector_campaign">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SceneSelector_campaign",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Scene",
      "kind": "LinkedField",
      "name": "scenes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Campaign",
  "abstractKey": null
};

(node as any).hash = "88b0453fc54e6a00b87a119d3de44d85";

export default node;
