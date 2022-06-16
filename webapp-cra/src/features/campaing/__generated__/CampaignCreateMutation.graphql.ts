/**
 * @generated SignedSource<<ccec4b5508f86ea08e99280909643d2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CampaignAddInput = {
  name: string;
  description: string;
};
export type CampaignCreateMutation$variables = {
  input: CampaignAddInput;
};
export type CampaignCreateMutation$data = {
  readonly campaignAdd: {
    readonly campaign: {
      readonly id: string;
    } | null;
  };
};
export type CampaignCreateMutation = {
  variables: CampaignCreateMutation$variables;
  response: CampaignCreateMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CampaignAddPayload",
    "kind": "LinkedField",
    "name": "campaignAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Campaign",
        "kind": "LinkedField",
        "name": "campaign",
        "plural": false,
        "selections": [
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4c91941b53a293178da467d258a471dd",
    "id": null,
    "metadata": {},
    "name": "CampaignCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CampaignCreateMutation(\n  $input: CampaignAddInput!\n) {\n  campaignAdd(input: $input) {\n    campaign {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a7375daa0668f6ad0cc4dbf58a30af6";

export default node;
