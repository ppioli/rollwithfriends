import { useMutation } from "react-relay";
import { useCallback } from "react";
import { MapEntityUpdate } from "components/mapEntity/MapEntity";
import {
  CampaignCreateMutation$data,
  CampaignCreateMutation$variables,
} from "components/campaing/__generated__/CampaignCreateMutation.graphql";
const graphql = require("babel-plugin-relay/macro");

export function useCampaignCreateMutation(id: string) {
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
    (input: CampaignCreateMutation$variables) => {
      commit({
        variables: {
          input: {
            id: id,
            mapEntity: input,
          },
        },
        optimisticResponse: {
          mapEntityUpdate: {
            mapEntity: {
              id: id,
              ...input,
            },
          },
        },
      });
    },
    [id, commit]
  );
}
