export function TokenEditorPage() {
  return (
    <div className={"p-4"}>
      <TokenCard />
    </div>
  );
}

export function TokenCard() {
  return (
    <div className={"rounded rounded-md bg-darkest flex-col"}>
      <div className={"flex flex-col relative"}>
        <div className={"h-20 relative"}>
          <div
            className={"absolute left-40 flex flex-col h-full justify-end py-3"}
          >
            <h2>Tenacious D</h2>
            <div className={"flex"}>
              <h4>Humanoid, </h4>
              <h4>Chaotic Good</h4>
            </div>
          </div>
        </div>
        <div className={"bg-dark h-20 relative"}>
          <div className={"absolute left-40 h-full flex gap-x-4 py-3"}>
            <MiscCard value={20} label={"AC"} />
            <MiscCard value={12} label={"AC"} />
            <MiscCard value={12} label={"AC"} />
            <MiscCard value={12} label={"AC"} />
          </div>
        </div>
        <div className={"absolute top-0 left-0 p-4"}>
          <div
            className={"w-32 h-32 rounded-full bg-darker absolute border-2"}
          ></div>
        </div>
      </div>
      <div className={"bg-dark flex gap-x-4 justify-center"}>
        <AbilityCard label={"STR"} value={15} />
        <AbilityCard label={"CON"} value={16} />
        <AbilityCard label={"DEX"} value={16} />
        <AbilityCard label={"INT"} value={8} />
        <AbilityCard label={"WIS"} value={16} />
        <AbilityCard label={"CHA"} value={10} />
      </div>
    </div>
  );
}

interface AbilityCardProps {
  value: number;
  label: string;
}

function AbilityCard({ value, label }: AbilityCardProps) {
  return (
    <div className={"flex flex-col items-center"}>
      <div>{label}</div>
      <div className={"bg-darkest rounded absolute w-16 h-16 relative"}>
        <div className={"absolute inset-0 flex justify-center items-center"}>
          <div>
            <h1>{value}</h1>
          </div>
        </div>
        <div
          className={
            "absolute flex justify-center inset-x-0 h-4 bottom-0 text-center"
          }
        >
          <div className={"h-6 w-6 rounded-md bg-dark"}>
            {Math.floor(value / 2) - 5}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiscCard({ value, label }: AbilityCardProps) {
  return (
    <div className={"w-24 h-10 relative"}>
      <div className={"absolute inset-0"}>
        <div
          className={"absolute bg-darker rounded-md inset-x-0 top-1 bottom-1"}
        >
          <div className={"w-12 h-full ml-12 flex justify-center items-center"}>
            <h1>{value}</h1>
          </div>
        </div>

        <img
          src={"https://www.svgrepo.com/show/153044/shield.svg"}
          className={"w-12 h-12 -mt-1 absolute"}
        />
      </div>
    </div>
  );
}
