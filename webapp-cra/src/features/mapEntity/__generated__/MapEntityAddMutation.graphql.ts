/**
 * @generated SignedSource<<85c0262249375c753626f549977d4743>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, FragmentRefs } from "relay-runtime";

export type ImageState = "LOADED" | "LOADING" | "MISSING" | "%future added value";
export type MapEntitiesAddInput = {
  sceneId: string;
  entities: ReadonlyArray<MapEntityAddInput>;
};
export type MapEntityAddInput = {
  x: number;
  y: number;
  width: number;
  height: number;
  fileType: string;
};
export type MapEntityAddMutation$variables = {
  input: MapEntitiesAddInput;
};
export type MapEntityAddMutation$data = {
  readonly mapEntityAdd: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly imageState: ImageState;
      readonly imageId: number;
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
    }> | null;
  };
};
export type MapEntityAddMutation = {
  variables: MapEntityAddMutation$variables;
  response: MapEntityAddMutation$data;
};

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "input"
      }
    ],
    v1 = [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    v2 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    v3 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageState",
      "storageKey": null
    },
    v4 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageId",
      "storageKey": null
    };
  return {
    "fragment": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Fragment",
      "metadata": null,
      "name": "MapEntityAddMutation",
      "selections": [
        {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "MapEntityAddPayload",
          "kind": "LinkedField",
          "name": "mapEntityAdd",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "MapEntity",
              "kind": "LinkedField",
              "name": "mapEntity",
              "plural": true,
              "selections": [
                (v2/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MapEntityFragment"
                },
                (v3/*: any*/),
                (v4/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "Mutation",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Operation",
      "name": "MapEntityAddMutation",
      "selections": [
        {
          "alias": null,
          "args": (v1/*: any*/),
          "concreteType": "MapEntityAddPayload",
          "kind": "LinkedField",
          "name": "mapEntityAdd",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "MapEntity",
              "kind": "LinkedField",
              "name": "mapEntity",
              "plural": true,
              "selections": [
                (v2/*: any*/),
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
                (v3/*: any*/),
                (v4/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ]
    },
    "params": {
      "cacheID": "dfab4c40cdf44be50e93c587ec0dedf8",
      "id": null,
      "metadata": {},
      "name": "MapEntityAddMutation",
      "operationKind": "mutation",
      "text": "mutation MapEntityAddMutation(\n  $input: MapEntitiesAddInput!\n) {\n  mapEntityAdd(input: $input) {\n    mapEntity {\n      id\n      ...MapEntityFragment\n      imageState\n      imageId\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  x\n  y\n  width\n  height\n}\n"
    }
  };
})();

(node as any).hash = "8354b4bc332ec59aff3cbbebe02ed598";

export default node;
