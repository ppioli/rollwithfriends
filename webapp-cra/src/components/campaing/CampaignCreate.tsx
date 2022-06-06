import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/form/Input";
import {
  CampaignAddInput,
  CampaignCreateMutation,
} from "components/campaing/__generated__/CampaignCreateMutation.graphql";
import { TitlePanel } from "components/panel/TitlePanel";
import { Card } from "components/panel/Card";
import { useNavigation } from "yarr";
import { useMutation } from "react-relay";

const graphql = require("babel-plugin-relay/macro");

const createCampaignSchema: SchemaOf<CampaignAddInput> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export function CampaignCreate() {
  const { push } = useNavigation();

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
        <Card
          footer={
            <button disabled={isInFlight} className={"btn btn-primary"}>
              Submit
            </button>
          }
        >
          <Input {...register("name")} name={"name"} label={"Campaign name"} />
          <Input
            {...register("description")}
            name={"description"}
            label={"Description"}
          />
        </Card>
      </form>
    </TitlePanel>
  );
}
