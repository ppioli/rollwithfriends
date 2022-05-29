/**
 * @generated SignedSource<<01eb1aaec43f661e83fa0617d4d4a86b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type BaseMapQuery$variables = {};
export type BaseMapQuery$data = {
  readonly tokens: ReadonlyArray<{
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  }>;
};
export type BaseMapQuery = {
  variables: BaseMapQuery$variables;
  response: BaseMapQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Token",
    "kind": "LinkedField",
    "name": "tokens",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BaseMapQuery",
    "selections": (v0/*: any*/),
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BaseMapQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "983d21258058acb05250edf8f8fd87dd",
    "id": null,
    "metadata": {},
    "name": "BaseMapQuery",
    "operationKind": "query",
    "text": "query BattleMapQuery {\n  tokens {\n    id\n    x\n    y\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab20f53572a4f4d0ac2f4744f9894cf1";

export default node;
