import { useFragment } from "react-relay";

import { useCampaignContext } from "features/participant/CampaignContext";

import { graphql } from "relay-runtime";
import { useSceneAddMutation } from "features/scene/Scene.graphql";
import {
  SceneSelector_campaign$data,
  SceneSelector_campaign$key,
} from "__generated__/SceneSelector_campaign.graphql";

export const SceneSelector_campaign = graphql`
  fragment SceneSelector_campaign on Campaign {
    scenes {
      name
      id
    }
  }
`;

interface SceneSelectorProps {
  query: SceneSelector_campaign$key;
}

export function SceneSelector({ query }: SceneSelectorProps) {
  const [commit, inFlight] = useSceneAddMutation();

  const { campaignId, selectScene } = useCampaignContext();

  const data: SceneSelector_campaign$data = useFragment(
    SceneSelector_campaign,
    query
  );

  return (
    <div className="s-full flex flex-row gap-4 p-4 justify-center items-center">
      {data.scenes.map((s, ix) => (
        <SceneButton
          key={ix}
          label={s.name}
          onClick={() => selectScene(s.id)}
        />
      ))}

      <SceneButton
        disabled={inFlight}
        label={"Add new scene"}
        onClick={() => commit(campaignId)}
      />
    </div>
  );
}

function SceneButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={"btn btn-menu w-24 h-24 border-light border-2"}
      disabled={disabled}
      onClick={onClick}
      type={"button"}
    >
      <div className={"s-full flex justify-center items-center"}>{label}</div>
    </button>
  );
}
