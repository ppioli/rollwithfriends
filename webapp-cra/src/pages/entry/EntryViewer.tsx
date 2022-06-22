import { EntryList } from "features/entryEditor/EntryList";
import { usePreloadedQuery } from "react-relay";
import { EntryViewerPageQuery as EntryViewerPageQueryType } from "pages/entry/__generated__/EntryViewerPageQuery.graphql";
import { useNavigation } from "yarr";
import { EntryViewerEditor } from "features/entryEditor/EntryViewerEditor";
import { Suspense, useCallback, useState } from "react";

const graphql = require("babel-plugin-relay/macro");

export const EntryViewerPageQuery = graphql`
  query EntryViewerPageQuery {
    ...EntryList_rootQuery
    ...EntryViewerEditor_rootQuery
  }
`;

export function EntryViewerPage({ preloaded }: any) {
  const { replace } = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);

  const data = usePreloadedQuery<EntryViewerPageQueryType>(
    EntryViewerPageQuery,
    preloaded.listQuery
  );

  // console.info("Selected ", selected);

  const onClickItem = useCallback((id: string) => {
    console.log("Clicked");
    setSelected(id);
  }, []);

  return (
    <div className={"flex content-area"}>
      <EntryList entries={data} onClickItem={onClickItem} />

      <div className={"flex grow h-full justify-center items-center"}>
        <Suspense fallback={"Loading"}>
          <EntryViewerEditor data={data} selected={selected} />
        </Suspense>
      </div>
    </div>
  );
}
