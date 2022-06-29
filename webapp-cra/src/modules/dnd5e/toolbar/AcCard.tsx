import { FillSize } from "components/FillSize";
import { Shield } from "components/icons/Misc";

export function AcCard({ ac }: { ac?: number }) {
  return (
    <FillSize className={"relative"}>
      {(width, height) => (
        <>
          <div className={"absolute inset-0 flex justify-center items-center"}>
            <Shield
              fill={"rgba( 0,0,0,0.1)"}
              accentFill={"rgba(0,0,0,0.3)"}
              size={Math.min(width, height)}
            />
          </div>
          <div className={"absolute inset-0 flex justify-center items-center"}>
            <div className={"flex items-baseline"}>
              <h1>{ac ?? "*"}</h1>
            </div>
          </div>
        </>
      )}
    </FillSize>
  );
}
