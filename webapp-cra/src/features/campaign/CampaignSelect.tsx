import { useLazyLoadQuery, useQueryLoader } from "react-relay";
import { CampaignSelectQuery } from "./__generated__/CampaignSelectQuery.graphql";
import { Link } from "react-router-dom";
import { Suspense } from "react";
const graphql = require("babel-plugin-relay/macro");

export interface CampaignSelectProps {}

export const CampaignSelect = () => {
  const data = useLazyLoadQuery<CampaignSelectQuery>(
    graphql`
      query CampaignSelectQuery {
        campaigns {
          id
          name
          description
        }
      }
    `,
    {}
  );

  console.log("data", data);
  return (
    <div>
      <h1>Choose a campaign</h1>
      {data.campaigns.map((c) => (
        <div key={c.id}>
          Id: {c.id} <br />
          Name: {c.name} <br />
          Description: {c.description} <br />
          <Link to={`/campaign/${c.id}`}>Go!</Link>
        </div>
      ))}
    </div>
  );
};
