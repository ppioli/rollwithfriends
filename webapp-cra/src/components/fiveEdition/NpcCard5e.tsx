import { NpcCard5e_NonPlayerCharacter5E$key } from "components/fiveEdition/__generated__/NpcCard5e_NonPlayerCharacter5E.graphql";
import { useFragment } from "react-relay";
import { capitalize, startCase } from "lodash";
import { ServerUrl } from "lib/getRelayClientEnvironment";
import { Alignment5E } from "components/fiveEdition/__generated__/Npc5eAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export const NpcCard5eQuery = graphql`
  fragment NpcCard5e_NonPlayerCharacter5E on NonPlayerCharacter5E {
    name
    page
    sourceId
    avatarId
    source {
      shortName
    }
    type {
      label
      tags
    }
    hitPointsFormula
    hitPointsAverage
    armorClasses {
      description
      armorClass
    }
    challangeRating
    alignments
    sizes
    savingThrows {
      key
      value
    }
    skills {
      key
      value
    }
    languages {
      name
    }
    senses {
      description
      range
    }
    passivePerception
    resistances {
      condition
      types
    }
    speeds {
      walk
      fly
      swim
    }
    strength
    dexterity
    constitution
    intelligence
    wisdom
    charisma
  }
`;

export interface NpcCard5eProps {
  id: string;
  npc: NpcCard5e_NonPlayerCharacter5E$key;
}

export function NpcCard5e({ npc, id }: NpcCard5eProps) {
  const data = useFragment(NpcCard5eQuery, npc);

  return (
    <div className={"rounded rounded-md bg-darkest flex-col max-w-screen-md "}>
      <div className={"flex flex-col relative"}>
        <div className={"h-20 relative"}>
          <div
            className={"absolute left-40 flex flex-col h-full justify-end py-3"}
          >
            <h2>{data.name}</h2>
            <div className={"flex gap-x-2 flex-wrap"}>
              <h4>{formatType(data.type)}</h4>
              <h5>Chaotic Good</h5>
            </div>
          </div>
        </div>
        <div className={"bg-dark min-h-20 relative"}>
          <div className={"ml-40 h-full flex gap-x-4 py-3 px-4 flex-wrap"}>
            <MiscCard value={data.armorClasses[0].armorClass} label={"AC"} />
            <MiscCard value={data.hitPointsAverage} label={"AC"} />
            <MiscCard value={data.speeds.walk ?? 0} label={"AC"} />
          </div>
        </div>
        <div className={"absolute top-0 left-0 p-4"}>
          <div className={"w-32 h-32 rounded-full absolute"}>
            <img src={`${ServerUrl}/image/npcAvatar/${id}`} />
          </div>
        </div>
      </div>
      <div className={"bg-dark flex gap-x-4 justify-center flex-wrap"}>
        <AbilityCard label={"STR"} value={data.strength} />
        <AbilityCard label={"CON"} value={data.constitution} />
        <AbilityCard label={"DEX"} value={data.dexterity} />
        <AbilityCard label={"INT"} value={data.intelligence} />
        <AbilityCard label={"WIS"} value={data.wisdom} />
        <AbilityCard label={"CHA"} value={data.charisma} />
      </div>
    </div>
  );
}

interface AbilityCardProps {
  value: number;
  label: string;
}

function AbilityCard({ value, label }: AbilityCardProps) {
  return (
    <div className={"flex flex-col items-center "}>
      <div>{label}</div>
      <div className={"bg-darkest rounded absolute w-16 h-16 relative"}>
        <div className={"absolute inset-0 flex justify-center items-center"}>
          <div>
            <h1>{value}</h1>
          </div>
        </div>
        <div
          style={{ left: 0, right: 0 }}
          className={
            "absolute flex justify-center inset-x-0 h-4 bottom-0 text-center"
          }
        >
          <div className={"h-6 w-6 rounded-md bg-dark"}>
            {Math.floor(value / 2) - 5}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiscCard({ value, label }: AbilityCardProps) {
  return (
    <div className={"w-24 h-10 relative"}>
      <div className={"absolute inset-0"}>
        <div
          className={"absolute bg-darker rounded-md inset-x-0 top-1 bottom-1"}
        >
          <div className={"w-12 h-full ml-12 flex justify-center items-center"}>
            <h1>{value}</h1>
          </div>
        </div>

        <img
          src={"https://www.svgrepo.com/show/153044/shield.svg"}
          className={"w-12 h-12 -mt-1 absolute"}
        />
      </div>
    </div>
  );
}

function formatAlignment(alignment: Alignment5E) {
  return capitalize(startCase(alignment));
}

function formatType({
  label,
  tags,
}: {
  readonly label: string;
  readonly tags: readonly string[] | null;
}) {
  let type = capitalize(label);
  if (tags) {
    type += ` (${tags.map((s) => capitalize(s)).join(", ")})`;
  }

  return type;
}
