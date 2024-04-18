import Auth0 from "@auth/core/providers/auth0";
import { defineConfig } from "astro/config";

export default defineConfig({
  providers: [
    Auth0({
      issuer: "https://dev-03w1t1gcezrpevw0.us.auth0.com/",
      clientId: import.meta.env.AUTH_AUTH0_ID,
      clientSecret: import.meta.env.AUTH_AUTH0_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
