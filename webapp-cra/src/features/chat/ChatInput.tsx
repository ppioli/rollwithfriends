import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { Input } from "components/form/Input";
import {
  useRollMessageAddMutation,
  useTextMessageAddMutation,
} from "features/chat/Message.graphql";
import { TextMessagesAddInput } from "features/chat/__generated__/MessageAddMutation.graphql";
import { RollInfoInput } from "features/chat/__generated__/MessageRollAddMutation.graphql";

interface ChatInputForm {
  content: string;
}

interface ChatInputProps {
  campaignId: string;
}

const chatInputSchema: SchemaOf<ChatInputForm> = yup
  .object()
  .shape({ content: yup.string().required() });

export function ChatInput({ campaignId }: ChatInputProps) {
  const { register, handleSubmit, reset } = useForm<ChatInputForm>({
    resolver: yupResolver(chatInputSchema),
    defaultValues: { content: "" },
  });

  const [addTextMessage, textInFlight] = useTextMessageAddMutation(
    campaignId,
    () => {
      reset();
    }
  );

  const [addRollMessage, rollInFlight] = useRollMessageAddMutation();

  const onSubmit = ({ content }: ChatInputForm) => {
    if (content.startsWith("/roll ")) {
      try {
        const rolls = parseRollMessage(content.substring("/roll ".length));
        const messageContent: RollInfoInput[] = Object.entries(rolls).map(
          ([k, v]) => ({
            faces: parseInt(k),
            count: v,
          })
        );
        addRollMessage(
          {
            campaignId,
            messages: [
              {
                sourceId: null,
                dmRoll: false,
                rolls: messageContent,
              },
            ],
          },
          () => {
            reset();
          }
        );
      } catch (e) {
        console.log(e);
      }

      return;
    } else {
      // TODO Add source
      const input: TextMessagesAddInput = {
        campaignId,
        messages: [{ content }],
      };
      addTextMessage(input);
    }
  };

  return (
    <div className={"p-2"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex w-full p-3 bg-darkest rounded-md"}>
          <Input
            {...register("content")}
            layout={"flex-1"}
            input={{ className: "border-0 focus:border-0" }}
          />
          <button
            disabled={rollInFlight || textInFlight}
            type={"submit"}
            className={"btn btn-primary"}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function parseRollMessage(content: string): Record<number, number> {
  // index of last operator found
  const def = createRollDefinition();
  let lastFound = content.length;
  let ix = content.length - 1;
  while (ix >= 0) {
    if (content.charAt(ix) === "-" || content.charAt(ix) === "+" || ix === 0) {
      if (lastFound === ix) {
        throw new Error("Invalid roll string");
      }
      const [count, faces] = processDie(content.substring(ix, lastFound));
      def.addRoll(faces, count);
      lastFound = ix;
    }
    ix--;
  }

  return def.rolls;
}

function processDie(roll: string): [number, number] {
  let [count, die] = roll.split("d");

  const parsedDie = die ? filterInt(die) : 1;
  const parsedCount = filterInt(count);

  if (isNaN(parsedDie) || isNaN(parsedCount)) {
    throw new Error("Invalid parsed values");
  }

  return [parsedCount, parsedDie];
}

function createRollDefinition(): RollDefinition {
  const rolls: Record<number, number> = {};
  console.log(rolls);
  const addRoll = (faces: number, count: number) => {
    if (rolls[faces] === undefined) {
      rolls[faces] = 0;
    }
    rolls[faces] += count;
  };
  return {
    rolls,
    addRoll,
  };
}

interface RollDefinition {
  rolls: Record<number, number>;
  addRoll: (faces: number, count: number) => void;
}

function filterInt(value: string) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
}
