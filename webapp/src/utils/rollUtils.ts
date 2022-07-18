import _ from "lodash";

export interface RollMessageContentProps {
  isNew: boolean;
  readonly rolls: ReadonlyArray<{
    readonly count: number;
    readonly faces: number;
    readonly result: ReadonlyArray<number> | null;
  }>;
}

export interface FormattedRoll {
  sign: string;
  rolls: string | null;
  description: string;
}

export function formatRoll(rolls: RollMessageContentProps["rolls"]) {
  let isFirst = true;
  const formatted: FormattedRoll[] = [];

  for (let roll of _.sortBy(rolls, (r) => r.faces).reverse()) {
    if (roll.count === 0) {
      continue;
    }

    formatted.push({
      sign: roll.count < 0 ? " - " : isFirst ? "" : " + ",
      rolls: roll.result?.map((r) => String(r)).join(" + ") ?? null,
      description:
        roll.faces === 1 ? String(roll.count) : `${roll.count}d${roll.faces}`,
    });
    isFirst = false;
  }

  return formatted;
}
