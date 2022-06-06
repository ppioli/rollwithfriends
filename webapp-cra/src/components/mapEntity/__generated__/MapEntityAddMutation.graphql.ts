/**
 * @generated SignedSource<<404d986e0405d2e5c18cf1493ed58547>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MapEntityAddInput = {
  sceneId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
export type MapEntityAddMutation$variables = {
  input: MapEntityAddInput;
};
export type MapEntityAddMutation$data = {
  readonly mapEntityAdd: {
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
    "type": "Mutation",
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
    "cacheID": "8573b16cd3bc35be439044aea43482f1",
    "id": null,
    "metadata": {},
    "name": "MapEntityAddMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityAddMutation(\n  $input: MapEntityAddInput!\n) {\n  mapEntityAdd(input: $input) {\n    mapEntity {\n      id\n      x\n      y\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2eba50c753d03bc10632fcec59d5df2c";

export default node;
