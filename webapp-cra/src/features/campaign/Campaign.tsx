import { SelectedScene } from "features/scene/SelectedScene";
import { useLazyLoadQuery } from "react-relay";
import { Suspense } from "react";
import { CampaignQuery } from "features/campaign/__generated__/CampaignQuery.graphql";
import { useParams } from "react-router-dom";
import { useMapEntitySubscription } from "components/mapEntity/MapEntity.graphql";

const graphql = require("babel-plugin-relay/macro");

export const Campaign = () => {
  const { campaignId } = useParams();
  const data = useLazyLoadQuery<CampaignQuery>(
    graphql`
      query CampaignQuery($id: ID!) {
        campaigns(where: { id: { eq: $id } }) {
          id
          name
          description
          scenes {
            id
            ...SelectedScene_scene
          }
          selectedScene {
            id
          }
        }
      }
    `,
    { id: campaignId ?? "" }
  );

  const campaign = data.campaigns[0];

  if (!campaign.selectedScene) {
    return <div>No scene selected</div>;
  }

  return (
    <div>
      <h1>Campaign {campaignId}</h1>

      <div
        className={"flex flex-row items-stretch"}
        style={{
          width: "100vw",
          maxWidth: "100vw",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <SelectedScene
          id={campaign.scenes[0].id}
          container={{ className: "grow h-full" }}
          scene={campaign.scenes[0]}
        />
        <div className={"flex-non w-96"}>Asdf</div>
      </div>
    </div>
  );
};
