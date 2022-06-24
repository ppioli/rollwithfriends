import { AbilitySaveButton } from "modules/dnd5e/toolbar/AbilitySaveButton";
import { Abilities5E } from "modules/dnd5e/definitions/character5E";
import { Npc5EContentToolbarQuery$data } from "modules/dnd5e/toolbar/__generated__/Npc5EContentToolbarQuery.graphql";

export function Npc5EToolbarSection({
  entityIds,
  data,
}: {
  entityIds: string[];
  data: Npc5EContentToolbarQuery$data;
}) {
  const character = data.node;

  return (
    <div className={"flex flex-col p-2 bg-darker rounded-md"}>
      <h4>Saving throws</h4>
      <div className={"flex"}>
        {Abilities5E.map((e) => (
          <AbilitySaveButton
            entityIds={entityIds}
            ability={e}
            base={0}
            mod={character?.savingThrows?.find((s) => s.key === e)?.value}
          />
        ))}
      </div>
    </div>
  );
}
