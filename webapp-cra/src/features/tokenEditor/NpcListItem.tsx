import { useFragment } from "react-relay";
import { NpcListItem_NonPlayerCharacter5E$key } from "features/tokenEditor/__generated__/NpcListItem_NonPlayerCharacter5E.graphql";

const graphql = require("babel-plugin-relay/macro");

const TokenListItemFragment = graphql`
  fragment NpcListItem_NonPlayerCharacter5E on NonPlayerCharacter5E {
    name
  }
`;

export interface NpcListItemProps {
  npc: NpcListItem_NonPlayerCharacter5E$key;
}

export function NpcListItem({ npc }: NpcListItemProps) {
  const data = useFragment(TokenListItemFragment, npc);

  return (
    <button type={"button"} className={"btn btn-menu"}>
      {data.name}
    </button>
  );
}
