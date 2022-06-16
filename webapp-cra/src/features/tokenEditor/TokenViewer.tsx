import { usePaginationFragment } from "react-relay";
import { TokenViewerListPaginationFragment$key } from "features/tokenEditor/__generated__/TokenViewerListPaginationFragment.graphql";
import { TokenCard } from "features/tokenEditor/TokenCard";
import { NpcListItem } from "features/tokenEditor/NpcListItem";

const graphql = require("babel-plugin-relay/macro");

export const TokenViewerListPaginationFragment = graphql`
  fragment TokenViewerListPaginationFragment on RootQuery
  @refetchable(queryName: "TokenViewerListPaginationFragment")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 } # Optional argument
    cursor: { type: "String", defaultValue: null } # Required argument
  ) {
    npcs(after: $cursor, first: $count) @connection(key: "RootQuery_npcs") {
      edges {
        node {
          id
          ...NpcListItem_NonPlayerCharacter5E
          ...Npc5e_npc5e
        }
      }
    }
  }
`;

export interface TokenViewerProps {
  npcs: TokenViewerListPaginationFragment$key;
}

export function TokenViewer({ npcs }: TokenViewerProps) {
  const { data, loadNext } = usePaginationFragment(
    TokenViewerListPaginationFragment,
    npcs
  );

  return (
    <div className={"flex content-area"}>
      <div className={"side-menu content-area"}>
        {data.npcs?.edges?.map((t) => (
          <NpcListItem key={t.node.id} npc={t.node} />
        ))}
      </div>
      <div className={"flex grow h-full justify-center items-center"}>
        <TokenCard />
      </div>
    </div>
  );
}
