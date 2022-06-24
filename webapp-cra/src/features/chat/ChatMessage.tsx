import { useFragment } from "react-relay";
import { MessageBodyFragment } from "features/chat/Message.graphql";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useParticipantContext } from "features/participant/ParticipantsContext";
import { RollMessageContent } from "features/chat/RollMessageContent";
import { formatDistanceToNow, parseISO } from "date-fns";
import { MessageBody_message$key } from "features/chat/__generated__/MessageBody_message.graphql";

export interface ChatMessageProps {
  query: MessageBody_message$key;
}

export function ChatMessage({ query }: ChatMessageProps) {
  // TODO update ago
  const message = useFragment(MessageBodyFragment, query);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const { getById } = useParticipantContext();

  const [timeAgo, setTimeAgo] = useState(
    formatDistanceToNow(parseISO(message.createdAt))
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      setTimeAgo(formatDistanceToNow(parseISO(message.createdAt)));
    }, 1000 * 60);

    return () => clearTimeout(handle);
  }, [message.createdAt]);

  if (!message) {
    return null;
  }
  const sender = message.source?.name ?? getById(message.userId)?.name ?? "???";

  console.log("Source", message.source?.name);
  let content: ReactNode;

  if (message.content.__typename === "TextMessageContent") {
    content = <div className={"text-white"}>{message.content.text}</div>;
  }

  if (message.content.__typename === "RollMessageContent") {
    content = <RollMessageContent {...message.content} />;
  }

  return (
    <div className={"px-3 mt-4"} ref={messageRef}>
      <div className={"bg-darker rounded-md px-3 pb-3"}>
        <p className={"font-bold text-sm mb-1 pt-1"}>{sender}</p>
        {content}
      </div>
      <div className={"w-100 text-right font-light text-sm"}>{timeAgo}</div>
    </div>
  );
}
