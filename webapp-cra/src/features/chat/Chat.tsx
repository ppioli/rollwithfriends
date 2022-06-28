import { usePaginationFragment } from "react-relay";
import {
  MessageListPaginationFragment,
  useMessageSubscription,
} from "features/chat/Message.graphql";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { MessageList_campaign$key } from "./__generated__/MessageList_campaign.graphql";
import { HTMLProps, useCallback, useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Virtuoso } from "react-virtuoso";
import { ChatMessage } from "features/chat/ChatMessage";
import { ChatInput } from "./ChatInput";

interface ChatProps extends HTMLProps<HTMLDivElement> {
  campaignId: string;
  messages: MessageList_campaign$key;
}

const LOAD_COUNT = 20;

export function Chat({ campaignId, messages, ...divProps }: ChatProps) {
  //TODO Invert list, handle message added count, item size
  const { data, loadPrevious, hasPrevious } = usePaginationFragment<
    CampaignQueryType,
    MessageList_campaign$key
  >(MessageListPaginationFragment, messages);

  useMessageSubscription(campaignId);

  const { ref, width, height } = useResizeDetector();
  const virtuoso = useRef<any>(null);
  const items = data.messages?.edges;
  const rowCount = data.messages?.totalCount ?? 0;
  const [atBottom, setAtBottom] = useState(false);

  const [firstItemIndex, setFirstItemIndex] = useState(rowCount);

  const prependItems = useCallback(() => {
    debugger;
    if (!hasPrevious) {
      return;
    }
    loadPrevious(LOAD_COUNT, {
      onComplete: () => {
        setFirstItemIndex((current) => current - LOAD_COUNT);
      },
    });
  }, [hasPrevious, loadPrevious]);

  useEffect(() => {
    if (data.messages?.edges?.length === null || virtuoso.current === null) {
      return;
    }
    console.log("effect", data.messages?.edges?.length);
    virtuoso.current.scrollToIndex({
      index: data.messages?.edges?.length! - 1,
      align: "bottom",
      behavior: "smooth",
    });
  }, [atBottom, data, virtuoso]);

  const render = width && height && items;
  return (
    <div {...divProps}>
      <div className={"h-full w-full flex flex-col bg-dark"}>
        <div ref={ref} className={"w-full grow flex flex-col"}>
          {render && items.length === 0 && (
            <div className={"w-full h-full flex justify-center items-center"}>
              No messages
            </div>
          )}
          {render && items.length > 0 && (
            <Virtuoso
              className={"w-full h-full scroll-none"}
              data={items}
              ref={virtuoso}
              startReached={prependItems}
              overscan={200}
              firstItemIndex={firstItemIndex}
              initialTopMostItemIndex={items.length - 1}
              atBottomStateChange={(bottom) => setAtBottom(bottom)}
              followOutput={"auto"}
              itemContent={(index, data) => {
                return <ChatMessage query={data.node} />;
              }}
              components={{
                Header: () => {
                  return <Header hasPrevious={hasPrevious} />;
                },
              }}
            />
          )}
        </div>
        <ChatInput campaignId={campaignId} />
      </div>
    </div>
  );
}

const Header = ({ hasPrevious }: { hasPrevious: boolean }) => {
  if (!hasPrevious) {
    return null;
  }
  return (
    <div className={"w-full p-2 flex justify-center"}>
      <div className={"p-2 w-32 bg-darkest rounded-full text-center"}>
        Loading...
      </div>
    </div>
  );
};
