import { CampaignSelectQuery } from "features/campaign/__generated__/CampaignSelectQuery.graphql";
import { SelectedScene } from "features/scene/SelectedScene";
import { useLazyLoadQuery, graphql } from "react-relay";
import { Suspense, useEffect } from "react";

export interface CampaignProps {
  campaignId: string;
}

export const Campaign = ({ campaignId }: CampaignProps) => {
  const data = useLazyLoadQuery<CampaignSelectQuery>(
    graphql`
      query CampaignQuery($id: ID!) {
        campaigns(where: { id: { eq: $id } }) {
          id
          name
          description
          scenes {
            id
          }
          selectedScene {
            id
            ...SelectedScene_scene
          }
        }
      }
    `,
    { id: campaignId }
  );

  return (
    <div>
      <h1>Campaña {campaignId}</h1>

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
        <Suspense>
          <SelectedScene
            id={"saf"}
            container={{ className: "grow h-full" }}
            scene={data.campaigns[0].selectedScene}
          />
        </Suspense>
        <div className={"flex-non w-96"}>Asdf</div>
      </div>
    </div>
  );
};
