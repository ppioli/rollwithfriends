import { AcCard } from "modules/dnd5e/toolbar/AcCard";
import { HpCard } from "modules/dnd5e/toolbar/HpCard";
import { Suspense } from "react";
import { Npc5EContentToolbar_mapEntity$data } from "modules/dnd5e/toolbar/__generated__/Npc5EContentToolbar_mapEntity.graphql";
import {
  Abilities5E,
  Ability5E,
  getNpcProficiencyBonus,
} from "modules/dnd5e/definitions/character5E";
import { AbilitySaveButton } from "modules/dnd5e/toolbar/AbilitySaveButton";
import { useCampaignContext } from "features/participant/CampaignContext";
import { RollMessagesAddInput } from "features/chat/__generated__/MessageRollAddMutation.graphql";
import { Roll } from "data/Roll";

const graphql = require("babel-plugin-relay/macro");

export const Npc5EContentToolbar_mapEntity = graphql`
  fragment Npc5EContentToolbar_mapEntity on MapEntity @inline {
    id
    name
    content {
      ... on Npc5EContent {
        __typename
        maximumHp
        currentHp
        size
        ac
        temporaryHp
        npcId
        npc {
          challangeRating
          savingThrows {
            key
            value
          }
        }
      }
    }
  }
`;

export function Npc5EContentToolbar({
  entities,
}: {
  entities: Npc5EContentToolbar_mapEntity$data[];
}) {
  const single = entities.length === 1 ? entities[0] : null;
  const content =
    single && single.content.__typename === "Npc5EContent"
      ? single.content
      : null;

  const { campaignId } = useCampaignContext();

  const buildRollSavePayload = (ability: Ability5E): RollMessagesAddInput => {
    debugger;
    const input: RollMessagesAddInput = {
      campaignId,
      messages: entities.map((entity) => {
        const content = entity.content;
        if (content.__typename !== "Npc5EContent") {
          throw new Error("Invalid node");
        }

        const mod = content.npc.savingThrows?.find(
          ({ key }) => ability === key
        );
        const bonus =
          getNpcProficiencyBonus(content.npc.challangeRating!) +
          (mod?.value ?? 0);
        return {
          dmRoll: false,
          sourceId: entity.id,
          rolls: [Roll.D20(), Roll.Flat(bonus)],
        };
      }),
    };

    return input;
  };

  return (
    <div className={"h-full w-full flex p-2 gap-2"}>
      <div
        className={"flex flex-col bg-darker rounded-md p-2 overflown-hidden"}
      >
        <h1>{single?.name}</h1>
        <span className={"flex"}>
          <h4>{content?.size}</h4>
        </span>

        <div className={"flex"}>
          <div className={"w-24 h-24"}>
            <HpCard
              hp={content?.currentHp}
              maxHp={content?.maximumHp}
              temporaryHp={content?.temporaryHp}
            />
          </div>
          <div className={"w-24 h-24"}>
            <AcCard ac={content?.ac} />
          </div>
        </div>
      </div>
      <Suspense fallback={"Loading..."}>
        <div className={"flex flex-col p-2 bg-darker rounded-md"}>
          <h4>Saving throws</h4>

          <div className={"flex"}>
            {Abilities5E.map((e, ix) => (
              <AbilitySaveButton
                key={ix}
                ability={e}
                payloadBuilder={buildRollSavePayload}
              />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
