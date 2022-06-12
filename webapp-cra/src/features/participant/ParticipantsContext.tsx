import { createContext, ReactNode, useContext } from "react";
import { ParticipantData } from "features/participant/Participant.data";
import { useFragment } from "react-relay";
import { ParticipantList_campaign$key } from "features/participant/__generated__/ParticipantList_campaign.graphql";
import { ParticipantList } from "features/participant/Participant.graphql";

interface ParticipantsContextData {
  getById: (id: string) => ParticipantData | undefined;
  getIds: () => string[];
}

const ParticipantsContext = createContext<ParticipantsContextData>({} as any);

export interface ParticipantsProviderProps {
  campaign: ParticipantList_campaign$key;
  children: ReactNode;
}

export function ParticipantsProvider({
  campaign,
  children,
}: ParticipantsProviderProps) {
  const data = useFragment(ParticipantList, campaign);

  const userMap: Record<string, ParticipantData> = {};

  data.participants.forEach(
    ({ userId, name, campaignRoll }) =>
      (userMap[userId] = { userId, name, campaignRoll })
  );

  const getById = (userId: string) => userMap[userId];

  const getIds = () => Object.keys(userMap);

  const contextData: ParticipantsContextData = {
    getById,
    getIds,
  };

  return (
    <ParticipantsContext.Provider value={contextData}>
      {children}
    </ParticipantsContext.Provider>
  );
}

export function useParticipantContext() {
  return useContext(ParticipantsContext);
}
