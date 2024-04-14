import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import { getUser } from "./app/lib/actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string().min(1, "Username is required"),
            password: z
              .string({ required_error: "Password is required" })
              .min(1, "Password is required")
              .min(6, "Password must be at least 6 characters"),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      return session;
    },
  },
});
