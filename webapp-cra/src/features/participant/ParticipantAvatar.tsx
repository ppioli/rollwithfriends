import { useParticipantContext } from "features/participant/ParticipantsContext";

interface ParticipantAvatarProps {
  id: string;
}

export function ParticipantAvatar({ id }: ParticipantAvatarProps) {
  const { getById } = useParticipantContext();

  const user = getById(id);

  if (user === undefined) {
    return <div className={"w-28 h-32 bg-red-400"}>Error</div>;
  }

  return (
    <div className={"w-28 h-32 relative bg-dark rounded "}>
      <img
        className={"absolute inset-x-1 top-1"}
        src={`https://avatars.dicebear.com/api/adventurer/${user?.userId}.svg`}
      />
      <div className={"absolute inset-x-1 bottom-1 text-center"}>
        {user?.name}
      </div>
    </div>
  );
}
