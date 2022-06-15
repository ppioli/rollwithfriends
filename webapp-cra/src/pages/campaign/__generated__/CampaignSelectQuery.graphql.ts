/**
 * @generated SignedSource<<8b8f2236fc761ad2ca78c9094045f6f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CampaignSelectQuery$variables = {};
export type CampaignSelectQuery$data = {
  readonly campaigns: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly description: string;
  }>;
};
export type CampaignSelectQuery = {
  variables: CampaignSelectQuery$variables;
  response: CampaignSelectQuery$data;
};

const node: ConcreteRequest = (function() {
  var v0 = [
    {
      "alias": null,
      "args": null,
      "concreteType": "Campaign",
      "kind": "LinkedField",
      "name": "campaigns",
      "plural": true,
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ];
  return {
    "fragment": {
      "argumentDefinitions": [],
      "kind": "Fragment",
      "metadata": null,
      "name": "CampaignSelectQuery",
      "selections": (v0/*: any*/),
      "type": "RootQuery",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": [],
      "kind": "Operation",
      "name": "CampaignSelectQuery",
      "selections": (v0/*: any*/)
    },
    "params": {
      "cacheID": "f841e1c5713d3e4246e82ee2fb85570f",
      "id": null,
      "metadata": {},
      "name": "CampaignSelectQuery",
      "operationKind": "query",
      "text": "query CampaignSelectQuery {\n  campaigns {\n    id\n    name\n    description\n  }\n}\n"
    }
  };
})();

(node as any).hash = "8072a89bdbb95480295f10a197b8d5f6";

export default node;
