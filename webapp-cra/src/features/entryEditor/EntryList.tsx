import { usePaginationFragment } from "react-relay";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { EntryListItem } from "features/entryEditor/EntryListItem";
import { useBatchLoader } from "utils/hooks/useBatchLoader";
import { HTMLProps, Suspense, useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { EntryList_rootQuery$key } from "features/entryEditor/__generated__/EntryList_rootQuery.graphql";
import { range } from "lodash";

const graphql = require("babel-plugin-relay/macro");

export const EntryList_rootQuery = graphql`
  fragment EntryList_rootQuery on RootQuery
  @refetchable(queryName: "EntryList_Query")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 } # Optional argument
    cursor: { type: "String", defaultValue: null } # Required argument
  ) {
    entries(after: $cursor, first: $count)
      @connection(key: "RootQuery_entries") {
      totalCount
      edges {
        node {
          id
          ...EntryListItem_NonPlayerCharacter5E
        }
      }
    }
  }
`;

export interface EntryListProps extends HTMLProps<HTMLDivElement> {
  entries: EntryList_rootQuery$key;
  onClickItem?: (id: string) => void;
}

export function EntryList(props: EntryListProps) {
  return (
    <Suspense fallback={<EntryListLoading />}>
      <EntryListInner {...props} className={"side-menu"} />
    </Suspense>
  );
}

function EntryListInner({ entries, onClickItem, ...divProps }: EntryListProps) {
  console.info("entries", entries);
  const { data, loadNext, hasNext } = usePaginationFragment(
    EntryList_rootQuery,
    entries
  );
  const { ref, width, height } = useResizeDetector();

  console.info("Data ", data);

  const items = useMemo(() => data.entries?.edges ?? [], [data]);

  const setRequested = useBatchLoader({
    loadNext,
    loadedCount: items.length,
  });

  const render = items && width && height;

  const rowCount = data.entries?.totalCount ?? 0;

  const isItemLoaded = (index: number) => {
    return index < (items?.length ?? 0);
  };

  const itemData = useMemo(
    () => ({
      items,
      onClickItem,
    }),
    [items, onClickItem]
  );

  return (
    <div {...divProps} ref={ref}>
      {render && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={rowCount}
          loadMoreItems={(from, to) => {
            if (hasNext) {
              setRequested(to);
            }
          }}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={height}
              width={width}
              itemCount={items.length}
              itemSize={30}
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemData={itemData}
            >
              {EntryListItem}
            </List>
          )}
        </InfiniteLoader>
      )}
    </div>
  );
}

function EntryListLoading() {
  return (
    <div className={"side-menu "}>
      {range(1, 10).map((ix) => (
        <div key={ix} className={"btn btn-menu animate-pulse bg-darker"}>
          &nbsp;
        </div>
      ))}
    </div>
  );
}
