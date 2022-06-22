import { HTMLProps, useEffect } from "react";
import { Toolbar_scene$key } from "features/toolbar/__generated__/Toolbar_scene.graphql";
import { useFragment, useQueryLoader } from "react-relay";
import _ from "lodash";
import { TabPanel } from "components/tabbedPanel/TabPanel";
import { Npc5EToolbar, Npc5EToolbarQuery } from "features/toolbar/Npc5EToolbar";
import { Npc5EToolbarQuery as Npc5EToolbarQueryType } from "features/toolbar/__generated__/Npc5EToolbarQuery.graphql";

const graphql = require("babel-plugin-relay/macro");

const Toolbar_scene = graphql`
  fragment Toolbar_scene on Scene {
    selected {
      type
      id
      content {
        ... on Npc5EContent {
          npcId
        }
      }
    }
  }
`;

export interface ToolbarProps extends HTMLProps<HTMLDivElement> {
  query: Toolbar_scene$key;
}

export function Toolbar({ query, ...divProps }: ToolbarProps) {
  const data = useFragment(Toolbar_scene, query);
  const [npcQueryRef, loadNpc] =
    useQueryLoader<Npc5EToolbarQueryType>(Npc5EToolbarQuery);

  const selectionType = _.uniqBy(data.selected, (d) => d.type);
  const npcSelected =
    selectionType.length === 1 && selectionType[0].type === "NPC5_E";
  let npcId: string | null = null;
  if (npcSelected && data.selected?.length === 1) {
    npcId = data.selected[0].content.npcId!;
  }

  useEffect(() => {
    debugger;
    if (npcId) {
      loadNpc({ id: npcId });
    }
  }, [loadNpc, npcId]);

  return (
    <TabPanel {...divProps} horizontal={true}>
      {[
        {
          label: "Tokens",
          component: <Npc5EToolbar query={npcQueryRef} />,
        },
        { label: "Tools", component: <GeneralToolbar /> },
      ]}
    </TabPanel>
  );
}

export function GeneralToolbar() {
  return (
    <div className={"bg-dark w-full h-32"}>
      <button type={"button"} className={"btn btn-primary"}>
        Send ping
      </button>
      <button type={"button"} className={"btn btn-primary"}>
        Free Style
      </button>
      <button type={"button"} className={"btn btn-primary"}>
        Shape
      </button>
      <button type={"button"} className={"btn btn-primary"}>
        Roll
      </button>
    </div>
  );
}
