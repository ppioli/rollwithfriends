/**
 * @generated SignedSource<<66389016d02aad23c50ef74d856dac79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ImageLoaderSubscription$variables = {
  fileId: number;
};
export type ImageLoaderSubscription$data = {
  readonly fileLoadingSub: {
    readonly progress: number;
  };
};
export type ImageLoaderSubscription = {
  variables: ImageLoaderSubscription$variables;
  response: ImageLoaderSubscription$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "fileId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "fileId",
        "variableName": "fileId"
      }
    ],
    "concreteType": "FileLoadingMessage",
    "kind": "LinkedField",
    "name": "fileLoadingSub",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "progress",
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
    "name": "ImageLoaderSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ImageLoaderSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "451b902bc49614e99e68c76cd1ce4eaf",
    "id": null,
    "metadata": {},
    "name": "ImageLoaderSubscription",
    "operationKind": "subscription",
    "text": "subscription ImageLoaderSubscription(\n  $fileId: Int!\n) {\n  fileLoadingSub(fileId: $fileId) {\n    progress\n  }\n}\n"
  }
};
})();

(node as any).hash = "7705434984ee17155498b0c1af9ed929";

export default node;
