import { formatRoll, RollMessageContentProps } from "utils/rollUtils";
import { useMemo, useState } from "react";

interface RollDetailProps {
  rolls: RollMessageContentProps["rolls"];
  isRolling: boolean;
}
export function RollDetail({ rolls, isRolling }: RollDetailProps) {
  const formatted = useMemo(() => formatRoll(rolls), [rolls]);
  const [showDetail, setShowDetail] = useState(false);

  const toggle = () => {
    setShowDetail((prev) => !prev);
  };

  return (
    <div className={"flex w-100 justify-center items-center"} onClick={toggle}>
      {!showDetail && (
        <div className={"badge badge-primary"}>
          {formatted.map((s) => `${s.sign}${s.description}`).join("")}
        </div>
      )}
      {showDetail && (
        <>
          {formatted.map((s, ix) => (
            <>
              <div className={"h1 p-1"}>{s.sign}</div>
              <div key={ix} className={"badge badge-primary flex flex-col"}>
                <div>{s.rolls}</div>
                <div>{s.description}</div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
}
