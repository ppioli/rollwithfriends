/**
 * @generated SignedSource<<4e19d3dd938bd90da719a825d2603484>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntitiesPositionUpdateInput = {
  sceneId: string;
  entities: ReadonlyArray<MapEntityPositionUpdateInput>;
};
export type MapEntityPositionUpdateInput = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export type MapEntityPositionUpdateMutation$variables = {
  input: MapEntitiesPositionUpdateInput;
};
export type MapEntityPositionUpdateMutation$data = {
  readonly mapEntityPositionUpdate: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityPositionFragment">;
    }> | null;
  };
};
export type MapEntityPositionUpdateMutation$rawResponse = {
  readonly mapEntityPositionUpdate: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
    }> | null;
  };
};
export type MapEntityPositionUpdateMutation = {
  variables: MapEntityPositionUpdateMutation$variables;
  response: MapEntityPositionUpdateMutation$data;
  rawResponse: MapEntityPositionUpdateMutation$rawResponse;
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
    "name": "MapEntityPositionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityPositionUpdatePayload",
        "kind": "LinkedField",
        "name": "mapEntityPositionUpdate",
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
                "name": "MapEntityPositionFragment"
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
    "name": "MapEntityPositionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityPositionUpdatePayload",
        "kind": "LinkedField",
        "name": "mapEntityPositionUpdate",
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
    "cacheID": "1cdeca036b5da9aa0c62555eabd1bfab",
    "id": null,
    "metadata": {},
    "name": "MapEntityPositionUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityPositionUpdateMutation(\n  $input: MapEntitiesPositionUpdateInput!\n) {\n  mapEntityPositionUpdate(input: $input) {\n    mapEntity {\n      id\n      ...MapEntityPositionFragment\n    }\n  }\n}\n\nfragment MapEntityPositionFragment on MapEntity {\n  x\n  y\n  width\n  height\n}\n"
  }
};
})();

(node as any).hash = "b14494d4a716faad960e11a1cde5eb6f";

export default node;
