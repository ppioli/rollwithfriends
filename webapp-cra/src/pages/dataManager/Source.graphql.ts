import { useMutation } from "react-relay";
import {
  SourceAddInput,
  SourceAddMutation,
} from "pages/dataManager/__generated__/SourceAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export const SourceAdd = graphql`
  mutation SourceAddMutation($input: SourceAddInput!) {
    sourceAdd(input: $input) {
      source {
        id
        shortName
        description
      }
    }
  }
`;

export function useSourceAddMutation() {
  const [commit] = useMutation<SourceAddMutation>(SourceAdd);

  return (source: SourceAddInput) =>
    new Promise<string>((resolve) =>
      commit({
        variables: {
          input: source,
        },
        onCompleted: ({ sourceAdd }) => resolve(sourceAdd.source?.id ?? ""),
      })
    );
}
