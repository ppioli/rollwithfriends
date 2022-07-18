/**
 * @generated SignedSource<<7c6690526807f3ceacb903345bde5ffc>>
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
};
export type CampaignQuery$data = {
  readonly campaigns: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly " $fragmentSpreads": FragmentRefs<"ParticipantList_campaign" | "Toolbar_campaign" | "CampaignSelectedScene_campaign">;
  }>;
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "x",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "y",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
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
            "name": "ParticipantList_campaign"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Toolbar_campaign"
          },
          {
            "args": null,
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignQuery",
    "selections": [
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
            "concreteType": "CampaignEnrollment",
            "kind": "LinkedField",
            "name": "participants",
            "plural": true,
            "selections": [
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
                "kind": "ScalarField",
                "name": "playerName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "roll",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
            "args": null,
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
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/)
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v3/*: any*/),
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
                            "concreteType": "AppFile",
                            "kind": "LinkedField",
                            "name": "file",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "86949a2d049bc33254a8c84525ff352b",
    "id": null,
    "metadata": {},
    "name": "CampaignQuery",
    "operationKind": "query",
    "text": "query CampaignQuery(\n  $id: ID!\n) {\n  campaigns(where: {id: {eq: $id}}) {\n    id\n    name\n    description\n    ...ParticipantList_campaign\n    ...Toolbar_campaign\n    ...CampaignSelectedScene_campaign\n  }\n}\n\nfragment CampaignSelectedScene_campaign on Campaign {\n  selectedScene {\n    id\n    ...SelectedScene_scene\n  }\n  id\n}\n\nfragment MapEntityFragment on MapEntity {\n  id\n  x\n  y\n  width\n  height\n  name\n  content {\n    __typename\n    ... on ImageContent {\n      file {\n        id\n      }\n    }\n    ... on Npc5EContent {\n      npcId\n      size\n      ac\n      maximumHp\n      currentHp\n      temporaryHp\n    }\n  }\n}\n\nfragment MapEntityLayer_scene on Scene {\n  entities {\n    id\n    ...MapEntityFragment\n  }\n}\n\nfragment ParticipantList_campaign on Campaign {\n  participants {\n    userId\n    playerName\n    roll\n  }\n}\n\nfragment SceneSelector_campaign on Campaign {\n  scenes {\n    name\n    id\n  }\n}\n\nfragment SelectedScene_scene on Scene {\n  id\n  name\n  ...MapEntityLayer_scene\n}\n\nfragment Toolbar_campaign on Campaign {\n  id\n  ...SceneSelector_campaign\n}\n"
  }
};
})();

(node as any).hash = "1674b0da9830eb815b46a613e9554cb0";

export default node;
