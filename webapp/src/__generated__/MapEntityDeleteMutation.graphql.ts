/**
 * @generated SignedSource<<e138744dd07b8e6734136ee68a4fb395>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MapEntityDeleteInput = {
  sceneId: string;
  deleted: ReadonlyArray<string>;
};
export type MapEntityDeleteMutation$variables = {
  input: MapEntityDeleteInput;
};
export type MapEntityDeleteMutation$data = {
  readonly mapEntityDelete: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type MapEntityDeleteMutation = {
  variables: MapEntityDeleteMutation$variables;
  response: MapEntityDeleteMutation$data;
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
    "concreteType": "MapEntityDeletePayload",
    "kind": "LinkedField",
    "name": "mapEntityDelete",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "MapEntityDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bd283a6aec3d0855dcbf3c0161dd95ba",
    "id": null,
    "metadata": {},
    "name": "MapEntityDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityDeleteMutation(\n  $input: MapEntityDeleteInput!\n) {\n  mapEntityDelete(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2dc0f22f28bc378d299d3dfde0d047d2";

export default node;
