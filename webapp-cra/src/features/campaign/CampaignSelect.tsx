import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { CampaignSelectQuery } from "./__generated__/CampaignSelectQuery.graphql";
const graphql = require("babel-plugin-relay/macro");

export interface CampaignSelectProps {
  queryRef: PreloadedQuery<CampaignSelectQuery>;
}
export const CampaignSelect = graphql`
  query CampaignSelectQuery {
    campaigns {
      id
      name
      description
    }
  }
`;

export const CampaignSelectPage = (props: any) => {
  console.log("Props", props);
  const data = usePreloadedQuery<CampaignSelectQuery>(
    CampaignSelect,
    props.queryRef
  );

  return (
    <div>
      <h1>Choose a campaign</h1>
      {data.campaigns.map((c) => (
        <div key={c.id}>
          Id: {c.id} <br />
          Name: {c.name} <br />
          Description: {c.description} <br />
          {/*<Link to={`/campaign/${c.id}`}>Go!</Link>*/}
        </div>
      ))}
    </div>
  );
};
