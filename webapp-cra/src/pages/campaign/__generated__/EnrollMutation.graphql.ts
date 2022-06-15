/**
 * @generated SignedSource<<b195cc464a215759832b0b758d8761a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EnrollmentAddInput = {
  code: string;
};
export type EnrollMutation$variables = {
  input: EnrollmentAddInput;
};
export type EnrollMutation$data = {
  readonly enrollmentAdd: {
    readonly campaign: {
      readonly id: string;
    } | null;
  };
};
export type EnrollMutation = {
  variables: EnrollMutation$variables;
  response: EnrollMutation$data;
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
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "EnrollmentAddPayload",
        "kind": "LinkedField",
        "name": "enrollmentAdd",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Campaign",
            "kind": "LinkedField",
            "name": "campaign",
            "plural": false,
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
        ],
        "storageKey": null
      }
    ];
  return {
    "fragment": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Fragment",
      "metadata": null,
      "name": "EnrollMutation",
      "selections": (v1/*: any*/),
      "type": "Mutation",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Operation",
      "name": "EnrollMutation",
      "selections": (v1/*: any*/)
    },
    "params": {
      "cacheID": "04e6833bc3d40ecd8647910f68b041fc",
      "id": null,
      "metadata": {},
      "name": "EnrollMutation",
      "operationKind": "mutation",
      "text": "mutation EnrollMutation(\n  $input: EnrollmentAddInput!\n) {\n  enrollmentAdd(input: $input) {\n    campaign {\n      id\n    }\n  }\n}\n"
    }
  };
})();

(node as any).hash = "52ace41f55ccdcf074150298d134cea5";

export default node;
