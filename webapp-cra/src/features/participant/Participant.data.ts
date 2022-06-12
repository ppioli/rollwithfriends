import { CampaignRoll } from "features/participant/__generated__/ParticipantList_campaign.graphql";

export interface ParticipantData {
  name: string;
  campaignRoll: CampaignRoll;
  userId: string;
}
