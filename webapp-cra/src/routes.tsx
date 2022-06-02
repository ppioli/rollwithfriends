import { RouteConfig } from "yarr";

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
