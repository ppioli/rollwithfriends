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

export type Alignment5E =
  | "ANY"
  | "UNALIGNED"
  | "CHAOTIC_GOOD"
  | "NEUTRAL_GOOD"
  | "LAWFUL_GOOD"
  | "CHAOTIC_NEUTRAL"
  | "TRUE_NEUTRAL"
  | "LAWFUL_NEUTRAL"
  | "CHAOTIC_EVIL"
  | "NEUTRAL_EVIL"
  | "LAWFUL_EVIL";

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

export function getNpcProficiencyBonus(challengeRating: number): number {
  if (challengeRating < 5) {
    return 2;
  }

  return 2 + Math.ceil((challengeRating - 4) / 4);
}
