import { FillSize } from "components/FillSize";
import { Hearth } from "components/icons/Misc";

export function HpCard({
  hp,
  maxHp,
  temporaryHp,
}: {
  hp: number | null;
  maxHp: number | null;
  temporaryHp: number | null;
}) {
  return (
    <FillSize className={"relative"}>
      {(width, height) => (
        <>
          <div className={"absolute inset-0 flex justify-center items-center"}>
            <Hearth
              fill={"rgba( 0,0,0,0.1)"}
              accentFill={"rgba(0,0,0,0.3)"}
              size={Math.min(width, height)}
            />
          </div>
          <div className={"absolute inset-0 flex justify-center items-center"}>
            <div className={"flex items-baseline"}>
              <h1>{hp ?? "*"}</h1> <h5>/{maxHp ?? "*"}</h5>
              {temporaryHp !== 0 && <h1>(+{temporaryHp})</h1>}
            </div>
          </div>
        </>
      )}
    </FillSize>
  );
}
