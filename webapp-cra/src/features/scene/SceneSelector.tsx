import { useFragment, useMutation } from "react-relay";
import { useSceneAddMutation } from "features/scene/Scene.graphql";
import {
  SceneSelector_campaign$data,
  SceneSelector_campaign$key,
} from "features/scene/__generated__/SceneSelector_campaign.graphql";
import { useNavigation } from "yarr";
const graphql = require("babel-plugin-relay/macro");

export const SceneSelector_campaign = graphql`
  fragment SceneSelector_campaign on Campaign {
    scenes {
      name
      id
    }
  }
`;

interface SceneSelectorProps {
  campaignId: string;
  campaign: SceneSelector_campaign$key;
  onSceneChange: (sceneId: string) => void;
}
export function SceneSelector({
  campaignId,
  campaign,
  onSceneChange,
}: SceneSelectorProps) {
  const [commit, inFlight] = useSceneAddMutation();
  const data: SceneSelector_campaign$data = useFragment(
    SceneSelector_campaign,
    campaign
  );

  return (
    <div className={"flex flex-row"}>
      {data.scenes.map((s) => (
        <button
          className={"btn btn-primary"}
          onClick={() => onSceneChange(s.id)}
          type={"button"}
          key={s.id}
        >
          {s.name}
        </button>
      ))}
      <div>
        <button
          disabled={inFlight}
          onClick={() => commit(campaignId)}
          className={"btn btn-primary"}
        >
          Add
        </button>
      </div>
    </div>
  );
}
