/**
 * @generated SignedSource<<5ab48a13f07d6fe72e5cf740795bb5c9>>
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
    "value": 30
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
v4 = [
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
        "args": [
          {
            "kind": "Literal",
            "name": "count",
            "value": 30
          }
        ],
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
        "storageKey": "entries(first:30)"
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
            "concreteType": "NpcType",
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
            "name": "hitPointsAverage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArmorClassOption",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sizes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "KeyValuePairOfAbilityAndInt32",
            "kind": "LinkedField",
            "name": "savingThrows",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "KeyValuePairOfSkillAndInt32",
            "kind": "LinkedField",
            "name": "skills",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Language",
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
            "concreteType": "Sense",
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
            "concreteType": "Resistance",
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
            "concreteType": "Speed",
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
    "cacheID": "8c02b9a97605fd24cf3c4948bc30c20d",
    "id": null,
    "metadata": {},
    "name": "EntryViewerPageQuery",
    "operationKind": "query",
    "text": "query EntryViewerPageQuery {\n  ...EntryList_rootQuery_46tGjq\n  ...EntryViewerEditor_rootQuery\n}\n\nfragment EntryListItem_NonPlayerCharacter5E on NonPlayerCharacter5E {\n  name\n}\n\nfragment EntryList_rootQuery_46tGjq on RootQuery {\n  entries(first: 30) {\n    totalCount\n    edges {\n      node {\n        id\n        ...EntryListItem_NonPlayerCharacter5E\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryViewerEditor_rootQuery on RootQuery {\n  entry {\n    id\n    ...NpcCard5e_NonPlayerCharacter5E\n  }\n}\n\nfragment NpcCard5e_NonPlayerCharacter5E on NonPlayerCharacter5E {\n  name\n  page\n  sourceId\n  avatarId\n  source {\n    shortName\n    id\n  }\n  type {\n    label\n    tags\n  }\n  hitPointsFormula\n  hitPointsAverage\n  armorClasses {\n    description\n    armorClass\n  }\n  challangeRating\n  alignments\n  sizes\n  savingThrows {\n    key\n    value\n  }\n  skills {\n    key\n    value\n  }\n  languages {\n    name\n  }\n  senses {\n    description\n    range\n  }\n  passivePerception\n  resistances {\n    condition\n    types\n  }\n  speeds {\n    walk\n    fly\n    swim\n  }\n  strength\n  dexterity\n  constitution\n  intelligence\n  wisdom\n  charisma\n}\n"
  }
};
})();

(node as any).hash = "d7baa65b8e53ad86026ed3cfc614dc5e";

export default node;
