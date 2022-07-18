import { usePreloadedQuery } from "react-relay";
import { CampaignQuery as CampaignQueryType } from "pages/campaign/__generated__/CampaignQuery.graphql";
import { useNavigation } from "yarr";
import { SelectedScene } from "pages/scene/SelectedScene";
import "./Campaing.css";
import { CampaignProvider } from "features/participant/CampaignContext";
import { EntryList } from "features/entryEditor/EntryList";
import { TabPanel } from "components/tabbedPanel/TabPanel";
import { Chat } from "features/chat/Chat";
import { Toolbar } from "features/toolbar/Toolbar";

const graphql = require("babel-plugin-relay/macro");

export const CampaignQuery = graphql`
  query CampaignQuery($id: ID!, $selectedScene: ID) {
    ...EntryList_rootQuery
    campaigns(where: { id: { eq: $id } }) {
      id
      name
      description
      ...MessageList_campaign
      ...ParticipantList_campaign
      ...Toolbar_campaign
      selectedScene(sceneId: $selectedScene) {
        id
        ...SelectedScene_scene
      }
    }
  }
`;

export const CampaignPage = ({ preloaded }: any) => {
  const { replace } = useNavigation();

  const data = usePreloadedQuery<CampaignQueryType>(CampaignQuery, preloaded);

  const campaign = data.campaigns[0]!;

  return (
    <CampaignProvider
      campaign={campaign}
      campaignId={campaign.id}
      sceneId={campaign.selectedScene?.id}
    >
      <div className={"content-area relative"}>
        {campaign.selectedScene && (
          <SelectedScene
            scene={campaign.selectedScene}
            className={"absolute inset-0"}
          />
        )}

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
        <Toolbar
          className={"absolute bottom-0 left-0 editor-width"}
          query={campaign}
        />
      </div>
    </CampaignProvider>
  );
};
