import { graphql } from "relay-runtime";

export const CampaignQuery = graphql`
  query CampaignQuery($id: ID!) {
    ##...EntryList_rootQuery
    campaigns(where: { id: { eq: $id } }) {
      id
      name
      description
      ...ParticipantList_campaign
      #...MessageList_campaign
      ...Toolbar_campaign
      ...CampaignSelectedScene_campaign
    }
  }
`;

export const CampaignSelectQuery = graphql`
  query CampaignSelectQuery {
    campaigns {
      id
      name
      description
    }
  }
`;

export const CampaignSelectedScene_campaign = graphql`
  fragment CampaignSelectedScene_campaign on Campaign
  @refetchable(queryName: "SelectedSceneRefetchQuery")
  @argumentDefinitions(
    selectedSceneId: { type: "ID", defaultValue: null } # Optional argument
  ) {
    selectedScene(sceneId: $selectedSceneId) {
      id
      ...SelectedScene_scene
    }
  }
`;
