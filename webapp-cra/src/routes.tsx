import { RouteConfig } from "yarr";
import { loadQuery, PreloadedQuery } from "react-relay";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { OperationType } from "relay-runtime";

export interface PreloadedProps<T> {
  preloaded: T;
}

export interface PreloadedQueryType<TQuery extends OperationType> {
  query: PreloadedQuery<TQuery>;
}

export interface PreloadedQueryProps<TQuery extends OperationType>
  extends PreloadedProps<PreloadedQueryType<TQuery>> {}

export const routes: RouteConfig[] = [
  {
    component: async () => {
      const module = await import("features/dashboard/Dashboard");

      return module.Dashboard;
    },
    path: "/dashboard",
  },
  {
    component: async () => {
      const module = await import("features/campaign/CampaignSelect");

      return module.CampaignSelectPage;
    },
    path: "/campaign",
    preload: () => ({
      query: loadQuery(RelayEnvironment, CampaignSelect, {}),
    }),
  },
  {
    component: async () => {
      const module = await import("features/home/Home");

      return module.Home;
    },
    path: "/",
  },
  {
    component: async () =>
      Promise.resolve((props: any) => <div>Not found</div>),
    path: "*",
  },
];
