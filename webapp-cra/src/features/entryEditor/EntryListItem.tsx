import { useFragment } from "react-relay";
import { NpcListItem_NonPlayerCharacter5E$key } from "features/entryEditor/__generated__/NpcListItem_NonPlayerCharacter5E.graphql";
import { ListChildComponentProps } from "react-window";
import React, { memo } from "react";

const graphql = require("babel-plugin-relay/macro");

const EntryListItem_NonPlayerCharacter = graphql`
  fragment EntryListItem_NonPlayerCharacter5E on NonPlayerCharacter5E {
    name
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

  const npc = useFragment<NpcListItem_NonPlayerCharacter5E$key>(
    EntryListItem_NonPlayerCharacter,
    node
  );

  const handleDragStart = (event: React.DragEvent<any>) => {
    event.dataTransfer?.setData("type", node.__typename);
    event.dataTransfer?.setData("entryId", id);
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
