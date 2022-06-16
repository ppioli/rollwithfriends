import { usePreloadedQuery } from "react-relay";
import { TokenViewer } from "features/tokenEditor/TokenViewer";
import { NpcViewerQuery } from "pages/npc/__generated__/NpcViewerQuery.graphql";

const graphql = require("babel-plugin-relay/macro");

export const NpcViewer = graphql`
  query NpcViewerQuery {
    ...TokenViewerListPaginationFragment
  }
`;

export function NpcViewerPage({ preloaded }: any) {
  const data = usePreloadedQuery<NpcViewerQuery>(NpcViewer, preloaded.query);

  return <TokenViewer npcs={data} />;
}
