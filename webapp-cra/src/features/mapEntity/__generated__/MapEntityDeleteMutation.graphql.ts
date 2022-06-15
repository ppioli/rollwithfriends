/**
 * @generated SignedSource<<4c675184a9a13be35f2e56fbf6f9d53b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type MapEntityDeleteInput = {
  sceneId: string;
  deleted: ReadonlyArray<string>;
};
export type MapEntityDeleteMutation$variables = {
  input: MapEntityDeleteInput;
};
export type MapEntityDeleteMutation$data = {
  readonly mapEntityDelete: {
    readonly mapEntity: ReadonlyArray<{
      readonly id: string;
    }> | null;
  };
};
export type MapEntityDeleteMutation = {
  variables: MapEntityDeleteMutation$variables;
  response: MapEntityDeleteMutation$data;
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
        "concreteType": "MapEntityDeletePayload",
        "kind": "LinkedField",
        "name": "mapEntityDelete",
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
      "cacheID": "512f5b1b7116cc040a9bd580889102f7",
      "id": null,
      "metadata": {},
      "name": "MapEntityDeleteMutation",
      "operationKind": "mutation",
      "text": "mutation MapEntityDeleteMutation(\n  $input: MapEntityDeleteInput!\n) {\n  mapEntityDelete(input: $input) {\n    mapEntity {\n      id\n    }\n  }\n}\n"
    }
  };
})();

(node as any).hash = "61c4bc966dd2515ce23c1b8ea56d496c";

export default node;
