/**
 * @generated SignedSource<<d2014909899ed407be0fac263c3d1b9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignQuery$variables = {
  id: string;
  selectedScene?: string | null;
};
export type CampaignQuery$data = {
  readonly campaigns: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly selectedScene: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"SelectedScene_scene">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"SceneSelector_campaign" | "MessageList_campaign" | "ParticipantList_campaign">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"EntryList_rootQuery">;
};
export type CampaignQuery = {
  variables: CampaignQuery$variables;
  response: CampaignQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "selectedScene"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eq",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "sceneId",
    "variableName": "selectedScene"
  }
],
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "x",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "y",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "content",
  "plural": false,
  "selections": [
    (v8/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EntryList_rootQuery"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Campaign",
        "kind": "LinkedField",
        "name": "campaigns",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SceneSelector_campaign"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessageList_campaign"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ParticipantList_campaign"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "selectedScene",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SelectedScene_scene"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "EntriesConnection",
        "kind": "LinkedField",
        "name": "entries",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EntriesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NonPlayerCharacter5E",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArmorClassOption",
                    "kind": "LinkedField",
                    "name": "armorClasses",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "armorClass",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hitPointsAverage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hitPointsFormula",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sizes",
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/)
        ],
        "storageKey": "entries(first:10)"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "RootQuery_entries",
        "kind": "LinkedHandle",
        "name": "entries"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Campaign",
        "kind": "LinkedField",
        "name": "campaigns",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "scenes",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "MessagesConnection",
            "kind": "LinkedField",
            "name": "messages",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MessagesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Message",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Roll",
                                "kind": "LinkedField",
                                "name": "rolls",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "count",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "faces",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "result",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "RollMessageContent",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "text",
                                "storageKey": null
                              }
                            ],
                            "type": "TextMessageContent",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": "messages(first:10)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "CampaignFragment_messages",
            "kind": "LinkedHandle",
            "name": "messages"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Participant",
            "kind": "LinkedField",
            "name": "participants",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v11/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "campaignRoll",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "Scene",
            "kind": "LinkedField",
            "name": "selectedScene",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                      (v2/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v8/*: any*/),
                      (v3/*: any*/),
                      (v17/*: any*/)
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
                  (v2/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v3/*: any*/),
                  (v17/*: any*/)
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
    "cacheID": "a62b0fe0c14dc4a31a784e847064146f",
    "id": null,
    "metadata": {},
    "name": "CampaignQuery",
    "operationKind": "query",
    "text": "query CampaignQuery(\n  $id: ID!\n  $selectedScene: ID\n) {\n  ...EntryList_rootQuery\n  campaigns(where: {id: {eq: $id}}) {\n    id\n    name\n    description\n    ...SceneSelector_campaign\n    ...MessageList_campaign\n    ...ParticipantList_campaign\n    selectedScene(sceneId: $selectedScene) {\n      id\n      ...SelectedScene_scene\n    }\n  }\n}\n\nfragment EntryListItem_NonPlayerCharacter5E on NonPlayerCharacter5E {\n  id\n  name\n  armorClasses {\n    description\n    armorClass\n  }\n  hitPointsAverage\n  hitPointsFormula\n  sizes\n}\n\nfragment EntryList_rootQuery on RootQuery {\n  entries(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...EntryListItem_NonPlayerCharacter5E\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  type\n  name\n  content {\n    __typename\n    ... on ImageContent {\n      fileId\n    }\n    ... on Npc5EContent {\n      npcId\n      size\n      ac\n      maximumHp\n      currentHp\n      temporaryHp\n    }\n  }\n}\n\nfragment MapEntityLayer_scene on Scene {\n  entities {\n    id\n    ...MapEntityFragment\n  }\n}\n\nfragment MessageBody_message on Message {\n  userId\n  createdAt\n  content {\n    __typename\n    ... on RollMessageContent {\n      rolls {\n        count\n        faces\n        result\n      }\n    }\n    ... on TextMessageContent {\n      text\n    }\n  }\n}\n\nfragment MessageList_campaign on Campaign {\n  messages(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...MessageBody_message\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment ParticipantList_campaign on Campaign {\n  participants {\n    id\n    userId\n    name\n    campaignRoll\n  }\n}\n\nfragment SceneSelector_campaign on Campaign {\n  scenes {\n    name\n    id\n  }\n}\n\nfragment SelectedScene_scene on Scene {\n  name\n  ...MapEntityLayer_scene\n}\n"
  }
};
})();

(node as any).hash = "1fc90f1a1c4631a2c6413e549922543a";

export default node;
