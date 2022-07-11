import { usePreloadedQuery } from "react-relay";
import { Card } from "components/panel/Card";
import Link from "next/link";
import { RelayProps, withRelay } from "relay-nextjs";
import { CampaignSelectQuery } from "__generated__/CampaignSelectQuery.graphql";
import { Loading } from "components/Loading";
import getRelayClientEnvironment from "lib/getRelayClientEnvironment";
import getRelayServerEnvironment from "lib/getRelayServerEnvironment";
import { CampaignCreate } from "features/campaing/CampaignCreate";
import { signIn, useSession } from "next-auth/react";

export const Index = graphql`
  query CampaignSelectQuery {
    campaigns {
      id
      name
      description
    }
  }
`;

const CampaignSelectPage = ({
  preloadedQuery,
}: RelayProps<{}, CampaignSelectQuery>) => {
  const session = useSession();
  const data = usePreloadedQuery<CampaignSelectQuery>(Index, preloadedQuery);

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  return (
    <div className={"mx-auto container mt-4"}>
      {data.campaigns.length === 0 && <EmptyCampaignList />}
      {data.campaigns.length > 0 && (
        <div className={"rounded p-4 bg-dark mb-4"}>
          <div className={"py-4"}>
            <h1 className={"text-center"}>Adventure awaits!</h1>
            <h4 className={"text-center"}>
              Select a campaign and get right back at it
            </h4>
          </div>

          <div className={"grid grid-cols-4 gap-4"}>
            {data.campaigns.map((c, ix) => (
              <CampaignCard key={ix} {...c} />
            ))}
          </div>
        </div>
      )}

      <CampaignCreate />
    </div>
  );
};

export default withRelay(CampaignSelectPage, Index, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getRelayClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => ({}),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async (
    ctx,
    // The object returned from serverSideProps. If you don't need a token
    // you can remove this argument.
    { token }: { token: string }
  ) => getRelayServerEnvironment(),
});

interface CampaignCard {
  id: string;
  name: string;
  description: string;
}

//TODO Add actual campaign cover art
function CampaignCard({ id, name, description }: CampaignCard) {
  return (
    <div className={"col rounded-md overflow-hidden"}>
      <div
        className={"h-32 bg-cover bg-center"}
        style={{
          backgroundImage: "url(https://gepig.com/game_cover_460w/1107.jpg)",
        }}
      ></div>
      <div className={"h-32 bg-darker p-4 flex flex-col"}>
        <h4>{name}</h4>
        <p className={"flex-grow"}>{description}</p>
        <div className={"self-end"}>
          <Link className="btn btn-primary" href={`/campaign/${id}`}>
            Go!
          </Link>
        </div>
      </div>
    </div>
  );
}

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
            fillRule="evenodd"
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
