/**
 * @generated SignedSource<<3d05cda8a0d992b2fcdfff69a804bf46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Ability = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Npc5EToolbarQuery$variables = {
  id: string;
};
export type Npc5EToolbarQuery$data = {
  readonly node: {
    readonly name?: string;
    readonly type?: {
      readonly label: string;
    };
    readonly savingThrows?: ReadonlyArray<{
      readonly key: Ability;
      readonly value: number;
    }>;
  } | null;
};
export type Npc5EToolbarQuery = {
  variables: Npc5EToolbarQuery$variables;
  response: Npc5EToolbarQuery$data;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePairOfAbilityAndInt32",
      "kind": "LinkedField",
      "name": "savingThrows",
      "plural": true,
      "selections": [
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
      ],
      "storageKey": null
    }
  ],
  "type": "NonPlayerCharacter5E",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Npc5EToolbarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "Npc5EToolbarQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "539c7c5f9b01cf614091f40100deb591",
    "id": null,
    "metadata": {},
    "name": "Npc5EToolbarQuery",
    "operationKind": "query",
    "text": "query Npc5EToolbarQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on NonPlayerCharacter5E {\n      name\n      type {\n        label\n      }\n      savingThrows {\n        key\n        value\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "85e09864cf7317a18e35c790be2b7521";

export default node;
