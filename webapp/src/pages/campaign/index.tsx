import { CampaignSelect } from "features/campaign/CampaignSelect";
import Head from "next/head";
import { withRelay } from "relay-nextjs";

function CampaignSelectPage() {
  return (
    <div className={"container"}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/src/public/favicon.ico" />
      </Head>

      <main>
        <CampaignSelect />
      </main>
    </div>
  );
}

export default withRelay(CampaignSelect);
