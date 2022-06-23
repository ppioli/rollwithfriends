import { Ability5E, ability5EShortName } from "data/character5E";

export function AbilitySaveButton({
  ability,
  base,
  mod,
}: {
  ability: Ability5E;
  base: number;
  mod?: number;
}) {
  return (
    <button
      onClick={() => console.log(`Rolled for ${base + (mod ?? 0)}`)}
      className={"btn btn-primary"}
    >
      {ability5EShortName(ability)}
    </button>
  );
}
