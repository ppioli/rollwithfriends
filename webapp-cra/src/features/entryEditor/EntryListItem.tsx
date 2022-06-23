import { useFragment } from "react-relay";
import { ListChildComponentProps } from "react-window";
import React, { memo } from "react";
import {
  EntryListItem_NonPlayerCharacter5E$data,
  EntryListItem_NonPlayerCharacter5E$key,
} from "features/entryEditor/__generated__/EntryListItem_NonPlayerCharacter5E.graphql";

const graphql = require("babel-plugin-relay/macro");
export type AddEntryType = {
  type: "NonPlayerCharacter5E";
  x: number;
  y: number;
  content: EntryListItem_NonPlayerCharacter5E$data;
};
const EntryListItem_NonPlayerCharacter = graphql`
  fragment EntryListItem_NonPlayerCharacter5E on NonPlayerCharacter5E {
    id
    name
    armorClasses {
      description
      armorClass
    }
    hitPointsAverage
    hitPointsFormula
    sizes
  }
`;

function EntryListItemInner({
  index,
  style,
  isScrolling,
  data,
}: ListChildComponentProps) {
  const { items, onClickItem } = data;
  const node = items[index].node;
  const id: string = node.id;

  const npc = useFragment<EntryListItem_NonPlayerCharacter5E$key>(
    EntryListItem_NonPlayerCharacter,
    node
  );

  const handleDragStart = (event: React.DragEvent<any>) => {
    const addData: AddEntryType = {
      type: node.__typename,
      x: 0,
      y: 0,
      content: npc,
    };
    event.dataTransfer?.setData("entry", JSON.stringify(addData));
  };

  return (
    <div style={style}>
      <button
        draggable={true}
        type={"button"}
        className={"btn btn-menu"}
        onDragStart={handleDragStart}
        onClick={() => onClickItem && onClickItem(id)}
      >
        {npc?.name ?? "Loading"}
      </button>
    </div>
  );
}

export const EntryListItem = memo(EntryListItemInner);
