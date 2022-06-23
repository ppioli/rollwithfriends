import _ from "lodash";
import {
  SelectionToolbar_scene$data,
  SelectionToolbar_scene$key,
} from "features/toolbar/__generated__/SelectionToolbar_scene.graphql";
import { useFragment } from "react-relay";
import { ReactNode } from "react";

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
};

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
      const val: Npc5E = {
        type: "Npc5E",
        ids: [selection[0].id],
        ac: selection[0].content.ac,
        currentHp: selection[0].content.currentHp,
        maximumHp: selection[0].content.maximumHp,
        temporaryHp: selection[0].content.temporaryHp,
      };

      for (let ix = 1; ix < selection.length; ix++) {
        const content = selection[ix].content;
        if (content.__typename === "Npc5EContent") {
          val.ids.push(selection[ix].id);
          val.ac = content.ac === val.ac ? val.ac : null;
          val.currentHp =
            content.currentHp === val.currentHp ? val.currentHp : null;
          val.maximumHp =
            content.maximumHp === val.maximumHp ? val.maximumHp : null;
          val.temporaryHp =
            content.temporaryHp === val.temporaryHp ? val.temporaryHp : null;
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
      <div className={"w-full h-full flex justify-center align-center"}>
        Empty Selection
      </div>
    );
  }

  if (selection.type === "Unknown") {
    content = (
      <div className={"w-full h-full flex justify-center align-center"}>
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
        <div>AC {selection.ac ?? "<>"}</div>
        <div>HP {selection.currentHp ?? "<>"}</div>
        <div>MAX HP {selection.maximumHp ?? "<>"}</div>
        <div>TMP HP {selection.temporaryHp ?? "<>"}</div>
      </div>
    );
  }

  return <div>{content}</div>;
}
