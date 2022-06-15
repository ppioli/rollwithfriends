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
    <div
      className={"w-28 h-34 bg-dark rounded p-3 flex flex-col justify-between"}
    >
      <div>
        <img
          className={"rounded-full"}
          src={`https://avatars.dicebear.com/api/pixel-art-neutral/${user?.userId}.svg`}
        />
      </div>
      <div className={"text-center overflow-hidden text-ellipsis"}>
        {user?.name}
      </div>
    </div>
  );
}
