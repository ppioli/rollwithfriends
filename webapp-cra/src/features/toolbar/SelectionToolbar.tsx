import _ from "lodash";
import {
  SelectionToolbar_scene$data,
  SelectionToolbar_scene$key,
} from "features/toolbar/__generated__/SelectionToolbar_scene.graphql";
import { useFragment } from "react-relay";
import { ReactNode, Suspense } from "react";
import { Npc5EContentToolbar } from "features/toolbar/character5E/Npc5EContentToolbar";
import { Size5E } from "data/character5E";

const graphql = require("babel-plugin-relay/macro");

const SelectionToolbar_scene = graphql`
  fragment SelectionToolbar_scene on Scene {
    selected {
      id
      __typename
      ...MapEntityFragment @relay(mask: false)
    }
  }
`;

type Unknown = {
  type: "Unknown";
};

type Empty = {
  type: "Empty";
};

type Mixed = {
  type: "Mixed";
};

type Npc5E = {
  type: "Npc5E";
  ids: string[];
  ac: number | null;
  maximumHp: number | null;
  currentHp: number | null;
  temporaryHp: number | null;
  size: Size5E | null;
  name: string | null;
  npcId: string | null;
};

function mergeValue<T>(existingValue: T | null, value: T) {
  return existingValue === value ? value : null;
}

type SelectionType = Npc5E | Mixed | Unknown | Empty;

function processSelection(data: SelectionToolbar_scene$data): SelectionType {
  const selection = data.selected ?? [];

  if (selection.length === 0) {
    return { type: "Empty" };
  }

  const selectionType = _.uniqBy(selection, (d) => d.content.__typename);

  if (selectionType.length > 1) {
    return { type: "Mixed" };
  }

  switch (selection[0].content.__typename) {
    case "Npc5EContent":
      if (selection[0].content.size === "%future added value") {
        throw new Error("Invalid size");
      }
      const val: Npc5E = {
        type: "Npc5E",
        ids: [selection[0].id],
        name: selection[0].name,
        ac: selection[0].content.ac,
        currentHp: selection[0].content.currentHp,
        maximumHp: selection[0].content.maximumHp,
        temporaryHp: selection[0].content.temporaryHp,
        npcId: selection[0].content.npcId,
        size: selection[0].content.size,
      };

      for (let ix = 1; ix < selection.length; ix++) {
        const content = selection[ix].content;
        val.name = mergeValue(selection[ix].name, val.name);
        if (content.__typename === "Npc5EContent") {
          if (content.size === "%future added value") {
            throw new Error("Invalid size");
          }
          val.ids.push(selection[ix].id);
          val.ac = mergeValue(content.ac, val.ac);
          val.currentHp = mergeValue(content.currentHp, val.currentHp);
          val.maximumHp = mergeValue(content.maximumHp, val.maximumHp);
          val.temporaryHp = mergeValue(content.temporaryHp, val.temporaryHp);
          val.npcId = mergeValue(content.npcId, val.npcId);
          val.size = mergeValue(content.size, val.size);
        }
      }
      return val;
    default:
      return { type: "Unknown" };
  }
}

export interface SelectionToolbarProps {
  readonly query: SelectionToolbar_scene$key;
}

export function SelectionToolbar({ query }: SelectionToolbarProps) {
  const data = useFragment(SelectionToolbar_scene, query);

  const selection = processSelection(data);

  let content: ReactNode;

  if (selection.type === "Empty") {
    content = (
      <div className={"w-full h-full flex justify-center items-center"}>
        Empty Selection
      </div>
    );
  }

  if (selection.type === "Unknown") {
    content = (
      <div className={"w-full h-full flex justify-center items-center"}>
        ???
      </div>
    );
  }
  if (selection.type === "Mixed") {
    content = (
      <div className={"w-full h-full flex justify-center align-center"}>
        {"<various items selected>"}
      </div>
    );
  }

  if (selection.type === "Npc5E") {
    content = (
      <div className={"w-full h-full flex justify-center align-center"}>
        <Suspense fallback={"..."}>
          <Npc5EContentToolbar {...selection} />
        </Suspense>
      </div>
    );
  }

  return <div className={"w-full h-full bg-dark"}>{content}</div>;
}
