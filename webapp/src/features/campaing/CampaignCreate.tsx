import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { Input } from "components/form/Input";

import { TitlePanel } from "components/panel/TitlePanel";
import { Card } from "components/panel/Card";
import { useMutation } from "react-relay";
import {
  CampaignAddInput,
  CampaignCreateMutation,
} from "__generated__/CampaignCreateMutation.graphql";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const createCampaignSchema: SchemaOf<CampaignAddInput> = yup.object().shape({
  playerName: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
});

export function CampaignCreate() {
  const { push } = useRouter();

  const { register, handleSubmit } = useForm<CampaignAddInput>({
    resolver: yupResolver(createCampaignSchema),
  });

  const [commit, isInFlight] = useMutation<CampaignCreateMutation>(graphql`
    mutation CampaignCreateMutation($input: CampaignAddInput!) {
      campaignAdd(input: $input) {
        campaign {
          id
        }
      }
    }
  `);

  const onSubmit = (data: CampaignAddInput) =>
    commit({
      variables: { input: data },
      onCompleted: ({ campaignAdd }) =>
        push(`/campaign/${campaignAdd.campaign?.id}`),
    });

  return (
    <TitlePanel
      title={"Create a new campaign"}
      description={
        "Give your campaign a name and a description and let's get going!"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Input {...register("name")} name={"name"} label={"Campaign name"} />
          <Input
            {...register("description")}
            name={"description"}
            label={"Description"}
          />
          <div className={"w-full text-right"}>
            <button disabled={isInFlight} className={"btn btn-primary"}>
              Submit
            </button>
          </div>
        </Card>
      </form>
    </TitlePanel>
  );
}
