/**
 * @generated SignedSource<<928a5be106ae0288b7362e32c5c04f64>>
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
    readonly id: string;
    readonly userId: string;
    readonly name: string;
    readonly campaignRoll: CampaignRoll;
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
      "concreteType": "Participant",
      "kind": "LinkedField",
      "name": "participants",
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
          "name": "userId",
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
          "name": "campaignRoll",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Campaign",
  "abstractKey": null
};

(node as any).hash = "0ec727a13abc840f5f51ae407df82fc7";

export default node;
