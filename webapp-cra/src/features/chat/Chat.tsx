import { usePaginationFragment } from "react-relay";
import {
  MessageListPaginationFragment,
  useMessageSubscription,
} from "features/chat/Message.graphql";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { MessageList_campaign$key } from "./__generated__/MessageList_campaign.graphql";
import { HTMLProps, useCallback, useState } from "react";
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

  const items = data.messages?.edges ?? [];
  const rowCount = data.messages?.totalCount ?? 0;
  const [firstItemIndex, setFirstItemIndex] = useState(rowCount - 1);

  console.info("firstItem", firstItemIndex);

  const prependItems = useCallback(() => {
    if (!hasPrevious) {
      return;
    }
    loadPrevious(LOAD_COUNT, {
      onComplete: () => {
        setFirstItemIndex((current) => current - LOAD_COUNT);
      },
    });
  }, [hasPrevious, loadPrevious]);

  const render = width && height && rowCount > 0;
  return (
    <div {...divProps}>
      <div className={"h-full w-full flex flex-col bg-dark"}>
        <div ref={ref} className={"w-full grow flex flex-col"}>
          {render && (
            <Virtuoso
              className={"w-full h-full scroll-none"}
              data={items}
              startReached={prependItems}
              overscan={200}
              firstItemIndex={firstItemIndex}
              initialTopMostItemIndex={items.length - 1}
              followOutput={"smooth"}
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
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {hasPrevious ? "Loading..." : "End of times"}
    </div>
  );
};
