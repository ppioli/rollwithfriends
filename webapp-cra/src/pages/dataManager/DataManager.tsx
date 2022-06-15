import { Input } from "components/form/Input";
import { TitlePanel } from "components/panel/TitlePanel";

export function DataManagerPage() {
  return (
    <div className={"flex content-area"}>
      <div className={"w-96 h-full bg-dark flex flex-col p-1 gap-1"}>
        <button className={"btn btn-menu"}>Import</button>
        <button className={"btn btn-menu"}>Export</button>
      </div>
      <div className={"grow h-full overflow-y-scroll p-4"}>
        <TitlePanel title={"Import"} description={"Add your custom content"}>
          <div className={"rounded-md bg-darker p-4"}>
            <Input
              name={"file"}
              label={"File"}
              input={{ type: "file", directory: true }}
            />
          </div>
        </TitlePanel>
      </div>
    </div>
  );
}
