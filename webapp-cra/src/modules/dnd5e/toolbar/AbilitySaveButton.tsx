import { useRollMessageAddMutation } from "features/chat/Message.graphql";
import { useSelectedScene } from "pages/scene/SelectedSceneContext";
import { RollMessagesAddInput } from "features/chat/__generated__/MessageRollAddMutation.graphql";
import { Roll } from "data/Roll";
import {
  Ability5E,
  ability5EShortName,
} from "modules/dnd5e/definitions/character5E";

export function AbilitySaveButton({
  entityIds,
  ability,
  base,
  mod,
}: {
  entityIds: string[];
  ability: Ability5E;
  base: number;
  mod?: number;
}) {
  const { campaignId } = useSelectedScene();
  const [addRollMessage, rollInFlight] = useRollMessageAddMutation(campaignId);
  const rollSave = () => {
    const input: RollMessagesAddInput = {
      campaignId,
      messages: entityIds.map((id) => ({
        dmRoll: false,
        sourceId: id,
        rolls: [Roll.D20(), Roll.Flat(base + (mod ?? 0))],
      })),
    };
    addRollMessage(input);
  };
  return (
    <button
      disabled={rollInFlight}
      onClick={() => rollSave()}
      className={"btn btn-primary"}
    >
      {ability5EShortName(ability)}
    </button>
  );
}
