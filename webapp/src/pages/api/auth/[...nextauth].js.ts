import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: "Rwf",
      name: "Rwf",
      type: "oauth",
      wellKnown: "http://localhost:5289/.well-known/openid-configuration",
      checks: ["pkce", "state"],
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
});
