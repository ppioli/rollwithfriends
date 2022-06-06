import { Card } from "components/panel/Card";
import { Input } from "components/form/Input";

export function Chat() {
  return (
    <Card className={"w-full h-full"} footer={<ChatInput />}>
      <div>This will be the chat</div>
    </Card>
  );
}

export function ChatInput() {
  return (
    <div className={"flex w-full"}>
      <Input name={"input"} layout={"flex-1"} />
      <button className={"btn btn-primary"}>Send</button>
    </div>
  );
}
