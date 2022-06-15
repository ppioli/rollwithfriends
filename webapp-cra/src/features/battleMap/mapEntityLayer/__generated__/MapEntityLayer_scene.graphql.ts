/**
 * @generated SignedSource<<06059aa4643dd6ad0b3ece7dd96cedf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { FragmentRefs, ReaderFragment } from "relay-runtime";

export type ImageState = "LOADED" | "LOADING" | "MISSING" | "%future added value";

export type MapEntityLayer_scene$data = {
  readonly entities: ReadonlyArray<{
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly imageState: ImageState;
    readonly imageId: number;
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
          "name": "imageState",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "imageId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Scene",
  "abstractKey": null
};

(node as any).hash = "5aeac9e0994f139573e1b4d9adcd3516";

export default node;
