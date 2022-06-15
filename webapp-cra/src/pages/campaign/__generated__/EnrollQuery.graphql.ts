/**
 * @generated SignedSource<<0123020226d2a5255f48c07b0827bf8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EnrollQuery$variables = {
  code: string;
};
export type EnrollQuery$data = {
  readonly enrollment: {
    readonly id: string;
    readonly name: string;
    readonly description: string;
  } | null;
};
export type EnrollQuery = {
  variables: EnrollQuery$variables;
  response: EnrollQuery$data;
};

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "code"
      }
    ],
    v1 = [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "code",
            "variableName": "code"
          }
        ],
        "concreteType": "Campaign",
        "kind": "LinkedField",
        "name": "enrollment",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
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
      "name": "EnrollQuery",
      "selections": (v1/*: any*/),
      "type": "RootQuery",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Operation",
      "name": "EnrollQuery",
      "selections": (v1/*: any*/)
    },
    "params": {
      "cacheID": "8ddb2eb01df676f5ca926807d52fcae5",
      "id": null,
      "metadata": {},
      "name": "EnrollQuery",
      "operationKind": "query",
      "text": "query EnrollQuery(\n  $code: ID!\n) {\n  enrollment(code: $code) {\n    id\n    name\n    description\n  }\n}\n"
    }
  };
})();

(node as any).hash = "314ebd977dac8ff7461e6f8673b4d845";

export default node;
