/**
 * @generated SignedSource<<7e009f3417197b4751d9cbd5f3ebccf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntryViewerEditorSelected$variables = {
  id?: string | null;
};
export type EntryViewerEditorSelected$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntryViewerEditor_rootQuery">;
};
export type EntryViewerEditorSelected = {
  variables: EntryViewerEditorSelected$variables;
  response: EntryViewerEditorSelected$data;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EntryViewerEditorSelected",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "EntryViewerEditor_rootQuery"
      }
    ],
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EntryViewerEditorSelected",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NonPlayerCharacter5E",
        "kind": "LinkedField",
        "name": "entry",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
              (v2/*: any*/)
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
            "concreteType": "ArmorClassOption5E",
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
            "concreteType": "KeyValuePairOfAbility5EAndInt32",
            "kind": "LinkedField",
            "name": "savingThrows",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "KeyValuePairOfSkillAndInt32",
            "kind": "LinkedField",
            "name": "skills",
            "plural": true,
            "selections": (v5/*: any*/),
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
              (v3/*: any*/)
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
              (v4/*: any*/),
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
    "cacheID": "ae5ef0e18d4fcee8c2de8e1d9f13c27a",
    "id": null,
    "metadata": {},
    "name": "EntryViewerEditorSelected",
    "operationKind": "query",
    "text": "query EntryViewerEditorSelected(\n  $id: ID = null\n) {\n  ...EntryViewerEditor_rootQuery_1Bmzm5\n}\n\nfragment EntryViewerEditor_rootQuery_1Bmzm5 on RootQuery {\n  entry(id: $id) {\n    id\n    ...NpcCard5e_NonPlayerCharacter5E\n  }\n}\n\nfragment NpcCard5e_NonPlayerCharacter5E on NonPlayerCharacter5E {\n  name\n  page\n  sourceId\n  avatarId\n  source {\n    shortName\n    id\n  }\n  type {\n    label\n    tags\n  }\n  hitPointsFormula\n  hitPointsAverage\n  armorClasses {\n    description\n    armorClass\n  }\n  challangeRating\n  alignments\n  sizes\n  savingThrows {\n    key\n    value\n  }\n  skills {\n    key\n    value\n  }\n  languages {\n    name\n  }\n  senses {\n    description\n    range\n  }\n  passivePerception\n  resistances {\n    condition\n    types\n  }\n  speeds {\n    walk\n    fly\n    swim\n  }\n  strength\n  dexterity\n  constitution\n  intelligence\n  wisdom\n  charisma\n}\n"
  }
};
})();

(node as any).hash = "6f3a5706ef4295212e9bfe16fef1caa3";

export default node;
