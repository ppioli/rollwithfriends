import { usePreloadedQuery } from "react-relay";
import { CampaignProvider } from "features/participant/CampaignContext";
import { SelectedScene } from "features/scene/SelectedScene";
import {
  CampaignQuery,
  CampaignSelectedScene_campaign,
} from "pages/campaign/Campaign.graphql";
import { CampaignQuery as CampaignQueryType } from "__generated__/CampaignQuery.graphql";
import { withAppRelay } from "lib/withAppRelay";
import { RelayProps } from "relay-nextjs";
import { Toolbar } from "features/toolbar/Toolbar";
import { SelectedSceneRefetchQuery as SelectedSceneRefetchQueryType } from "__generated__/SelectedSceneRefetchQuery.graphql";
import { CampaignSelectedScene_campaign$key } from "__generated__/CampaignSelectedScene_campaign.graphql";
import { useRefetchableFragment } from "react-relay";

const CampaignPage = ({
  preloadedQuery,
}: RelayProps<{}, CampaignQueryType>) => {
  const data = usePreloadedQuery<CampaignQueryType>(
    CampaignQuery,
    preloadedQuery
  );
  const campaign = data.campaigns[0]!;

  const [selectedScene, refetch] = useRefetchableFragment<
    SelectedSceneRefetchQueryType,
    CampaignSelectedScene_campaign$key
  >(CampaignSelectedScene_campaign, campaign);

  return (
    <CampaignProvider
      campaign={campaign}
      campaignId={campaign.id}
      selectScene={(sceneId) => refetch({ selectedSceneId: sceneId })}
    >
      <div className={"content-area relative"}>
        <SelectedScene
          query={selectedScene.selectedScene}
          className={"absolute inset-0"}
        />

        <div className={"absolute w-96 inset-y-0 right-0 flex flex-col"}>
          {/*<TabPanel className={"w-full h-full"}>
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
          </TabPanel>*/}
        </div>
        {
          <Toolbar
            className={"absolute bottom-0 left-0 editor-width"}
            query={campaign}
          />
        }
      </div>
    </CampaignProvider>
  );
};

export default withAppRelay(CampaignPage, CampaignQuery);
