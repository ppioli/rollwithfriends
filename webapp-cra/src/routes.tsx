import { RouteConfig, RouteParameters, RouteProps } from "yarr";
import { loadQuery, PreloadedQuery } from "react-relay";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";
import { CampaignSelect } from "pages/campaign/CampaignSelect";
import { OperationType } from "relay-runtime";
import { CampaignQuery } from "pages/campaign/Campaign";
import CampaignQueryGraphql from "pages/campaign/__generated__/CampaignQuery.graphql";
import { EnrollQuery } from "pages/campaign/Enroll";

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
      const module = await import("pages/dashboard/Dashboard");

      return module.Dashboard;
    },
    path: "/dashboard",
  },
  {
    component: async () => {
      const module = await import("pages/campaign/CampaignSelect");

      return module.CampaignSelectPage as any;
    },
    path: "/campaign",
    preload: (a, b) => ({
      query: loadQuery(RelayEnvironment, CampaignSelect, {}),
    }),
  },
  {
    component: async () => {
      const module = await import("pages/campaign/Campaign");

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
      const module = await import("pages/campaign/Enroll");

      return module.EnrollPage;
    },
    path: "/enroll/:code",
    preload: ({ code }: any, query: any) => {
      debugger;
      return {
        query: loadQuery(RelayEnvironment, EnrollQuery, {
          code,
        }),
      };
    },
  },
  {
    component: async () => {
      const module = await import("pages/login/Login");

      return module.Login;
    },
    path: "/login",
  },
  {
    component: async () => {
      const module = await import("pages/home/Home");

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
