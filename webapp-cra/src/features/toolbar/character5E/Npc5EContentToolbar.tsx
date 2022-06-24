import { useLazyLoadQuery } from "react-relay";
import { Npc5EContentToolbarQuery as Npc5EContentToolbarQueryType } from "./__generated__/Npc5EContentToolbarQuery.graphql";
import { AcCard } from "features/toolbar/character5E/AcCard";
import { HpCard } from "features/toolbar/character5E/HpCard";
import { Npc5EToolbarSection } from "features/toolbar/character5E/Npc5EToolbarSection";
import { Size5E } from "data/character5E";

const graphql = require("babel-plugin-relay/macro");

export interface Npc5EContentToolbarProps {
  ids: string[];
  ac: number | null;
  maximumHp: number | null;
  currentHp: number | null;
  temporaryHp: number | null;
  name: string | null;
  npcId: string | null;
  size: Size5E | null;
}

const Npc5EContentToolbarQuery = graphql`
  query Npc5EContentToolbarQuery($id: ID!, $skip: Boolean!) {
    node(id: $id) @skip(if: $skip) {
      id
      __typename
      ... on NonPlayerCharacter5E {
        type {
          label
          tags
        }
        savingThrows {
          key
          value
        }
      }
    }
  }
`;

export function Npc5EContentToolbar({
  ids,
  ac,
  maximumHp,
  currentHp,
  temporaryHp,
  name,
  npcId,
  size,
}: Npc5EContentToolbarProps) {
  const characterData = useLazyLoadQuery<Npc5EContentToolbarQueryType>(
    Npc5EContentToolbarQuery,
    { id: npcId ?? "", skip: !npcId }
  );

  return (
    <div className={"h-full w-full flex p-2 gap-2"}>
      <div
        className={"flex flex-col bg-darker rounded-md p-2 overflown-hidden"}
      >
        <h1>{name}</h1>
        <span className={"flex"}>
          <h4>{size}</h4>
          {size === "HUGE" ? (
            <small>(Like the guy she tells you not to worry about)</small>
          ) : null}
          {size === "TINY" ? <small>(Size does not matter)</small> : null}
        </span>

        <div className={"flex"}>
          <div className={"w-24 h-24"}>
            <HpCard
              hp={currentHp}
              maxHp={maximumHp}
              temporaryHp={temporaryHp}
            />
          </div>
          <div className={"w-24 h-24"}>
            <AcCard ac={ac} />
          </div>
        </div>
      </div>

      <Npc5EToolbarSection data={characterData} entityIds={ids} />
    </div>
  );
}
