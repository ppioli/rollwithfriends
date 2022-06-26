import { HTMLProps } from "react";
import { useFragment } from "react-relay";
import { TabPanel } from "components/tabbedPanel/TabPanel";
import { SelectionToolbar } from "./SelectionToolbar";
import { Toolbar_campaign$key } from "features/toolbar/__generated__/Toolbar_campaign.graphql";

const graphql = require("babel-plugin-relay/macro");

const Toolbar_campaign = graphql`
  fragment Toolbar_campaign on Campaign {
    id
    selectedScene(sceneId: $selectedScene) {
      id
      ...SelectionToolbar_scene
    }
  }
`;

export interface ToolbarProps extends HTMLProps<HTMLDivElement> {
  query: Toolbar_campaign$key;
}

export function Toolbar({ query, ...divProps }: ToolbarProps) {
  const data = useFragment(Toolbar_campaign, query);

  return (
    <TabPanel {...divProps} horizontal={true}>
      {[
        {
          label: "Selection",
          enabled: data.selectedScene !== null,
          component: (
            <div>
              {data.selectedScene ? (
                <SelectionToolbar query={data.selectedScene} />
              ) : null}
            </div>
          ),
        },
        { label: "Tools", component: <GeneralToolbar /> },
        { label: "Scenes", component: <GeneralToolbar /> },
        { label: "Participants", component: <GeneralToolbar /> },
      ]}
    </TabPanel>
  );
}

export function GeneralToolbar() {
  return (
    <div className={"bg-dark w-full h-full"}>
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
