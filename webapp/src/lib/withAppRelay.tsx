import getRelayClientEnvironment from "lib/getRelayClientEnvironment";

import { withRelay } from "relay-nextjs";

function Loading() {
  return <div>Loading...</div>;
}

export const withAppRelay = (Page, Query) =>
  withRelay(Page, Query, {
    // Fallback to render while the page is loading.
    // This property is optional.
    fallback: <Loading />,
    variablesFromContext: (ctx) => {
      return ctx.query;
    },
    clientSideProps: (ctx) => {
      console.log("Client side props ", ctx.query);
      return {};
    },
    // Create a Relay environment on the client-side.
    // Note: This function must always return the same value.
    createClientEnvironment: () => {
      return getRelayClientEnvironment()!;
    },
    // Gets server side props for the page.
    serverSideProps: async (ctx): Promise<any> => {
      //TODO
      const { default: getServerSideProps } = await import(
        "lib/server/getServerSideProps"
      );
      const session = await getServerSideProps(ctx);
      // const token = await getToken({ req: ctx.req!, secret: "" });

      if (!session?.accessToken) {
        return {
          redirect: { destination: "/login", permanent: false },
        };
      }

      return { session };
    },
    // Server-side props can be accessed as the second argument
    // to this function.
    createServerEnvironment: async (ctx, { session }) => {
      console.log(ctx);
      console.log(session);

      const { default: createServerEnvironment } = await import(
        "lib/server/getRelayServerEnvironment"
      );

      return createServerEnvironment(session.accessToken);
    },
  });
