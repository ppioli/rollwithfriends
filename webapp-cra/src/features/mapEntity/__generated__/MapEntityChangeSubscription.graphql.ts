/**
 * @generated SignedSource<<7a5197b84ab613f600e545f35751f647>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "content",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "fileId",
                        "storageKey": null
                      }
                    ],
                    "type": "ImageContent",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "npcId",
                        "storageKey": null
                      }
                    ],
                    "type": "Npc5EContent",
                    "abstractKey": null
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
    "cacheID": "a35d79ce6e48de027398cfb8a103a8d1",
    "id": null,
    "metadata": {},
    "name": "MapEntityChangeSubscription",
    "operationKind": "subscription",
    "text": "subscription MapEntityChangeSubscription(\n  $sceneId: ID!\n) {\n  mapEntityChanged(sceneId: $sceneId) {\n    type\n    userId\n    payload {\n      id\n      ...MapEntityFragment\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  type\n  content {\n    __typename\n    ... on ImageContent {\n      fileId\n    }\n    ... on Npc5EContent {\n      npcId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "68b1789b40227aa4332578e8cc9c0090";

export default node;
