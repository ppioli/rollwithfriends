import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "rwf",
      name: "Roll with friends account",
      type: "oauth",
      wellKnown: "http://localhost:5289/.well-known/openid-configuration",
      checks: ["pkce", "state"],
      clientId: "webapp",
      clientSecret: "901564A5-E7FE-42CB-B10D-61EF6A8F3654",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
