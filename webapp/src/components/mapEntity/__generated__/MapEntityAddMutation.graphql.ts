/**
 * @generated SignedSource<<5ac263ae1f0941226ea3dc902d91f980>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddMapEntityInput = {
  mapEntity: MapEntityInput;
};
export type MapEntityInput = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type MapEntityAddMutation$variables = {
  input: AddMapEntityInput;
};
export type MapEntityAddMutation$data = {
  readonly addMapEntity: {
    readonly mapEntity: {
      readonly id: string;
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
    } | null;
  };
};
export type MapEntityAddMutation = {
  variables: MapEntityAddMutation$variables;
  response: MapEntityAddMutation$data;
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
    "concreteType": "AddMapEntityPayload",
    "kind": "LinkedField",
    "name": "addMapEntity",
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
    "name": "MapEntityAddMutation",
    "selections": (v1/*: any*/),
    "type": "TokenMutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7fe783356170089de3d98363c850006b",
    "id": null,
    "metadata": {},
    "name": "MapEntityAddMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityAddMutation(\n  $input: AddMapEntityInput!\n) {\n  addMapEntity(input: $input) {\n    mapEntity {\n      id\n      x\n      y\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a9e67e775b0a49ad71d20071d397355";

export default node;
