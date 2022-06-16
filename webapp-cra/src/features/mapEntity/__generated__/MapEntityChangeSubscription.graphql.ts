/**
 * @generated SignedSource<<c0d9944640e495209b8192ab496665b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeMessageType = "ADD" | "UPDATE" | "DELETE" | "%future added value";
export type ImageState = "LOADED" | "LOADING" | "MISSING" | "%future added value";
export type MapEntityChangeSubscription$variables = {
  sceneId: string;
};
export type MapEntityChangeSubscription$data = {
  readonly mapEntityChanged: {
    readonly type: ChangeMessageType;
    readonly userId: string;
    readonly payload: ReadonlyArray<{
      readonly id: string;
      readonly imageState: ImageState;
      readonly imageId: number;
      readonly " $fragmentSpreads": FragmentRefs<"MapEntityFragment">;
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
    "kind": "Variable",
    "name": "sceneId",
    "variableName": "sceneId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageState",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapEntityChangeSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityChangeMessage",
        "kind": "LinkedField",
        "name": "mapEntityChanged",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MapEntity",
            "kind": "LinkedField",
            "name": "payload",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MapEntityFragment"
              },
              (v5/*: any*/),
              (v6/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapEntityChangeSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MapEntityChangeMessage",
        "kind": "LinkedField",
        "name": "mapEntityChanged",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MapEntity",
            "kind": "LinkedField",
            "name": "payload",
            "plural": true,
            "selections": [
              (v4/*: any*/),
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
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d3d08294f47dac4846efbc1f89c8362a",
    "id": null,
    "metadata": {},
    "name": "MapEntityChangeSubscription",
    "operationKind": "subscription",
    "text": "subscription MapEntityChangeSubscription(\n  $sceneId: ID!\n) {\n  mapEntityChanged(sceneId: $sceneId) {\n    type\n    userId\n    payload {\n      id\n      ...MapEntityFragment\n      imageState\n      imageId\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  x\n  y\n  width\n  height\n}\n"
  }
};
})();

(node as any).hash = "c0101ca0c7ff63fee796e244bee7ffbd";

export default node;
