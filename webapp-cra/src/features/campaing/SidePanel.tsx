import { TabPanel } from "components/tabbedPanel/TabPanel";
import { EntryList } from "features/entryEditor/EntryList";
import { EntryList_rootQuery$key } from "features/entryEditor/__generated__/EntryList_rootQuery.graphql";

const graphql = require("babel-plugin-relay/macro");

export interface SidePanelProps {
  entries: EntryList_rootQuery$key;
}

export function SidePanel({ entries }: SidePanelProps) {
  return (
    <TabPanel>
      {[
        {
          label: "Journal",
          component: <EntryList entries={entries} />,
        },
      ]}
    </TabPanel>
  );
}
