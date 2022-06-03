import { useMutation } from "react-relay";
import { useCallback } from "react";
import {
  CampaignCreateMutation$data,
  CampaignCreateMutation$variables,
} from "components/campaing/__generated__/CampaignCreateMutation.graphql";
const graphql = require("babel-plugin-relay/macro");

export function useCampaignCreateMutation(onCompleted: any) {
  const [commit, isInFlight] = useMutation(graphql`
    mutation CampaignCreateMutation($input: CampaignAddInput!) {
      campaignAdd(input: $input) {
        campaign {
          id
        }
      }
    }
  `);

  return useCallback(
    (variables: CampaignCreateMutation$variables) => {
      commit({
        variables,
        onCompleted,
      });
    },
    [commit, onCompleted]
  );
}
