/**
 * @generated SignedSource<<067d217887b03961ba4e0963972df489>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type SceneAddInput = {
  campaignId: string;
  name: string;
};
export type SceneAddMutation$variables = {
  input: SceneAddInput;
};
export type SceneAddMutation$data = {
  readonly sceneAdd: {
    readonly scene: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type SceneAddMutation = {
  variables: SceneAddMutation$variables;
  response: SceneAddMutation$data;
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
        "concreteType": "SceneAddPayload",
        "kind": "LinkedField",
        "name": "sceneAdd",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "scene",
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
      "name": "SceneAddMutation",
      "selections": (v1/*: any*/),
      "type": "Mutation",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": (v0/*: any*/),
      "kind": "Operation",
      "name": "SceneAddMutation",
      "selections": (v1/*: any*/)
    },
    "params": {
      "cacheID": "8c00acb58c4965bb3502fe3b5e8055aa",
      "id": null,
      "metadata": {},
      "name": "SceneAddMutation",
      "operationKind": "mutation",
      "text": "mutation SceneAddMutation(\n  $input: SceneAddInput!\n) {\n  sceneAdd(input: $input) {\n    scene {\n      id\n      name\n    }\n  }\n}\n"
    }
  };
})();

(node as any).hash = "ebdce05be6079b52f1cdec4bb507d0da";

export default node;
