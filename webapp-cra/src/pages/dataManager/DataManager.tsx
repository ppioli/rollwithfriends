import { Input } from "components/form/Input";
import { TitlePanel } from "components/panel/TitlePanel";
import { useMemo, useState } from "react";
import { SourceAddInput } from "pages/dataManager/__generated__/SourceAddMutation.graphql";
import { useSourceAddMutation } from "pages/dataManager/Source.graphql";
import {
  findImage,
  useNpc5EAddPromise,
} from "components/fiveEdition/Npc5e.graphql";
import { FileUploadDefinition, uploadBatch } from "utils/HttpHelpers";
import { Npc5EAddInput } from "components/fiveEdition/__generated__/Npc5eAddMutation.graphql";

export function DataManagerPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();

  const onFileSelected = (event: any) => {
    setSelectedFiles(event.target.files);
  };

  return (
    <div className={"flex content-area"}>
      <div className={"side-menu"}>
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

  const [parsedFiles, images] = useMemo<
    [File[], Record<string, File[]>]
  >(() => {
    let entries: File[] = [];
    let images: Record<string, File[]> = {};
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = file.webkitRelativePath.split("/");

      if (files[i].type === "application/json" && path.length === 2) {
        entries.push(files[i]);
      } else if (path.length === 4) {
        // root, img, source
        const [, p1, p2] = path;
        if (p1 !== "img") {
          continue;
        }
        if (images[p2] === undefined) {
          images[p2] = [];
        }

        images[p2].push(file);
      }
    }
    console.log(entries);
    return [entries, images];
  }, [files]);

  const onUpload = async () => {
    for (const file of parsedFiles) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      const bundle = await loadJson(file);

      const sourceId = await commitSource(bundle.source);
      //
      const result = await commitNpcs(sourceId, bundle.npcs);

      if (result.npcs5EAdd.nonPlayerCharacter5E === null) {
        continue;
      }

      const avatars: FileUploadDefinition[] = [];
      result.npcs5EAdd.nonPlayerCharacter5E.forEach((npc) => {
        const upload = findImage(npc.avatarId, npc.name, images[fileName]);
        if (upload !== null) {
          avatars.push(upload);
        }
      });

      await uploadBatch(avatars, 1);
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
  npcs: Npc5EAddInput[];
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
        let npcs = data.nonPlayerCharacters as Npc5EAddInput[];

        resolve({ source, npcs });
      }
      error("Could not parse the file");
    };

    reader.readAsText(file);
  });
}
