import {
  Ability5E,
  ability5EShortName,
} from "modules/dnd5e/definitions/character5E";
import { RollMessagesAddInput } from "features/chat/__generated__/MessageRollAddMutation.graphql";
import { useRollMessageAddMutation } from "features/chat/Message.graphql";

export function AbilitySaveButton({
  payloadBuilder,
  ability,
}: {
  payloadBuilder: (ability: Ability5E) => RollMessagesAddInput;
  ability: Ability5E;
}) {
  const [addRollMessage, rollInFlight] = useRollMessageAddMutation();

  return (
    <button
      disabled={rollInFlight}
      onClick={() => {
        console.log("Asf");
        addRollMessage(payloadBuilder(ability));
      }}
      className={"btn btn-primary"}
    >
      {ability5EShortName(ability)}
    </button>
  );
}
