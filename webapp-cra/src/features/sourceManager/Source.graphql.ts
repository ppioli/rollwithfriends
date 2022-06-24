import { commitMutation } from "react-relay";

import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { SourceAddMutation } from "features/sourceManager/__generated__/SourceAddMutation.graphql";
import { CommitMutationFunction } from "utils/mutationPromise";

const graphql = require("babel-plugin-relay/macro");

export const sourceAddMutation: CommitMutationFunction<SourceAddMutation> = (
  variables,
  onCompleted
) => {
  commitMutation<SourceAddMutation>(RelayEnvironment, {
    mutation: graphql`
      mutation SourceAddMutation($input: SourceAddInput!) {
        sourceAdd(input: $input) {
          source {
            id
            shortName
            description
          }
        }
      }
    `,
    variables,
    onCompleted,
  });
};
