import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import {
  Npc5EToolbarQuery as Npc5EToolbarQueryType,
  Npc5EToolbarQuery$data,
} from "features/toolbar/__generated__/Npc5EToolbarQuery.graphql";
import { Suspense } from "react";

const graphql = require("babel-plugin-relay/macro");

export const Npc5EToolbarQuery = graphql`
  query Npc5EToolbarQuery($id: ID!) {
    node(id: $id) {
      ... on NonPlayerCharacter5E {
        name
        type {
          label
        }
        savingThrows {
          key
          value
        }
      }
    }
  }
`;

export interface Npc5EToolbarProps {
  query: PreloadedQuery<Npc5EToolbarQueryType> | null | undefined;
}

export function Npc5EToolbar({ query }: Npc5EToolbarProps) {
  if (query) {
    return <Npc5EToolbarSingle query={query} />;
  }

  return <Npc5EToolbarMulti />;
}

export interface Npc5EToolbarSingleProps {
  query: PreloadedQuery<Npc5EToolbarQueryType>;
}

export function Npc5EToolbarMulti() {
  return <Npc5EToolbarBase data={null} />;
}

export function Npc5EToolbarSingle({ query }: Npc5EToolbarSingleProps) {
  const data = usePreloadedQuery<Npc5EToolbarQueryType>(
    Npc5EToolbarQuery,
    query
  );

  return (
    <Suspense fallback={"Loading"}>
      <Npc5EToolbarBase data={data} />;
    </Suspense>
  );
}

interface Npc5eToolbarBase {
  data: Npc5EToolbarQuery$data | null;
}

function Npc5EToolbarBase({ data }: Npc5eToolbarBase) {
  console.log(data);
  return (
    <div className={"bg-dark w-full h-32"}>
      <div>{data?.node?.name ?? ""}</div>
      <div>{data?.node?.type?.label ?? ""}</div>
      <button type={"button"} className={"btn btn-primary"}>
        Tool
      </button>
      <button type={"button"} className={"btn btn-primary"}>
        Bar
      </button>
      <button type={"button"} className={"btn btn-primary"}>
        Bar
      </button>
    </div>
  );
}
