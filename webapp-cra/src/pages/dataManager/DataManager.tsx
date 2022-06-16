import { Input } from "components/form/Input";
import { TitlePanel } from "components/panel/TitlePanel";
import { useMemo, useState } from "react";
import { NpcAddInput } from "features/tokenEditor/__generated__/Npc5eAddMutation.graphql";
import { SourceAddInput } from "pages/dataManager/__generated__/SourceAddMutation.graphql";
import { useSourceAddMutation } from "pages/dataManager/Source.graphql";
import { useNpc5EAddPromise } from "features/tokenEditor/Npc5e.graphql";

export function DataManagerPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();

  const onFileSelected = (event: any) => {
    setSelectedFiles(event.target.files);
  };

  return (
    <div className={"flex content-area"}>
      <div className={"w-96 h-full bg-dark flex flex-col p-1 gap-1"}>
        <button className={"btn btn-menu"}>Import</button>
        <button className={"btn btn-menu"}>Export</button>
      </div>
      <div className={"grow h-full overflow-y-scroll p-4"}>
        {!selectedFiles && (
          <TitlePanel title={"Import"} description={"Add your custom content"}>
            <div className={"rounded-md bg-darker p-4"}>
              <Input
                name={"file"}
                label={"File"}
                input={{
                  type: "file",
                  directory: true,
                  onChange: onFileSelected,
                }}
              />
            </div>
          </TitlePanel>
        )}

        {selectedFiles && (
          <div className={"rounded-md bg-darker p-4"}>
            <UploadDataList files={selectedFiles} />
          </div>
        )}
      </div>
    </div>
  );
}

interface UploadDataListProps {
  files: FileList;
}

function UploadDataList({ files }: UploadDataListProps) {
  const commitSource = useSourceAddMutation();
  const commitNpcs = useNpc5EAddPromise();

  const parsedFiles = useMemo<File[]>(() => {
    let entries: any[] = [];
    for (let i = 0; i < files.length; i++) {
      entries.push(files[i]);
    }
    console.log(entries);
    return entries;
  }, [files]);

  const onUpload = async () => {
    for (const file of parsedFiles) {
      const bundle = await loadJson(file);

      const sourceId = await commitSource(bundle.source);
      //
      const addedNpcs = await commitNpcs(sourceId, bundle.npcs);
    }
  };

  return (
    <div>
      <ul>
        {parsedFiles.map((file, ix) => (
          <li key={ix}>{file.name}</li>
        ))}
      </ul>
      <button
        type={"button"}
        className={"btn btn-primary"}
        onClick={onUpload}
        disabled={parsedFiles.length === 0}
      >
        Upload
      </button>
    </div>
  );
}

interface DataBundle {
  source: SourceAddInput;
  npcs: NpcAddInput[];
}

async function loadJson(file: File): Promise<DataBundle> {
  return new Promise((resolve, error) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target?.result) {
        debugger;

        let data: any = JSON.parse(e.target.result as string);
        let source = data.source as SourceAddInput;
        console.log("Source", source);
        let npcs = data.nonPlayerCharacters as NpcAddInput[];

        resolve({ source, npcs });
      }
      error("Could not parse the file");
    };

    reader.readAsText(file);
  });
}
