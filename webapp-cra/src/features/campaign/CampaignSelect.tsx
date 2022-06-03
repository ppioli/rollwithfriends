import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { CampaignSelectQuery } from "./__generated__/CampaignSelectQuery.graphql";
import { RouteProps } from "yarr";
import {
  CampaignCreate,
  Card,
  TitlePanel,
} from "components/campaing/CampaignCreate";
import { Input } from "components/campaing/Input";
const graphql = require("babel-plugin-relay/macro");

export const CampaignSelect = graphql`
  query CampaignSelectQuery {
    campaigns {
      id
      name
      description
    }
  }
`;

type CampaignSelectPageProps = RouteProps<"/team">;

export const CampaignSelectPage = ({ preloaded }: any) => {
  const data = usePreloadedQuery<CampaignSelectQuery>(
    CampaignSelect,
    preloaded.query
  );

  return (
    <>
      {data.campaigns.length === 0 && <EmptyCampaignList />}
      {data.campaigns.length > 0 && (
        <TitlePanel
          title={"Select a campaign"}
          description={"Jump right back to action"}
        >
          <Card>
            {data.campaigns.map((c) => (
              <div key={c.id}>
                Id: {c.id} <br />
                Name: {c.name} <br />
                Description: {c.description} <br />
                {/*<Link to={`/campaign/${c.id}`}>Go!</Link>*/}
              </div>
            ))}
          </Card>
        </TitlePanel>
      )}

      <CampaignCreate />
    </>
  );
};

function EmptyCampaignList() {
  return (
    <Card
      className={"mb-3"}
      layout={"flex w-full flex-col items-center justify-center"}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 fill-current text-gray-500"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.496 4.496 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.75.75 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a3 3 0 00-2.121-.879H.75a.75.75 0 01-.75-.75v-15zm11.247 3.747a3 3 0 00-3-2.997H1.5V18h6.947a4.5 4.5 0 012.803.98l-.003-11.483zm1.503 11.485V7.5a3 3 0 013-3h6.75v13.558l-6.927-.047a4.5 4.5 0 00-2.823.971z"
          ></path>
        </svg>
      </div>

      <div className="mt-8 text-center">
        <h1>You are not enrolled in any campaign :( </h1>
        <p className="mx-auto mt-4 lg:w-1/2 text-gray-500">
          Use the form bellow to create a new one or ask your DM for an
          invitation link
        </p>
      </div>

      <button className="mt-8 block rounded-lg border border-green-700 bg-green-600 py-1.5 px-4 font-medium text-white transition-colors hover:bg-green-700 active:bg-green-800 disabled:opacity-50">
        Get started
      </button>

      <button className="mt-2 block rounded-lg bg-transparent py-1.5 px-4 font-medium text-blue-600 transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
        Learn more
      </button>
    </Card>
  );
}
