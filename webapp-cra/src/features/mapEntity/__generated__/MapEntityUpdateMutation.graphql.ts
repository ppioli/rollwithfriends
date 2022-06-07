/**
 * @generated SignedSource<<315d625b2158de5358e9c9b54cc469bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MapEntityUpdateInput = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export type MapEntityUpdateMutation$variables = {
  input: ReadonlyArray<MapEntityUpdateInput>;
};
export type MapEntityUpdateMutation$data = {
  readonly mapEntityUpdate: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "deb6f7030ac5ab4d73b4019d10bff5fa",
    "id": null,
    "metadata": {},
    "name": "MapEntityUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityUpdateMutation(\n  $input: [MapEntityUpdateInput!]!\n) {\n  mapEntityUpdate(input: $input) {\n    mapEntity {\n      id\n      x\n      y\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc7e6847f8f3086698acf05d1eebe4a3";

export default node;
