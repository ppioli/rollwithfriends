/**
 * @generated SignedSource<<1091f331471e0b8dcb3628ccdbe0feda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntryViewerEditor_rootQuery$data = {
  readonly entry: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"NpcCard5e_NonPlayerCharacter5E">;
  } | null;
  readonly " $fragmentType": "EntryViewerEditor_rootQuery";
};
export type EntryViewerEditor_rootQuery$key = {
  readonly " $data"?: EntryViewerEditor_rootQuery$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryViewerEditor_rootQuery">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./EntryViewerEditorSelected.graphql')
    }
  },
  "name": "EntryViewerEditor_rootQuery",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "NonPlayerCharacter5E",
      "kind": "LinkedField",
      "name": "entry",
      "plural": false,
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
          "name": "NpcCard5e_NonPlayerCharacter5E"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RootQuery",
  "abstractKey": null
};

(node as any).hash = "6f3a5706ef4295212e9bfe16fef1caa3";

export default node;
