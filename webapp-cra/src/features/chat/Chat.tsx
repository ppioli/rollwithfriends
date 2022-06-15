import { ChatInput } from "features/chat/ChatInput";
import { useFragment, usePaginationFragment } from "react-relay";
import {
  MessageBodyFragment,
  MessageListPaginationFragment,
  useMessageSubscription,
} from "features/chat/Message.graphql";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { MessageList_campaign$key } from "./__generated__/MessageList_campaign.graphql";
import { MessageBody_message$key } from "features/chat/__generated__/MessageBody_message.graphql";
import { ReactNode } from "react";
import _ from "lodash";
import { useParticipantContext } from "features/participant/ParticipantsContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Dice } from "components/dices/Dice";

interface ChatProps {
  campaignId: string;
  messages: MessageList_campaign$key;
}

export function Chat({ campaignId, messages }: ChatProps) {
  const { data, loadNext } = usePaginationFragment<
    CampaignQueryType,
    MessageList_campaign$key
  >(MessageListPaginationFragment, messages);

  useMessageSubscription(campaignId);

  return (
    <div className={"w-full h-full bg-dark flex flex-col"}>
      <div className={"flex flex-col-reverse h-full gap-1 overflow-y-hidden"}>
        {(data.messages?.edges ?? []).map((edge) => {
          const { node: message } = edge;

          return <ChatMessage key={message.id} message={message} />;
        })}
      </div>

      <ChatInput campaignId={campaignId} />
    </div>
  );
}

interface ChatMessageProps {
  message: MessageBody_message$key;
}

function ChatMessage({ message }: ChatMessageProps) {
  // TODO update ago
  const data = useFragment(MessageBodyFragment, message);

  const { getById } = useParticipantContext();

  const user = getById(data.userId);
  let content: ReactNode;

  if (data.content.__typename === "TextMessageContent") {
    content = <div className={"text-white"}>{data.content.text}</div>;
  }

  if (data.content.__typename === "RollMessageContent") {
    content = <RollMessageContent {...data.content} />;
  }

  return (
    <div className={"px-3"}>
      <div className={"bg-darker rounded-md px-3 pb-3"}>
        <p className={"font-bold text-sm mb-1 pt-1"}>{user?.name ?? "-"}</p>
        {content}
      </div>
      <div className={"w-100 text-right font-light text-sm"}>
        {formatDistanceToNow(parseISO(data.createdAt))}
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
      {/* eslint-disable-next-line react/jsx-no-undef */}
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
