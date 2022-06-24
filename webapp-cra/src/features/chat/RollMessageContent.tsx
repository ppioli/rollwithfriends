import _ from "lodash";
import { Dice } from "components/icons/Dice";

interface RollMessageContentProps {
  readonly __typename: "RollMessageContent";
  readonly rolls: ReadonlyArray<{
    readonly count: number;
    readonly faces: number;
    readonly result: ReadonlyArray<number> | null;
  }>;
}

export function RollMessageContent({ rolls }: RollMessageContentProps) {
  const total = _.sumBy(rolls, (roll) => _.sum(roll.result));
  return (
    <div className={"w-full relative h-16"}>
      <div className={"absolute inset-0 overflow-hidden"}>
        <div className={"flex w-full justify-center flex-nowrap"}>
          <Dice type={20} size={64} fill={"rgba(0,0,0,0.2)"} />
        </div>
      </div>

      <div className={"absolute w-full text-5xl p-2 text-center text-white"}>
        {total}
      </div>
    </div>
  );
}
