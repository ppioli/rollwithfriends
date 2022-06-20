import { usePreloadedQuery } from "react-relay";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { SceneSelector } from "pages/scene/SceneSelector";
import { useNavigation } from "yarr";
import { SelectedScene } from "pages/scene/SelectedScene";
import "./Campaing.css";
import { ParticipantsProvider } from "features/participant/ParticipantsContext";
import { Participants } from "features/participant/Participants";
import { EntryList } from "features/entryEditor/EntryList";
import { TabPanel } from "components/tabbedPanel/TabPanel";
import { Chat } from "features/chat/Chat";

const graphql = require("babel-plugin-relay/macro");

export const CampaignQuery = graphql`
  query CampaignQuery($id: ID!, $selectedScene: ID) {
    ...EntryList_rootQuery @arguments(count: 30)
    campaigns(where: { id: { eq: $id } }) {
      id
      name
      description
      ...SceneSelector_campaign
      ...MessageList_campaign
      ...ParticipantList_campaign
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

  return (
    <ParticipantsProvider campaign={campaign}>
      <div className={"content-area relative"}>
        {campaign.selectedScene && (
          <SelectedScene
            className={"absolute inset-0"}
            id={campaign.selectedScene.id}
            scene={campaign.selectedScene}
          />
        )}

        <div className={"absolute editor-width"}>
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

        <div className={"absolute w-96 inset-y-0 right-0 flex flex-col"}>
          <TabPanel className={"w-full h-full"}>
            {[
              {
                label: "Chat",
                component: (
                  <Chat
                    className={"w-full h-full"}
                    campaignId={campaign.id}
                    messages={campaign}
                  />
                ),
              },
              {
                label: "Journal",
                component: <EntryList entries={data} />,
              },
            ]}
          </TabPanel>
        </div>

        <div className={"absolute bottom-4 left-4 editor-width"}>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Participants />
        </div>
      </div>
    </ParticipantsProvider>
  );
};
