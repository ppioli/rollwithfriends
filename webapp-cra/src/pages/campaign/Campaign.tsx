import { usePreloadedQuery } from "react-relay";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { SceneSelector } from "pages/scene/SceneSelector";
import { Chat } from "pages/Chat";
import { useNavigation } from "yarr";
import { SelectedScene } from "pages/scene/SelectedScene";
import Toolbar from "features/battleMap/toolbar/Toolbar";

const graphql = require("babel-plugin-relay/macro");

export const CampaignQuery = graphql`
  query CampaignQuery($id: ID!, $selectedScene: ID) {
    campaigns(where: { id: { eq: $id } }) {
      id
      name
      description
      ...SceneSelector_campaign
      selectedScene(sceneId: $selectedScene) {
        id
        ...SelectedScene_scene
      }
    }
  }
`;

export const CampaignPage = ({ preloaded }: any) => {
  const { replace } = useNavigation();

  const data = usePreloadedQuery<CampaignQueryType>(
    CampaignQuery,
    preloaded.query
  );

  const campaign = data.campaigns[0];

  console.log(campaign.selectedScene);

  return (
    <div className={"content-area relative"}>
      {campaign.selectedScene && (
        <SelectedScene
          className={"absolute inset-0"}
          id={campaign.selectedScene.id}
          scene={campaign.selectedScene}
        />
      )}

      <div className={"absolute"}>
        <SceneSelector
          campaignId={campaign.id}
          campaign={campaign}
          onSceneChange={(sceneId) => {
            replace({
              pathname: `/campaign/${campaign.id}`,
              search: `selectedScene=${encodeURIComponent(sceneId)}`,
            });
          }}
        />
      </div>

      <div className={"absolute w-96 p-3 bottom-1 top-1 right-1"}>
        <Chat />
      </div>
    </div>
  );
};
