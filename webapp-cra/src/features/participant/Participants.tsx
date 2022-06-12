import { useParticipantContext } from "features/participant/ParticipantsContext";
import { ParticipantAvatar } from "features/participant/ParticipantAvatar";

export function Participants() {
  const { getIds } = useParticipantContext();
  return (
    <div className={"w-100 flex gap-2"}>
      {getIds().map((id) => (
        <ParticipantAvatar id={id} key={id} />
      ))}
    </div>
  );
}
