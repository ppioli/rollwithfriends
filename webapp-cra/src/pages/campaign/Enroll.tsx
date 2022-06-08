import { useMutation, usePreloadedQuery } from "react-relay";
import { EnrollQuery as EnrollQueryType } from "pages/campaign/__generated__/EnrollQuery.graphql";
import { useNavigation } from "yarr";
import { EnrollMutation } from "pages/campaign/__generated__/EnrollMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export const EnrollQuery = graphql`
  query EnrollQuery($code: ID!) {
    enrollment(code: $code) {
      id
      name
      description
    }
  }
`;

export function EnrollPage({ preloaded }: any) {
  const data = usePreloadedQuery<EnrollQueryType>(EnrollQuery, preloaded.query);
  const { push } = useNavigation();

  const [commit, inFlight] = useMutation<EnrollMutation>(graphql`
    mutation EnrollMutation($input: EnrollmentAddInput!) {
      enrollmentAdd(input: $input) {
        campaign {
          id
        }
      }
    }
  `);

  if (!data.enrollment) {
    return <div>Not found</div>;
  }

  const enroll = data.enrollment;

  const onClick = () => {
    commit({
      variables: { input: { code: enroll.id } },
      onCompleted: ({ enrollmentAdd }) => {
        push(`/campaign/${enrollmentAdd.campaign?.id}`);
      },
    });
  };

  return (
    <div>
      <h1>Do you want to join to this campaign?</h1>
      <h2>Name: {enroll.description}</h2>
      <h3>Description: {enroll.description}</h3>

      <button
        type={"button"}
        className={"btn btn-primary"}
        onClick={onClick}
        disabled={inFlight}
      >
        Join
      </button>
    </div>
  );
}
