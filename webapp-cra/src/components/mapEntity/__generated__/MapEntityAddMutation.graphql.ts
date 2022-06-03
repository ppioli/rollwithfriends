/**
 * @generated SignedSource<<2fa5ceef2f1e8ce469aabcb65e40961f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapEntityAddInput = {
  mapEntity: MapEntityInput;
};
export type MapEntityInput = {
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
      readonly " $fragmentSpreads": FragmentRefs<"MapEntity_Token">;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MapEntity_Token"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "1e463c27be7eb8dd477bde65a06dd2a9",
    "id": null,
    "metadata": {},
    "name": "MapEntityAddMutation",
    "operationKind": "mutation",
    "text": "mutation MapEntityAddMutation(\n  $input: MapEntityAddInput!\n) {\n  mapEntityAdd(input: $input) {\n    mapEntity {\n      id\n      ...MapEntity_Token\n    }\n  }\n}\n\nfragment MapEntity_Token on MapEntity {\n  x\n  y\n  width\n  height\n}\n"
  }
};
})();

(node as any).hash = "b8db787ffdd743e2a3789bc9f3e6fabf";

export default node;
