import Link from "next/link";
import { Suspense } from "react";
import { useLazyLoadQuery, graphql } from "react-relay"
import { CampaignSelectQuery } from "./__generated__/CampaignSelectQuery.graphql";

export interface CampaignSelectProps {

}



export const CampaignSelect = ({ }: CampaignSelectProps) => {
  const data = useLazyLoadQuery<CampaignSelectQuery>(
    graphql`
        query CampaignSelectQuery {
            campaigns {
                id,
                name,
                description
            }
        }
    `,
  );

  console.log("data", data)
  return <div>
    <h1>Choose a campaign</h1>

    <Suspense>
      {data.campaigns.map( c => <div>
        Id: {c.id} <br/>
        Name: {c.name}  <br/>
        Description: {c.description} <br/>
        <Link href={`/campaign/${c.id}`}>
          <a>Go!</a>
        </Link>
      </div>)}
    </Suspense>
  </div>;
};
