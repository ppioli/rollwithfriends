import { Npc5EContentToolbarQuery$data } from "features/toolbar/character5E/__generated__/Npc5EContentToolbarQuery.graphql";
import { Abilities5E } from "data/character5E";
import { AbilitySaveButton } from "features/toolbar/character5E/AbilitySaveButton";

export function Npc5EToolbarSection({
  data,
}: {
  data: Npc5EContentToolbarQuery$data;
}) {
  const character = data.node;

  return (
    <div className={"flex flex-col p-2 bg-darker rounded-md"}>
      <h4>Saving throws</h4>
      <div className={"flex"}>
        {Abilities5E.map((e) => (
          <AbilitySaveButton
            ability={e}
            base={0}
            mod={character?.savingThrows?.find((s) => s.key === e)?.value}
          />
        ))}
      </div>
    </div>
  );
}
