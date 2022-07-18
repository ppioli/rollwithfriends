import { createContext, ReactNode, useContext } from "react";
import { ParticipantData } from "features/participant/Participant.data";
import { useFragment } from "react-relay";
import { ParticipantList } from "features/participant/Participant.graphql";
import { ParticipantList_campaign$key } from "__generated__/ParticipantList_campaign.graphql";

interface CampaignContextData {
  getById: (id: string) => ParticipantData | undefined;
  getIds: () => string[];
  campaignId: string;
  selectScene: (sceneId: string) => void;
}

const CampaignContext = createContext<CampaignContextData>({} as any);

export interface CampaignProviderProps {
  selectScene: (sceneId: string) => void;
  campaignId: string;
  campaign: ParticipantList_campaign$key;
  children: ReactNode;
}

export function CampaignProvider({
  selectScene,
  campaignId,
  campaign,
  children,
}: CampaignProviderProps) {
  const data = useFragment(ParticipantList, campaign);

  const userMap: Record<string, ParticipantData> = {};

  data.participants.forEach(
    ({ userId, playerName, roll }) =>
      (userMap[userId] = { userId, playerName, roll })
  );

  const getById = (userId: string) => userMap[userId];

  const getIds = () => Object.keys(userMap);

  const contextData: CampaignContextData = {
    getById,
    getIds,
    campaignId,
    selectScene,
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
