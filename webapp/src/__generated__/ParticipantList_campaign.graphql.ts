/**
 * @generated SignedSource<<79ae7f97db82a3a16820773db949c0ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignRoll = "DUNGEON_MASTER" | "PLAYER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ParticipantList_campaign$data = {
  readonly participants: ReadonlyArray<{
    readonly userId: string;
    readonly playerName: string;
    readonly roll: CampaignRoll;
  }>;
  readonly " $fragmentType": "ParticipantList_campaign";
};
export type ParticipantList_campaign$key = {
  readonly " $data"?: ParticipantList_campaign$data;
  readonly " $fragmentSpreads": FragmentRefs<"ParticipantList_campaign">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ParticipantList_campaign",
  "selections": [
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
    }
  ],
  "type": "Campaign",
  "abstractKey": null
};

(node as any).hash = "95ad7876f2a116e2c9eef0638934927d";

export default node;
