/**
 * @generated SignedSource<<d3e8eacbdb5d490dd59c1bf1f3b1b29e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Ability5E = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA" | "%future added value";
export type Npc5EContentToolbarQuery$variables = {
  id: string;
  skip: boolean;
};
export type Npc5EContentToolbarQuery$data = {
  readonly node?: {
    readonly id: string;
    readonly __typename: string;
    readonly type?: {
      readonly label: string;
      readonly tags: ReadonlyArray<string> | null;
    };
    readonly savingThrows?: ReadonlyArray<{
      readonly key: Ability5E;
      readonly value: number;
    }>;
  } | null;
};
export type Npc5EContentToolbarQuery = {
  variables: Npc5EContentToolbarQuery$variables;
  response: Npc5EContentToolbarQuery$data;
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
    "name": "skip"
  }
],
v1 = [
  {
    "condition": "skip",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
                "concreteType": "KeyValuePairOfAbility5EAndInt32",
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
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Npc5EContentToolbarQuery",
    "selections": (v1/*: any*/),
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Npc5EContentToolbarQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2e4e644322c3463ca53449defd753dae",
    "id": null,
    "metadata": {},
    "name": "Npc5EContentToolbarQuery",
    "operationKind": "query",
    "text": "query Npc5EContentToolbarQuery(\n  $id: ID!\n  $skip: Boolean!\n) {\n  node(id: $id) @skip(if: $skip) {\n    id\n    __typename\n    ... on NonPlayerCharacter5E {\n      type {\n        label\n        tags\n      }\n      savingThrows {\n        key\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4776ae93ad1f928d703016166468518d";

export default node;
