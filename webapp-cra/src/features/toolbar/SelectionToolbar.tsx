import { PreloadedQuery, readInlineData, usePreloadedQuery } from "react-relay";
import { SelectionToolbarQuery as SelectionToolbarQueryType } from "./__generated__/SelectionToolbarQuery.graphql";
import _ from "lodash";
import { ReactNode, Suspense } from "react";
import {
  Npc5EContentToolbar,
  Npc5EContentToolbar_mapEntity,
} from "modules/dnd5e/toolbar/Npc5EContentToolbar";
import { Npc5EContentToolbar_mapEntity$key } from "modules/dnd5e/toolbar/__generated__/Npc5EContentToolbar_mapEntity.graphql";

const graphql = require("babel-plugin-relay/macro");

export const SelectionToolbarQuery = graphql`
  query SelectionToolbarQuery($ids: [ID!]!) {
    nodes(ids: $ids) {
      __typename
      ... on MapEntity {
        content {
          __typename
        }
        ...Npc5EContentToolbar_mapEntity
      }
    }
  }
`;

type SelectionType =
  | "Unknown"
  | "Empty"
  | "Mixed"
  | "Npc5EContent"
  | "ImageContent";

export interface SelectionToolbarProps {
  readonly query: PreloadedQuery<SelectionToolbarQueryType>;
}

export function SelectionToolbar({ query }: SelectionToolbarProps) {
  const data = usePreloadedQuery<SelectionToolbarQueryType>(
    SelectionToolbarQuery,
    query
  );

  const selectionTypes: SelectionType[] = data.nodes.map((n) => {
    if (!n || n?.__typename === "%other") {
      return "Unknown";
    }
    if (n.content.__typename === "ImageContent") {
      return "ImageContent";
    }

    if (n.content.__typename === "Npc5EContent") {
      return "Npc5EContent";
    }
    return "Unknown";
  });

  const uniqueTypes = _.uniq(selectionTypes);

  let content: ReactNode;
  if (uniqueTypes.length === 0) {
    content = (
      <div className={"w-full h-full flex justify-center items-center"}>
        Empty Selection
      </div>
    );
  }

  if (uniqueTypes.length > 1) {
    content = (
      <div className={"w-full h-full flex justify-center align-center"}>
        {"<various items selected>"}
      </div>
    );
  }
  const selectionType = uniqueTypes[0];

  if (selectionType === "Unknown") {
    content = (
      <div className={"w-full h-full flex justify-center items-center"}>
        ???
      </div>
    );
  }

  if (selectionType === "Npc5EContent") {
    const npcData = data.nodes.map((node) => {
      if (node! || node!.__typename !== "MapEntity") {
        throw new Error("Unsupported map entity");
      }
      return readInlineData<Npc5EContentToolbar_mapEntity$key>(
        Npc5EContentToolbar_mapEntity,
        node
      )!;
    });

    content = (
      <Suspense fallback={"Loading..."}>
        <div className={"w-full h-full flex justify-center align-center"}>
          <Npc5EContentToolbar entities={npcData} />
        </div>
      </Suspense>
    );
  }

  return <div className={"w-full h-full bg-dark"}>{content}</div>;

  return null;
}
