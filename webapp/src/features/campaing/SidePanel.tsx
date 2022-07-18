import { TabPanel } from "components/tabbedPanel/TabPanel";

import { graphql } from "relay-runtime";

export interface SidePanelProps {
  entries: any; //EntryList_rootQuery$key;
}

export function SidePanel({ entries }: SidePanelProps) {
  return null;
  /*return (
    <TabPanel>
      {[
        {
          label: "Journal",
          component: <EntryList entries={entries} />,
        },
      ]}
    </TabPanel>
  );*/
}
