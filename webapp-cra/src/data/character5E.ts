export type Ability5E =
  | "STRENGTH"
  | "DEXTERITY"
  | "CONSTITUTION"
  | "INTELLIGENCE"
  | "WISDOM"
  | "CHARISMA";

export type Size5E =
  | "TINY"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "HUGE"
  | "GARGANTUAN";

export const Abilities5E: ReadonlyArray<Ability5E> = [
  "STRENGTH",
  "DEXTERITY",
  "CONSTITUTION",
  "INTELLIGENCE",
  "WISDOM",
  "CHARISMA",
];

export function ability5EShortName(ability: Ability5E) {
  switch (ability) {
    case "STRENGTH":
      return "STR";
    case "DEXTERITY":
      return "DEX";
    case "INTELLIGENCE":
      return "INT";
    case "WISDOM":
      return "WIS";
    case "CHARISMA":
      return "CHA";
    case "CONSTITUTION":
      return "CON";
    default:
      return "??";
  }
}
