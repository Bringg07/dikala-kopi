import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "DikalaKopi2026!"
        ) {
          return { id: "1", name: "Admin Dikala", email: "admin@dikalakopi.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "rahasia-dikala-kopi",
});

export { handler as GET, handler as POST };