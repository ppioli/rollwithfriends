import { HTMLProps } from "react";
import { Toolbar_scene$key } from "features/toolbar/__generated__/Toolbar_scene.graphql";
import { useFragment } from "react-relay";
import { TabPanel } from "components/tabbedPanel/TabPanel";
import { SelectionToolbar } from "./SelectionToolbar";

const graphql = require("babel-plugin-relay/macro");

const Toolbar_scene = graphql`
  fragment Toolbar_scene on Scene {
    ...SelectionToolbar_scene
  }
`;

export interface ToolbarProps extends HTMLProps<HTMLDivElement> {
  query: Toolbar_scene$key;
}

export function Toolbar({ query, ...divProps }: ToolbarProps) {
  const data = useFragment(Toolbar_scene, query);

  return (
    <TabPanel {...divProps} horizontal={true}>
      {[
        {
          label: "Tokens",
          component: <SelectionToolbar query={data} />,
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
