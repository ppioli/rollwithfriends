import { NpcCard5e } from "components/fiveEdition/NpcCard5e";
import { EntryViewerEditor_rootQuery$key } from "features/entryEditor/__generated__/EntryViewerEditor_rootQuery.graphql";
import { useRefetchableFragment } from "react-relay";
import { EntryViewerEditorSelected } from "features/entryEditor/__generated__/EntryViewerEditorSelected.graphql";
import { useEffect } from "react";

const graphql = require("babel-plugin-relay/macro");

export const EntryViewerEditor_rootQuery = graphql`
  fragment EntryViewerEditor_rootQuery on RootQuery
  @refetchable(queryName: "EntryViewerEditorSelected")
  @argumentDefinitions(id: { type: "ID", defaultValue: null }) {
    entry(id: $id) {
      id
      ...NpcCard5e_NonPlayerCharacter5E
    }
  }
`;

export interface EntryViewerProps {
  selected: string | null;
  data: EntryViewerEditor_rootQuery$key;
}

export function EntryViewerEditor({ data, selected }: EntryViewerProps) {
  const [query, refetch] = useRefetchableFragment<
    EntryViewerEditorSelected,
    any
  >(EntryViewerEditor_rootQuery, data);

  useEffect(() => {
    if (selected == null || !refetch) {
      return;
    }
    refetch({ id: selected });
  }, [refetch, selected]);

  console.log("Selected", selected);
  console.log("query", query);

  if (query.entry == null) {
    return null;
  }

  return <NpcCard5e npc={query.entry} id={query.entry.id} />;
}
