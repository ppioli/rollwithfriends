import { ChatInput } from "features/chat/ChatInput";
import { useFragment, usePaginationFragment } from "react-relay";
import {
  MessageBodyFragment,
  MessageListPaginationFragment,
  useMessageSubscription,
} from "features/chat/Message.graphql";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { MessageList_campaign$key } from "./__generated__/MessageList_campaign.graphql";
import {
  HTMLProps,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import _ from "lodash";
import { useParticipantContext } from "features/participant/ParticipantsContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useResizeDetector } from "react-resize-detector";
import { useBatchLoader } from "utils/hooks/useBatchLoader";
import InfiniteLoader from "react-window-infinite-loader";
import {
  ListChildComponentProps,
  VariableSizeList as List,
} from "react-window";
import { Dice } from "components/icons/Dice";

interface ChatProps extends HTMLProps<HTMLDivElement> {
  campaignId: string;
  messages: MessageList_campaign$key;
}

export function Chat({ campaignId, messages, ...divProps }: ChatProps) {
  //TODO Invert list, handle message added count, item size
  const { data, loadNext } = usePaginationFragment<
    CampaignQueryType,
    MessageList_campaign$key
  >(MessageListPaginationFragment, messages);

  useMessageSubscription(campaignId);

  const { ref, width, height } = useResizeDetector();

  const items = data.messages?.edges ?? [];
  const rowCount = data.messages?.totalCount ?? 0;

  const isItemLoaded = (index: number) => {
    return index < (items?.length ?? 0);
  };
  const sizeMap = useRef<number[]>([]);

  const getSize = useCallback(
    (index: number) => sizeMap.current[index] || 84,
    []
  );

  const listRef = useRef<any>();

  const itemData = useMemo(
    () => ({
      setSize: (index: number, size: number) => {
        sizeMap.current[index] = size;
        listRef.current.resetAfterIndex(index);
        console.log(sizeMap);
      },
      messages: items,
    }),
    [items]
  );

  const setRequested = useBatchLoader({ loadNext, loadedCount: items.length });

  const render = width && height;
  return (
    <div {...divProps}>
      <div className={"h-full w-full flex flex-col bg-dark"}>
        <div ref={ref} className={"w-full grow flex flex-col"}>
          {render && (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={rowCount}
              loadMoreItems={(from, to) => setRequested(to)}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  className="scroll-none"
                  height={height}
                  width={width}
                  itemCount={rowCount}
                  itemSize={getSize}
                  onItemsRendered={onItemsRendered}
                  ref={listRef}
                  itemData={itemData}
                >
                  {(props) => <ChatMessage {...props} />}
                </List>
              )}
            </InfiniteLoader>
          )}
        </div>

        <ChatInput campaignId={campaignId} />
      </div>
    </div>
  );
}

function ChatMessage({ data, style, index }: ListChildComponentProps) {
  // TODO update ago
  const { messages, setSize } = data;
  const node = messages[index]?.node;
  const message = useFragment(MessageBodyFragment, node);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const { getById } = useParticipantContext();

  useEffect(() => {
    if (messageRef.current) {
      setSize(index, messageRef.current.getBoundingClientRect().height);
    }
  }, [setSize, index, messageRef]);

  if (!message) {
    return null;
  }

  const user = getById(message.userId);
  let content: ReactNode;

  if (message.content.__typename === "TextMessageContent") {
    content = <div className={"text-white"}>{message.content.text}</div>;
  }

  if (message.content.__typename === "RollMessageContent") {
    content = <RollMessageContent {...message.content} />;
  }

  return (
    <div style={style}>
      <div className={"px-3"} ref={messageRef}>
        <div className={"bg-darker rounded-md px-3 pb-3"}>
          <p className={"font-bold text-sm mb-1 pt-1"}>{user?.name ?? "-"}</p>
          {content}
        </div>
        <div className={"w-100 text-right font-light text-sm"}>
          {formatDistanceToNow(parseISO(message.createdAt))}
        </div>
      </div>
    </div>
  );
}

interface RollMessageContentProps {
  readonly __typename: "RollMessageContent";
  readonly rolls: ReadonlyArray<{
    readonly count: number;
    readonly faces: number;
    readonly result: ReadonlyArray<number> | null;
  }>;
}

function RollMessageContent({ rolls }: RollMessageContentProps) {
  const total = _.sumBy(rolls, (roll) => _.sum(roll.result));
  return (
    <div className={"w-full relative h-16"}>
      <div className={"absolute inset-0 overflow-hidden"}>
        <div className={"flex w-full justify-center flex-nowrap"}>
          <Dice type={20} size={64} fill={"rgba(0,0,0,0.2)"} />
        </div>
      </div>

      <div className={"absolute w-full text-5xl p-2 text-center text-white"}>
        {total}
      </div>
    </div>
  );
}
