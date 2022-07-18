import { useCampaignContext } from "features/participant/CampaignContext";
import { ParticipantAvatar } from "features/participant/ParticipantAvatar";

export function Participants() {
  const { getIds } = useCampaignContext();
  return (
    <div className={"s-full flex gap-2 justify-center items-center"}>
      {getIds().map((id) => (
        <ParticipantAvatar id={id} key={id} />
      ))}
    </div>
  );
}
