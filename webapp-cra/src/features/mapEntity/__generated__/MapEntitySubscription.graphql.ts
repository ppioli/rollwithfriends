/**
 * @generated SignedSource<<3f9c44d64864ba765a33ba03d5e62596>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, FragmentRefs } from "relay-runtime";

export type MapEntityChangeEventType = "ADDED" | "UPDATED" | "DELETED" | "%future added value";
export type MapEntitySubscription$variables = {};
export type MapEntitySubscription$data = {
  readonly mapEntitySubscription: {
    readonly type: MapEntityChangeEventType;
    readonly payload: {
      readonly mapEntity: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MapEntity_Token">;
      };
    } | null;
  };
};
export type MapEntitySubscription = {
  variables: MapEntitySubscription$variables;
  response: MapEntitySubscription$data;
};

const node: ConcreteRequest = (function() {
  var v0 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    v1 = {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    };
  return {
    "fragment": {
      "argumentDefinitions": [],
      "kind": "Fragment",
      "metadata": null,
      "name": "MapEntitySubscription",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MapEntityChangeEvent",
          "kind": "LinkedField",
          "name": "mapEntitySubscription",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
                    (v1/*: any*/),
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
          "storageKey": null
        }
      ],
      "type": "Subscription",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": [],
      "kind": "Operation",
      "name": "MapEntitySubscription",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MapEntityChangeEvent",
          "kind": "LinkedField",
          "name": "mapEntitySubscription",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
                    (v1/*: any*/),
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
          ],
          "storageKey": null
        }
      ]
    },
    "params": {
      "cacheID": "b39bc7df937ea8c9a7a83e0f9f28ecd4",
      "id": null,
      "metadata": {},
      "name": "MapEntitySubscription",
      "operationKind": "subscription",
      "text": "subscription MapEntitySubscription {\n  mapEntitySubscription {\n    type\n    payload {\n      mapEntity {\n        id\n        ...MapEntity_Token\n      }\n    }\n  }\n}\n\nfragment MapEntity_Token on MapEntity {\n  x\n  y\n  width\n  height\n}\n"
    }
  };
})();

(node as any).hash = "eefc9908537e88e46098f830c8bfa65d";

export default node;
