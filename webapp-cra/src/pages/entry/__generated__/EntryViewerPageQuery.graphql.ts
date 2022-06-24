/**
 * @generated SignedSource<<0bdd3ca3d9fd5b2e846328a579e6d77a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntryViewerPageQuery$variables = {};
export type EntryViewerPageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntryList_rootQuery" | "EntryViewerEditor_rootQuery">;
};
export type EntryViewerPageQuery = {
  variables: EntryViewerPageQuery$variables;
  response: EntryViewerPageQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ArmorClassOption5E",
  "kind": "LinkedField",
  "name": "armorClasses",
  "plural": true,
  "selections": [
    (v3/*: any*/),
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hitPointsAverage",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hitPointsFormula",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizes",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "key",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EntryViewerPageQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EntryList_rootQuery"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EntryViewerEditor_rootQuery"
      }
    ],
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EntryViewerPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "EntriesConnection",
        "kind": "LinkedField",
        "name": "entries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
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
          }
        ],
        "storageKey": "entries(first:10)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "RootQuery_entries",
        "kind": "LinkedHandle",
        "name": "entries"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "NonPlayerCharacter5E",
        "kind": "LinkedField",
        "name": "entry",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "page",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sourceId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Source",
            "kind": "LinkedField",
            "name": "source",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortName",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "NpcType5E",
            "kind": "LinkedField",
            "name": "type",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "tags",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v5/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "challangeRating",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "alignments",
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "KeyValuePairOfAbility5EAndInt32",
            "kind": "LinkedField",
            "name": "savingThrows",
            "plural": true,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "KeyValuePairOfSkillAndInt32",
            "kind": "LinkedField",
            "name": "skills",
            "plural": true,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Language5E",
            "kind": "LinkedField",
            "name": "languages",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sense5E",
            "kind": "LinkedField",
            "name": "senses",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "range",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "passivePerception",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resistance5E",
            "kind": "LinkedField",
            "name": "resistances",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "condition",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "types",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Speed5E",
            "kind": "LinkedField",
            "name": "speeds",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "walk",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fly",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "swim",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "strength",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dexterity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "constitution",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "intelligence",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "wisdom",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "charisma",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2a92bcb178138c052ab3f12118712e39",
    "id": null,
    "metadata": {},
    "name": "EntryViewerPageQuery",
    "operationKind": "query",
    "text": "query EntryViewerPageQuery {\n  ...EntryList_rootQuery\n  ...EntryViewerEditor_rootQuery\n}\n\nfragment EntryListItem_NonPlayerCharacter5E on NonPlayerCharacter5E {\n  id\n  name\n  armorClasses {\n    description\n    armorClass\n  }\n  hitPointsAverage\n  hitPointsFormula\n  sizes\n}\n\nfragment EntryList_rootQuery on RootQuery {\n  entries(first: 10) {\n    totalCount\n    edges {\n      node {\n        id\n        ...EntryListItem_NonPlayerCharacter5E\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryViewerEditor_rootQuery on RootQuery {\n  entry {\n    id\n    ...NpcCard5e_NonPlayerCharacter5E\n  }\n}\n\nfragment NpcCard5e_NonPlayerCharacter5E on NonPlayerCharacter5E {\n  name\n  page\n  sourceId\n  avatarId\n  source {\n    shortName\n    id\n  }\n  type {\n    label\n    tags\n  }\n  hitPointsFormula\n  hitPointsAverage\n  armorClasses {\n    description\n    armorClass\n  }\n  challangeRating\n  alignments\n  sizes\n  savingThrows {\n    key\n    value\n  }\n  skills {\n    key\n    value\n  }\n  languages {\n    name\n  }\n  senses {\n    description\n    range\n  }\n  passivePerception\n  resistances {\n    condition\n    types\n  }\n  speeds {\n    walk\n    fly\n    swim\n  }\n  strength\n  dexterity\n  constitution\n  intelligence\n  wisdom\n  charisma\n}\n"
  }
};
})();

(node as any).hash = "8222a2d75deafd9b98e735da30d5e0a2";

export default node;
