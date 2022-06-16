/**
 * @generated SignedSource<<118c4f648627779048e39bc27599e06d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, FragmentRefs } from "relay-runtime";

export type MapEntitiesUpdateInput = {
  sceneId: string;
  entities: ReadonlyArray<MapEntityUpdateInput>;
};
export type MapEntityUpdateInput = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export type MapEntityUpdateMutation$variables = {
  input: MapEntitiesUpdateInput;
};
export type MapEntityUpdateMutation$data = {
  readonly mapEntityUpdate: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
    }> | null;
  };
};
export type MapEntityUpdateMutation = {
  variables: MapEntityUpdateMutation$variables;
  response: MapEntityUpdateMutation$data;
};

const node: ConcreteRequest = (function(){
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityUpdatePayload",
        "kind": "LinkedField",
        "name": "mapEntityUpdate",
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
              }
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
    "name": "MapEntityUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityUpdatePayload",
        "kind": "LinkedField",
        "name": "mapEntityUpdate",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "776619ca8f791849d35a3a7b5865e4de",
    "id": null,
    "metadata": {},
    "name": "MapEntityUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityUpdateMutation(\n  $input: MapEntitiesUpdateInput!\n) {\n  mapEntityUpdate(input: $input) {\n    mapEntity {\n      id\n      ...MapEntityFragment\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  x\n  y\n  width\n  height\n}\n"
  }
};
})();

(node as any).hash = "7cde9183a4324363bde004cf260c6f20";

export default node;
