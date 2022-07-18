import { HTMLProps, Suspense } from "react";
import { useFragment, useQueryLoader } from "react-relay";
import { TabPanel } from "components/tabbedPanel/TabPanel";

import { Participants } from "features/participant/Participants";
import { Toolbar_campaign$key } from "__generated__/Toolbar_campaign.graphql";
import { SceneSelector } from "features/scene/SceneSelector";

import { graphql } from "relay-runtime";

const Toolbar_campaign = graphql`
  fragment Toolbar_campaign on Campaign {
    id
    ...SceneSelector_campaign
  }
`;

export interface ToolbarProps extends HTMLProps<HTMLDivElement> {
  query: Toolbar_campaign$key;
}

export function Toolbar({ query, ...divProps }: ToolbarProps) {
  const data = useFragment(Toolbar_campaign, query);

  // const selected = data.selectedScene?.selected?.map((s) => s.id) ?? [];

  // const [selectionQuery, loadSelection] =
  //   useQueryLoader<SelectionToolbarQueryType>(SelectionToolbarQuery);

  /*const onLoad = () => {
    debugger;
    loadSelection({ ids: selected });
  };*/

  return (
    <Suspense>
      <TabPanel
        {...divProps}
        horizontal={true}
        container={"bg-dark overflow-x-auto"}
      >
        {[
          /*{
            label: "Selection",
            enabled: data.selectedScene !== null,
            onLoad,
            component: selectionQuery ? (
              <Suspense fallback={"Loading..."}>
                <SelectionToolbar query={selectionQuery} />
              </Suspense>
            ) : null,
          },*/
          { label: "Tools", component: <GeneralToolbar /> },
          // eslint-disable-next-line react/jsx-no-undef
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
