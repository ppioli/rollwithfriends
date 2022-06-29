import { HTMLProps, Suspense } from "react";
import { useFragment, useQueryLoader } from "react-relay";
import { TabPanel } from "components/tabbedPanel/TabPanel";
import { SelectionToolbar, SelectionToolbarQuery } from "./SelectionToolbar";
import { Toolbar_campaign$key } from "features/toolbar/__generated__/Toolbar_campaign.graphql";
import { SceneSelector } from "pages/scene/SceneSelector";
import { Participants } from "features/participant/Participants";
import { SelectionToolbarQuery as SelectionToolbarQueryType } from "features/toolbar/__generated__/SelectionToolbarQuery.graphql";

const graphql = require("babel-plugin-relay/macro");

const Toolbar_campaign = graphql`
  fragment Toolbar_campaign on Campaign {
    id
    ...SceneSelector_campaign
    selectedScene(sceneId: $selectedScene) {
      id
      selected {
        id
      }
    }
  }
`;

export interface ToolbarProps extends HTMLProps<HTMLDivElement> {
  query: Toolbar_campaign$key;
}

export function Toolbar({ query, ...divProps }: ToolbarProps) {
  const data = useFragment(Toolbar_campaign, query);

  const selected = data.selectedScene?.selected?.map((s) => s.id) ?? [];

  const [selectionQuery, loadSelection] =
    useQueryLoader<SelectionToolbarQueryType>(SelectionToolbarQuery);

  const onLoad = () => {
    debugger;
    loadSelection({ ids: selected });
  };

  return (
    <Suspense>
      <TabPanel
        {...divProps}
        horizontal={true}
        container={"bg-dark overflow-x-auto"}
      >
        {[
          {
            label: "Selection",
            enabled: data.selectedScene !== null,
            onLoad,
            component: selectionQuery ? (
              <Suspense fallback={"Loading..."}>
                <SelectionToolbar query={selectionQuery} />
              </Suspense>
            ) : null,
          },
          { label: "Tools", component: <GeneralToolbar /> },
          { label: "Scenes", component: <SceneSelector query={data} /> },
          { label: "Participants", component: <Participants /> },
        ]}
      </TabPanel>
    </Suspense>
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
