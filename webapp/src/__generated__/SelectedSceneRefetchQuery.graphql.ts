/**
 * @generated SignedSource<<ffc984e82ec05b3e1038de20b5fa3730>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectedSceneRefetchQuery$variables = {
  selectedSceneId?: string | null;
  id: string;
};
export type SelectedSceneRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CampaignSelectedScene_campaign">;
  } | null;
};
export type SelectedSceneRefetchQuery = {
  variables: SelectedSceneRefetchQuery$variables;
  response: SelectedSceneRefetchQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "selectedSceneId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "x",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "y",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectedSceneRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "selectedSceneId",
                "variableName": "selectedSceneId"
              }
            ],
            "kind": "FragmentSpread",
            "name": "CampaignSelectedScene_campaign"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SelectedSceneRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "sceneId",
                    "variableName": "selectedSceneId"
                  }
                ],
                "concreteType": "Scene",
                "kind": "LinkedField",
                "name": "selectedScene",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "ClientExtension",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MapEntity",
                        "kind": "LinkedField",
                        "name": "selected",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MapEntity",
                    "kind": "LinkedField",
                    "name": "entities",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AppFile",
                                "kind": "LinkedField",
                                "name": "file",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/)
                                ],
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
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "size",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "ac",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "maximumHp",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "currentHp",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "temporaryHp",
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
            ],
            "type": "Campaign",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "eef30e8f38d37927ca77d13a20d1834f",
    "id": null,
    "metadata": {},
    "name": "SelectedSceneRefetchQuery",
    "operationKind": "query",
    "text": "query SelectedSceneRefetchQuery(\n  $selectedSceneId: ID = null\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...CampaignSelectedScene_campaign_2FsqzA\n    id\n  }\n}\n\nfragment CampaignSelectedScene_campaign_2FsqzA on Campaign {\n  selectedScene(sceneId: $selectedSceneId) {\n    id\n    ...SelectedScene_scene\n  }\n  id\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  name\n  content {\n    __typename\n    ... on ImageContent {\n      file {\n        id\n      }\n    }\n    ... on Npc5EContent {\n      npcId\n      size\n      ac\n      maximumHp\n      currentHp\n      temporaryHp\n    }\n  }\n}\n\nfragment MapEntityLayer_scene on Scene {\n  entities {\n    id\n    ...MapEntityFragment\n  }\n}\n\nfragment SelectedScene_scene on Scene {\n  id\n  name\n  ...MapEntityLayer_scene\n}\n"
  }
};
})();

(node as any).hash = "2488419c5e550ea3b0fb9a4185849fc3";

export default node;
