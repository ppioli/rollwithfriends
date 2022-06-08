/**
 * @generated SignedSource<<f62f7c2e454f81aed547626d549e5273>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type ChangeMessageType = "ADD" | "UPDATE" | "DELETE" | "%future added value";
export type MapEntityChangeSubscription$variables = {
  sceneId: string;
};
export type MapEntityChangeSubscription$data = {
  readonly mapEntityChanged: {
    readonly type: ChangeMessageType;
    readonly userId: string;
    readonly payload: ReadonlyArray<{
      readonly id: string;
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
    }>;
  };
};
export type MapEntityChangeSubscription = {
  variables: MapEntityChangeSubscription$variables;
  response: MapEntityChangeSubscription$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sceneId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "sceneId",
        "variableName": "sceneId"
      }
    ],
    "concreteType": "MapEntityChangeMessage",
    "kind": "LinkedField",
    "name": "mapEntityChanged",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "MapEntity",
        "kind": "LinkedField",
        "name": "payload",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityChangeSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityChangeSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "331913324ab964cd82a260db10d98ee0",
    "id": null,
    "metadata": {},
    "name": "MapEntityChangeSubscription",
    "operationKind": "subscription",
    "text": "subscription MapEntityChangeSubscription(\n  $sceneId: ID!\n) {\n  mapEntityChanged(sceneId: $sceneId) {\n    type\n    userId\n    payload {\n      id\n      x\n      y\n      width\n      height\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "27ab16f81148ad2371484bae3e3bfc84";

export default node;
