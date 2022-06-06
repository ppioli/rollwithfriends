import { RouteConfig, RouteParameters, RouteProps } from "yarr";
import { loadQuery, PreloadedQuery } from "react-relay";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { CampaignSelect } from "features/campaign/CampaignSelect";
import { OperationType } from "relay-runtime";
import { CampaignQuery } from "features/campaign/Campaign";
import CampaignQueryGraphql from "features/campaign/__generated__/CampaignQuery.graphql";

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

      return module.CampaignSelectPage as any;
    },
    path: "/campaign",
    preload: (a, b) => ({
      query: loadQuery(RelayEnvironment, CampaignSelect, {}),
    }),
  },
  {
    component: async () => {
      const module = await import("features/campaign/Campaign");

      return module.CampaignPage;
    },
    path: "/campaign/:campaignId",
    preload: (routeParameters: any, query: any) => {
      return {
        query: loadQuery(RelayEnvironment, CampaignQuery, {
          id: routeParameters.campaignId,
          selectedScene: query.selectedScene,
        }),
      };
    },
  },
  {
    component: async () => {
      const module = await import("features/login/Login");

      return module.Login;
    },
    path: "/login",
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
