/**
 * @generated SignedSource<<3e572f1b5c4d4278bcad65062abd1f1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { FragmentRefs, ReaderFragment } from "relay-runtime";

export type TokenLayer_scene$data = {
  readonly tokens: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"TokenEntity_Token">;
      };
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "TokenLayer_scene";
};
export type TokenLayer_scene$key = {
  readonly " $data"?: TokenLayer_scene$data;
  readonly " $fragmentSpreads": FragmentRefs<"TokenLayer_scene">;
};

const node: ReaderFragment = (function() {
  var v0 = [
      "tokens"
    ],
    v1 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    };
  return {
    "argumentDefinitions": [
      {
        "kind": "RootArgument",
        "name": "after"
      },
      {
        "kind": "RootArgument",
        "name": "first"
      }
    ],
    "kind": "Fragment",
    "metadata": {
      "connection": [
        {
          "count": "first",
          "cursor": "after",
          "direction": "forward",
          "path": (v0/*: any*/)
        }
      ],
      "refetch": {
        "connection": {
          "forward": {
            "count": "first",
            "cursor": "after"
          },
          "backward": null,
          "path": (v0/*: any*/)
        },
        "fragmentPathInResult": [
          "node"
        ],
        "operation": require("features/battleMap/mapEntityLayer/__generated__/TokenListQuery.graphql"),
        "identifierField": "id"
      }
    },
    "name": "TokenLayer_scene",
    "selections": [
      {
        "alias": "tokens",
        "args": null,
        "concreteType": "TokensConnection",
        "kind": "LinkedField",
        "name": "__TokenLayer_scene_tokens_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TokensEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Token",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "TokenEntity_Token"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v1/*: any*/)
    ],
    "type": "Scene",
    "abstractKey": null
  };
})();

(node as any).hash = "f641c00034f216b6ba4eb123149d9973";

export default node;
