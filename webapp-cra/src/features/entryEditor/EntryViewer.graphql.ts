import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { commitLocalUpdate } from "react-relay";

const graphql = require("babel-plugin-relay/macro");

// export const EntryViewerSelectedQuery = graphql`
//   query EntryViewerSelectedQuery {
//     __typename
//     entryViewer {
//       selectedEntry
//     }
//   }
// `;

export function entryViewerUpdateSelected(selectedId: string | null) {
  return commitLocalUpdate(RelayEnvironment, (store) => {
    let ev = store.getRoot().getLinkedRecord("entryViewer")!;

    if (ev === undefined) {
      ev = store.create("EntryViewer", "EntryViewer");
      store.getRoot().setLinkedRecord(ev, "entryViewer");
    }
    ev?.setValue(selectedId, "selectedEntry");
  });
}
