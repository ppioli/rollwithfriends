import { HTMLProps, ReactNode } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/campaing/Input";
import { useCampaignCreateMutation } from "components/campaing/CampaignCreate.graphql";
import { CampaignAddInput } from "components/campaing/__generated__/CampaignCreateMutation.graphql";

const createCampaignSchema: SchemaOf<CampaignAddInput> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export function CampaignCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignAddInput>({
    resolver: yupResolver(createCampaignSchema),
  });

  const commit = useCampaignCreateMutation((result: any) => {
    console.log(result);
  });

  const onSubmit = (data: CampaignAddInput) => commit({ input: data });
  console.log(errors);
  return (
    <TitlePanel
      title={"Create a new campaign"}
      description={
        "Give your campaign a name and a description and let's get going!"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card footer={<button className={"btn btn-primary"}>Submit</button>}>
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

interface FormCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function TitlePanel({ title, description, children }: FormCardProps) {
  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6 mb-3">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className="h4">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
      </div>
    </div>
  );
}

export interface CardProps {
  children: ReactNode;
  footer?: ReactNode;
  layout?: string;
  className?: string;
}

export function Card({ children, footer, layout, className }: CardProps) {
  return (
    <div
      className={`shadow sm:rounded-md sm:overflow-hidden ${className ?? ""}`}
    >
      <div className={`px-4 py-5 bg-white space-y-6 sm:p-6 ${layout ?? ""}`}>
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">{footer}</div>
      )}
    </div>
  );
}
