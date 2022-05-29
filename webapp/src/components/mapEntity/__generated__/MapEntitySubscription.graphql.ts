/**
 * @generated SignedSource<<6501f06fa063e9487d8135f5a970a203>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MapEntitySubscription$variables = {};
export type MapEntitySubscription$data = {
  readonly mapEntitySubscription: {
    readonly payload: {
      readonly mapEntity: {
        readonly id: string;
        readonly width: number;
        readonly height: number;
        readonly x: number;
        readonly y: number;
      };
    } | null;
  };
};
export type MapEntitySubscription = {
  variables: MapEntitySubscription$variables;
  response: MapEntitySubscription$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "MapEntityChangeEvent",
    "kind": "LinkedField",
    "name": "mapEntitySubscription",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MapEntityPayload",
        "kind": "LinkedField",
        "name": "payload",
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
                "name": "width",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "height",
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
              }
            ],
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntitySubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapEntitySubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "79e3a0c537f5ca64fcd3cde3033d51a2",
    "id": null,
    "metadata": {},
    "name": "MapEntitySubscription",
    "operationKind": "subscription",
    "text": "subscription MapEntitySubscription {\n  mapEntitySubscription {\n    payload {\n      mapEntity {\n        id\n        width\n        height\n        x\n        y\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1077213ab3f5d90d76eb973328aba661";

export default node;
