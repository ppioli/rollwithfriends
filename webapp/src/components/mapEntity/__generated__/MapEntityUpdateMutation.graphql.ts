/**
 * @generated SignedSource<<0fa28dd4b0b74de50eb94744995ef075>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateMapEntityInput = {
  id: string;
  mapEntity: MapEntityInput;
};
export type MapEntityInput = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type MapEntityUpdateMutation$variables = {
  input: UpdateMapEntityInput;
};
export type MapEntityUpdateMutation$data = {
  readonly updateMapEntity: {
    readonly mapEntity: {
      readonly id: string;
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
    } | null;
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
    "concreteType": "UpdateMapEntityPayload",
    "kind": "LinkedField",
    "name": "updateMapEntity",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MapEntity",
        "kind": "LinkedField",
        "name": "mapEntity",
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
    "type": "TokenMutation",
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
    "cacheID": "c9b5490b2c8aafe22373b79a851f89d5",
    "id": null,
    "metadata": {},
    "name": "MapEntityUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityUpdateMutation(\n  $input: UpdateMapEntityInput!\n) {\n  updateMapEntity(input: $input) {\n    mapEntity {\n      id\n      x\n      y\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b8657988db19e32ff9dba4f54a4bdbfa";

export default node;
