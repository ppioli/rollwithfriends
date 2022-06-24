/**
 * @generated SignedSource<<7ee0fc3dabebc6560f51b7731eaa9e52>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SourceAddInput = {
  name: string;
  description: string;
  shortName?: string | null;
};
export type SourceAddMutation$variables = {
  input: SourceAddInput;
};
export type SourceAddMutation$data = {
  readonly sourceAdd: {
    readonly source: {
      readonly id: string;
      readonly shortName: string;
      readonly description: string;
    } | null;
  };
};
export type SourceAddMutation = {
  variables: SourceAddMutation$variables;
  response: SourceAddMutation$data;
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
    "concreteType": "SourceAddPayload",
    "kind": "LinkedField",
    "name": "sourceAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Source",
        "kind": "LinkedField",
        "name": "source",
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
            "name": "shortName",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SourceAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SourceAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b7fef47129aa56b9e92ef65a4659f6a",
    "id": null,
    "metadata": {},
    "name": "SourceAddMutation",
    "operationKind": "mutation",
    "text": "mutation SourceAddMutation(\n  $input: SourceAddInput!\n) {\n  sourceAdd(input: $input) {\n    source {\n      id\n      shortName\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "383713f49b0a210cf1fc09b873e17c85";

export default node;
