import { createContext, ReactNode, useContext } from "react";
import { ParticipantData } from "features/participant/Participant.data";
import { useFragment } from "react-relay";
import { ParticipantList_campaign$key } from "features/participant/__generated__/ParticipantList_campaign.graphql";
import { ParticipantList } from "features/participant/Participant.graphql";

interface CampaignContextData {
  getById: (id: string) => ParticipantData | undefined;
  getIds: () => string[];
  campaignId: string;
  sceneId?: string;
}

const CampaignContext = createContext<CampaignContextData>({} as any);

export interface CampaignProviderProps {
  campaignId: string;
  sceneId?: string;
  campaign: ParticipantList_campaign$key;
  children: ReactNode;
}

export function CampaignProvider({
  campaignId,
  sceneId,
  campaign,
  children,
}: CampaignProviderProps) {
  const data = useFragment(ParticipantList, campaign);

  const userMap: Record<string, ParticipantData> = {};

  data.participants.forEach(
    ({ userId, name, campaignRoll }) =>
      (userMap[userId] = { userId, name, campaignRoll })
  );

  const getById = (userId: string) => userMap[userId];

  const getIds = () => Object.keys(userMap);

  const contextData: CampaignContextData = {
    getById,
    getIds,
    campaignId,
    sceneId,
  };

  return (
    <CampaignContext.Provider value={contextData}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaignContext() {
  return useContext(CampaignContext);
}
